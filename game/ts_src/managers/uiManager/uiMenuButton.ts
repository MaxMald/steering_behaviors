/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiMenuButton.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-10-2020
 */

import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";

/**
  * @event "buttonPressed" Triggered when the button is pressed.
  * @event "buttonReleased" Triggered when the button is released.
  * @event "buttonOver" Triggered when the cursor hovers the button.
  * @event "buttonOverOut" Triggered when the cursor no longer hovers the button.
*/
export class UIMenuButton
extends UIObject
{

  /**
   * * @event "buttonPressed" Triggered when the button is pressed.
   * * @event "buttonReleased" Triggered when the button is released.
   * * @event "buttonOver" Triggered when the cursor hovers the button.
   * * @event "buttonOverOut" Triggered when the cursor no longer hovers the button.
   * 
   * @param _x 
   * @param _y 
   * @param _scene 
   * @param _label 
   * @param _font_color 
   * @param _bg_texture 
   * @param _bg_frame 
   * @param _bg_fill_color 
   */
  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _label: string,
    _font_color: number,
    _bg_texture: string,
    _bg_frame: string,
    _bg_fill_color: number
  )
  {

    super();

    this._scene = _scene;

    // Create Events

    this._m_listenerManager.addEvent("buttonPressed");
    this._m_listenerManager.addEvent("buttonReleased");
    this._m_listenerManager.addEvent("buttonOver");
    this._m_listenerManager.addEvent("buttonOverOut");

    // Create Phaser Group

    const group = _scene.add.group();

    this._m_phaserGroup = group;

    ///////////////////////////////////
    // Background

    const bg = _scene.add.image
    (
      _x,
      _y,
      _bg_texture,
      _bg_frame
    );

    this._m_bg = bg;

    bg.setInteractive();

    bg.on('pointerdown', this._onPointerPressed, this);
    bg.on('pointerup', this._onPointerReleased, this);
    bg.on('pointerover', this._onPointerIn, this);
    bg.on('pointerout', this._onPointerOut, this);

    group.add(bg);

    ///////////////////////////////////
    // Background Fill

    const fill = _scene.add.image
    (
      _x,
      _y,
      "menu_art",
      "menu_btn_bg.png"
    );

    this._m_fillBG = fill;

    fill.setTint(_bg_fill_color);

    group.add(fill);

    ///////////////////////////////////
    // Background Fill Rect

    const rect = new Phaser.Geom.Rectangle(0, fill.height, fill.width, 0);

    this._m_cropRect = rect;

    fill.setCrop(rect);

    ///////////////////////////////////
    // Button Border

    const border = _scene.add.image
    (
      _x,
      _y,
      "menu_art",
      "menu_btn_border.png"
    );

    group.add(border);

    ///////////////////////////////////
    // Label

    const label = _scene.add.bitmapText
    (
      _x,
      _y - 4,
      "supercomputer",
      _label,
      30
    );

    label.setMaxWidth(bg.width * 0.8);

    label.setCenterAlign();

    label.setOrigin(0.5, 0.5);

    label.setTint(_font_color);

    this._m_label = label;

    group.add(label);

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

    this._m_phaserGroup.incXY(_x, _y);

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

    this.move
    (
      _x - this._m_bg.x,
      _y - this._m_bg.y
    );

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

    this._m_phaserGroup.setVisible(true);
    this._m_phaserGroup.setActive(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_phaserGroup.setVisible(false);
    this._m_phaserGroup.setActive(false);

    return;

  }

  /**
   * Safely destroys this manager.
   */
  destroy()
  : void
  {

    this._m_phaserGroup.destroy();
    this._m_phaserGroup = null;

    this._m_bg = null;
    this._m_fillBG = null;
    this._m_cropRect = null;
    this._m_label = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _onPointerPressed()
  : void
  {

    this._m_listenerManager.call("buttonPressed", this, undefined);

    return;

  }

  private _onPointerReleased()
  : void
  {

    this._m_listenerManager.call("buttonReleased", this, undefined);

    return;

  }

  private _onPointerOut()
  : void
  {

    // Remove out tween, if exists.

    let inTween = this._m_inTween;

    if(inTween !== undefined)
    {

      inTween.stop();
      this._m_inTween = undefined;

    }

    // Create In Tween.

    const rect = this._m_cropRect;
    const fill = this._m_fillBG;

    const outTween = this._scene.add.tween
    (
      {

        targets: rect,
        ease: "Power2",
        duration: UIMenuButton._ANIMATION_SPEED,
        repeat: 0,
        yoyo: false,

        y: {from: rect.y, to: fill.height},
        height: {from: rect.height, to: 0},        

        onUpdate: this._updateFillCrop,
        onUpdateScope: this,

        onComplete: function()
        {

          this._m_outTween = undefined;
          return;

        },
        onCompleteScope: this

      }
    );

    this._m_outTween = outTween;

    this._m_listenerManager.call("buttonOverOut", this, undefined);

    return;

  }

  private _onPointerIn()
  : void
  {
    // Remove out tween, if exists.

    let outTween = this._m_outTween;

    if(outTween !== undefined)
    {

      outTween.stop();
      this._m_outTween = undefined;

    }

    // Create In Tween.

    const rect = this._m_cropRect;
    const fill = this._m_fillBG;

    const inTween = this._scene.add.tween
    (
      {

        targets: rect,
        ease: "Sine.easeIn",
        duration: UIMenuButton._ANIMATION_SPEED,
        repeat: 0,
        yoyo: false,

        y: {from: rect.y, to: 0},
        height: {from: rect.height, to: fill.height},        

        onUpdate: this._updateFillCrop,
        onUpdateScope: this,

        onComplete: function()
        {

          this._m_inTween = undefined;
          return;

        },
        onCompleteScope: this

      }
    );

    this._m_inTween = inTween;

    // Callback

    this._m_listenerManager.call("buttonOver", this, undefined);

    return;

  }

  private _updateFillCrop()
  {

    this._m_fillBG.setCrop(this._m_cropRect);

    return;

  }

  private static _ANIMATION_SPEED: number = 100;

  private _scene: Phaser.Scene;

  private _m_inTween: Phaser.Tweens.Tween;

  private _m_outTween: Phaser.Tweens.Tween;
  
  private _m_bg: Ty_Image;

  private _m_fillBG: Ty_Image;

  private _m_cropRect: Phaser.Geom.Rectangle;

  private _m_label: Phaser.GameObjects.BitmapText;

  private _m_phaserGroup: Phaser.GameObjects.Group;

}