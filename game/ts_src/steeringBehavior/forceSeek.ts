/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceSeek.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { ST_COLOR_ID, ST_MANAGER_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { Master } from "../master/master";
import { forceInitState } from "./forceInitState";
import { IForce } from "./iForce";

/**
 * 
 */
export class SeekForce
implements IForce
{  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Seek Force.
   * 
   * @param _self The sprite of the agent.
   * @param _target The sprite of the target.
   * @param _force The magnitude of the force.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _target : Ty_Sprite,
    _force : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;

    this._m_target = _target;
    
    this._m_seekMaxLength = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    this._m_seekForce = new Phaser.Math.Vector2();

    this._m_desireVelocity = new Phaser.Math.Vector2();

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    this._m_seekInitState = new forceInitState();
    // Get Debug Manager.

    this._m_debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    return;
  }

  setTarget(_newTarget: Ty_Sprite)
  : void 
  {
    this._m_target = _newTarget;
  }

  setMaxMagnitude(_magnitude: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_seekInitState.m_initMaxMagnitude = _magnitude;
    }
    this._m_seekMaxLength = _magnitude;

    return;

  }

  setInitMaxMagnitude()
  : void
  {
    this._m_seekMaxLength = this.getInitMaxMagnitude();

    return;
  }

  getMaxMagnitude()
  : number
  {

    return this._m_seekMaxLength;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_seekInitState.m_initMaxMagnitude;
  }

  getActualForce()
  : number
  {

    return this._m_seekForce.length();

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
    // Get the target object

    let target : Ty_Sprite = this._m_target;
   
    if(target !== undefined)
    {

      // Get self object

      let self : Ty_Sprite = this._m_self;
      
      // Get reference to force controller

      let forceController = this._m_controller;
      
      // Get actual velocity

      let actualVelocity = forceController.getVelocity();

      // Calculate desire velocity 
      
      let desireVelocity = this._m_desireVelocity;

      desireVelocity.set
      (
        target.x - self.x,
        target.y - self.y 
      );

      desireVelocity.setLength(this._m_seekMaxLength);

      // Calculate the seek force

      let seekForce = this._m_seekForce;
      
      seekForce.copy(desireVelocity);

      seekForce.subtract(actualVelocity);

      // Truncate the seek force if it exceeds the maximum length allowed.

      seekForce.limit(this._m_seekMaxLength);

      // Add force to the controller.

      forceController.addSteerForce(seekForce.x, seekForce.y);

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

    const self = this._m_self;

    const desireVelocity = this._m_desireVelocity;

    
    // Debug desire velocity.

    this._m_debugManager.drawLine
    (
      self.x,
      self.y,
      self.x + desireVelocity.x,
      self.y + desireVelocity.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kBlack
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

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kSeek;

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {
    // Detach objects

    this._m_controller = null;
    
    this._m_seekForce = null;

    this._m_desireVelocity = null;

    this._m_target = null;

    this._m_self = null;

    this._m_debugManager = null;

    this._m_seekInitState = null;

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
   * The seek force.
   */
  protected _m_seekForce : V2;

  /**
   * The desire velocity.
   */
  protected _m_desireVelocity : V2;

  /**
   * The max magnitude of the seek force.
   */
  protected _m_seekMaxLength : number;

  /**
   * The agent sprite.
   */
  protected _m_self : Ty_Sprite;

  /**
   * The target sprite.
   */
  protected _m_target : Ty_Sprite;
  

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

  private _m_seekInitState : forceInitState;
}