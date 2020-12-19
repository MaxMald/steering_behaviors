/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file simulationManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { MxListener } from "listeners/mxListener";
import { MxListenerManager } from "listeners/mxListenerManager";
import { BaseActor } from "../../actors/baseActor";
import { IActor } from "../../actors/iActor";
import { ST_MANAGER_ID, ST_SIM_SATE } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

/**
 * Simulation Manager.
 * Events:
 * 
 * * onSimulationStop:
 * * onSimulationPause:
 * * onSimulationStart:
 * * onSimulationResume:
 * * onDebugEnable:
 * * onDebugDisable:
 */
export class SimulationManager
implements IManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Create a simulation manager.
   */
  static Create()
  : SimulationManager
  {

    let manager = new SimulationManager();
    
    manager._m_listeners = new MxListenerManager<SimulationManager, any>();

    manager._m_listeners.addEvent("onSimulationStop");
    manager._m_listeners.addEvent("onSimulationPause");
    manager._m_listeners.addEvent("onSimulationStart");
    manager._m_listeners.addEvent("onSimulationResume");
    manager._m_listeners.addEvent("onDebugEnable");
    manager._m_listeners.addEvent("onDebugDisable");

    return manager;
  }
  
  /**
   * Initialize the Simulation Manager.
   */
  init()
  : void 
  {
    // TODO.
    return;
  }

  /**
   * Updates each actor in this simulation manager.
   * 
   * @param _dt delta time. 
   */
  update(_dt: number)
  : void 
  {

    this._m_actors.forEach
    (
      this._updateActor,
      this
    );

    return;

  }

  /**
   * Receive a message.
   * 
   * @param _id Message ID. 
   * @param _msg Message.
   */
  receive(_id: number, _msg: any)
  : void 
  {
    // TODO
    return;
  }

  /**
   * Send a Message to all actors in this simulation manager.
   * 
   * @param _id Message ID. 
   * @param _msg Message.
   */
  sendMessage(_id : number, _msg : any)
  : void
  {
    this._m_actors.forEach
    ( 
      function(_actor : IActor)
      : void
      {
        _actor.sendMessage(_id, _msg);
        return;
      },
      this
    );
    return;
  }

  setMasterManager(_master: Master)
  : void 
  {
    this._m_master = _master;
    return;
  }

  getID()
  : number 
  {
    return ST_MANAGER_ID.kSimManager;
  }

  /**
   * Get a base actor from this simulation manager. This method needs a type
   * of Wrapped object. Example:
   * 
   * * Ty_Sprite
   * * Ty_Image
   * * Ty_Font
   * 
   * If there is not an actor with the given name, an error will be thrown.
   * 
   * @param _name Actor name.
   * 
   * @returns BaseActor of the specified type.
   */
  getBaseActor<T>(_name : string)
  : BaseActor<T>
  {
    if(this._m_actors.has(_name))
    {
      let baseActor : BaseActor<T> = this._m_actors.get(_name) as BaseActor<T>;
      
      if(baseActor !== null)
      {
        return baseActor;
      }
      else
      {
        console.error('Could not cast base actor');
        return null;
      }
    }

    throw new Error("Could not find actor with name : " + _name);
  }

  /**
   * Adds a new actor to the simulation manager. If an actor with the same name
   * exists, it will be replaced.
   * 
   * @param _actor actor to add. 
   */
  addActor(_actor : IActor)
  : void
  {

    if(this._m_actors.has(_actor.getName()))
    {
      console.warn
      (
        'An actor with name : ' 
        + _actor.getName() 
        + ' had been replaced in the simulation manager.'
      );
    }

    this._m_actors.set(_actor.getName(), _actor);
    
    return;

  }

  /**
   * Creates the table of actors.
   */
  onPrepare()
  : void 
  {

    this._m_actors = new Map<string, IActor>();

    return;

  }

  /**
   * Called by Master when a game scene is been created.
   * @param _scene 
   */
  onSceneCreate(_scene: Phaser.Scene)
  : void
  {

    return;

  }

  /**
   * Called by Master when a game scene is been destroyed.
   * @param _scene 
   */
  onSceneDestroy(_scene: Phaser.Scene)
  : void
  {

    return;

  }

  onSimulationSceneCreate(_scene : Phaser.Scene)
  : void 
  {
    
    this._m_state = ST_SIM_SATE.kStopped;

    return;

  }

  /**
   * Clears the table of actors.
   * 
   * @param _scene scene to destroy. 
   */
  onSimulationSceneDestroy(_scene : Phaser.Scene)
  : void 
  {

    this._m_state = ST_SIM_SATE.kStopped;

    this.clear();

    return;

  }

  onSimulationStart()
  : void 
  {

    this._m_state = ST_SIM_SATE.kRunning;

    this._m_actors.forEach
    (
      function(_actor : IActor)
      {
        _actor.onSimulationStart();
        return;
      }
    );

    this._m_listeners.call("onSimulationStart", this, undefined);

    return;

  }

  onSimulationPause()
  : void 
  {

    this._m_state = ST_SIM_SATE.kPaused;

    this._m_actors.forEach
    (
      function(_actor : IActor)
      {
        _actor.onSimulationPause();
        return;
      }
    );

    this._m_listeners.call("onSimulationPause", this, undefined);

    return;

  }

  onSimulationResume()
  : void 
  {

    this._m_state = ST_SIM_SATE.kRunning;

    this._m_actors.forEach
    (
      function(_actor : IActor)
      {
        _actor.onSimulationResume();
        return;
      }
    );

    this._m_listeners.call("onSimulationResume", this, undefined);

    return;

  }

  /**
   * Called when the simulation stops.
   */
  onSimulationStop()
  : void 
  {

    this._m_state = ST_SIM_SATE.kStopped;

    this._m_actors.forEach
    (
      function(_actor : IActor)
      {
        _actor.onSimulationStop();
        return;
      }
    );

    this._m_listeners.call("onSimulationStop", this, undefined);

    return;

  }

  /**
   * Called by Master when the debug feature is enabled.
   */
  onDebugEnable()
  : void
  {
    
    this._m_actors.forEach
    (
      this._actorDebugEnable,
      this
    );

    this._m_listeners.call("onDebugEnable", this, undefined);

    return;
    
  }

  /**
   * Called by Master when the debug feature is disable.
   */
  onDebugDisable()
  : void
  {

    this._m_actors.forEach
    (
      this._actorDebugDisable,
      this
    );

    this._m_listeners.call("onDebugDisable", this, undefined);

    return;

  }

  /**
   * Destroy all the actors in this Manager, and clear the actors table.
   */
  clear()
  : void
  {
    this._m_actors.forEach
    (
      function(_actor : IActor)
      : void
      {
        _actor.destroy();
        return;
      }
    );

    this._m_actors.clear();
    return;
  }

  /**
   * Get the actual simulation state. Available states:
   * 
   * * Stopped: The simulation is stopped.
   * * Running: The simulation is running.
   * * Paused: The simulation is paused.
   */
  getState()
  : ST_SIM_SATE
  {

    return this._m_state;

  }

  subscribe
  (
    _event: string, 
    _username: string,
    _fn: (_simulationManager: SimulationManager, _args: any) => void,
    _context: any
  )
  : void
  {

    this._m_listeners.suscribe
    (
      _event, 
      _username,
      new MxListener<SimulationManager, any>(_fn, _context), 
    );

    return;

  }

  unsubscribe
  (
    _event: string,
    _username: string
  )
  : void
  {

    this._m_listeners.unsuscribe
    (
      _event,
      _username
    );

    return;

  }

  /**
   * Destroy all Actors in this Managers.
   */
  destroy()
  : void 
  {

    this.clear();    
    
    this._m_actors = null;

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Private constructor.
   */
  private constructor()
  {}

  /**
   * Update an actor.
   * 
   * @param _actor actor. 
   */
  private _updateActor(_actor : IActor)
  : void
  {
    _actor.update();
    return;
  }

  /**
   * Called when the debug had been enable.
   * 
   * @param _actor 
   */
  private _actorDebugEnable(_actor : IActor)
  : void
  {
    _actor.onDebugEnable();
    return;
  }

  /**
   * Called when the debug feature had been disable.
   * 
   * @param _actor 
   */
  private _actorDebugDisable(_actor : IActor)
  : void
  {
    _actor.onDebugDisable();
    return;
  }

  ///////////////////////////////////
  // Misc
  
  /**
   * Reference to the Master Manager.
   */
  private _m_master : Master;

  /**
   * Table of actors in this simulation manager.
   */
  private _m_actors : Map<string, IActor>;

  /**
   * The state of the simulation manager.
   */
  private _m_state: ST_SIM_SATE;

  /**
   * Listeners manager.
   */
  private _m_listeners: MxListenerManager<SimulationManager, any>;
}