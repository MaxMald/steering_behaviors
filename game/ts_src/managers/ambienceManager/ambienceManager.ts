/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file ambienceManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-04-2020
 */

import { ST_MANAGER_ID } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

export class AmbienceManager
implements IManager
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  init()
  : void 
  {
    
    return;

  }

  update(_dt: number)
  : void 
  {

    return;
  
  }

  receive(_id: number, _msg: any)
  : void 
  {

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

    return ST_MANAGER_ID.kAmbienceManager;
  
  }

  onPrepare()
  : void 
  {

    return; 

  }

  onSimulationSceneCreate(_scene: Phaser.Scene)
  : void 
  {

    return;
  
  }

  onSimulationSceneDestroy(_scene: Phaser.Scene)
  : void 
  {

    return;
  
  }

  onSimulationStart()
  : void 
  {

    return;

  }

  onSimulationPause()
  : void 
  {
    
    return;

  }

  onSimulationResume()
  : void 
  {

    return;
  
  }

  onSimulationStop()
  : void 
  {

    return;
  
  }

  onDebugEnable()
  : void 
  {

    return;
  
  }

  onDebugDisable()
  : void 
  {

    return;
  
  }

  destroy()
  : void 
  {

    this._m_master = null;

    return;
    
  }  

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_master: Master;

}