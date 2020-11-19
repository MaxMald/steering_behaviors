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

/**
 * Horizontal slider that has a draggable handle to define a numeric value. It
 * have a minimum and maximum value.
 * 
 * Events:
 * 
 * * valueChanged: triggered when the numeric value of the slider had changed. 
 */
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

    // Add object events

    this._m_listenerManager.addEvent("valueChanged");

    const group = _scene.add.group();

    // Create UI images

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

    // Add UI Objects to group.

    group.add(this._m_bg);
    group.add(this._m_bar);
    group.add(this._m_button);

    this._m_group = group;

    // Set min and max values

    this._m_min = _min;
    
    this._m_max = _max;

    this._m_value = _min;

    // Update

    this._updateData();

    this.updateValue();

    return;

  }

  setValue(_value: number)
  : void
  {
    
    if(_value < this._m_min)
    {

      _value = this._m_min;
      
    }
    else if(_value > this._m_max)
    {

      _value = this._m_max;

    }

    this._m_value = _value;

    this.updateButton();

    return;

  }

  /**
   * Get the numeric value of the slider.
   */
  getValue()
  : number
  {

    return this._m_value;

  }

  /**
   * Updates the numeric value according to the position of the handle.
   */
  updateValue()
  : void
  {

    const dt: number = this._m_maxButtonX - this._m_minButtonX;

    const value: number = (this._m_button.x - this._m_minButtonX) / dt;

    const minX = this._m_min;

    this._m_value = minX + ((this._m_max - minX) * value);

    this._m_listenerManager.call("valueChanged", this, undefined);

    this._cropBar(value);

    return;

  }

  /**
   * Updates the position of the handle according to the numeric value.
   */
  updateButton()
  : void
  {

    const dt : number = this._m_max - this._m_min;

    const value: number = (this._m_value - this._m_min) / dt;

    const minX = this._m_minButtonX;

    const x = minX + ((this._m_maxButtonX - minX) * value);

    this._m_button.setX(x);

    this._cropBar(value);

    this._m_listenerManager.call("valueChanged", this, undefined);

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

    this._m_group.incXY(_x, _y);

    this._updateData();

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
    const bg = this._m_bg;

    const x = _x - bg.x;
    const y = _y - bg.y;

    this._m_group.incXY(x, y);

    const bar = this._m_bar;

    const bgWidth = bg.frame.width;
    const bgHeight = bg.frame.height;

    bar.x = bg.x - (bgWidth * bg.originX) + (bgWidth * 0.5);
    bar.y = bg.y - (bgHeight * bg.originY) + (bgHeight * 0.5);

    this._updateData();

    this.updateButton();

    return;

  }

  /**
   * Set the horizontal and vertical anchor (origin) of this UI Object.
   * 
   * @param _x The horizontal anchor (origin) of this UI Object.
   * @param _y The vertical anchor (origin) of this UI Object.
   */
  setAnchor(_x: number, _y: number)
  : void
  {

    this._m_bg.setOrigin(_x, _y);

    this._updateData();

    return;

  }

  /**
   * The horizontal anchor (origin) of this UI Object.
   */
  getAnchorX()
  : number
  {

    return this._m_bg.originX;

  }

  /**
   * The vertical anchor (origin) of this UI Object.
   */
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

    this._m_group.setVisible(true);
    this._m_group.setActive(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_group.setVisible(false);
    this._m_group.setActive(false);

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/  

  /**
   * Crop the bar according to a value in the range of 0.0 to 1.0.
   * 
   * @param _value value (0.0 - 1.0).
   */
  private _cropBar(_value: number)
  : void
  {

    const bar = this._m_bar;
    
    bar.setCrop
    (
      bar.frame.x,
      bar.frame.y,
      bar.frame.width * _value,
      bar.frame.height
    );

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

    const bg = this._m_bg;

    const x = bg.x - (bg.frame.width * bg.originX);

    const bar = this._m_bar;

    this._m_minButtonX = x;

    this._m_maxButtonX = x + bar.frame.width;

    return;

  }

  private _m_bg: Ty_Image;

  private _m_bar: Ty_Image;

  private _m_button: Ty_Image;

  private _m_group: Phaser.GameObjects.Group;

  private _m_value: number;

  private _m_max: number;

  private _m_min: number;

  private _m_minButtonX : number;

  private _m_maxButtonX : number;

}