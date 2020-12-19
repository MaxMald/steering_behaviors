import { ST_MANAGER_ID } from "../../commons/stEnums";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { TutState } from "./tutState";

export class SttTutDebug
extends TutState
{

  openBook()
  : void
  {  

    this._m_manager.m_infoBox.setBook("tutorial_debugging");
    this._m_manager.m_infoBox.open();

    return;

  }

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
      "onDebugEnable", 
      "tut_debug", 
      this.onDebuggingChanged, 
      this
    );

    simManager.subscribe
    (
      "onDebugDisable", 
      "tut_debug", 
      this.onDebuggingChanged, 
      this
    );

    return;

  }

  onDebuggingChanged(_simulationManager: SimulationManager, _args: any)
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

  nextTut()
  : void
  {

    if(!this._m_dispatched)
    {

      this._m_dispatched = true;

      this._m_manager.setActive("forceMng");

      this._m_manager.openBook();

    }    

    return;

  }

  onExit()
  : void
  {

    // Get simulation manager.

    const simManager = this._m_manager.m_master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    // unsubscribe events.

    simManager.unsubscribe
    (
      "onDebugEnable", 
      "tut_debug"
    );

    simManager.unsubscribe
    (
      "onDebugDisable", 
      "tut_debug"
    );

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