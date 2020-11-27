/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forcePursue.ts
 * @author Andrés Otoniel Sumano Hernández <andressumano@hotmail.com>
 * @since September-08-2020
 */

//import { Math } from "phaser";
import { BaseActor } from "../actors/baseActor";
import { ST_COLOR_ID, ST_MANAGER_ID, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { Master } from "../master/master";
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

  /**
   * Initialize the Seek Force.
   * 
   * @param _self The sprite of the agent.
   * @param _target The sprite of the target.
   * @param _force The magnitude of the force.
   * @param _predictionSteps How many steps/frames ahead to predict.
   * @param _targetForceCtrl The forceControler of the target.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _target : Ty_Sprite,
    _force : number,
    _predictionSteps : number,
    _targetForceCtrl : CmpForceController,
    _controller ?: CmpForceController
  )
  {
    // Set the private mambers
    this._m_self = _self;
    this._m_target = _target;
    this._m_force = _force;
    this._m_targetForceCtrl = _targetForceCtrl;
    this._m_predictionSteps = _predictionSteps;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    // Init the member vectors
    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_force = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_targetDir = new Phaser.Math.Vector2(0,0);

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
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    // Get target data

    let targetSpeed = this._m_targetForceCtrl.getSpeed();

    let maxSpeed = controller.getMaxSpeed();

    let actualVelocity = this._m_v2_actualVelocity; 

    let forceMagnitude = this._m_force;

    // Current Force

    actualVelocity.setTo(direction.x * speed, direction.y * speed);

    //Pursue force
    // Get target's direction
    let targetDir = this._m_targetDir;
    targetDir.copy(this._m_targetForceCtrl.getDirection());
    
    // Get more data to work with
    let predictionSteps = this._m_predictionSteps;
    
    let desiredVelocity = this._m_v2_desiredVelocity;
    
    // Same as Seek
    desiredVelocity.set
    (
      target.x - self.x, 
      target.y - self.y
    ); 

    // Dynamically ajusting how far ahead to predict based on distance to target
    let ajustedPrediction = desiredVelocity.length() / maxSpeed;

    // Add the pursue calculations to the seek
    desiredVelocity.add(targetDir.scale(predictionSteps * ajustedPrediction));
    desiredVelocity.scale(targetSpeed / desiredVelocity.length());
    // Steer Force

    let steerForce = this._m_v2_forceMagnitude;
   
    steerForce.set
    (
      desiredVelocity.x - actualVelocity.x, 
      desiredVelocity.y - actualVelocity.y
    );    

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
    let debugManager = this._m_debugManager;

    let pos = this._m_self;

    // Steering force line
    debugManager.drawLine(
      this._m_targetDir.x + pos.x,
      this._m_targetDir.y + pos.y,
      this._m_v2_actualVelocity.x + pos.x,
      this._m_v2_actualVelocity.y + pos.y,
      3,
      ST_COLOR_ID.kRed
    );

    // Force line
    debugManager.drawLine(
      pos.x,
      pos.y,
      this._m_v2_forceMagnitude.x + pos.x,
      this._m_v2_forceMagnitude.y + pos.y,
      3,
      ST_COLOR_ID.kBlue
    );

    // Desired Velocity Line
    debugManager.drawLine(
      pos.x,
      pos.y,
      this._m_targetDir.x + pos.x,
      this._m_targetDir.y + pos.y,
      3,
      ST_COLOR_ID.kBlack
    );

    // Target dir time steps circle
    let target = this._m_target;

    debugManager.drawCircle(
      target.x + this._m_targetDir.x,
      target.y + this._m_targetDir.y,
      5,
      2,
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

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kPursue;

  }

  getMaxMagnitude()
  : number
  {

    return this._m_force;

  }

  getActualForce()
  : number
  {

    return this._m_v2_forceMagnitude.length();

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_v2_desiredVelocity = null;
    this._m_targetDir = null;
    this._m_v2_actualVelocity = null;
    this._m_targetDir = null;
    this._m_v2_forceMagnitude = null;
    this._m_v2_force = null;
    this._m_debugManager = null;

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
  private _m_v2_force : V2;

  /**
   * The magnitude of the applied force.
   */
  private _m_force : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target sprite.
   */
  private _m_target : Ty_Sprite;

  /**
   * Actual velocity of the pursue agent.
   */
  private _m_v2_actualVelocity : V2;

  /**
   * Desired velocity of the pursue agent.
   */
  private _m_v2_desiredVelocity : V2;

 /**
   * The force in Vector2.
   */
  private _m_v2_forceMagnitude : V2;

  /**
   * ForceControler of the target.
   */
  private _m_targetForceCtrl : CmpForceController;

  /**
   * Velocity of the target.
   */
  private _m_targetDir : V2;

  /**
   * Prediction steps from the target.
   */
  private _m_predictionSteps : number;
  
    /**
  * Reference to the debug manager.
  */
 private _m_debugManager : DebugManager;
}
