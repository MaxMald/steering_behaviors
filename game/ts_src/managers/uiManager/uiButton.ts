/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiButton.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-10-2020
 */


import { Point, Ty_Image, Ty_Text } from "../../commons/stTypes";
import { UILabel } from "./uiLabel";
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
    this._m_hoverScale = 1.1;
    this._m_pressedScale = 0.9;

    // Add events.

    this._m_listenerManager.addEvent("buttonPressed");
    this._m_listenerManager.addEvent("buttonReleased");
    this._m_listenerManager.addEvent("buttonOver");
    this._m_listenerManager.addEvent("buttonOverOut");

    // Set initial size.

    const contentSize = new Phaser.Geom.Point();

    this._m_contentSize = contentSize;

    this._m_buttonSize = new Phaser.Geom.Point();

    // Create button sprite.

    const button = _scene.add.nineslice
    (
      _x,
      _y,
      contentSize.x,
      contentSize.y,
      {
        key: _texture
      },
      [ 7 ]
    );

    // Set label tint

    this._m_buttonTint = 0xffffff;

    if(_buttonTint !== undefined)
    {

      this._m_buttonTint = _buttonTint;

    }

    // Set label tint

    button.setTint(this._m_buttonTint);

    // Set button interactive.

    button.setInteractive();

    // Set button label

    const label = UILabel.CreateStyleB
    (
      _x,
      _y,
      _scene,
      _label,
      _labelSize
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
  
    label.setAnchor(0.5, 0.9);

    this._m_buttonWidth = button.width;
    this._m_buttonHeight = button.height;

    // Button Phaser event listeners

    button.on('pointerdown', this._onButtonPressed, this);
    button.on('pointerup', this._onButtonReleased, this);
    button.on('pointerover', this._onButtonOver, this);
    button.on('pointerout', this._onButtonOverOut, this);

    this._m_button = button;  
    
    this._m_label = label;
    
    // Set padding to 0
    this.setPadding(0);

    this.setAnchor(0.5, 0.5);

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

    button.setPadding(10);

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

    button.setPadding(10);

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

    this._m_label.setPosition(_x, _y);

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

    this.updateButton();

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

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_button.setActive(true);
    this._m_button.setVisible(true);

    this._m_label.enable();
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

    this._m_label.disable();
    return;

  }

  /**
   * Generate space around an element's content, inside the box borders.
   * 
   * @param _all left, top, right and bottom padding 
   */
  setPadding(_all: number)
  : void;

  /**
   * Generate space around an element's content, inside the box borders. [Left -
   * Right, Top - Bottom].
   * 
   * @param _left_right left and right padding 
   * @param _top_bottom top bottom padding
   */
  setPadding(_left_right: number, _top_bottom: number)
  : void;

  /**
   * Generate space around an element's content, inside the box borders. [Left,
   * Top - Bottom, Right].
   * 
   * @param _left left padding 
   * @param _top_bottom top bottom padding
   * @param _right right padding
   */
  setPadding(_left: number, _top_bottom: number, _right: number)
  : void;

  /**
   * Generate space around an element's content, inside the box borders. [Left,
   * Top, Right, Bottom].
   * 
   * @param _left_right left and right padding 
   * @param _top_bottom top bottom padding
   */
  setPadding(_left_right: number, _top_bottom: number)
  : void;

  /**
   * Generate space around an element's content, inside the box borders. [Left,
   * Top, Right, Bottom].
   * 
   * @param _left left padding 
   * @param _top top padding
   * @param _right right padding
   * @param _bottom bottom padding
   */
  setPadding(_left: number, _top?: number, _right?: number, _bottom?: number)
  : void
  {

    if(_top === undefined)
    {

      this._m_paddingBottom = _left;
      this._m_paddingTop = _left;
      this._m_paddingLeft = _left;
      this._m_paddingRight = _left;

    }
    else if(_right === undefined)
    {

      this._m_paddingLeft = _left;
      this._m_paddingRight = _left;

      this._m_paddingTop = _top;
      this._m_paddingBottom = _top;

    }
    else if(_bottom === undefined)
    {

      this._m_paddingLeft = _left;

      this._m_paddingTop = _top;
      this._m_paddingBottom = _top;

      this._m_paddingRight = _right;

    }
    else
    {

      this._m_paddingLeft = _left;
      this._m_paddingTop = _top;
      this._m_paddingRight = _right;
      this._m_paddingBottom = _bottom;

    }

    this.updateButton();

    return;

  }

  /**
   * Update button size, resize button, and order elements.
   */
  updateButton()
  : void
  {
    this.updateButtonSize();

    this._resizeButton();

    return;
  }

  destroy()
  : void
  {
    this._m_button.destroy();

    this._m_label.destroy();

    this.destroy();
  }

  updateButtonSize()
  : void
  {
    const contentSize = this._m_contentSize;

    contentSize.setTo(0.0);

    const width = this._m_label.getWidth();

    const height = this._m_label.getHeight();
    
    contentSize.x = width;

    contentSize.y = height;

    // Update button size.

    const buttonSize = this._m_buttonSize;

    buttonSize.x = contentSize.x + this._m_paddingLeft + this._m_paddingRight;

    buttonSize.y = contentSize.y + this._m_paddingBottom + this._m_paddingTop;

    // Minimum size.

    if(buttonSize.x < this._m_buttonWidth)
    {
      buttonSize.x = this._m_buttonWidth;
    }

    if(buttonSize.y < this._m_buttonHeight)
    {
      buttonSize.y = this._m_buttonHeight;
    }

    return;

  }

  /****************************************************/
  /* Private Functions                                */
  /****************************************************/

  private _resizeButton()
  : void
  {
    const buttonSize = this._m_buttonSize;

    this._m_button.resize(buttonSize.x, buttonSize.y);
    
    return;
  }

  private _onButtonPressed()
  : void
  {
    
    this._m_label.setScale(this._m_pressedScale);
    
    this.updateButton();


    this._m_listenerManager.call("buttonPressed", this, undefined);

    return;
  }

  private _onButtonReleased()
  : void
  {

    this._m_label.setScale(this._m_originScale);
    
    this.updateButton();

    this._m_listenerManager.call("buttonReleased", this, undefined);

    return;
  }

  private _onButtonOver()
  : void
  {

    this._m_label.setScale(this._m_hoverScale);
    
    this.updateButton();

    this._m_listenerManager.call("buttonOver", this, undefined);

    return;
  }

  private _onButtonOverOut()
  : void
  {

    this._m_label.setScale(this._m_originScale);
    
    this.updateButton();

    this._m_listenerManager.call("buttonOverOut", this, undefined);

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  // UI background

  private _m_button : Phaser.GameObjects.RenderTexture;

  private _m_buttonTint : number;

  private _m_contentSize : Point;
  
  private _m_buttonSize : Point;
  
  private _m_label : UILabel;

  // Padding Properties

  private _m_paddingTop: number;

  private _m_paddingBottom: number;

  private _m_paddingLeft: number;

  private _m_paddingRight: number;

  // UI misc variables

  private _m_buttonWidth : number;

  private _m_buttonHeight : number;
  
  private _m_originScale : number;

  private _m_hoverScale : number;

  private _m_pressedScale : number;

}