/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIDialogBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-19-2020
 */

import { UIBox } from "../uiBox";
import { UIImage } from "../uiImage";
import { UILabel } from "../uiLabel";
import { UIText } from "../uiText";
import { UIController } from "./UIController"

export class UIDialogBox
  extends UIController
{

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _title: string,
    _message: string,
    _imageTexture: string,
    _imageFrame?: string | number
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

    // Create Message Image.

    const image = new UIImage(0, 0, _scene, _imageTexture, _imageFrame);

    this._m_image = image;

    box.add(image);

    // Create Message.

    const message = UIText.CreateStyleB(0, 0, _scene, _message);

    this._m_message = message;

    box.add(message);

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

  setMessage(_msg: string)
  : void
  {

    this._m_message.setText(_msg);

    this._m_box.updateBox();

    return;

  }

  setImage(_texture: string, _frame?: number | string)
  : void
  {

    this._m_image.setImage(_texture, _frame);

    this._m_box.updateBox();

    return;

  }

  open()
  : void
  {

    return;

  }

  close()
  : void
  {

    return;

  }

  destroy()
  : void
  {

    this._m_box.destroy();

    this._m_box = null;
    this._m_message = null;
    this._m_image = null;
    this._m_title = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_box: UIBox;

  private _m_title: UILabel;

  private _m_image: UIImage;

  private _m_message: UIText;

}