/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-10-2020
 */

import { BaseActor } from "../../../actors/baseActor";
import { Ty_Image } from "../../../commons/stTypes";
import { Master } from "../../../master/master";
import { UIManager } from "../uiManager";

export class UIController
{

  /**
   * Update the UIController. Called by the UIManager.
   */
  update()
  : void
  {

    return;

  }

  /**
   * Set the active target of this UIController. Called by the UIManager.
   * 
   * @param _actor Active Target. 
   */
  setTarget(_actor: BaseActor<Ty_Image>)
  : void
  {

    return;

  }

  /**
   * Triggered whe the simulation had been start. Called by the UIManager.
   */
  onSimulationStart()
  : void 
  {

    return;

  }

  /**
   * Triggered whe the simulation had been pause. Called by the UIManager.
   */
  onSimulationPause()
  : void 
  {

    return;

  }

  /**
   * Triggered whe the simulation had been resume. Called by the UIManager.
   */
  onSimulationResume()
  : void 
  {

    return;

  }

  /**
   * Triggered whe the simulation had been stop. Called by the UIManager.
   */
  onSimulationStop()
  : void 
  {

    return;

  }

  setMasterManager(_masterManager: Master)
  : void
  {

    this.m_master = _masterManager;

    return;

  }

  setUIManager(_uiManager: UIManager)
  : void
  {

    this.m_uiManager = _uiManager;

    return;

  }

  destroy()
  : void
  {

    this.m_master = undefined;
    this.m_uiManager = undefined;

    return;
    
  }

  m_uiManager: UIManager;

  m_master: Master;

}