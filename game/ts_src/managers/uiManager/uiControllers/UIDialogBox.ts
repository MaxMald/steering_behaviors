/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIDialogBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-19-2020
 */

import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIController } from "./UIController"

export class UIDialogBox
  extends UIController
{

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _title: string
  )
  {
    
    super();

    // Create the box.

    const box = UIBox.CreateBorderBoxB(_x, _y, _scene);
    
    this._m_box = box;    

    // Create title.

    const title = UILabel.CreateH1(0, 0, _scene, _title);

    this._m_title = title;

    box.add(title);

    box.setCenterAlignment();

    return;

  }

  setTitle(_title: string)
  : void
  {

    this._m_title.setText(_title);

    this._m_box.updateBox();

    return;

  }
/*
  setMessage(_msg: string)
  : void
  {

    this._m_message.setText(_msg);

    this._m_box.updateBox();

    return;

  }
*/
/*
  setImage(_texture: string, _frame?: number | string)
  : void
  {

    this._m_image.setImage(_texture, _frame);

    this._m_box.updateBox();

    return;

  }
*/
  open()
  : void
  {

    this._m_box.enable();

    return;

  }

  close()
  : void
  {

    this._m_box.disable();

    return;

  }

  destroy()
  : void
  {

    this._m_box.destroy();

    this._m_box = null;
    this._m_title = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * The UI Box of the UI Dialog Box.
   */
  protected _m_box: UIBox;

  /**
   * The UI Dialog Box title.
   */
  protected _m_title: UILabel;

}