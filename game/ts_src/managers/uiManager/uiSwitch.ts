/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiSwitch.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-09-2020
 */

import { Tilemaps } from "phaser";
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
    _isActive: boolean = true
  )
  {

    super();

    // Add Events

    this._m_listenerManager.addEvent('toggleOn');
    this._m_listenerManager.addEvent('toggleOff');

    // Create Button

    const button = _scene.add.image
    (
      _x,
      _y, 
      "game_art", 
      "toggle_off.png"
    );

    button.setInteractive();

    button.on('pointerdown', this._onClick, this);

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

    this._m_button.setFrame("toggle_on.png");

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

    this._m_button.setFrame("toggle_off.png");

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

  private _onClick()
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

    return;

  }

  private _isActive : boolean;

  private _m_button: Ty_Image;

 }