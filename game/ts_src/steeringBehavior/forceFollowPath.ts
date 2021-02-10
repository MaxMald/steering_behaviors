/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceFollowPath.ts
 * @author Andrés Otoniel Sumano Hernández <andressumano@hotmail.com>
 * @since September-28-2020
 */

import { ST_COLOR_ID, ST_MANAGER_ID, ST_SIM_SATE, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { IForce } from "./iForce";
import { SeekForce } from "./forceSeek";
import { BaseActor } from "../actors/baseActor";
import { Master } from "../master/master";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { FollowPathInitState } from "./followPathInitState";

/**
 * 
 */
export class FollowPathForce
implements IForce
{
  
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  init
  (
    _self : BaseActor<Ty_Sprite>,
    _force : number,
    _radius : number,
    _looping ?: boolean
  )
  {

    this._m_self = _self;

    this._m_radius = _radius;

    this._m_v2_distance = new Phaser.Math.Vector2();
    this._m_forceToPath = new Phaser.Math.Vector2();
    this._m_prevPointPos = new Phaser.Math.Vector2();
    this._m_vToSelf = new Phaser.Math.Vector2();
    this._m_vPath = new Phaser.Math.Vector2();

    this._m_forceToPathScale = 1.0;

     // Get Managers

     const master = Master.GetInstance();

     this._m_simulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     this._m_followPathInitState = new FollowPathInitState();

     this._m_followPathInitState.m_initMaxMagnitude = _force;
     this._m_followPathInitState.m_initVisionRadius = _radius;
     this._m_followPathInitState.m_initForceToPathScale = this._m_forceToPathScale;

    // Get Debug Manager

    this._m_debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    // Looping

    if(_looping !== undefined)
    {

      this._m_looping = _looping;

    }
    else
    {

      this._m_looping = false;

    }

    // Create Seek.

    const seek = new SeekForce();

    this._m_seek = seek;

    seek.init
    (
      _self.getWrappedInstance(),
      undefined,
      _force
    );

    // Start node is undefined.

    this.setStartNode(undefined);
    
    return;

  }

  update(_dt: number)
  : void
  {

    let activeNode = this._m_activeNode;

    if(activeNode !== undefined)
    {

      // Get the distance between self and the target node.

      const self = this._m_self.getWrappedInstance();

      const target = activeNode.getWrappedInstance();

      const vDistance = this._m_v2_distance;

      vDistance.set
      (
        target.x - self.x,
        target.y - self.y
      );

      // Go to next node.

      const distance = vDistance.length();

      if(distance <= this._m_radius)
      {

        const nextNode = activeNode.getNext();

        if(nextNode === undefined)
        {

          if(this._m_looping)
          {

            this._setActiveNode(this._m_startNode);

            activeNode = this._m_startNode;

          }
          else
          {

            this._setActiveNode(undefined);

            activeNode = undefined;

          }

        }
        else
        {

          this._setActiveNode(nextNode);

          activeNode = nextNode;

        }

      }

      /****************************************************/
      /* Forces                                           */
      /****************************************************/      

      if(activeNode !== undefined)
      {

        // Seek Force

        this._m_seek.update(_dt);

        // Force to path.

        const vPath = this._m_vPath;

        const prevNodePos = this._m_prevPointPos;

        const nodeSprite = activeNode.getWrappedInstance();

        vPath.set
        (
          nodeSprite.x - prevNodePos.x,
          nodeSprite.y - prevNodePos.y
        );

        const toSelf = this._m_vToSelf;

        toSelf.set
        (
          self.x - prevNodePos.x,
          self.y - prevNodePos.y
        );

        // Calculate the projection magnitude.

        const projMagnitude = toSelf.dot(vPath) / vPath.length();

        // Shadow vector

        const forceToPath = this._m_forceToPath;

        forceToPath.copy(vPath);

        forceToPath.setLength(projMagnitude);

        // Calculate force to path.

        forceToPath.subtract(toSelf);

        forceToPath.scale(this._m_forceToPathScale);

        // Add force.

        this._m_controller.addSteerForce(forceToPath.x, forceToPath.y);

      }      

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

    ///////////////////////////////////
    // Path

    const firstNode = this._m_startNode;

    let activeNode = firstNode;
    let nextNode = firstNode.getNext();

    while(nextNode !== firstNode && nextNode !== undefined)
    {

      const activeSpr = activeNode.getWrappedInstance();
      const nextSpr = nextNode.getWrappedInstance();

      this._m_debugManager.drawLine
      (
        activeSpr.x,
        activeSpr.y,
        nextSpr.x,
        nextSpr.y,
        DebugManager.FORCE_LINE_WIDTH,
        ST_COLOR_ID.kWhite 
      );

      activeNode = nextNode;
      nextNode = activeNode.getNext();

    }

    this._m_debugManager.drawLine
      (
        activeNode.getWrappedInstance().x,
        activeNode.getWrappedInstance().y,
        this._m_startNode.getWrappedInstance().x,
        this._m_startNode.getWrappedInstance().y,
        DebugManager.FORCE_LINE_WIDTH,
        ST_COLOR_ID.kWhite 
      );

    ////////////////////////////////////
    // Seek Force

    this._m_seek.updateDebug(_dt);

    ///////////////////////////////////
    // Force to path

    const self = this._m_self.getWrappedInstance();

    const actualVelocity = this._m_controller.getVelocity();

    const forceToPath = this._m_forceToPath;

    this._m_debugManager.drawLine
    (
      self.x + actualVelocity.x,
      self.y + actualVelocity.y,
      self.x + actualVelocity.x + forceToPath.x,
      self.y + actualVelocity.y + forceToPath.y,
      DebugManager.FORCE_LINE_WIDTH,
      ST_COLOR_ID.kYellow 
    );

    // Radius of vision

    this._m_debugManager.drawCircle
    (
      self.x,
      self.y,
      this._m_radius,
      DebugManager.FORCE_CIRCLE_WIDTH,
      ST_COLOR_ID.kWhite
    );
    
    return;

  }

  setController(_controller: CmpForceController)
  : void 
  {

    this._m_controller = _controller;

    this._m_seek.setController(_controller);

    return;

  }

  /**
   * Called when the debugging feature had been enable.
   */
  onDebugEnable()
  : void 
  {
    
    this._m_seek.onDebugEnable();    

    return;

  }

  /**
   * Called when the debugging feature had been disable.
   */
  onDebugDisable()
  : void 
  {
    
    this._m_seek.onDebugDisable();

    return;

  }

  onSimulationStop()
  : void
  {
    this.setInitMaxMagnitude();
    this.setInitForceToPathScale();
    this.setInitVisionRadius();

    return;
  }

  /**
   * Get the type of this force.
   */
  getType()
  : number
  {

    return ST_STEER_FORCE.kFollowPath;

  }

  setInitMaxMagnitude()
  : void
  {
    this._m_seek.setInitMaxMagnitude();

    return;
  }

  setMaxMagnitude(_magnitude: number)
  : void
  {

    this._m_seek.setMaxMagnitude(_magnitude);

    return;

  }

  getInitMaxMagnitude()
  : number
  {
    return this._m_seek.getInitMaxMagnitude();
  }

  getMaxMagnitude()
  : number
  {

    return this._m_seek.getMaxMagnitude();

  }

  setInitForceToPathScale()
  : void
  {
    this._m_forceToPathScale = this.getInitForceToPathScale();

    return;
  }

  setForceToPathScale(_scale: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_followPathInitState.m_initForceToPathScale = _scale;
    }

    this._m_forceToPathScale = _scale;

    return;

  }

  getInitForceToPathScale()
  : number
  {
    return this._m_followPathInitState.m_initForceToPathScale;
  }

  getForceToPathScale()
  : number
  {

    return this._m_forceToPathScale;

  }

  getActualForce()
  : number
  {

    return this._m_seek.getActualForce();

  }

  /**
   * Set the start node.
   * 
   * @param _startNode 
   */
  setStartNode(_startNode: BaseActor<Ty_Sprite>)
  : void
  {

    this._m_startNode = _startNode;

    this._setActiveNode(_startNode);

    return;

  }

  setInitVisionRadius()
  : void
  {
    this._m_radius = this.getInitVisionRadius();

    return;
  }

  /**
   * Set the vision radius of this agent.
   * 
   * @param _radius vision radius. 
   */
  setVisionRadius(_radius: number)
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {
      this._m_followPathInitState.m_initVisionRadius = _radius;
    }

    this._m_radius = _radius;

    return;

  }

  getInitVisionRadius()
  : number
  {
    return this._m_followPathInitState.m_initVisionRadius;
  }

  /**
   * Get the radius of vision.
   */
  getVisionRadius()
  : number
  {

    return this._m_radius;

  }

  /**
   * Set the start node as the active node.
   */
  reset()
  : void
  {

    this._setActiveNode(this._m_startNode);

    return;

  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_self = null;
    this._m_startNode = null;
    this._m_debugManager = null;
    
    this._m_seek.destroy();

    this._m_v2_distance = null;
    this._m_prevPointPos = null;
    this._m_vToSelf = null;
    this._m_vPath = null;
    this._m_forceToPath = null;

    this._m_simulationManager = null;

    this._m_followPathInitState = null;
    
    return;

  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _setActiveNode(_node: BaseActor<Ty_Sprite>)
  : void
  {

    if(_node !== undefined)
    {

      // Set the previous node position.

      const nodeSprite = _node.getWrappedInstance();

      if(this._m_activeNode === undefined)
      {

        this._m_prevPointPos.set(nodeSprite.x, nodeSprite.y);

      }
      else
      {

        const activeNodeSprite = this._m_activeNode.getWrappedInstance();

        this._m_prevPointPos.set(activeNodeSprite.x, activeNodeSprite.y);

      }

      // Set seek target.

      this._m_activeNode = _node;

      this._m_seek.setTarget(_node.getWrappedInstance());

    }
    else
    {

      this._m_prevPointPos.set(0.0, 0.0);
      this._m_activeNode = undefined;
      this._m_seek.setTarget(undefined);

    }

    return;

  }

  /**
   * Reference to the force controller.
   */
  private _m_controller: CmpForceController;

  /**
   * The agent.
   */
  private _m_self : BaseActor<Ty_Sprite>;

  /**
   * The starting node.
   */
  private _m_startNode: BaseActor<Ty_Sprite>;

  /**
   * The active node.
   */
  private _m_activeNode: BaseActor<Ty_Sprite>;

  /**
   * The detection radius for switching targets in the path
   */
  private _m_radius : number;

  /**
   * Indicates if the target will loop over the node.
   */
  private _m_looping : boolean;

  /**
   * Seek Force.
   */
  private _m_seek : SeekForce;

  /**
  * Reference to the debug manager.
  */
  private _m_debugManager : DebugManager;

    /**
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;

  private _m_followPathInitState : FollowPathInitState;

  /**
   * Scale of the force to path.
   */
  private _m_forceToPathScale: number;

  /**
   * Force to path.
   */
  private _m_forceToPath: V2;

  /**
   * Vector 2 for distance to target.
   */
  private _m_v2_distance : V2;

  /**
   * The position of the previous point.
   */
  private _m_prevPointPos: V2;

  /**
   * Vector path.
   */
  private _m_vPath: V2;

  /**
   * Vector from the previous node position to self.
   */
  private _m_vToSelf: V2;
  
}
