import { Point } from "../commons/stTypes";

export class MotionImage
extends Phaser.GameObjects.Image
{

  constructor
  (
    _scene: Phaser.Scene,
    _x: number,
    _y: number,
    _velocity: number,
    _texture: string,
    _frame: string | number
  )
  {

    super(_scene, _x, _y, _texture, _frame);

    _scene.children.add(this);

    this._m_startPoint = new Phaser.Geom.Point(_x, _y);

    this._m_velocity = _velocity;

    return;

  }
  
  update()
  : void
  {

    this.x += this._m_velocity * this.scene.game.loop.delta * 0.001;

    if(Math.abs((this.x - this._m_startPoint.x)) >= this.width)
    {

      this.x = this._m_startPoint.x;

    }

    return;
    
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_startPoint: Point;

  private _m_velocity: number;

}