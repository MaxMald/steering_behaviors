/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file stRectangle.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-06-2020
 */

export class STRectangle
{

  constructor(_x?: number, _y?: number, _width?: number, _height?: number)
  {

    if(_x !== undefined)
    {

      this.x = _x;

    }
    else
    {

      this.x = 0;

    }

    if(_y !== undefined)
    {

      this.y = _y;

    }
    else
    {

      this.y = 0;

    }

    if(_width !== undefined)
    {

      this.width = _width;

    }
    else
    {

      this.width = 0;

    }

    if(_height !== undefined)
    {

      this.height = _height;

    }
    else
    {

      this.height = 0;

    }

    return;

  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void 
  {

    return;
    
  }

  public x: number;

  public y: number;

  public width: number;

  public height: number;

}