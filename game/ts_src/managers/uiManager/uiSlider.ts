/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiSlider.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-09-2020
 */

import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";

export class UISlider
  extends UIObject
{

  constructor
  (
    _x: number, 
    _y: number, 
    _scene : Phaser.Scene,
    _min: number,
    _max: number
  )
  {

    super();

    // Events

    this._m_listenerManager.addEvent("valueChanged");

    // UI

    this._m_bg = _scene.add.image
    (
      _x,
      _y,
      "game_art",
      "slider_bg.png"
    );

    this._m_bar = _scene.add.image
    (
      _x,
      _y,
      "game_art",
      "slider_bar.png"
    );

    const button = _scene.add.image
    (
      _x,
      _y,
      "game_art",
      "slider_button.png"
    );

    button.setInteractive();

    _scene.input.setDraggable(button);

    button.on("drag", this._onButtonDrag, this);

    this._m_button = button;

    // Set min and max

    this._m_min = _min;
    
    this._m_max = _max;

    this._m_value = _min;

    // Update

    this._updateData();

    this.updateValue();

    return;

  }

  updateBar()
  : void
  {

    return;

  }



  getValue()
  : number
  {

    return this._m_value;

  }

  updateValue()
  : void
  {

    const dt: number = this._m_maxButtonX - this._m_minButtonX;

    const value: number = (this._m_button.x - this._m_minButtonX) / dt;

    const minX = this._m_min;

    this._m_value = minX + ((this._m_max - minX) * value);

    this._m_listenerManager.call("valueChanged", this, undefined);

    return;

  }

  updateButton()
  : void
  {

    const dt : number = this._m_max - this._m_min;

    const value: number = (this._m_value - this._m_min) / dt;

    const minX = this._m_minButtonX;

    const x = minX + ((this._m_maxButtonX - minX) * value);

    this._m_button.setX(x);

    this._m_listenerManager.call("valueChanged", this, undefined);

    return;

  }

  private _onButtonDrag(_pointer, _dragX, _dragY)
  : void
  {

    this._setButtonX(_pointer.x);

    this.updateValue();

    return;

  }

  private _setButtonX(_x : number)
  : void
  {

    if(_x < this._m_minButtonX)
    {

      _x = this._m_minButtonX;

    }
    else if(_x > this._m_maxButtonX)
    {

      _x = this._m_maxButtonX;

    }

    this._m_button.setX(_x);

    return;

  }

  private _updateData()
  : void
  {

    const x = this._m_bg.x;

    const bar = this._m_bar;

    const barMaxHalfWidth = bar.frame.width * 0.5;

    this._m_minButtonX = x - barMaxHalfWidth;

    this._m_maxButtonX = x + barMaxHalfWidth;

    return;

  }

  private _m_bg: Ty_Image;

  private _m_bar: Ty_Image;

  private _m_button: Ty_Image;

  private _m_value: number;

  private _m_max: number;

  private _m_min: number;

  private _m_minButtonX : number;

  private _m_maxButtonX : number;

}