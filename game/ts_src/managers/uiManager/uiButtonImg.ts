/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiButtonImg.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-20-2020
 */

import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";
 
 export class UIButtonImg
 extends UIObject
 {
   /**
    * @summary Contructor of a new image button.
    * 
    * @param _x The x position of the button.
    * @param _y The y position of the button.
    * @param _scene The scene where the button is gonna be created.
    * @param _idleFrame [optional] The idle frame name for the button.
    * @param _hoverFrame [optional] The hover frame name for the button.
    * @param _pressedFrame [optional] The pressed frame name for the button.
    * 
    * @event "buttonPressed" Triggered when the button is pressed.
    * @event "buttonReleased" Triggered when the button is released.
    * @event "buttonOver" Triggered when the cursor hovers the button.
    * @event "buttonOverOut" Triggered when the cursor no longer hovers the button.
    */
   constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _idleFrame ?: string | number,
    _hoverFrame ?: string | number,
    _pressedFrame ?: string | number
  )
  {

    super();

    // scale variables.

    this._m_originScale = 1;
    this._m_hoverScale = 1.1;
    this._m_pressedScale = 0.9;

    // Add events.

    this._m_listenerManager.addEvent("buttonPressed");
    this._m_listenerManager.addEvent("buttonReleased");
    this._m_listenerManager.addEvent("buttonOver");
    this._m_listenerManager.addEvent("buttonOverOut");

    // Save initial frames.

    this._m_idleFrame = "niceButton.png";
    this._m_hoverFrame = this._m_idleFrame;
    this._m_pressedFrame = this._m_idleFrame;

    // Check if frames have been passed on constructor.

    if(_idleFrame !== undefined)
    {
      this._m_idleFrame = _idleFrame;
    }

    if(_hoverFrame !== undefined)
    {
      this._m_hoverFrame = _hoverFrame;
    }

    if(_pressedFrame !== undefined)
    {
      this._m_pressedFrame = _pressedFrame;
    }

    // Create button sprite.

    const button = _scene.add.image
    (
      _x,
      _y,
      "game_art",
      this._m_idleFrame
    );

    // Set button interactive.
    
    button.setInteractive();

    // Button Phaser event listeners

    button.on('pointerdown', this._onButtonPressed, this);
    button.on('pointerup', this._onButtonReleased, this);
    button.on('pointerover', this._onButtonOver, this);
    button.on('pointerout', this._onButtonOverOut, this);

    // Save button sprite.

    this._m_button = button;

    // Set this UIButtonImg anchor to center.

    this.setAnchor(0.5, 0.5);

    return;

  }

  /**
   * @summary Constructor of default image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreateButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg(_x, _y, _scene);

    return button;
  }

  /**
   * @summary Constructor of play image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreatePlayButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "play_but_normal.png",
      "play_but_hover.png",
      "play_but_press.png"
    );

    return button;
  }

  /**
   * @summary Constructor of pause image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreatePauseButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "pause_but_normal.png",
      "pause_but_hover.png",
      "pause_but_press.png"
    );

    return button;
  }

  /**
   * @summary Constructor of stop image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreateStopButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "stop_but_normal.png",
      "stop_but_hover.png",
      "stop_but_press.png"
    );

    return button;
  }

  /**
   * @summary Constructor of combo image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreateComboButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "combo_but_normal.png",
      "combo_but_hover.png",
      "combo_but_press.png"
    );

    return button;
  }

  /**
   * @summary Constructor of debug image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreateDebugButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "debug_idle.png",
      "debug_hover.png",
      "debug_press.png"
    );

    return button;
  }

  /**
   * @summary Constructor of home image button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   *
   */
  static CreateHomeButtonImg
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
  )
  : UIButtonImg
  {

    // Create UIButtonImg.

    const button = new UIButtonImg
    (
      _x,
      _y,
      _scene,
      "home_idle.png",
      "home_hover.png",
      "home_press.png"
    );

    return button;
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
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_button.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_button.y;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_button.z;

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

  /**
   * Set the horizontal and vertical anchor (origin) of this UI Object.
   * 
   * @param _x The horizontal anchor (origin) of this UI Object.
   * @param _y The vertical anchor (origin) of this UI Object.
   */
  setAnchor(_x: number, _y: number)
  : void
  {

    this._m_button.setOrigin(_x, _y);

    return;

  }

  /**
   * The horizontal anchor (origin) of this UI Object.
   */
  getAnchorX()
  : number
  {

    return this._m_button.originX;

  }

  /**
   * The vertical anchor (origin) of this UI Object.
   */
  getAnchorY()
  : number
  {

    return this._m_button.originY;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_button.setActive(true);
    this._m_button.setVisible(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_button.setActive(false);
    this._m_button.setVisible(false);

    return;

  }

  setImage(_texture: string, _frame?: string | number)
  : void
  {

    this._m_button.setTexture(_texture, _frame);

    return;

  }

  destroy()
  : void
  {
    this._m_button.destroy();

    this.destroy();
  }

  /****************************************************/
  /* Private Functions                                */
  /****************************************************/

  private _onButtonPressed()
  : void
  {
    
    this._m_button.setScale(this._m_pressedScale);

    this._m_button.setFrame(this._m_pressedFrame);

    this._m_listenerManager.call("buttonPressed", this, undefined);

    return;
  }

  private _onButtonReleased()
  : void
  {

    this._m_button.setScale(this._m_originScale);

    this._m_button.setFrame(this._m_idleFrame);

    this._m_listenerManager.call("buttonReleased", this, undefined);

    return;
  }

  private _onButtonOver()
  : void
  {

    this._m_button.setScale(this._m_hoverScale);

    this._m_button.setFrame(this._m_hoverFrame);

    this._m_listenerManager.call("buttonOver", this, undefined);

    return;
  }

  private _onButtonOverOut()
  : void
  {

    this._m_button.setScale(this._m_originScale);

    this._m_button.setFrame(this._m_idleFrame);

    this._m_listenerManager.call("buttonOverOut", this, undefined);

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_button : Ty_Image;

  private _m_originScale : number;

  private _m_hoverScale : number;

  private _m_pressedScale : number;


  private _m_idleFrame : string | number;

  private _m_hoverFrame : string | number;
  
  private _m_pressedFrame : string | number;
 }