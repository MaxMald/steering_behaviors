/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file stPoint.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-06-2020
 */

export class STPoint
{

  constructor(_x?: number, _y?: number)
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

    return;

  }

  destroy()
  : void
  {

    return;

  }

  x: number;

  y: number;

}