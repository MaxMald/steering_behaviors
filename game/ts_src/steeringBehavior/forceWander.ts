import { Vector } from "matter";
/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceArrival.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since September-16-2020
 */

import { DebugManager } from "../managers/debugManager/debugManager";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";
import { Master } from "../master/master";

/**
 * 
 */
export class WanderForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Arrival Force.
   * 
   * @param _self The sprite of the agent.
   * @param _targetDistance The target distance from the agent in relation of 
   * its actual velocity (direction).
   * @param _circleRadius The radius for target displacement from the wander 
   * distance value.
   * @param _displacementAngle The angle of displacement for the displacement 
   * vector every frame.
   * @param _angleChange The change factor for the displacement angle.
   * @param _force The magnitude of the force.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _targetDistance : number,
    _circleRadius : number,
    _displacementAngle : number,
    _angleChange : number,
    _force : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    
    this._m_targetDistance = _targetDistance;

    this._m_circleRadius = _circleRadius;

    this._m_displacementAngle = _displacementAngle;

    this._m_angleChange = _angleChange;
    
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_displacement = new Phaser.Math.Vector2(0.0, -1.0);

    this._m_v2p_circleCenter = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_master = Master.GetInstance();

    if(this._m_master.isDebugEnable())
    {
      this._m_debug = true;
    }

    // Get Debug Manager
    
    this._m_debugManager = this._m_master.getManager<DebugManager>
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
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    let maxSpeed = controller.getMaxSpeed();

    // Current Force
    
    let actualVelocity = this._m_v2_actualVelocity;

    actualVelocity.setTo(direction.x * speed, direction.y * speed);

    // Get position of center circle
    let circleCenter = this._m_v2p_circleCenter;
    
    circleCenter.copy(direction);

    circleCenter.scale(this._m_targetDistance);

    circleCenter.set(
      circleCenter.x + self.x,
      circleCenter.y + self.y
    );

    // Get displacement vector

    let displacement = this._m_v2_displacement;

    displacement.normalize();

    let circleRadius = this._m_circleRadius;

    displacement.scale(circleRadius);

    let displacementAngle = this._m_displacementAngle * Phaser.Math.DEG_TO_RAD;

    displacement.setAngle(displacementAngle);

    //this.setAngle(displacement, displacementAngle);

    let changeAngle = this._m_angleChange;

    displacementAngle += Math.random() * changeAngle - changeAngle * .5;

    // Desire Force    

    let forceMagnitude = this._m_forceMagnitude;

    let desiredVelocity = this._m_v2_desiredVelocity;

    circleCenter.add(displacement);

    desiredVelocity.set
    (
        circleCenter.x - self.x, 
        circleCenter.y - self.y
    );

    desiredVelocity.normalize();
    
    desiredVelocity.set(
        desiredVelocity.x * maxSpeed, 
        desiredVelocity.y * maxSpeed
    );

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

    if(this._m_debug)
    {
      this.updateDebug(_dt);
    }

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
    
    let debugManager = this._m_debugManager;

    let sprite = this._m_self;

    let direction = this._m_controller.getDirection();
    let targetDistanceVector = new Phaser.Math.Vector2(0.0, 0.0);

    targetDistanceVector.set(
      sprite.x + direction.x * this._m_targetDistance,
      sprite.y + direction.y * this._m_targetDistance,
    )

    debugManager.drawLine(
      sprite.x,
      sprite.y,
      targetDistanceVector.x,
      targetDistanceVector.y,
      3,
      ST_COLOR_ID.kPurple
    );

    debugManager.drawLine(
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y+ sprite.y,
      this._m_v2_actualVelocity.x + sprite.x,
      this._m_v2_actualVelocity.y + sprite.y,
      3,
      ST_COLOR_ID.kRed
    );

    debugManager.drawLine(
      sprite.x,
      sprite.y,
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y + sprite.y,
      3,
      ST_COLOR_ID.kBlack
    );

    debugManager.drawCircle(
      targetDistanceVector.x,
      targetDistanceVector.y,
      this._m_circleRadius,
      2,
      ST_COLOR_ID.kBlack
    );

    let displacementVector = new Phaser.Math.Vector2(targetDistanceVector.x, targetDistanceVector.y);

    displacementVector.add(this._m_v2_displacement);

    debugManager.drawLine(
    targetDistanceVector.x,
    targetDistanceVector.y,
    targetDistanceVector.x + displacementVector.x,
    targetDistanceVector.y + displacementVector.y,
    3,
    ST_COLOR_ID.kRed  
    );



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
    this._m_targetDistance = null;
    this._m_circleRadius = null;
    this._m_displacementAngle = null;
    this._m_angleChange = null;

    this._m_self = null;
    return;
  }

  setAngle(_vector : V2, _value : number)
  : void {
      let distance = _vector.length();
      _vector.set(
          Math.cos(_value) * distance,
          Math.sin(_value) * distance
      )
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_master : Master;

  /**
  * Indicates if the debug feature is enable.
  */
  private _m_debug : boolean;

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
  private _m_v2_forceMagnitude : V2;

  /**
   * The magnitude of the applied force.
   */
  private _m_forceMagnitude : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target distance from the agent in relation of its actual velocity (direction).
   */
  private _m_targetDistance : number;

  /**
   * The position of the target.
   */
  private _m_v2p_circleCenter : V2;

  /**
   * The radius for target displacement from the wander distance value.
   */
  private _m_circleRadius : number;

  /**
   * The angle of displacement for the displacement vector every frame.
   */
  private _m_displacementAngle : number;

  /**
   * The change factor for the displacement angle.
   */
  private _m_angleChange : number;

  /**
   * Vector 2 for actual velocity.
   */
  private _m_v2_actualVelocity : V2;

  /**
   * Vector 2 for desired velocity.
   */
  private _m_v2_desiredVelocity : V2;

  /**
   * Vector 2 for displacement.
   */
  private _m_v2_displacement : V2;

}