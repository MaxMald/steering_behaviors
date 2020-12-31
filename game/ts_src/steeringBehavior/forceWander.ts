/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceWander.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since September-16-2020
 */

import { Master } from "../master/master";
import { DebugManager } from "../managers/debugManager/debugManager";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { ForceInitState } from "./forceInitState";
import { WanderInitState } from "./wanderInitState";

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
    // Get variables

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

    // Initialize vectors and points
    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_wanderForce = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_displacement = new Phaser.Math.Vector2(0.0, -1.0);

    this._m_v2p_circleCenter = new Phaser.Math.Vector2(0.0, 0.0);

     // Get Managers

     const master = Master.GetInstance();

     this._m_simulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     this._m_wanderInitState = new WanderInitState();

     this._m_wanderInitState.m_initMaxMagnitude = _force;
     this._m_wanderInitState.m_initTargetDistance = _targetDistance;
     this._m_wanderInitState.m_initCircleRadius = _circleRadius;
     this._m_wanderInitState.m_initDisplacementAngle = _displacementAngle;
     this._m_wanderInitState.m_initAngleChange = _angleChange;

    // Get Debug Manager
    
    this._m_debugManager = Master.GetInstance().getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    return;
  }

  /**
   * Set the controller of this force.
   * 
   * @param _controller Force controller.
   */
  setController(_controller: CmpForceController)
  : void 
  {
    this._m_controller = _controller;
    return;
  }

  /**
   * Updates this force.
   * 
   * @param _dt delta time in seconds. 
   */
  update(_dt: number)
  : void 
  {
    // Get points
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    // Current Force
    
    let actualVelocity = controller.getVelocity();

    // Get position of center circle

    let circleCenter = this._m_v2p_circleCenter;
    
    circleCenter.copy(direction).scale(this._m_targetDistance);

    circleCenter.set(
      circleCenter.x + self.x,
      circleCenter.y + self.y
    );

    // Get displacement vector

    let displacement = this._m_v2_displacement;

    let circleRadius = this._m_circleRadius;

    displacement.setLength(circleRadius);

    let displacementAngle = this._m_displacementAngle;

    displacement.setAngle(displacementAngle * Phaser.Math.DEG_TO_RAD);

    // Set new angle in relation of the change angle factor

    let changeAngle = this._m_angleChange;

    this._m_displacementAngle += Math.random() * changeAngle - changeAngle * .5;

    // Desire Force    

    let forceMagnitude = this._m_forceMagnitude;

    let desiredVelocity = this._m_v2_desiredVelocity;

    desiredVelocity.set
    (
        circleCenter.x + displacement.x - self.x, 
        circleCenter.y + displacement.y - self.y
    );

    desiredVelocity.setLength(forceMagnitude);

    // Steer Force

    let steerForce = this._m_v2_wanderForce;
   
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

    // Sprite to circle center line

    let controller = this._m_controller;

    let circleCenter = new Phaser.Math.Vector2
    (
      Math.cos(sprite.rotation),
      Math.sin(sprite.rotation)
    );
    
    circleCenter.scale(this._m_targetDistance);

    debugManager.drawLine(
      sprite.x,
      sprite.y,
      circleCenter.x + sprite.x,
      circleCenter.y + sprite.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kPurple
    );

    // Steering force line

    debugManager.drawLine(
      this._m_controller.getVelocity().x + sprite.x,
      this._m_controller.getVelocity().y + sprite.y,
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y + sprite.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kRed
    );

    // Desired Velocity line

    debugManager.drawLine(
      sprite.x,
      sprite.y,
      this._m_v2_desiredVelocity.x + sprite.x,
      this._m_v2_desiredVelocity.y + sprite.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kOrange
    );

    // Circle center circle

    debugManager.drawCircle(
      circleCenter.x + sprite.x,
      circleCenter.y + sprite.y,
      this._m_circleRadius,
      DebugManager.FORCE_CIRCLE_WIDTH,
      ST_COLOR_ID.kSkyBlueNeon
    );

    let displacement = new Phaser.Math.Vector2(circleCenter);

    displacement.setLength(this._m_circleRadius);

    displacement.setAngle(this._m_displacementAngle * Phaser.Math.DEG_TO_RAD);

    // Displacement from circle center line

    debugManager.drawLine(
      circleCenter.x + sprite.x,
      circleCenter.y + sprite.y,
      circleCenter.x + sprite.x + displacement.x,
      circleCenter.y + sprite.y + displacement.y,
    DebugManager.FORCE_LINE_WIDTH,
    ST_COLOR_ID.kYellow  
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

  onSimulationStop()
  : void
  {
    this.setInitMaxMagnitude();
    this.setInitTargetDistance();
    this.setInitCircleRadius();
    this.setInitDisplacementAngle();
    this.setInitAngleChange();

    return;
  }

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kWander;

  }

  setInitMaxMagnitude()
  : void
  {
    this._m_forceMagnitude = this.getInitMaxMagnitude();

    return;
  }

  setMaxMagnitude(_magnitude: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_wanderInitState.m_initMaxMagnitude = _magnitude;
    }
    this._m_forceMagnitude = _magnitude;

    return;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_wanderInitState.m_initMaxMagnitude;
  }

  getMaxMagnitude()
  : number
  {

    return this._m_forceMagnitude;

  }

  setInitTargetDistance()
  : void
  {
    this._m_targetDistance = this.getInitTargetDistance();

    return;
  }

  setTargetDistance(_targetDistance :  number)
  : void
  {
    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_wanderInitState.m_initTargetDistance = _targetDistance;
    }

    this._m_targetDistance = _targetDistance;

    return;
  }

  getInitTargetDistance()
  : number
  {
    return this._m_wanderInitState.m_initTargetDistance;
  }

  getTargetDistance()
  : number
  {
    return this._m_targetDistance;
  }

  setInitCircleRadius()
  : void
  {
    this._m_circleRadius = this.getInitCircleRadius();

    return;
  }

  setCircleRadius(_circleRadius : number)
  : void
  {
    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_wanderInitState.m_initCircleRadius = _circleRadius;
    }

    this._m_circleRadius = _circleRadius;

    return;
  }

  getInitCircleRadius()
  : number
  {
    return this._m_wanderInitState.m_initCircleRadius;
  }

  getCircleRadius()
  : number
  {
    return this._m_circleRadius;
  }

  setInitDisplacementAngle()
  : void
  {
    this._m_displacementAngle = this.getInitDisplacementAngle();

    return;
  }

  setDisplacementAngle(_displacementAngle : number)
  : void
  {
    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_wanderInitState.m_initDisplacementAngle = _displacementAngle;
    }

    this._m_displacementAngle = _displacementAngle;

    return;
  }

  getInitDisplacementAngle()
  : number
  {
    return this._m_wanderInitState.m_initDisplacementAngle;
  }

  getDisplacementAngle()
  : number
  {
    return this._m_displacementAngle;
  }

  setInitAngleChange()
  : void
  {
    this._m_angleChange = this.getInitAngleChange();

    return;
  }

  setAngleChange(_angleChange : number)
  : void
  {
    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_wanderInitState.m_initAngleChange = _angleChange;
    }

    this._m_angleChange = _angleChange;

    return;
  }

  getInitAngleChange()
  : number
  {
    return this._m_wanderInitState.m_initAngleChange;
  }

  getAngleChange()
  : number
  {
    return this._m_angleChange;
  }

  getActualForce()
  : number
  {

    return this._m_v2_wanderForce.length();

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_v2_wanderForce = null;
    this._m_v2_actualVelocity = null;
    this._m_v2_desiredVelocity = null;
    this._m_v2_displacement = null;
    this._m_v2p_circleCenter = null;

    this._m_debugManager = null;

    this._m_wanderInitState = null;

    this._m_simulationManager = null;

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
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;

  private _m_wanderInitState : WanderInitState;

  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The force in Vector2.
   */
  private _m_v2_wanderForce : V2;

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