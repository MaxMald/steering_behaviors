/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiText.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-19-2020
 */

import { UIObject } from "./uiObject";

/**
 * Display Messages with a Bitmap Text.
 * 
 * * Events:
 * 
 * * textChanged: triggered when the text of the label had been changed.
 */
export class UIText
  extends UIObject
{

  /**
   * Creates a multi-line text. The texture origin is set by (0.0, 0.5),
   * and the text is left aligned. 
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene
   * @param _text message.
   * @param _fontKey the key of the Bitmap Font.
   * @param _fontSize the size of the Bitmap Font.
   * @param _maxWidth  the maximum width of the Bitmap.
   */
  constructor
  (
    _x: number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _text: string,
    _fontKey: string,
    _fontSize: number,
    _maxWidth: number
  )
  {
    
    super();

    this._m_listenerManager.addEvent("textChanged");

    const text = _scene.add.bitmapText
    (
      _x,
      _y,
      _fontKey,
      _text,
      _fontSize
    );

    this._m_text = text;

    text.setMaxWidth(_maxWidth);

    return;

  }

  /**
   * Creates a multi-line text. The texture origin is set by (0.0, 0.5),
   * and the text is left aligned.
   * 
   * * Font Key: supercomputer
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene
   * @param _text message.
   * @param _fontSize the size of the Bitmap Font.
   * @param _maxWidth  the maximum width of the Bitmap.
   */
  static CreateStyleA
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string,
    _fontSize?: number,
    _maxWidth?: number
  )
  : UIText
  {

    let fontSize = 20;

    if(_fontSize !== undefined)
    {

      fontSize = _fontSize;

    }

    let maxWidth = 250;

    if(_maxWidth !== undefined)
    {

      maxWidth = _maxWidth;

    }

    const text = new UIText
    (
      _x,
      _y,
      _scene,
      _text,
      "supercomputer",
      fontSize,
      maxWidth
    );

    return text;

  }

  /**
   * Creates a multi-line text. The texture origin is set by (0.0, 0.5),
   * and the text is left aligned.
   * 
   * * Font Key: odin_rounded
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene
   * @param _text message.
   * @param _fontSize the size of the Bitmap Font.
   * @param _maxWidth  the maximum width of the Bitmap.
   */
  static CreateStyleB
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string,
    _fontSize?: number,
    _maxWidth?: number
  )
  : UIText
  {

    let fontSize = 20;

    if(_fontSize !== undefined)
    {

      fontSize = _fontSize;

    }

    let maxWidth = 250;

    if(_maxWidth !== undefined)
    {

      maxWidth = _maxWidth;

    }

    const text = new UIText
    (
      _x,
      _y,
      _scene,
      _text,
      "odin_rounded",
      fontSize,
      maxWidth
    );

    return text;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_text.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_text.height;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_text.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_text.y;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_text.depth;

  }

  setZ(_z : number)
  : void
  {

    this._m_text.setDepth(_z);

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

    this._m_text.x += _x;
    this._m_text.y += _y;

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

    this._m_text.setPosition(_x, _y);

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

    this._m_text.setOrigin(_x, _y);

    return;

  }

  /**
   * The horizontal anchor (origin) of this UI Object.
   */
  getAnchorX()
  : number
  {

    return this._m_text.originX;

  }

  /**
   * The vertical anchor (origin) of this UI Object.
   */
  getAnchorY()
  : number
  {

    return this._m_text.originY;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_text.setVisible(true);
    this._m_text.setActive(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_text.setVisible(false);
    this._m_text.setActive(false);

    return;

  }

  /**
   * Sets the maximum display width of this BitmapText in pixels.
   * 
   * @param _width maximum width in pixels. 
   */
  setMaxWidth( _width: number )
  : void
  {

    this._m_text.setMaxWidth(_width);

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

    this._m_text.setText(_text);

    this._m_listenerManager.call("textChanged", this, undefined);

    return;

  }

  /**
   * Set the tint of the BitmapFont.
   * 
   * @param _tint Hexadecimal color. 
   */
  setTint(_color: number)
  : void
  {

    this._m_text.setTint(_color);

    return;

  }

   /**
   * Set the lines of text in this BitmapText to be left-aligned. This only has
   * any effect if this BitmapText contains more than one line of text.
   */
  leftAlign()
  : void
  {

    this._m_text.setLeftAlign();

    return;

  }

  /**
   * Set the lines of text in this BitmapText to be right-aligned. This only has
   * any effect if this BitmapText contains more than one line of text.
   */
  rightAlign()
  : void
  {

    this._m_text.setRightAlign();

    return;

  }

  /**
   * Set the lines of text in this BitmapText to be center-aligned. This only
   * has any effect if this BitmapText contains more than one line of text.
   */
  centerAlign()
  : void
  {

    this._m_text.setCenterAlign();

    return;

  }

  destroy()
  : void
  {

    this._m_text.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_text : Phaser.GameObjects.BitmapText;

}