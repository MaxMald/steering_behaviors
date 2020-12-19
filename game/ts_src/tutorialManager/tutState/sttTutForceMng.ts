import { ST_MANAGER_ID } from "../../commons/stEnums";
import { UIForceController } from "../../managers/uiManager/uiControllers/UIForceController";
import { UIManager } from "../../managers/uiManager/uiManager";
import { TutState } from "./tutState";

export class SttTutForceMng
extends TutState
{

  openBook()
  : void
  {  

    this._m_manager.m_infoBox.setBook("tutorial_force_manager");
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

    const uiManager = this._m_manager.m_master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    const forceManager = uiManager.getUIController("forceUI") as UIForceController;

    forceManager.subscribe
    (
      "forceChanged",
      "tut_force_mng",
      this.onForceChanged,
      this
    );

    return;

  }

  onForceChanged(_simulationManager: UIForceController, _args: any)
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

      this._m_manager.setActive("selectDrag");

      this._m_manager.openBook();

    }    

    return;

  }

  onExit()
  : void
  {

    // Unsubscribe

    const uiManager = this._m_manager.m_master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    const forceManager = uiManager.getUIController("forceUI") as UIForceController;

    forceManager.unsubscribe
    (
      "forceChanged",
      "tut_force_mng"
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