/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Apply a constant force to the Agent.
 *
 * @file forceConstant.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-30-2020
 */

import { ST_COLOR_ID, ST_MANAGER_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { Master } from "../master/master";
import { ForceInitState } from "./forceInitState";
import { IForce } from "./iForce";

/**
 * Apply a constant force to the Agent.
 */
export class ForceConstant
implements IForce
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Constant force that can have an absolute or relative direction.
   * 
   * @param _self self agent.
   * @param _forceDirection the direction of the force.
   * @param _forceMagnitude the maximum magnitude of the force.
   * @param _isRelative indicates if the force is relative to the agent's
   * direction. default: false.
   * @param _controller the force controller of the agent.
   */
  init
  (
    _self : Ty_Sprite,
    _forceDirection : V2,
    _forceMagnitude : number,
    _isRelative: boolean,
    _controller ?: CmpForceController
  )
  {

    this._m_self = _self;

    if(_controller !== undefined)
    {

      this._m_controller = _controller;
      
    }

    // Is the force direction relative to the agent direction?

    if(_isRelative !== undefined)
    {

      this._m_isRelative = _isRelative;
    
    }
    else
    {

      this._m_isRelative = false;

    }

    this._m_forceDirection = _forceDirection.normalize();

    this._m_desireVelocity = new Phaser.Math.Vector2();

    this._m_steerForce = new Phaser.Math.Vector2();

    this._m_forceMaxMagnitude = _forceMagnitude;

    

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    ///////////////////////////////////
    // Force State

    // Crear e inicializar las variables

    this._m_constantInitState = new ForceInitState();

    this._m_constantInitState.m_initMaxMagnitude = _forceMagnitude;

    // Get Debug Manager.

    this._m_debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    return;
  }

  setInitMaxMagnitude()
  : void
  {
    this._m_forceMaxMagnitude = this.getInitMaxMagnitude();

    return;
  }

  setMaxMagnitude(_magnitude: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_constantInitState.m_initMaxMagnitude = _magnitude;
    }
    this._m_forceMaxMagnitude = _magnitude;

    return;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_constantInitState.m_initMaxMagnitude;
  }

  getMaxMagnitude()
  : number
  {

    return this._m_forceMaxMagnitude;

  }

  getActualForce()
  : number
  {

    return this._m_steerForce.length();

  }

  setController(_controller: CmpForceController)
  : void 
  {
    // Save the force controller.

    this._m_controller = _controller;
    
    return;
  }

  update(_dt: number)
  : void 
  {    
    
    // Get self object

    const self : Ty_Sprite = this._m_self;
    
    // Get reference to force controller

    const forceController = this._m_controller;
    
    // Get actual velocity

    const actualDirection = forceController.getDirection();

    // Calculate desire velocity 
    
    const forceDirection = this._m_forceDirection;

    const desireVelocity = this._m_desireVelocity;

    if(this._m_isRelative)
    {

      const angle = forceDirection.angle();

      desireVelocity.copy(actualDirection);

      desireVelocity.rotate(angle);

    }
    else
    {

      desireVelocity.copy(forceDirection);

    }

    desireVelocity.setLength(this._m_forceMaxMagnitude);

    // Calculate steer force.

    const steerForce = this._m_steerForce;

    steerForce.copy(desireVelocity);

    const actualVelocity = forceController.getVelocity();

    steerForce.subtract(actualVelocity);

    steerForce.limit(this._m_forceMaxMagnitude);

    // Add steer force.

    forceController.addSteerForce(steerForce.x, steerForce.y);

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

    return;
  }

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kConstant;

  }

  /**
   * Set the constant force direction relative to the agent direction. 
   */
  setRelative()
  : void
  {

    this._m_isRelative = true;

    return;

  }

  /**
   * Set the constant force direction absolute.
   */
  setAbsolute()
  : void
  {

    this._m_isRelative = false;

    return;

  }

  /**
   * Indicates if the constant force direction is relative to the agent's
   * direction.
   */
  isRelative()
  : boolean
  {

    return this._m_isRelative;

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {
    // Detach objects

    this._m_controller = null;

    this._m_desireVelocity = null;

    this._m_forceDirection = null;

    this._m_self = null;

    this._m_debugManager = null;

    this._m_constantInitState = null;

    this._m_simulationManager = null;
    
    return;
    
  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
  
  /**
   * Reference to the force controller.
   */
  protected _m_controller : CmpForceController;

  ///////////////////////////////////
  // Physics properties

  /**
   * The desire velocity.
   */
  protected _m_desireVelocity : V2;

  /**
   * The direction of the constant force.
   */
  protected _m_forceDirection: V2;

  /**
   * The actual steer force.
   */
  protected _m_steerForce: V2;

  /**
   * The actual steer force multiplied by delta time.
   */
  protected _m_steerForceStepped: V2;

  /**
   * The max magnitude of the seek force.
   */
  protected _m_forceMaxMagnitude : number;

  /**
   * The agent sprite.
   */
  protected _m_self : Ty_Sprite;
  

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
    /**
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;

  private _m_constantInitState : ForceInitState;

  /**
   * Reference to the debug manager.
   */
  private _m_debugManager : DebugManager;

  /**
   * Indicates if the constant force is relative to the agent direction.
   */
  private _m_isRelative: boolean;

}