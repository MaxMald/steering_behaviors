/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceObstacleAvoidance.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since October-30-2020
 */

import { Master } from "../master/master";
import { DebugManager } from "../managers/debugManager/debugManager";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { ForceInitState } from "./forceInitState";
import { ObstacleAvoidanceInitState } from "./obstacleAvoidanceInitState";

/**
 *
 */
export class ObstacleAvoidanceForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  init
  (
    _self : Ty_Sprite,
    _avoidanceRadius : number,
    _obstaclesArray : Ty_Sprite[],
    _force : number,
    _controller ?: CmpForceController
  )
  {

    // Get variables

    this._m_self = _self;

    this._m_avoidanceRadius = _avoidanceRadius;
    
    this._m_obstaclesArray = _obstaclesArray;
    
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    // Initialize vectors and points

    this._m_v2_distanceToObstacle = new Phaser.Math.Vector2(0.0, 0.0);
    
    this._m_v2_obstacleAvoidanceForce = new Phaser.Math.Vector2(0.0, 0.0);

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    this._m_obstacleAvoidanceInitState = new ObstacleAvoidanceInitState();

    this._m_obstacleAvoidanceInitState.m_initMaxMagnitude = _force;
    this._m_obstacleAvoidanceInitState.m_initAvoidanceRadius = _avoidanceRadius;

    // Get Debug Manager

    this._m_debugManager = Master.GetInstance().getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

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
  update(_dt : number)
  : void
  {

    // Get points

    let self : Ty_Sprite = this._m_self;

    // Get obstacles array

    let obstaclesArray : Ty_Sprite[] = this._m_obstaclesArray;

    // Get controller information

    let controller = this._m_controller;

    // Current force

    let actualVelocity = controller.getVelocity();

    // Distance in Vector2 between actor and obstacle

    let distanceToObstacle : V2 = this._m_v2_distanceToObstacle;

    // Avoidance radius

    let avoidanceRadius = this._m_avoidanceRadius;

    // Force magnitude

    let forceMagnitude = this._m_forceMagnitude;

    // Steering force

    let steerForce = this._m_v2_obstacleAvoidanceForce;

    // Set steering force to zero to calculate avoidance of obstacles
    
    steerForce.set(0, 0);

    // Iterate every obstacle in the array

    obstaclesArray.forEach(obstacle => {

      // Calculate distance between actor and obstacle

      this._m_distance = distanceToObstacle.set
      (
        self.x - obstacle.x,
        self.y - obstacle.y
      ).length();

      // On obstacle inside avoidance radius

      if(this._m_distance < avoidanceRadius) {

        steerForce.add(distanceToObstacle.setLength(forceMagnitude));
      }
    });

    // Calculate the avoidance force

    steerForce.subtract(actualVelocity);

    // Truncate the avoidance force if it exceeds the maximum length allowed.
    
    steerForce.limit(this._m_forceMagnitude);

    // Add force to the controller.

    controller.addSteerForce(steerForce.x, steerForce.y);


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

    // Get debug manager.

    let debugManager = this._m_debugManager;

    // Get agent.
    
    let sprite = this._m_self;

    // Debug desire velocity.

    let distanceToObstacle : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    let desiredVelocity : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_obstaclesArray.forEach(obstacle => {

      // Calculate distance between actor and obstacle

      

      let distance = distanceToObstacle.set
      (
        sprite.x - obstacle.x,
        sprite.y - obstacle.y
      ).length();

      // On obstacle inside avoidance radius

      if(distance < this._m_avoidanceRadius) {

        desiredVelocity.add(distanceToObstacle.setLength(this._m_forceMagnitude));
      }
    });

    // Calculate the avoidance force

    desiredVelocity.subtract(this._m_controller.getVelocity());

    // Truncate the avoidance force if it exceeds the maximum length allowed.
    
    desiredVelocity.limit(this._m_forceMagnitude);

    this._m_debugManager.drawLine
    (
      sprite.x,
      sprite.y,
      sprite.x + desiredVelocity.x,
      sprite.y + desiredVelocity.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kOrange
    );

    // Steering force line

    debugManager.drawLine
    (
     this._m_controller.getVelocity().x + sprite.x,
     this._m_controller.getVelocity().y + sprite.y,
     desiredVelocity.x + sprite.x,
     desiredVelocity.y + sprite.y,
     DebugManager.FORCE_LINE_WIDTH,
     ST_COLOR_ID.kRed
   );

    // Avoidance radius circle
    debugManager.drawCircle(
      sprite.x,
      sprite.y,
      this._m_avoidanceRadius,
      DebugManager.FORCE_CIRCLE_WIDTH,
      ST_COLOR_ID.kSkyBlueNeon
    );
  }

  /**
   * Called when the debug feature had been enable.
   */
  onDebugEnable()
  : void
  {

  }

  /**
   * Called when the debug feature had been disable.
   */
  onDebugDisable()
  : void
  {

  }

  onSimulationStop()
  :void
  {
    this.setInitAvoidanceRadius();
    this.setInitMaxMagnitude();

  }

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kObstacleAvoidance;

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
      this._m_obstacleAvoidanceInitState.m_initMaxMagnitude = _magnitude;
    }
    this._m_forceMagnitude = _magnitude;

    return;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_obstacleAvoidanceInitState.m_initMaxMagnitude;
  }

  getMaxMagnitude()
  : number
  {

    return this._m_forceMagnitude;

  }

  setInitAvoidanceRadius()
  : void
  {
    this._m_avoidanceRadius = this.getInitAvoidanceRadius();

    return;
  }

  setAvoidanceRadius(_radius: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_obstacleAvoidanceInitState.m_initAvoidanceRadius = _radius;
    }

    this._m_avoidanceRadius = _radius;

    return;

  }

  getInitAvoidanceRadius()
  : number
  {
    return this._m_obstacleAvoidanceInitState.m_initAvoidanceRadius;
  }

  getAvoidanceRadius()
  : number
  {

    return this._m_avoidanceRadius;

  }

  getActualForce()
  : number
  {

    return this._m_v2_obstacleAvoidanceForce.length();

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void
  {

    this._m_controller = null;
    this._m_v2_obstacleAvoidanceForce = null;
    this._m_v2_distanceToObstacle = null;

    this._m_debugManager = null;

    this._m_self = null;
    this._m_obstaclesArray.forEach(obstacle => {
      obstacle = null;
    });
    this._m_obstaclesArray = null;

    this._m_obstacleAvoidanceInitState = null;

    this._m_simulationManager = null;
    
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

  private _m_obstacleAvoidanceInitState : ObstacleAvoidanceInitState;

  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  
  /**
   * The obstacle avoidance radius.
   */
  private _m_avoidanceRadius: number;

  /**
   * Reference to the obstacles array.
   */
  private _m_obstaclesArray : Ty_Sprite[];

  /**
   * The magnitude of the applied force.
   */
  private _m_forceMagnitude : number;

  /**
   * The force in Vector2.
   */
  private _m_v2_obstacleAvoidanceForce : V2;

  /**
   * Vector 2 for distance to obstacle.
   */
  private _m_v2_distanceToObstacle : V2;

  /**
   * Distance to target.
   */
  private _m_distance : number;
}