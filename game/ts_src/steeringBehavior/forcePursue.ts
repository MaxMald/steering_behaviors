/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forcePursue.ts
 * @author Andrés Otoniel Sumano Hernández <andressumano@hotmail.com>
 * @since September-08-2020
 */

import { BaseActor } from "../actors/baseActor";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { Master } from "../master/master";
import { ForceInitState } from "./forceInitState";
import { IForce } from "./iForce";

/**
 * 
 */
export class PursueForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  init
  (
    _self : BaseActor<Ty_Sprite>,
    _target : BaseActor<Ty_Sprite>,
    _maxForceMagnitude : number
  )
  {
    // Init properties

    this._m_self = _self.getWrappedInstance();
    this._m_target = _target.getWrappedInstance();

    this._m_controller = _self.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );
    this._m_targetController = _target.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    this._m_maxForceMagnitude = _maxForceMagnitude;

    this._m_desireVelocity = new Phaser.Math.Vector2(); 

    this._m_targetPosition= new Phaser.Math.Vector2();

    this._m_selfPosition= new Phaser.Math.Vector2();

    this._m_vDistance = new Phaser.Math.Vector2();

    this._m_targetVelocity = new Phaser.Math.Vector2();

    this._m_steerForce = new Phaser.Math.Vector2();

    this._m_pursueInitState = new ForceInitState();

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

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
    // Get Sprites

    const target : Ty_Sprite = this._m_target;
    
    const self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    const selfController = this._m_controller;
    
    const targetController = this._m_targetController;

    /****************************************************/
    /* Prediction                                       */
    /****************************************************/

    const selfPos = this._m_selfPosition;

    selfPos.set(self.x, self.y);

    const targetPos = this._m_targetPosition;

    targetPos.set(target.x, target.y);

    // Calculate distance between target and self position.

    const vDistance = this._m_vDistance;

    vDistance.copy(targetPos);

    vDistance.subtract(selfPos);

    const distance = vDistance.length();

    // Calculate the future steps

    const steps = distance / selfController.getMaxSpeed();

    // Calculate future position.

    const targetVelocity = this._m_targetVelocity;

    targetVelocity.copy(targetController.getVelocity());

    targetVelocity.scale(steps);

    targetPos.add(targetVelocity);

    ///////////////////////////////////
    // Seek future position

    // Get actual velocity

    const actualVelocity = selfController.getVelocity();

    // Calculate desire velocity 
    
    const desireVelocity = this._m_desireVelocity;

    desireVelocity.set
    (
      targetPos.x - self.x,
      targetPos.y - self.y 
    );

    desireVelocity.setLength(this._m_maxForceMagnitude);

    // Calculate the seek force

    const seekForce = this._m_steerForce;
   
    seekForce.copy(desireVelocity);

    seekForce.subtract(actualVelocity);

    // Truncate the seek force if it exceeds the maximum length allowed.

    seekForce.limit(this._m_maxForceMagnitude);

    // Add force to the controller.

    selfController.addSteerForce(seekForce.x, seekForce.y);

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
    // Debug desire velocity.

    let self = this._m_self;

    let desireVelocity = this._m_desireVelocity;

    this._m_debugManager.drawLine
    (
      self.x,
      self.y,
      self.x + desireVelocity.x,
      self.y + desireVelocity.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kOrange
    );

    // Debug steer force.

    let actualVelocity = this._m_controller.getVelocity();

    this._m_debugManager.drawLine
    (
      self.x + actualVelocity.x,
      self.y + actualVelocity.y,
      self.x + desireVelocity.x,
      self.y + desireVelocity.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kRed 
    );

    // Debug predicted position

    this._m_debugManager.drawCircle
    (
      this._m_targetPosition.x,
      this._m_targetPosition.y,
      5,
      DebugManager.FORCE_CIRCLE_WIDTH,
      ST_COLOR_ID.kSkyBlueNeon 
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
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kPursue;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_pursueInitState.m_initMaxMagnitude;
  }

  getMaxMagnitude()
  : number
  {

    return this._m_maxForceMagnitude;

  }

  setInitMaxMagnitude()
  : void
  {
    this._m_maxForceMagnitude = this.getInitMaxMagnitude();

    return;
  }

  setMaxMagnitude(_maxMagnitude: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_pursueInitState.m_initMaxMagnitude = _maxMagnitude;
    }

    this._m_maxForceMagnitude = _maxMagnitude;

    return;

  }

  getActualForce()
  : number
  {

    return this._m_steerForce.length();

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_targetController = null;
    this._m_debugManager = null;

    this._m_desireVelocity = null;
    this._m_targetPosition = null;
    this._m_selfPosition = null;
    this._m_vDistance = null;
    this._m_targetVelocity = null;
    this._m_steerForce = null;

    this._m_target = null;
    this._m_self = null;

    this._m_pursueInitState = null;

    this._m_simulationManager = null;

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
   * Force Controller of the target.
   */
  private _m_targetController : CmpForceController;

  /**
   * The magnitude of the applied force.
   */
  private _m_maxForceMagnitude : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target sprite.
   */
  private _m_target : Ty_Sprite;  
  
  private _m_desireVelocity: V2; 

  private _m_targetPosition: V2;

  private _m_selfPosition: V2;

  private _m_vDistance: V2;

  private _m_targetVelocity: V2;

  private _m_steerForce: V2;
  
  /**
  * Reference to the debug manager.
  */
  private _m_debugManager : DebugManager;

    /**
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;

  private _m_pursueInitState : ForceInitState;
}
