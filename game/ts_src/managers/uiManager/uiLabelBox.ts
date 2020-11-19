/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiLabelBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-18-2020
 */

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

    this._m_box = box;

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

    const label = _scene.add.bitmapText
    (
      _x,
      _y,
      font_key,
      _text,
      font_size
    );

    label.setTint(tint);

    label.setOrigin(0.0, 0.5);

    label.setLeftAlign();

    this._m_label = label;

    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_box.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_box.height;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_box.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_box.y;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_box.depth;

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

    this._m_label.x += _x;
    this._m_label.y += _y;

    this._m_box.x += _x;
    this._m_box.y += _y;

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

    this._m_box.setPosition(_x, _y);
    this._m_label.setPosition(_x, _y);

    return;

  }

  getAnchorX()
  : number
  {

    return this._m_box.originX;

  }

  getAnchorY()
  : number
  {

    return this._m_box.originY;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_box.setActive(true);
    this._m_box.setVisible(true);

    this._m_label.setActive(true);
    this._m_label.setVisible(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_box.setActive(false);
    this._m_box.setVisible(false);

    this._m_label.setActive(false);
    this._m_label.setVisible(false);

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
    this._m_box.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_label: Phaser.GameObjects.BitmapText;

  private _m_box: Phaser.GameObjects.Image;

}