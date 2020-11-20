/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceFolloPath.ts
 * @author Andrés Otoniel Sumano Hernández <andressumano@hotmail.com>
 * @since September-28-2020
 */

//import { Math } from "phaser";
import { BaseActor } from "../actors/baseActor";
import { ST_COLOR_ID, ST_MANAGER_ID, ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { DebugManager } from "../managers/debugManager/debugManager";
import { Master } from "../master/master";
import { IForce } from "./iForce";
import { SeekForce } from "./forceSeek";

/**
 * 
 */
export class FollowPathForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Seek Force.
   * 
   * @param _self The sprite of the agent.
   * @param _path The array of sprites to follow along.
   * @param _force The magnitude of the force.
   * @param _radius The detection radius of the path points 
   * @param _targetIndex [optional] if the target in path[] should start elsewhere of 0 
   * @param _looping [optional] If the actor should follow the path in a loop
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _path : Ty_Sprite[],
    _force : number,
    _radius : number,
    _controller : CmpForceController,
    _targetIndex ?: number,
    _looping ?: boolean
  )
  {
    // Set the private mambers
    this._m_self = _self;
    this.m_path = _path;
    this._m_force = _force;
    this.m_radius = _radius;
    this.m_looping = _looping;
    this.m_pathSize = _path.length;

    // Set the target at the start of path
    this.m_targetIndex = 0;
    // Get the target in path

    if(_targetIndex != null)
    {
      this.m_targetIndex = _targetIndex;
    }

    // Set the looping flag
    this.m_looping = false;
    if(_looping != null)
    {
      this.m_looping = _looping;
    }

    this._m_controller = _controller;

    // Get the debugManager
    this._m_debugManager = Master.GetInstance().getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    // Create the ForceSeek that will be used and altered by this

    this.m_seek = new SeekForce();
    this.m_seek.init(this._m_self, this.m_path[this.m_targetIndex], this._m_force);
    _controller.addForce('pathFollow' + this._m_self.name, this.m_seek);

    return;
  }


  setController(_controller: CmpForceController)
  : void 
  {
    this._m_controller = _controller;
    this.m_seek.setController(_controller);
    return;
  }

  update(_dt: number)
  : void 
  {
    // Get the array and target

    let self = this._m_self;

    let path : Ty_Sprite[] = this.m_path;

    let radius = this.m_radius;

    let size = path.length;

    let looping = this.m_looping;

    let seek = this.m_seek;

    let i : number = this.m_targetIndex;

    // Check distance to target

    let sqDist : number = new Phaser.Math.Vector2(self.x - path[i].x, self.x - path[i].x).lengthSq();

    if (sqDist < radius * radius){
      ++i;
      if(i >= size)
      {
        if (looping)
        {
          i = 0;
        }
        else
        {
          i = size - 1;
          //seek.destroy();
          //this.destroy();
        }
      }
      seek.setTarget(path[i]);
      this.m_targetIndex = i;
      //i = (i + 1) % (size - 1);
    }
    //seek.update(_dt);
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

    let path = this.m_path;

    let size = path.length;

    let radius = this.m_radius;

    // Debug only draws the path and node circles

    for (let i = 0; i < size; ++i)
    {
      debugManager.drawCircle(path[i].x, path[i].y, radius, 3, ST_COLOR_ID.kPurple);
      if (i < size - 1)
      {
        debugManager.drawLine(path[i].x, path[i].y,
                              path[i + 1].x ,path[i + 1].y, 3,
                              ST_COLOR_ID.kPurple);
      }
      else
      {
        debugManager.drawLine(path[i].x, path[i].y, path[0].x ,path[0].y, 3, 
                              ST_COLOR_ID.kPurple);
      }
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
    // TODO
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

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_debugManager = null;
    this.m_seek = null;

    this.m_path = null;
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
  private m_path : Ty_Sprite[];

  /**
   * Current target index in path[]
   */
  private m_targetIndex : number;

  /**
   * The detection radius for switching targets in the path
   */
  private m_radius : number;

  /**
   * If the actor will follow the path like a circuit
   */
  private m_looping : boolean;

  /**
   * The size of the path array
   */
  private m_pathSize : number;

  /**
   * Seek Force used internally
   */
  private m_seek : SeekForce;

  /**
  * Reference to the debug manager.
  */
 private _m_debugManager : DebugManager;
}
