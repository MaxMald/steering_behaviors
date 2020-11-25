/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary A UI Box State performs the order in which the UI Objects will be
 * arranged. 
 *
 * @file uiBoxState.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-21-2020
 */

import { UIBox } from "../uiBox";

/**
 * A UI Box State performs the order in which the UI Objects will be arranged. 
 */
export class UIBoxState
{

  /**
   * 
   * @param _uiBox 
   */
  constructor(_uiBox: UIBox)
  {

    this.m_uiBox = _uiBox;

    return;

  }

  /**
   * Update order of the UI Objects.
   */
  update()
  : void
  {

    return;

  }

  /**
   * Set all the UI Objects center-aligned to the UI Box.
   */
  setCenterAlignment()
  : void
  {

    return;

  }

  /**
   * Set all the UI Objects left-aligned to the UI Box.
   */
  setLeftAlignment()
  : void
  {

    return;

  }

  /**
   * Set all the UI Objects right-aligned to the UI Box.
   */
  setRightAlignment()
  : void
  {

    return;

  }

  /**
   * Set all the UI Objects top-aligned to the UI Box.
   */
  setTopAlignment()
  : void
  {

    return;

  }

  /**
   * Set all the UI Objects bottom-aligned to the UI Box.
   */
  setBottomAlignment()
  : void
  {

    return;

  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void 
  {

    this.m_uiBox = null;

    return;

  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/  

  /**
   * Reference to the UI Box of this UI Box State.
   */
  protected m_uiBox : UIBox;

}