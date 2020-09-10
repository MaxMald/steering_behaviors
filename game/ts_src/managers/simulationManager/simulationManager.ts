/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file simulationManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { BaseActor } from "../../actors/baseActor";
import { IActor } from "../../actors/iActor";
import { ST_MANAGER_ID } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

export class SimulationManager
implements IManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  update(_dt: number)
  : void 
  {
    throw new Error("Method not implemented.");
  }

  receive(_id: number, _msg: any)
  : void 
  {
    throw new Error("Method not implemented.");
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

  onPrepare()
  : void 
  {
    this._m_actors = new Map<string, IActor>();

    return;
  }

  onGameSceneCreate()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  onGameSceneDestroy()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  onSimulationStart()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  onSimulationPause()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  onSimulationResume()
  : void 
  {
    throw new Error("Method not implemented.");
  }

  onSimulationShutdown()
  : void 
  {
    this._m_actors.forEach
    (
      function(_actor : IActor)
      {
        
      }
    );
  }

  /**
   * Destroy all Actors in this Managers.
   */
  destroy()
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
    this._m_actors = null;

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the Master Manager.
   */
  private _m_master : Master;

  private _m_actors : Map<string, IActor>;
  
}