/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiSwitch.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-09-2020
 */

import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";

/**
 * Simple button with only two states (activated or deactivated).
 * 
 * Events:
 * 
 * * toggleOn: triggered when the switch had been activated.
 * * toggleOff: triggered when the switch had been deactivated.  
 */
export class UISwitch
 extends UIObject
 {

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene, 
    _isActive: boolean,
    _enable_texture: string,
    _enable_frame: string | number,
    _disable_texture: string,
    _disable_frame: string | number,
    _hover_texture: string,
    _hover_frame: string | number
  )
  {

    super();

    // Set properties

    this._m_enable_texture = _enable_texture;
    this._m_enable_frame = _enable_frame;
    this._m_disable_texture = _disable_texture;
    this._m_disable_frame = _disable_frame;
    this._m_hover_texture = _hover_texture;
    this._m_hover_frame = _hover_frame;

    // Add Events

    this._m_listenerManager.addEvent('toggleOn');
    this._m_listenerManager.addEvent('toggleOff');

    // Create Button

    const button = _scene.add.image
    (
      _x,
      _y, 
      _enable_texture, 
      _enable_frame
    );

    button.setInteractive();

    button.on('pointerdown', this._onPointerDown, this);
    button.on('pointerup', this._onPointerUp, this);
    button.on("pointerover", this._onPointerEnter, this);
    button.on("pointerout", this._onPointerOut, this);

    this._m_button = button;

    // Set init state

    if(_isActive)
    {

      this.setOn();

    }
    else
    {

      this.setOff();

    }   

    return;

  }

  /**
   * Activate the switch.
   */
  setOn()
  : void
  {

    this._m_button.setTexture
    (
      this._m_enable_texture,
      this._m_enable_frame
    );

    this._isActive = true;

    // Call Listeners

    this._m_listenerManager.call('toggleOn', this, undefined);

    return;

  }

  /**
   * Deactivate the switch.
   */
  setOff()
  : void
  {

    this._m_button.setTexture
    (
      this._m_disable_texture,
      this._m_disable_frame
    );

    this._isActive = false;

    // Call Listeners

    this._m_listenerManager.call('toggleOff', this, undefined);

    return;

  }

  /**
   * Check if the switch status is activate (true) or deactivate (false).
   */
  isActive()
  : boolean
  {

    return this._isActive;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_button.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_button.height;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_button.depth;

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

    this._m_button.x += _x;
    this._m_button.y += _y;

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

    this._m_button.setPosition(_x, _y);

    return;

  }

  destroy()
  : void
  {

    this._m_button.destroy();

    this.destroy();

    return;

  }

  private _onPointerDown()
  : void
  {

    this._m_button.setTexture
    (
      this._m_disable_texture,
      this._m_disable_frame
    );

    return;

  }

  private _onPointerUp()
  : void
  {

    if(this._isActive)
    {

      this.setOff();

    }
    else
    {

      this.setOn();

    }

    this._m_button.setTexture
    (
      this._m_hover_texture,
      this._m_hover_frame
    );

    return;

  }

  private _onPointerEnter()
  : void
  {

    this._m_button.setTexture
    (
      this._m_hover_texture,
      this._m_hover_frame
    );

    return;

  }

  private _onPointerOut()
  : void
  {

    if(this._isActive)
    {

      this._m_button.setTexture
      (
        this._m_enable_texture,
        this._m_enable_frame
      );

    }
    else
    {

      this._m_button.setTexture
      (
        this._m_disable_texture,
        this._m_disable_frame
      );

    }

    

    return;

  }

  private _isActive : boolean;

  private _m_button: Ty_Image;

  private _m_enable_texture: string;

  private _m_enable_frame: string | number;

  private _m_disable_texture: string;

  private _m_disable_frame: string | number;

  private _m_hover_texture: string;

  private _m_hover_frame: string | number;

 }