/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file nullManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { Master } from "../master/master";
import { IManager } from "./iManager";

/**
 * Null service pattern.
 */
export class NullManager 
implements IManager
{  
  setMasterManager(_master: Master)
  : void 
  {
    console.warn('Null Manager : setMaster');
    return;
  }

  getID()
  : number 
  {
    console.warn('Null Manager : getID');
    return ST_MANAGER_ID.kUndefined;
  }
  
  onPrepare()
  : void 
  {
    console.warn('Null Manager : onPrepare');
    return;
  }

  init()
  : void 
  {
    console.warn('Null Manager : init');
    return;
  }

  update(_dt: number)
  : void 
  {
    console.warn('Null Manager : update');
    return;
  }
  
  receive(_id: number, _msg: any)
  : void 
  {
    console.warn('Null Manager : receive');
    return;
  }

  onSimulationSceneCreate(_scene : Phaser.Scene)
  : void 
  {
    console.warn('Null Manager : onGameSceneCreate');
    return;
  }

  onSimulationSceneDestroy(_scene : Phaser.Scene)
  : void 
  {
    console.warn('Null Manager : onGameSceneDestroy');
    return;
  }

  onSimulationStart()
  : void 
  {
    console.warn('Null Manager : onSimulationStart');
    return;
  }

  onSimulationPause()
  : void 
  {
    console.warn('Null Manager : onSimulationPause');
    return;
  }

  onSimulationResume()
  : void 
  {
    console.warn('Null Manager : onSimulationResume');
    return;
  }

  onSimulationStop()
  : void 
  {
    console.warn('Null Manager : onSimulationShutdown');
    return;
  }
  
  onDebugEnable()
  : void 
  {
    console.warn('Null Manager : onDebugEnable');
    return;
  }

  onDebugDisable(): void {
    console.warn('Null Manager : onDebugDisable');
    return;
  }

  destroy()
  : void 
  {
    console.warn('Null Manager : destroy');
    return;
  }  
}