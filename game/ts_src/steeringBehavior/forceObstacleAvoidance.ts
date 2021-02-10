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
    _avoidanceAhead : number,
    _obstaclesArray : Ty_Sprite[],
    _force : number,
    _controller ?: CmpForceController
  )
  {

    // Get variables

    this._m_self = _self;

    this._m_avoidanceAhead = _avoidanceAhead;
    
    this._m_obstaclesArray = _obstaclesArray;
    
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    // Initialize vectors and points

    this._m_v2_distanceToObstacle = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_avoidanceAhead = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_shadow = new Phaser.Math.Vector2(0.0, 0.0);
    
    this._m_v2_obstacleAvoidanceForce = new Phaser.Math.Vector2(0.0, 0.0);

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    this._m_obstacleAvoidanceInitState = new ObstacleAvoidanceInitState();

    this._m_obstacleAvoidanceInitState.m_initMaxMagnitude = _force;

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

    let actualVelocity = controller.getVelocity();

    let direction = controller.getDirection();

    // Distance in Vector2 between actor and obstacle

    let distanceToObstacle : V2 = this._m_v2_distanceToObstacle;

    // Avoidance ahead distance

    let avoidanceAhead = this._m_avoidanceAhead;

    // Avoidance ahead distance in  Vector2

    let avoidanceAheadVector2 = this._m_v2_avoidanceAhead;

    // Force magnitude

    let forceMagnitude = this._m_forceMagnitude;

    // Steering force

    let steerForce = this._m_v2_obstacleAvoidanceForce;

    let spriteToProjection : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    // Set steering force to zero to calculate avoidance of obstacles
    
    steerForce.set(0, 0);

    // Set the avoidance ahead Vector2

    avoidanceAheadVector2.copy(direction).scale(avoidanceAhead);

    // Iterate every obstacle in the array

    obstaclesArray.forEach(obstacle => 
    {

      // Distance to obstacle vector

      distanceToObstacle.set
      (
        obstacle.x - self.x,
        obstacle.y - self.y
      );

      // Calculate the projection magnitude.

      const projMagnitude = distanceToObstacle.dot
      (
        avoidanceAheadVector2
      ) / avoidanceAheadVector2.length();

      // Set the collision radius in relation to the display size

      let radius = obstacle.displayHeight > obstacle.displayWidth ?
      obstacle.displayHeight : obstacle.displayWidth;

      // Set the projection vector

      let projectionVector = this._m_v2_shadow;

      projectionVector.copy(avoidanceAheadVector2).setLength(projMagnitude);

      // Get the ahead vector magnitude

      let aheadMag = avoidanceAheadVector2.length();

      // On projection magnitude is in range of the ahead

      if(projMagnitude <= aheadMag + radius && projMagnitude >= -radius)
      {

        // Distance between projection and obstacle
        let obstacleToProjection = projectionVector.clone().subtract(distanceToObstacle);

        // On distance to projection is less than radius

        if(obstacleToProjection.length() < radius)
        {
          // On projection vector more threatening
          if
          (
            spriteToProjection.length() === 0 ||
            spriteToProjection.length() > projectionVector.length()
          )
          {

            // Set threatening vector
            spriteToProjection.copy(projectionVector);
            
            // Set the force vector
            let forceVector = obstacleToProjection.clone();

            avoidanceAheadVector2.set(
              avoidanceAheadVector2.x + self.x,
              avoidanceAheadVector2.y + self.y
            )
            
            forceVector.add(avoidanceAheadVector2);
            
            steerForce.add(forceVector);
          }
        }
      }
    });

    // Calculate the avoidance force

    steerForce.subtract(actualVelocity);

    // Truncate the avoidance force if it exceeds the maximum length allowed.
    
    steerForce.limit(forceMagnitude);

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

    let projectionVector : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    let desiredVelocity : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    let spriteToProjection : V2 = new Phaser.Math.Vector2(0.0, 0.0);

    let avoidanceAheadVector2 = new Phaser.Math.Vector2
    (
      Math.cos(sprite.rotation),
      Math.sin(sprite.rotation)
    );
    
    // Set the avoidance ahead Vector2

    avoidanceAheadVector2.scale(this._m_avoidanceAhead);

    // Avoidance ahead line
    this._m_debugManager.drawLine
    (
      sprite.x,
      sprite.y,
      sprite.x + avoidanceAheadVector2.x,
      sprite.y + avoidanceAheadVector2.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kPurple
    );

    // Iterate every obstacle in the array

    this._m_obstaclesArray.forEach(obstacle => 
    {

      // Distance to obstacle vector

      distanceToObstacle.set
      (
        obstacle.x - sprite.x,
        obstacle.y - sprite.y
      );

      // Calculate the projection magnitude.

      const projMagnitude = distanceToObstacle.dot
      (
        avoidanceAheadVector2
      ) / avoidanceAheadVector2.length();

      // Set the collision radius in relation to the display size

      let radius = obstacle.displayHeight > obstacle.displayWidth ?
      obstacle.displayHeight : obstacle.displayWidth;

      // Collision radius circle

      debugManager.drawCircle(
        obstacle.x,
        obstacle.y,
        radius,
        DebugManager.FORCE_CIRCLE_WIDTH,
        ST_COLOR_ID.kSkyBlueNeon
      );

      // Set the projection vector

      projectionVector.copy(avoidanceAheadVector2).setLength(projMagnitude);


      // Get the ahead vector magnitude

      let aheadMag = avoidanceAheadVector2.length();

      // On projection magnitude is in range of the ahead

      if(projMagnitude <= aheadMag + radius && projMagnitude >= -radius)
      {

        // Distance between projection and obstacle
        let obstacleToProjection = projectionVector.clone().subtract(distanceToObstacle);

        // On distance to projection is less than radius

        if(obstacleToProjection.length() < radius)
        {

          // On projection vector more threatening
          if
          (
            spriteToProjection.length() === 0 ||
            spriteToProjection.length() > projectionVector.length()
          )
          {

            // Set threatening vector
            spriteToProjection.copy(projectionVector);

            // Set the force vector
            let forceVector = obstacleToProjection.clone().add(avoidanceAheadVector2);

            // projection vector line
            this._m_debugManager.drawLine
            (
              sprite.x + avoidanceAheadVector2.x,
              sprite.y + avoidanceAheadVector2.y,
              sprite.x + forceVector.x,
              sprite.y + forceVector.y,
              DebugManager.FORCE_LINE_WIDTH,
              ST_COLOR_ID.kRed
            );

            desiredVelocity.add(forceVector);
          }
        }
      }
    });

    // Calculate the avoidance force

    desiredVelocity.subtract(this._m_controller.getVelocity());

    // Truncate the avoidance force if it exceeds the maximum length allowed.
    
    desiredVelocity.limit(this._m_forceMagnitude);
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
    this.setInitAvoidanceAhead();
    this.setInitMaxMagnitude();

    return;
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

  setInitAvoidanceAhead()
  : void
  {
    this._m_avoidanceAhead = this.getInitAvoidanceAhead();

    return;
  }

  setAvoidanceAhead(_distance: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_obstacleAvoidanceInitState.m_initAvoidanceAhead = _distance;
    }

    this._m_avoidanceAhead = _distance;

    return;

  }

  getInitAvoidanceAhead()
  : number
  {
    return this._m_obstacleAvoidanceInitState.m_initAvoidanceAhead;
  }

  getAvoidanceAhead()
  : number
  {

    return this._m_avoidanceAhead;

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
    this._m_v2_avoidanceAhead = null;

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
   * The ahead avoidance distance.
   */
  private _m_avoidanceAhead: number;

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
   * Vector 2 for avoidance ahead distance.
   */
  private _m_v2_avoidanceAhead : V2;

  /**
   * Vector 2 for shadow projection.
   */
  private _m_v2_shadow: V2;
  

  /**
   * Distance to target.
   */
  private _m_distance : number;
}