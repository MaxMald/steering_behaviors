/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiButton.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-10-2020
 */


import { Ty_Image, Ty_Text } from "../../commons/stTypes";
import { UIObject } from "./uiObject";



export class UIButton
extends UIObject
{
  /**
   * @summary Constructor of a new button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _texture The texture name for the button.
   * @param _scene The scene where the button is gonna be created.
   * @param _label The text of the button.
   * @param _buttonTint [optional] The tint of the button in hexadecimal code.
   * @param _labelTint [optional] The label tint of the button in hexadecimal code.
   * @param _labelSize [optional] The label size of the button.
   * 
   *
   * @event "buttonPressed" Triggered when the button is pressed.
   * @event "buttonReleased" Triggered when the button is released.
   * @event "buttonOver" Triggered when the cursor hovers the button.
   * @event "buttonOverOut" Triggered when the cursor no longer hovers the button.
   * 
   */
  constructor
  (
    _x : number,
    _y : number,
    _texture : string,
    _scene : Phaser.Scene,
    _label : string,
    _buttonTint ?: number,
    _labelTint ?: number,
    _labelSize ?: number
  )
  {

    super();

    // scale variables.

    this._m_originScale = 1;
    this._m_hoverScale = 1.05;
    this._m_pressedScale = 0.95;

    // Add events.

    this._m_listenerManager.addEvent("buttonPressed");
    this._m_listenerManager.addEvent("buttonReleased");
    this._m_listenerManager.addEvent("buttonOver");
    this._m_listenerManager.addEvent("buttonOverOut");

    // Create button sprite.

    const button = _scene.add.nineslice
    (
      _x,
      _y,
      100,
      100,
      {
        key: _texture
      },
      [ 32 ]
    );

    // Set label tint

    let buttonTint = 0x000000;

    if(_buttonTint !== undefined)
    {

      buttonTint = _buttonTint;

    }

    // Set label tint

    button.setTint(_buttonTint);

    // Set button origin

    button.setOrigin(0.5);

    // Set button interactive.

    button.setInteractive();

    // Set button label

    const label = _scene.add.text
    (
      _x,
      _y,
      _label,
      {
        fontFamily : 'Arial',
        fontSize : _labelSize !== undefined ? _labelSize : 32
      }
    );

    // Set label tint

    let labeltint = 0x000000;

    if(_labelTint !== undefined)
    {

      labeltint = _labelTint;

    }

    // Set label tint

    label.setTint(labeltint);

    // Set label origin.
  
    label.setOrigin(0.5);

    // Resize the button

    button.resize(label.width, label.height);

    // Button Phaser event listeners

    button.on('pointerdown', this._onButtonPressed, this);
    button.on('pointerup', this._onButtonReleased, this);
    button.on('pointerover', this._onButtonOver, this);
    button.on('pointerout', this._onButtonOverOut, this);

    this._m_button = button;  

    this._m_label = label;

    return;
  }

  /**
   * @summary Constructor of default button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   * @param _label The text of the button.
   *
   */
  static createButton
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
    _label : string
  )
  : UIButton
  {
    const button = new UIButton(_x, _y, "niceButton", _scene, _label);

    return button;
  }

  /**
   * @summary Constructor of default color button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _scene The scene where the button is gonna be created.
   * @param _label The text of the button.
   * @param _buttonTint The tint of the button in hexadecimal code.
   *
   */
  static createColorButton
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
    _label : string,
    _buttonTint : number
  )
  : UIButton
  {
    const button = new UIButton(_x, _y, "niceButton", _scene, _label, _buttonTint);

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

    this._m_button.setPosition(_x, _y);

    this._m_label.setPosition(_x, _y);

    return;

  }

  getAnchorX()
  : number
  {

    return this._m_button.originX;

  }

  getAnchorY()
  : number
  {

    return this._m_button.originY;

  }

  destroy()
  : void
  {
    this._m_button.destroy();

    this._m_label.destroy();

    this.destroy();
  }

  _onButtonPressed()
  : void
  {
    this._m_button.setScale(this._m_pressedScale);
    this._m_label.setScale(this._m_pressedScale);
    this._m_listenerManager.call("buttonPressed", this, undefined);

    return;
  }

  _onButtonReleased()
  : void
  {

    this._m_button.setScale(this._m_originScale);
    this._m_label.setScale(this._m_originScale);
    this._m_listenerManager.call("buttonReleased", this, undefined);

    return;
  }

  _onButtonOver()
  : void
  {

    this._m_button.setScale(this._m_hoverScale);
    this._m_label.setScale(this._m_hoverScale);
    this._m_listenerManager.call("buttonOver", this, undefined);

    return;
  }

  _onButtonOverOut()
  : void
  {

    this._m_button.setScale(this._m_originScale);
    this._m_label.setScale(this._m_originScale);
    this._m_listenerManager.call("buttonOverOut", this, undefined);

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  private _m_button : Phaser.GameObjects.RenderTexture;

  private _m_label : Ty_Text;

  private _m_originScale : number;

  private _m_hoverScale : number;

  private _m_pressedScale : number;
}