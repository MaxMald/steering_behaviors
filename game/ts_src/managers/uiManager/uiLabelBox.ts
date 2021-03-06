/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Display text in a single line inside a box.
 * 
 * Events:
 * 
 * * textChanged: triggered when the text of the label had been changed.
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
 * * pointerdown: need to be interactive.
 * * pointerup: need to be interactive.
 * * pointerover: need to be interactive.
 * * pointerout: need to be interactive.
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

    const listenerManager = this._m_listenerManager;

    listenerManager.addEvent("textChanged");
    listenerManager.addEvent("pointerdown");
    listenerManager.addEvent("pointerup");
    listenerManager.addEvent("pointerout");
    listenerManager.addEvent("pointerover");

    // Init Properties

    this._m_paddingLeft = 10;

    // Label Background

    const bg = _scene.add.image
    (
      _x, 
      _y, 
      "game_art",
      "text_box.png" 
    );

    this._m_bg = bg;

    if(_boxTint !== undefined)
    {

      bg.setTint(_boxTint);

    }

    bg.setOrigin(0.0, 0.5);
    
    // Create UI Label

    const label = _scene.add.bitmapText
    (
      0,
      0,
      "odin_rounded",
      _text,
      20
    );

    label.setOrigin(0.0, 0.70);

    if(_tint !== undefined)
    {

      label.setTint(_tint);

    }
    else
    {

      label.setTint(0x000000);

    }

    this._m_label = label;

    // Update label.

    this._updateLabel();

    this._m_isInteractive = false;

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
   * Set the depth value.
   *  
   * @param _z depth value. 
   */
  setZ(_z: number)
  : void
  {

    this._m_bg.depth = _z;
    this._m_label.depth = _z;

    return;

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

    this._updateLabel();

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

    // Set Background position

    this._m_bg.setPosition(_x, _y);

    this._updateLabel();

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

    this._updateLabel();

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

    this._m_bg.setActive(false);
    this._m_bg.setVisible(false);

    this._m_label.setActive(false);
    this._m_label.setVisible(false);

    return;

  }

  setTextTint(_tint: number)
  : void
  {

    this._m_label.setTint(_tint);

    return;

  }

  setBoxTint(_tint: number)
  : void
  {

    this._m_bg.setTint(_tint);

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

  /**
   * Get the text of the label.
   */
  getText()
  : string
  {

    return this._m_label.text;

  }

  /**
   * Set the space between the background and the text.
   * 
   * @param _padding space (pixel).
   */
  setPaddingLeft(_padding: number)
  : void
  {

    this._m_paddingLeft = _padding;

    this._updateLabel();

    return;

  }

  /**
   * Active pointer events.
   */
  setInteractive()
  : void
  {

    if(!this._m_isInteractive)
    {

      this._m_isInteractive = true;

      const bg = this._m_bg;

      bg.setInteractive();

      // Pointer down

      bg.on
      (
        "pointerdown",
        function()
        {

          this._m_listenerManager.call("pointerdown", this, undefined);
          
          return;

        },
        this
      );

      // Pointer Up

      bg.on
      (
        "pointerup",
        function()
        {

          this._m_listenerManager.call("pointerup", this, undefined);
          
          return;

        },
        this
      );

      // Pointer Over

      bg.on
      (
        "pointerover",
        function()
        {

          this._m_listenerManager.call("pointerover", this, undefined);
          
          return;

        },
        this
      );

      // Pointer Out

      bg.on
      (
        "pointerout",
        function()
        {

          this._m_listenerManager.call("pointerout", this, undefined);
          
          return;

        },
        this
      );

    }

    return;

  }

  destroy()
  : void
  {

    this._m_label.destroy();
    this._m_label = null;

    this._m_bg.destroy();
    this._m_bg = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Re-position the label.
   */
  private _updateLabel()
  : void
  {

    const bg = this._m_bg;

    const x = bg.x - (bg.width * bg.originX) + this._m_paddingLeft;
    const y = bg.y - (bg.height * bg.originY) + (bg.height * 0.5);

    this._m_label.setPosition(x, y);

    return;

  }

  private _m_paddingLeft: number;
  
  private _m_label: Phaser.GameObjects.BitmapText;

  private _m_bg: Phaser.GameObjects.Image;

  /**
   * Indicates if the Label Box is interactive.
   */
  private _m_isInteractive: boolean;

}