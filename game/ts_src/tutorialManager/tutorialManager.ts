/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Manage a set of tutorial states. 
 *
 * @file tutorialManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-17-2020
 */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { UIInfoBox } from "../managers/uiManager/uiControllers/UIInfoBox";
import { UIManager } from "../managers/uiManager/uiManager";
import { Master } from "../master/master";
import { TutState } from "./tutState/tutState";

/**
 * Manage a set of tutorial states.
 */
export class TutorialManager
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor(_master: Master, _scene: Phaser.Scene)
  {

    this.m_master = _master;
    this.m_scene = _scene;

    this._m_hStates = new Map<string, TutState>();
    this._m_activeState = new TutState();

    return;

  }

  /**
   * Call this function once after the scene was created. 
   */
  init()
  : void
  {

    // Get the UI Manager.

    const uiManger = this.m_master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    // Get the info box.

    this.m_infoBox = uiManger.getUIController("infoBox") as UIInfoBox;

    if(this.m_infoBox === undefined)
    {

      console.error("Info Box not founded.");

    }

    // Init() callback.

    this._m_hStates.forEach
    (
      function(_state: TutState)
      : void
      {

        _state.init(this);

        return;

      },
      this
    );

    return;

  }

  /**
   * Set the active state of the tutorial manager.
   * 
   * @param _key state key. 
   */
  setActive(_key: string)
  : void
  {

    if(this._m_hStates.has(_key))
    {

      let active = this._m_activeState;

      active.onExit();

      active = this._m_hStates.get(_key);

      active.onEnter();

      this._m_activeState = active;

    }

    return;

  }

  /**
   * Add a state to this tutorial manager.
   * 
   * @param _key state unique key. 
   * @param _state state.
   */
  addState(_key: string, _state: TutState)
  : void
  {

    this._m_hStates.set(_key, _state);
    
    return;

  }

  /**
   * Call the open book method of the active state.
   */
  openBook()
  : void
  {

    this._m_activeState.openBook();

    return;

  }

  /**
   * Safely destroy this object. Destroys all the tutStates attached to this 
   * manager.
   */
  destroy()
  : void
  {

    this._m_hStates.forEach
    (
      function(_value: TutState)
      : void
      {

        _value.destroy();

        return;

      }
    );

    this._m_hStates.clear();
    this._m_hStates = null;
    this._m_activeState = null;
    
    this.m_master = null;
    this.m_scene = null;
    this.m_infoBox = null;

    return;

  }
  
  /**
   * Reference to the master manager.
   */
  m_master: Master;

  /**
   * Reference to the active scene.
   */
  m_scene: Phaser.Scene;

  /**
   * Reference to the scene info box.
   */
  m_infoBox: UIInfoBox;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Map of tutorial states.
   */
  private _m_hStates: Map<string, TutState>;

  /**
   * The active state.
   */
  private _m_activeState: TutState;

}