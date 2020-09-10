/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file cmpForceController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { BaseActor } from "../actors/baseActor";
import { ST_COMPONENT_ID, ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { IForce } from "../steeringBehavior/iForce";
import { IBaseComponent } from "./iBaseComponent";

/**
 * This component controls all the forces applied in one actor. Saves each force
 * with a string id, which can be used to get the force with the getForce method.
 */
export class CmpForceController 
implements IBaseComponent<Ty_Sprite>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor()
  {
    // No actor attached.

    this._m_actor = null;

    // Creat the table of forces.
    
    this._m_hForce = new Map<string, IForce>();

    // Create 

    this._m_force = new Phaser.Math.Vector2(0.0, 0.0);
    this._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
    this._m_speed = 0.0;
    this._m_mass = 1.0;
    
    return;
  }
  
  /**
   * Get the attached actor.
   * 
   * @param _actor actor. 
   */
  init(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    // Clear forces.

    this.clear();

    // Save actor

    this._m_actor = _actor;

    return;
  }

  /**
   * Updates each force in this controller.
   * 
   * @param _actor actor. 
   */
  update(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    // Reset the sum of all forces.

    let force = this._m_force;

    force.setTo(0.0, 0.0);

    // Update forces.

    this._m_hForce.forEach
    (
      this._updateForce,
      this
    );

    // Truncate the resulting force

    let speed = this._m_speed;    

    if(force.length() > speed)
    {
      force.normalize();

      force.setTo
      (
        force.x * speed,
        force.y * speed
      );
    }

    // apply delta time.

    let dt = 0.001;

    force.setTo
    (
      force.x * dt,
      force.y * dt
    );

    // Move Agent.

    this._m_actor.sendMessage
    (
      ST_MESSAGE_ID.kMove,
      force
    );

    // Calculate new direction

    this._m_direction = force.normalize();

    // Rotate Agent

    this._m_actor.sendMessage
    (
      ST_MESSAGE_ID.kSetAngle,
      this._m_direction.angle()
    );

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case ST_MESSAGE_ID.kSetMass:

      this._m_mass = _obj as number;
      return;

      case ST_MESSAGE_ID.kSetSpeed:

      this._m_speed = _obj as number;
      return;
    }
    return;
  }

  getID()
  : number 
  {
    return ST_COMPONENT_ID.kForceController;
  }

  /**
   * Adds a new force to this controller. If a force with the same id already 
   * existis, it will be replaced. This will call the init( CmpForceController )
   * method of the given force.
   * 
   * @param _str_id force id. 
   * @param _force force.
   */
  addForce(_str_id : string, _force : IForce)
  : void
  {
    // Add force to table

    this._m_hForce.set(_str_id, _force);
    
    // Initialize force

    _force.setController(this);

    return;
  }

  /**
   * Get a force from this controller. If the force not exists, it will throw an
   * error
   * 
   * @param _str_id force id. 
   * 
   * @returns Force.
   */
  getForce<T extends IForce>(_str_id : string)
  : T
  {
    let hForce = this._m_hForce;

    if(hForce.has(_str_id))
    {
      return this._m_hForce.get(_str_id) as T;
    }
    
    // WARNING

    throw new Error('Force does not exists: ' + _str_id);
  }

  /**
   * Add a steer force to this actor.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  addSteerForce(_x : number, _y : number)
  : void
  {
    this._m_force.x += _x;
    this._m_force.y += _y;

    return;
  }

  /**
   * Get the current direction of the actor.
   */
  getDirection()
  : V2
  {
    return this._m_direction;
  }

  /**
   * Get the actor's speed (pixels per second).
   */
  getSpeed()
  : number
  {
    return this._m_speed;
  }

  /**
   * Set the actor's speed.
   * 
   * @param _speed speed in pixels per second. 
   */
  setSpeed(_speed : number)
  : void
  {
    this._m_speed = _speed;
    return;
  }

  /**
   * Get the actor's mass.
   */
  getMass()
  : number
  {
    return this._m_mass;
  }

  /**
   * Set the actor's mass.
   * 
   * @param _mass mass (units).
   */
  setMass(_mass : number)
  : void
  {
    this._m_mass = _mass;
    return;
  }

  /**
   * Destroy and clear all forces in this controller.
   */
  clear()
  : void
  {
    // Destroy forces.

    this._m_hForce.forEach
    (
      function(_force : IForce)
      {
        _force.destroy();
        return;
      }
    );

    // Clear table.

    this._m_hForce.clear();

    return;
  }

  /**
   * Safely destroy this controller.
   */
  destroy()
  : void 
  {
    // Set null

    this._m_actor = null;

    // Destroy forces

    this.clear();

    this._m_hForce = null;

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Update a force.
   * 
   * @param _force force. 
   */
  private _updateForce(_force : IForce)
  : void
  {
    // TODO Get delta time from Master.

    let deltaTime : number = 0.001;
    
    // Update force.
    
    _force.update(deltaTime);

    return;
  }

  /**
   * The actor direction.
   */
  private _m_direction : V2;

  /**
   * The sum of all forces.
   */
  private _m_force : V2;

  /**
   * The actor speed (pixels per second).
   */
  private _m_speed : number;

  /**
   * The actor mass (units).
   */
  private _m_mass : number;
  
  /**
   * Reference to the base actor.
   */
  private _m_actor : BaseActor<Ty_Sprite>;

  /**
   * Table of forces.
   */
  private _m_hForce : Map<string, IForce>;
}