/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceArrival.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since September-14-2020
 */

import { Master } from "../master/master";
import { DebugManager } from "../managers/debugManager/debugManager";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../commons/stEnums";
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
    // Get variables

    this._m_self = _self;
    this._m_target = _target;
    this._m_slowingRadius = _slowingRadius;
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    // Initialize vectors and points
    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_arrivalForce = new Phaser.Math.Vector2(0.0, 0.0);

    // Get debug manager

    this._m_debugManager = Master.GetInstance().getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

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

    // Current Force
    
    let actualVelocity = controller.getVelocity();

    // Desire Force    

    let forceMagnitude = this._m_forceMagnitude;

    let desiredVelocity = this._m_v2_desiredVelocity;

    desiredVelocity.set
    (
      target.x - self.x, 
      target.y - self.y
    );

    this._m_distance = desiredVelocity.length();

    let slowingRadius = this._m_slowingRadius;

    let arrivalMultiplier = this._m_distance / slowingRadius;

    if(this._m_distance < slowingRadius) {
      desiredVelocity.setLength(forceMagnitude * arrivalMultiplier);
    } else {
      desiredVelocity.setLength(forceMagnitude);
    }

    // Steer Force

    let steerForce = this._m_v2_arrivalForce;
   
    steerForce.copy(desiredVelocity).subtract(actualVelocity);   

    // Truncate force    

    steerForce.limit(forceMagnitude);

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
    
    // Get debug manager

    let debugManager = this._m_debugManager;

    // Get agent

    let sprite = this._m_self;

    // Get target

    let target = this._m_target;

     // Steering force line

     debugManager.drawLine(
      this._m_controller.getVelocity().x + sprite.x,
      this._m_controller.getVelocity().y + sprite.y,
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y + sprite.y,
      3,
      ST_COLOR_ID.kRed
    );

    // Desired Velocity line

    debugManager.drawLine(
      sprite.x,
      sprite.y,
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y + sprite.y,
      3,
      ST_COLOR_ID.kBlack
    );

    // Slowing radius circle
    debugManager.drawCircle(
      target.x,
      target.y,
      this._m_slowingRadius,
      2,
      ST_COLOR_ID.kPurple
    );

    if(this._m_distance < this._m_slowingRadius) {
      sprite.setTint(0x3D85C6);
    } else {
      sprite.clearTint();
    }
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
    this._m_self.clearTint();
    return;
  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_v2_arrivalForce = null;
    this._m_v2_actualVelocity = null;
    this._m_v2_desiredVelocity = null;

    this._m_debugManager = null;

    this._m_target = null;
    this._m_self = null;
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
  * Reference to the debug manager.
  */
  private _m_debugManager : DebugManager;

  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The force in Vector2.
   */
  private _m_v2_arrivalForce : V2;

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
   * Vector 2 for actual velocity.
   */
  private _m_v2_actualVelocity : V2;

  /**
   * Vector 2 for desired velocity.
   */
  private _m_v2_desiredVelocity : V2;

  /**
   * Distance to target.
   */
  private _m_distance : number;
}