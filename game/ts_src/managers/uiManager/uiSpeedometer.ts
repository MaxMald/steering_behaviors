/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiSpeedometer.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-26-2020
 */

import { UIObject } from "./uiObject";

/**
 * 
 */
export class UISpeedometer
 extends UIObject
 {
  
  /**
   * 
   * @param _x 
   * @param _y 
   * @param _scene 
   */
  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene
  )
  {

    super();

    // Speedometer

    this._m_bg = _scene.add.image
    (
      0, 
      0,
      "game_art",
      "velocimetro_bg.png" 
    );

    // Pointer

    const pointer = _scene.add.image
    (
      0,
      0, 
      "game_art",
      "velocimetro_pointer.png"
    );

    pointer.setOrigin(0.07, 0.5);

    this._m_pointer = pointer;

    this._updatePointer();

    // Foreground

    this._m_fg = _scene.add.image
    (
      36,
      0,
      "game_art",
      "velocimetro_fg.png"
    );

    this.setPosition(_x, _y);

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

    this._m_bg.setDepth(_z);

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

    this._m_fg.x += _x;
    this._m_fg.y += _y;

    this._updatePointer();

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

    const x = _x - this._m_bg.x;
    const y = _y - this._m_bg.y;

    this.move(x, y);

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

    this._updatePointer();

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

    this._m_bg.setActive(true);
    this._m_bg.setVisible(true);

    this._m_pointer.setActive(true);
    this._m_pointer.setVisible(true);

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

    this._m_pointer.setActive(false);
    this._m_pointer.setVisible(false);

    return;

  }

  updatePointerAngle(_angle: number)
  : void
  {

    this._m_pointer.setAngle(_angle);

    return;

  }

  destroy()
  : void
  {

    this._m_bg.destroy();

    this._m_pointer.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _updatePointer()
  : void
  {

    const bg = this._m_bg;

    const x = bg.x - (bg.width * bg.originX) + (bg.width * 0.5);
    const y = bg.y - (bg.height * bg.originY) + (bg.height * 0.79);

    this._m_pointer.setPosition(x, y);

    return;

  }
  
  private _m_bg : Phaser.GameObjects.Image;

  private _m_pointer: Phaser.GameObjects.Image;

  private _m_fg: Phaser.GameObjects.Image;

 }