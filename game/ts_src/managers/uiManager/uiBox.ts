/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-10-2020
 */

import { Point } from "../../commons/stTypes";
import { UIObject } from "./uiObject";

export class UIBox
  extends UIObject
{

  constructor(_x: number, _y: number, _scene: Phaser.Scene)
  {

    super();

    const aObjects = new Array<UIObject>();

    this._m_aObjects = aObjects;

    // Set initial size.

    const contentSize = new Phaser.Geom.Point();

    this._m_contentSize = contentSize;

    this._m_boxSize = new Phaser.Geom.Point();    

    const bg = _scene.add.nineslice
    (
      _x,
      _y,
      contentSize.x,
      contentSize.y,
      {
        key: "game_art",
        frame: "box_bg.png"
      },
      [ 30 ]
    );

    this._m_bg = bg;

    // Set gap to 0

    this._m_gapTop = 0;
    this._m_gapBottom = 0;

    // Set padding to 0

    this.setPadding(0);

    return;

  }

  add(_object: UIObject)
  : void
  {

    this._m_aObjects.push(_object);    

    // Check depth

    const depth = _object.getZ();

    if(depth <= this._m_bg.depth)
    {

      this._m_bg.setDepth(depth - 1);

    }

    // Update

    this.updateBox();

    return;

  }

    /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_boxSize.x;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_boxSize.y;

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
   * Move the UI Object an amount.
   * 
   * @param _x amount in x axis. 
   * @param _y amount in y axis.
   */
  move(_x: number, _y: number)
  : void
  {

    const bg = this._m_bg;

    bg.x += _x;
    bg.y += _y;

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

    const bg = this._m_bg;

    const x = _x - bg.x;
    const y = _y - bg.y;

    this.move(x, y);

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

    this.updateBox();

    return;

  }

  /**
   * Update box size, resize background, and order elements.
   */
  updateBox()
  : void
  {

    this.updateBoxSize();

    this._resizeBackground();

    this._orderVertical();

    return;

  }

  /**
   * Set an space between each element in this box.
   * 
   * @param _top_bottom top and bottom space
   */
  setElementsGap(_top_bottom: number)
  : void;

  /**
   * Set an space between each element in this box.
   * 
   * @param _top top space. 
   * @param _bottom bottom space.
   */
  setElementsGap(_top: number, _bottom?: number)
  : void
  {

    if(_bottom === undefined)
    {

      this._m_gapTop = _top;
      this._m_gapBottom = _top;

    }
    else
    {

      this._m_gapTop = _top;
      this._m_gapBottom = _bottom;

    }

    this.updateBox();

    return;

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

  updateBoxSize()
  : void
  {

    // Update content size.

    const contentSize = this._m_contentSize;

    contentSize.setTo(0.0, 0.0);    

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    let uiObject : UIObject;

    for(let i = 0; i < size; ++i)
    {

      uiObject = aObjects[i];

      const width = uiObject.getWidth();

      if(width > contentSize.x)
      {

        contentSize.x = width;

      }      

      contentSize.y += uiObject.getHeight() + this._m_gapTop + this._m_gapBottom;

    }

    // Update Box Size.

    const boxSize = this._m_boxSize;

    boxSize.x = contentSize.x + this._m_paddingLeft + this._m_paddingRight;

    boxSize.y = contentSize.y + this._m_paddingBottom + this._m_paddingTop;

    // Minimum size.

    if(boxSize.x < UIBox.MIN_WIDTH)
    {

      boxSize.x = UIBox.MIN_WIDTH;

    }

    if(boxSize.y < UIBox.MIN_HEIGHT)
    {

      boxSize.y = UIBox.MIN_HEIGHT;

    }

    return;

  }

  private _resizeBackground()
  : void
  {

    const boxSize = this._m_boxSize;

    this._m_bg.resize
    (
      boxSize.x, 
      boxSize.y
    );

    return;

  }


  private _orderVertical()
  : void
  {

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    let object : UIObject;

    const bg = this._m_bg;

    const gapTop = this._m_gapTop;

    const gapBottom = this._m_gapBottom;

    let position = new Phaser.Geom.Point
    (
      bg.x + this._m_paddingLeft,
      bg.y + this._m_paddingTop
    );

    for(let i = 0; i < size; ++i)
    {

      object = aObjects[i];

      const objWidth = object.getWidth();

      const objHeight = object.getHeight();

      object.setPosition
      (
        position.x + objWidth * object.getAnchorX(), 
        position.y + objHeight * object.getAnchorY()
      );

      position.y += object.getHeight() + gapTop + gapBottom;

    }

    return;

  }

  private static MIN_WIDTH : number = 65;

  private static MIN_HEIGHT : number = 65;

  // Elements

  private _m_aObjects : Array<UIObject>;  

  // Padding Properties

  private _m_paddingTop: number;

  private _m_paddingBottom: number;

  private _m_paddingLeft: number;

  private _m_paddingRight: number;

  // Gap

  private _m_gapTop: number;

  private _m_gapBottom: number;

  // UI Background

  private _m_contentSize: Point;

  private _m_boxSize: Point;

  private _m_bg: Phaser.GameObjects.RenderTexture;

}