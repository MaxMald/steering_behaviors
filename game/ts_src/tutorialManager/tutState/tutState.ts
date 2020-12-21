/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Tutorial Manager state.
 *
 * @file tutState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-17-2020
 */

import { TutorialManager } from "../tutorialManager";

/**
 * Tutorial manager state.
 */
export class TutState
{

  /**
   * Called by the tutorial manager when it is initialized.
   * 
   * @param _manager Tutorial manager. 
   */
  init(_manager: TutorialManager)
  : void
  {

    this._m_manager = _manager;

    return;

  }

  /**
   * Called when the machine had been enter in this state.
   */
  onEnter()
  : void
  {

    return;

  }

  /**
   * Called when the machine had been exit from this state.
   */
  onExit()
  : void
  {

    return;

  }

  /**
   * Open the tutorial state book.
   */
  openBook()
  : void
  {

    return;

  }

  destroy()
  : void
  {

    this._m_manager = null;

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the tutorial manager. 
   */
  protected _m_manager: TutorialManager;

}