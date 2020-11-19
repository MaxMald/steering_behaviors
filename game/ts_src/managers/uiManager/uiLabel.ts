/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Display text in a single line.
 *
 * @file uiLabel.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-10-2020
 */

import { UIObject } from "./uiObject";

/**
 * Display text in a single line.
 * 
 * Events:
 * 
 * * textChanged: triggered when the text of the label had been changed.
 */
export class UILabel
  extends UIObject
{

  /**
   * Creates a text in a single line. The texture origin is set by (0.0, 0.5),
   * and the text is left aligned. 
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _text label text.
   * @param _font_key Bitmap text key.
   * @param _font_size Bitmap text size.
   * @param _tint Bitmap texture tint.
   */
  constructor
  (
    _x : number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _text: string,
    _font_key?: string,
    _font_size?: number,
    _tint?: number
  )
  {

    super();

    this._m_listenerManager.addEvent("textChanged");

    // Font Key

    let font_key : string = "odin_rounded";    
    
    if(_font_key !== undefined)
    {

      font_key = _font_key;

    }

    // Font Size

    let font_size : number = 20;

    if(_font_size !== undefined)
    {

      font_size = _font_size;

    }

    // Font tint
    
    let tint = 0x000000;

    if(_tint !== undefined)
    {

      tint = _tint;

    }

    const label = _scene.add.bitmapText
    (
      _x,
      _y,
      font_key,
      _text,
      font_size
    );

    this._m_label = label;

    label.setTint(tint);

    label.setOrigin(0.0, 0.5);

    label.setLeftAlign();

    return;

  }

  /**
   * Creates a label with the H1 Style.
   * 
   * * Font Key: supercomputer.
   * * Font Size: 36.
   * 
   * The texture origin is set by (0.0, 0.5),
   * and the text is left aligned. 
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _text label text.
   */
  static CreateH1
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string
  )
  : UILabel
  {

    const label = new UILabel
    (
      _x,
      _y,
      _scene,
      _text,
      'supercomputer',
      36
    );

    return label;

  }

  /**
   * Creates a label with the H2 Style.
   * 
   * * Font Key: odin_rounded.
   * * Font Size: 28.
   * 
   * The texture origin is set by (0.0, 0.5),
   * and the text is left aligned. 
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _text label text.
   */
  static CreateH2
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string
  )
  : UILabel
  {

    const label = new UILabel
    (
      _x,
      _y,
      _scene,
      _text,
      "odin_rounded",
      28
    );

    return label;

  }

  /**
   * Creates a label with the Style A.
   * 
   * * Font Key: supercomputer.
   * 
   * The texture origin is set by (0.0, 0.5). The text is left aligned. The
   * default size is 20.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _text label text.
   * @param _fontSize the Bitmap size.
   */
  static CreateStyleA
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string,
    _fontSize?: number
  )
  : UILabel
  {

    const label = new UILabel
    (
      _x,
      _y,
      _scene,
      _text,
      "supercomputer",
      _fontSize
    );

    return label;

  }

  /**
   * Creates a label with the Style B.
   * 
   * * Font Key: odin_rounded.
   * 
   * The texture origin is set by (0.0, 0.5). The text is left aligned. The
   * default size is 20.
   * 
   * @param _x position in x axis.
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _text label text.
   * @param _fontSize the Bitmap size.
   */
  static CreateStyleB
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _text: string,
    _fontSize?: number
  )
  : UILabel
  {

    const label = new UILabel
    (
      _x,
      _y,
      _scene,
      _text,
      "odin_rounded",
      _fontSize
    );

    return label;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_label.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_label.height;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_label.depth;

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

    this._m_label.setPosition(_x, _y);

    return;

  }

  /**
   * The horizontal anchor (origin) of this Game Object.
   */
  getAnchorX()
  : number
  {

    return this._m_label.originX;

  }

  /**
   * The vertical anchor (origin) of this Game Object.
   */
  getAnchorY()
  : number
  {

    return this._m_label.originY;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_label.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_label.y;

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
   * Set the tint of the BitmapFont.
   * 
   * @param _tint Hexadecimal color. 
   */
  setTint(_tint: number)
  : void
  {

    this._m_label.setTint(_tint);

    return;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

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

    this._m_label.setActive(false);
    this._m_label.setVisible(false);

    return;

  }

  /**
   * Set the lines of text in this BitmapText to be left-aligned. This only has
   * any effect if this BitmapText contains more than one line of text.
   */
  leftAlign()
  : void
  {

    this._m_label.setLeftAlign();

    return;

  }

  /**
   * Set the lines of text in this BitmapText to be right-aligned. This only has
   * any effect if this BitmapText contains more than one line of text.
   */
  rightAlign()
  : void
  {

    this._m_label.setRightAlign();

    return;

  }

  /**
   * Set the lines of text in this BitmapText to be center-aligned. This only
   * has any effect if this BitmapText contains more than one line of text.
   */
  centerAlign()
  : void
  {

    this._m_label.setCenterAlign();

    return;

  }

  destroy()
  : void
  {

    this._m_label.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_label: Phaser.GameObjects.BitmapText;

}