/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file nullManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { IManager } from "./iManager";

/**
 * Null object pattern.
 */
export class NullManager 
implements IManager
{
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

  onGameSceneCreate()
  : void 
  {
    console.warn('Null Manager : onGameSceneCreate');
    return;
  }

  onGameSceneDestroy()
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

  onSimulationShutdown()
  : void 
  {
    console.warn('Null Manager : onSimulationShutdown');
    return;
  }

  destroy()
  : void 
  {
    console.warn('Null Manager : destroy');
    return;
  }  
}