/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file parallaxImage.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-07-2020
 */

import { Point, V2 } from "../commons/stTypes";
import { Master } from "../master/master";

export class ParallaxImage 
{

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene, 
    _texture: string, 
    _frame: string | number,
    _velocity: number,
    _copies: number = 1
  )
  {

    // Get Master

    this._m_master = Master.GetInstance();

    // Init properties

    this._m_distance = 0;
    this._m_isPaused = false;
    this._m_startPoint = new Phaser.Geom.Point(_x, _y);
    this._m_velocity = _velocity;   

    // Create Image

    const image = _scene.add.image(_x, _y, _texture, _frame);

    this._m_textureWidth = image.width;

    // Create copies

    const group = _scene.add.group();

    this._m_group = group;

    let x = _x + image.width;

    for(let i = 0; i < _copies; ++i)
    {

      group.add
      (
        _scene.add.image(x, _y, _texture, _frame)
      );

      x += image.width;

    }

    return;

  }

  update()
  : void
  {

    if(!this._m_isPaused)
    {

      // Calculate distance.

      let distance = this._m_distance;

      distance += this._m_master.getDeltaTime() * this._m_velocity;

      const texture: Phaser.GameObjects.Image = this._m_texture;

      if(distance >= this._m_textureWidth)
      {

        const startPoint: Point = this._m_startPoint;        

        const incX: number = startPoint.x - texture.x;
        const incY: number = startPoint.y - texture.y;

        this._m_texture.x += incX;
        this._m_texture.y += incY;

        // Reset Position

        this._m_group.incXY(incX, incY);

        // Reset distance.

        distance = 0;

      }
      else
      {

        texture.x += distance;

      }

      this._m_distance = distance;

    }

    return;

  }

  pause()
  : void
  {

    this._m_isPaused = true;

    return;

  }

  resume()
  : void
  {

    this._m_isPaused = false;

    return;

  }

  destroy()
  : void
  {

    this._m_group.destroy(true);

    this._m_group = null;

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_master: Master;
 
  private _m_isPaused: boolean;

  private _m_group: Phaser.GameObjects.Group;

  private _m_velocity: number;

  private _m_distance: number;

  private _m_startPoint: Phaser.Geom.Point;

  private _m_texture: Phaser.GameObjects.Image;

  private _m_textureWidth: number;

}