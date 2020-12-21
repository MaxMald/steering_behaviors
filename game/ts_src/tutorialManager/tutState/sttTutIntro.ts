import { ST_MANAGER_ID } from "../../commons/stEnums";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { TutState } from "./tutState";

export class SttTutIntro
extends TutState
{
  
  onEnter()
  : void
  {

    // Reset counter.

    this._m_counter = 0;

    // Reset timer event.

    this._m_activated_time = undefined;

    this._m_dispatched = false;

    ///////////////////////////////////
    // Subscribe to events.

    const simManager = this._m_manager.m_master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    simManager.subscribe
    (
      "onSimulationStop", 
      "tut_intro", 
      this.onSimulationChanged, 
      this
    );

    simManager.subscribe
    (
      "onSimulationStart", 
      "tut_intro", 
      this.onSimulationChanged, 
      this
    );

    simManager.subscribe
    (
      "onSimulationResume", 
      "tut_intro", 
      this.onSimulationChanged, 
      this
    );

    return;

  }

  openBook()
  : void
  {  

    this._m_manager.m_infoBox.setBook("tutorial_intro");
    this._m_manager.m_infoBox.open();

    return;

  }

  nextTut()
  : void
  {

    if(!this._m_dispatched)
    {

      this._m_dispatched = true;

      this._m_manager.setActive("debug");

      this._m_manager.openBook();

    }

    return;

  }

  onExit()
  : void
  {

    const simManager = this._m_manager.m_master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    simManager.unsubscribe
    (
      "onSimulationStop", 
      "tut_intro"
    );

    simManager.unsubscribe
    (
      "onSimulationStart", 
      "tut_intro"
    );

    simManager.unsubscribe
    (
      "onSimulationResume", 
      "tut_intro"
    );

    return;

  }

  onSimulationChanged(_simulationManager: SimulationManager, _args: any)
  : void
  {

    // Activate timer if it is not activated.

    if(this._m_activated_time === undefined)
    {

      this._m_activated_time = this._m_manager.m_scene.time.delayedCall
      (
        6000,
        this.nextTut,
        undefined,
        this
      );

    }

    // Add clicks counter.

    ++this._m_counter;

    if(this._m_counter >= 3)
    {

      this.nextTut();

    }

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Number of times the user had been clicked over the debug button.
   */
  private _m_counter: number;

  /**
   * An activated time event.
   */
  private _m_activated_time: Phaser.Time.TimerEvent;

  /**
   * Indicates if the callback function had been called.
   */
  private _m_dispatched: boolean;

}