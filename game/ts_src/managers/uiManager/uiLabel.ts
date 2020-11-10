/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiLabel.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-10-2020
 */

import { ST_TEXT_TYPE } from "../../commons/stEnums";
import { UIObject } from "./uiObject";

/**
 * Display text in a single line.
 * 
 * Events:
 * 
 * * textChanged: triggered when the text of the label had been changed.
 */
export class UILabel
  extends UIObject
{

  constructor
  (
    _x : number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _text: string,
    _type?: ST_TEXT_TYPE,
    _tint?: number
  )
  {

    super();

    this._m_listenerManager.addEvent("textChanged");

    let font_key : string;

    let font_size : number;

    if(_type === undefined)
    {

      font_key = "supercomputer";
      font_size = 30;

    }
    else
    {

      switch(_type)
      {
        case ST_TEXT_TYPE.H1:

          font_key = "supercomputer";
          font_size = 36;

          break;

        case ST_TEXT_TYPE.H2:

          font_key = "odin_rounded";
          font_size = 24;

          break;

        case ST_TEXT_TYPE.Normal:

          font_key = "odin_rounded";
          font_size = 16;

          break;

        default:

          font_key = "odin_rounded";
          font_size = 16;

          break;
      }

    }

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

    label.setOrigin(0.5, 0.5);

    label.setCenterAlign();

    this._m_label = label;

    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_label.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_label.height;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_label.depth;

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

    this._m_label.setPosition(_x, _y);

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

    super.destroy();

    return;

  }

  private _m_label: Phaser.GameObjects.BitmapText;

}