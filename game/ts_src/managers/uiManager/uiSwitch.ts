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

  setOn()
  : void
  {

    this._m_button.setFrame("toggle_on.png");

    this._isActive = true;

    // Call Listeners

    this._m_listenerManager.call('toggleOn', this, undefined);

    return;

  }

  setOff()
  : void
  {

    this._m_button.setFrame("toggle_off.png");

    this._isActive = false;

    // Call Listeners

    this._m_listenerManager.call('toggleOff', this, undefined);

    return;

  }

  isActive()
  : boolean
  {

    return this._isActive;

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