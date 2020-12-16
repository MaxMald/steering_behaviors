/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiGroup.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-05-2020
 */

import { UIObject } from "./uiObject";

export class UIGroup
extends UIObject
{

  constructor()
  {

    super();

    this._isEnable = true;
    this._m_aObjects = new Array<UIObject>();

    return;

  }

  /**
   * Add an UI Object to this group.
   * 
   * @param _object 
   */
  add(_object: UIObject)
  : void
  {

    this._m_aObjects.push(_object);
    
    return;

  }

  /**
   * Removes an UI Object from this group.
   * @param _object 
   */
  remove(_object: UIObject)
  : void
  {

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    for(let i = 0; i < size; ++i)
    {

      this._m_aObjects[i] === _object;

      this._m_aObjects.splice(i, 1);

      return;

    }

    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return 0;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return 0;

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return 0;

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return 0;

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return 0;

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

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    for(let i = 0; i < size; ++i)
    {

      aObjects[i].move(_x, _y);

    }

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

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    for(let i = 0; i < size; ++i)
    {

      aObjects[i].setPosition(_x, _y);

    }

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

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    for(let i = 0; i < size; ++i)
    {

      aObjects[i].setAnchor(_x, _y);

    }

    return;

  }

  /**
   * The horizontal anchor (origin) of this Game Object.
   */
  getAnchorX()
  : number
  {

    return 0;

  }

  /**
   * The vertical anchor (origin) of this Game Object.
   */
  getAnchorY()
  : number
  {

    return 0;

  }

  setZ(_z: number)
  : void
  {

    this._m_aObjects.forEach
    (
      function(_object: UIObject)
      : void
      {

        _object.setZ(_z);

        return;

      }
    );
  
  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_aObjects.forEach
    (
      function(_object: UIObject)
      : void
      {

        _object.enable();

        return;

      }
    );

    this._isEnable = true;

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this._m_aObjects.forEach
    (
      function(_object: UIObject)
      : void
      {

        _object.disable();

        return;

      }
    );

    this._isEnable = false;

    return;

  }

  isEnable()
  : boolean
  {

    return this._isEnable;

  }

  destroy()
  : void
  {

    const aObject = this._m_aObjects;

    while(aObject.length)
    {

      let object = aObject.pop();

      object.destroy();

      return;

    }

    this._m_aObjects = null;

    super.destroy();

    return;

  }

  /**
   * List of UI Objects included in this UI Box.
   */
  _m_aObjects : Array<UIObject>;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/ 

  /**
   * Indicates if this box is enabled.
   */
  private _isEnable: boolean;

}