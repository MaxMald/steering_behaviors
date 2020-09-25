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
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { DebugManager } from "../managers/debugManager/debugManager";
import { Master } from "../master/master";
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

    // Create physics properties.

    this._m_actualVelocity = new Phaser.Math.Vector2();

    this._m_actualVelocityStepped = new Phaser.Math.Vector2();

    this._m_totalForce = new Phaser.Math.Vector2();

    this._m_totalForceStepped = new Phaser.Math.Vector2();

    this._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
    
    this._m_speed = 0.0;
    
    this._m_mass = 1.0;
    
    this._m_bRunning = true;
    
    this._m_debug = false;
    
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

    // Get Master.

    this._m_master = Master.GetInstance();

    // Active debug if it is enable.

    if(this._m_master.isDebugEnable())
    {
      this._m_debug = true;
    }

    // Save a reference to the Debug Manager.
    
    this._m_debugManager = this._m_master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    // Save a reference to the actor.

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

    let totalForce = this._m_totalForce;

    totalForce.reset();

    let totalForceStepped = this._m_totalForceStepped;

    totalForceStepped.reset();

    // Abort if the force controller is not running.

    if(!this._m_bRunning)
    {
      return;
    }   

    // Sum each force attached to this force controller.

    this._m_hForce.forEach
    (
      this._updateForce,
      this
    );

    // Get delta time.

    let dt = this._m_master.getDeltaTime();

    // Apply the mass to the total force.

    totalForce.scale(1.0 / this._m_mass);

    // Work with the Total force stepped

    totalForceStepped.copy(totalForce);

    totalForceStepped.scale(dt);

    // Calculate the actual velocity

    let actualVelocity = this._m_actualVelocity;

    let direction = this._m_direction;

    actualVelocity.copy(direction);

    actualVelocity.scale(this._m_speed);

    // Apply total force to the actual velocity

    actualVelocity.add(totalForceStepped);

    // Truncate the resulting velocity if it exceeds the maximum speed allowed.

    actualVelocity.limit(this._m_maxSpeed);

    // Recalculate the agent actual speed.
    
    this._m_speed = actualVelocity.length();
    
    // Apply delta time to the actual velocity, so it can be used to move the
    // actor sprite.

    let actualVelocityStepped = this._m_actualVelocityStepped;

    actualVelocityStepped.copy(actualVelocity);

    actualVelocityStepped.scale(dt);

    // Move actor sprite with the actual velocity.

    this._m_actor.sendMessage
    (
      ST_MESSAGE_ID.kMove,
      actualVelocityStepped
    );

    // Recalculate the agent direction.
    
    direction.copy(actualVelocity);

    direction.normalize();

    // Rotate agent towards direction.

    this._m_actor.sendMessage
    (
      ST_MESSAGE_ID.kSetAngle,
      direction.angle()
    );

    // Debug force controller

    if(this._m_debug)
    {
      this.updateDebug(dt);
    }
    return;
  }

  updateDebug(_dt : number)
  : void
  {
    // Debug the actual velocity.

    let debugManager = this._m_debugManager;

    let sprite = this._m_actor.getWrappedInstance();

    let actualVelocity = this._m_actualVelocity;

    debugManager.drawLine
    (
      sprite.x,
      sprite.y,
      sprite.x + actualVelocity.x,
      sprite.y + actualVelocity.y,
      3,
      ST_COLOR_ID.kGreen
    );

    return;
  }

  receive(_id: number, _obj: any)
  : void 
  {
    switch(_id)
    {
      case ST_MESSAGE_ID.kSetMass:

      this.setMass(_obj as number);
      return;

      case ST_MESSAGE_ID.kSetSpeed:

      this.setSpeed(_obj as number);
      return;

      case ST_MESSAGE_ID.kSetMaxSpeed:

      this.setMaxSpeed(_obj as number);
      return;
    }
    return;
  }

  /**
   * Enable the force controller.
   */
  onSimulationStart()
  : void 
  {
    this._m_bRunning = true;
    return;
  }

  /**
   * Disable the force controller.
   */
  onSimulationPause()
  : void 
  {
    this._m_bRunning = false;
    return;
  }

  /**
   * Enable the force controller.
   */
  onSimulationResume()
  : void 
  {
    this._m_bRunning = true;
    return;
  }

  /**
   * Disable the force controller.
   */
  onSimulationStop()
  : void 
  {
    this._m_bRunning = false;

    // reset physics properties

    this._m_speed = 0.0;

    this._m_actualVelocity.reset();

    this._m_actualVelocityStepped.reset();

    this._m_totalForce.reset();

    this._m_totalForceStepped.reset();

    this._m_direction.set(0.0, -1.0);

    return;
  }

  /**
   * Called when the debug had been enable.
   */
  onDebugEnable()
  : void 
  {
    this._m_debug = true;
    this._m_hForce.forEach
    (
      this._forceDebugEnable,
      this
    );    
    return;
  }

  /**
   * Called when the debug had been disable.
   */
  onDebugDisable()
  : void 
  {
    this._m_debug = false;
    this._m_hForce.forEach
    (
      this._forceDebugDisable,
      this
    );
    return;
  }

  getID()
  : number 
  {
    return ST_COMPONENT_ID.kForceController;
  }

  /**
   * Adds a new force to this controller. If a force with the same id already 
   * exists, it will be replaced. This will call the init( CmpForceController )
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
    this._m_totalForce.x += _x;

    this._m_totalForce.y += _y;

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
   * Get the actual velocity of the actor.
   */
  getVelocity()
  : V2
  {
    return this._m_actualVelocity;
  }

  /**
   * Set the actor's maximum speed allowed.
   * 
   * @param _maxSpeed 
   */
  setMaxSpeed(_maxSpeed : number)
  : void
  {
    this._m_maxSpeed = _maxSpeed;
    return;
  }

  /**
   * Get the actor's max speed (pixels per second).
   */
  getMaxSpeed()
  : number
  {
    return this._m_maxSpeed;
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
   * Check if the force controller is running.
   * 
   * @returns true if the force controller is running.
   */
  isRunning()
  : boolean
  {
    return this._m_bRunning;
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
    // Detach objects

    this._m_direction = null;

    this._m_totalForce = null;

    this._m_actualVelocity = null;

    this._m_actualVelocityStepped = null;

    this._m_totalForceStepped = null;

    // Detach references

    this._m_master = null;

    this._m_actor = null;

    // Destroy and detach forces

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

    let deltaTime : number = this._m_master.getDeltaTime();
    
    // Update force.
    
    _force.update(deltaTime);

    // Debugging

    if(this._m_debug)
    {
      _force.updateDebug(deltaTime);
    }
    return;
  }

  /**
   * Called whe the force is enable.
   * 
   * @param _force force. 
   */
  private _forceDebugEnable(_force : IForce)
  : void
  {
    this._m_debug = true;
    _force.onDebugEnable();
    return;
  }

  /**
   * Called when the force is disable.
   * 
   * @param _force force. 
   */
  private _forceDebugDisable(_force : IForce)
  : void
  {
    this._m_debug = false;
    _force.onDebugDisable();
    return;
  }

  /**
   * Reference to the master.
   */
  private _m_master : Master;

  /**
   * The actor direction.
   */
  private _m_direction : V2;

  /**
   * The actual velocity of the actor.
   */
  private _m_actualVelocity : V2;

  /**
   * The actual velocity of the actor, multiplied by the delta time.
   */
  private _m_actualVelocityStepped : V2;

  /**
   * The sum of all forces.
   */
  private _m_totalForce : V2;

  /**
   * The sum of all forces, multiplied by the delta time.
   */
  private _m_totalForceStepped : V2;

  /**
   * The actor speed (pixels per second).
   */
  private _m_speed : number;

  /**
   * The actor max speed (pixels per second).
   */
  private _m_maxSpeed : number;

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

  /**
   * Indicates if the force controller is running.
   */
  private _m_bRunning : boolean;

  /**
   * Indicates if the debug feature is enable.
   */
  private _m_debug : boolean;

  /**
   * Reference to the debug manager.
   */
  private _m_debugManager : DebugManager;
}