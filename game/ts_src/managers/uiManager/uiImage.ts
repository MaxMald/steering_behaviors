/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiImage.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-19-2020
 */

import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";

export class UIImage
  extends UIObject
{

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _texture: string,
    _frame?: string | number
  )
  {

    super();

    this._m_image = _scene.add.image
    (
      _x,
      _y,
      _texture,
      _frame
    );    

    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_image.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_image.height;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_image.x;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_image.y;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_image.z;

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

    this._m_image.x += _x;
    this._m_image.y += _y;

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

    this._m_image.x = _x;
    this._m_image.y = _y;

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

    this._m_image.setOrigin(_x, _y);

    return;

  }

  /**
   * The horizontal anchor (origin) of this UI Object.
   */
  getAnchorX()
  : number
  {

    return this._m_image.originX;

  }

  /**
   * The vertical anchor (origin) of this UI Object.
   */
  getAnchorY()
  : number
  {

    return this._m_image.originY;

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_image.setActive(true);
    this._m_image.setVisible(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_image.setActive(false);
    this._m_image.setVisible(false);

    return;

  }

  setImage(_texture: string, _frame?: string | number)
  : void
  {

    this._m_image.setTexture(_texture, _frame);

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_image : Ty_Image;

}