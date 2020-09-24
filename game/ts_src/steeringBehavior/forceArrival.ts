/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceArrival.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since September-14-2020
 */

import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";

/**
 * 
 */
export class ArrivalForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Arrival Force.
   * 
   * @param _self The sprite of the agent.
   * @param _target The sprite of the target.
   * @param _slowingRadius The limit radius to start slowing down the force.
   * @param _force The magnitude of the force.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _target : Ty_Sprite,
    _slowingRadius : number,
    _force : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    this._m_target = _target;
    this._m_slowingRadius = _slowingRadius;
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);

    return;
  }

  setController(_controller: CmpForceController)
  : void 
  {
    this._m_controller = _controller;
    return;
  }

  update(_dt: number)
  : void 
  {
    // Get points

    let target : Ty_Sprite = this._m_target;
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    let maxSpeed = controller.getMaxSpeed();

    let actualVelocity = this._m_v2_actualVelocity;

    // Current Force

    actualVelocity.setTo(direction.x * speed, direction.y * speed);

    // Desire Force    

    let forceMagnitude = this._m_forceMagnitude;

    let desiredVelocity = this._m_v2_desiredVelocity;

    desiredVelocity.set
    (
      target.x - self.x, 
      target.y - self.y
    );

    let distance = desiredVelocity.length();

    desiredVelocity.normalize();

    let slowingRadius = this._m_slowingRadius;

    let arrivalMultiplier = distance / slowingRadius;

    if(distance < slowingRadius) {
        desiredVelocity.set(
            desiredVelocity.x * maxSpeed * arrivalMultiplier, 
            desiredVelocity.y * maxSpeed * arrivalMultiplier
        );
    } else {
        desiredVelocity.set(
            desiredVelocity.x * maxSpeed, 
            desiredVelocity.y * maxSpeed
        );
    }

    // Steer Force

    let steerForce = this._m_v2_forceMagnitude;
   
    steerForce.set
    (
      desiredVelocity.x - actualVelocity.x, 
      desiredVelocity.y - actualVelocity.y
    );    

    // Truncate force    

    if(steerForce.length() > forceMagnitude)
    {
      steerForce.normalize();
      steerForce.set
      (
        steerForce.x * forceMagnitude, 
        steerForce.y * forceMagnitude
      );
    }

    // Add force to the controller.

    controller.addSteerForce(steerForce.x, steerForce.y);

    return;
  }

  /**
   * Updates the debugging logic. Called only when the debugging feature is 
   * enable.
   * 
   * @param _dt delta time in seconds.
   */
  updateDebug(_dt : number)
  : void
  {
    
    return;
  }

  /**
   * Called when the debugging feature had been enable.
   */
  onDebugEnable()
  : void 
  {
    // TODO
    return;
  }

  /**
   * Called when the debugging feature had been disable.
   */
  onDebugDisable()
  : void 
  {
    // TODO
    return;
  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_v2_forceMagnitude = null;
    this._m_v2_actualVelocity = null;
    this._m_v2_desiredVelocity = null;
    
    this._m_forceMagnitude = null;
    this._m_slowingRadius = null;

    this._m_target = null;
    this._m_self = null;
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The force in Vector2.
   */
  private _m_v2_forceMagnitude : V2;

  /**
   * The limit radius to start slowing down the force.
   */
  private _m_slowingRadius : number;

  /**
   * The magnitude of the applied force.
   */
  private _m_forceMagnitude : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target sprite.
   */
  private _m_target : Ty_Sprite;

  /**
   * Vector 2 A.
   */
  private _m_v2_actualVelocity : V2;

  /**
   * Vector 2 B.
   */
  private _m_v2_desiredVelocity : V2;
}