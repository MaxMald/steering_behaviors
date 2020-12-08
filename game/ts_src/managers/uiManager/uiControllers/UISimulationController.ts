/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UISimulationController.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-24-2020
 */

import { ST_MANAGER_ID, ST_SIM_SATE } from "../../../commons/stEnums";
import { MapScene } from "../../../gameScene/mapScene";
import { Master } from "../../../master/master";
import { SimulationManager } from "../../simulationManager/simulationManager";
import { UIButtonImg } from "../uiButtonImg";
import { UIGroup } from "../uiGroup";
import { UIController } from "./UIController";

export class UISimulationController
extends UIController
{

  /**
   * @summary Constructor of a new empty simulator controller.
   * */
  constructor()
  {

    super();

    ////////////////////////////////////
    // UI

    // Create Group.

    this._m_group = new UIGroup();

    return;

  }

  /**
   * @summary Constructor of a default media simulation controller.
   */
  static CreateSimControlBox
  (
    _mapScene: MapScene
  )
  : UISimulationController
  { 

    // Create

    const simControlBox = new UISimulationController();

    // Get Master Manager

    simControlBox.m_master = Master.GetInstance();

    // Get Simulation Manager

    simControlBox._m_simulationManager 
    = simControlBox.m_master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    // Create UI

    const uiGroup = simControlBox._m_group;

    // Stop Button.

    const stopButton = _mapScene.getObject<UIButtonImg>("simStop");
    uiGroup.add(stopButton);

    stopButton.subscribe
    (
      "buttonReleased", 
      "UISimController",
      simControlBox._onSimulationStop,
      simControlBox
    );

    // play button

    const playButton = _mapScene.getObject<UIButtonImg>("simPlay");
    uiGroup.add(playButton);

    playButton.subscribe
    (
      "buttonReleased", 
      "UISimController",
      simControlBox._onSimulationPlay,
      simControlBox
    );

    // pause button image

    const pauseButton = _mapScene.getObject<UIButtonImg>("simPause");
    uiGroup.add(pauseButton);

    pauseButton.subscribe
    (
      "buttonReleased", 
      "UISimController",
      simControlBox._onSimulationPause,
      simControlBox
    );

    // Debug button

    const debugButton = _mapScene.getObject<UIButtonImg>("simDebug");
    uiGroup.add(debugButton);

    debugButton.subscribe
    (
      "buttonReleased", 
      "UISimController",
      simControlBox._onDebug,
      simControlBox
    );
    
    return simControlBox;

  }

  destroy()
  : void
  {

    this._m_simulationManager = null;

    this._m_group.destroy();
    this._m_group = null;

    super.destroy();

    return;

  }

  //****************************************************/
  /* Private                                          */
  /****************************************************/

  private _onSimulationPause()
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kRunning)
    {

      this.m_master.pauseSimulation();

    }   

    return;

  }

  private _onSimulationPlay()
  : void
  {

    const state = this._m_simulationManager.getState();

    if(state === ST_SIM_SATE.kStopped)
    {

      this.m_master.startSimulation();
      
    }
    else if(state === ST_SIM_SATE.kPaused)
    {

      this.m_master.resumeSimulation();

    }

    return;

  }

  private _onSimulationStop()
  : void
  {

    if( this._m_simulationManager.getState() !== ST_SIM_SATE.kStopped)
    {

      this.m_master.stopSimulation();

    }    

    return;

  }

  private _onDebug()
  : void
  {

    if(this.m_master.isDebugEnable())
    {

      this.m_master.disableDebugging();

    }
    else
    {

      this.m_master.enableDebugging();

    }

    return;

  }

  /**
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;
  
  // UI group

  private _m_group: UIGroup;
}