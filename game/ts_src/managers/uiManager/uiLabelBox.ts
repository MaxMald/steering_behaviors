/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiLabelBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-18-2020
 */

import { UIImage } from "./uiImage";
import { UILabel } from "./uiLabel";
import { UIObject } from "./uiObject";

/**
 * Display text in a single line inside a box.
 * 
 * Events:
 * 
 * * textChanged: triggered when the text of the label had been changed.
 */
export class UILabelBox
  extends UIObject
{

  constructor
  (
    _x : number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _text: string,
    _tint?: number,
    _boxTint?: number
  )
  {

    super();

    // Events

    this._m_listenerManager.addEvent("textChanged");

    // Box

    const box = _scene.add.image
    (
      _x, 
      _y, 
      "game_art",
      "text_box.png" 
    );

    this._m_bg = box;

    if(_tint !== undefined)
    {

      box.setTint(_boxTint);

    }

    box.setOrigin(0.0, 0.5);
    
    // Label

    let font_key : string = "odin_rounded";

    let font_size : number = 20;

    let tint = 0x000000;

    if(_tint !== undefined)
    {

      tint = _tint;

    }


    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_bg.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_bg.height;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_bg.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_bg.y;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_bg.depth;

  }

  /**
   * Move the UI Object an amount.
   * 
   * @param _x amount in x axis. 
   * @param _y amount in y axis.
   */
  move(_x: number, _y: number)
  : void
  {

    this._m_bg.x += _x;
    this._m_bg.y += _y;

    return;

  }

  /**
   * Set the position of the UI Object.
   * 
   * @param _x position in x axis. 
   * @param _y position in y axis.
   */
  setPosition(_x: number, _y: number)
  : void
  {

    this._m_bg.setPosition(_x, _y);
    this._m_label.setPosition(_x, _y);

    return;

  }

  getAnchorX()
  : number
  {

    return this._m_bg.originX;

  }

  getAnchorY()
  : number
  {

    return this._m_bg.originY;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_bg.setActive(true);
    this._m_bg.setVisible(true);

    this._m_label.enable();
    this._m_button.enable();

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_bg.setActive(false);
    this._m_bg.setVisible(false);

    this._m_label.disable();
    this._m_button.disable();

    return;

  }

  /**
   * Set the label text.
   * 
   * @param _text text. 
   */
  setText(_text: string)
  : void
  {

    this._m_label.setText(_text);

    this._m_listenerManager.call("textChanged", this, undefined);

    return;

  }

  destroy()
  : void
  {

    this._m_label.destroy();
    this._m_bg.destroy();
    this._m_button.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_label: UILabel;

  private _m_button: UIImage;

  private _m_bg: Phaser.GameObjects.Image;

}