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

  constructor
  (
    _x: number, 
    _y: number, 
    _scene: Phaser.Scene,
    _frame: string = "box_bg.png"
  )
  {

    super();

    const aObjects = new Array<UIObject>();

    this._m_aObjects = aObjects;

    // Set initial size.

    const contentSize = new Phaser.Geom.Rectangle();

    this._m_contentBox = contentSize;

    this._m_boxSize = new Phaser.Geom.Point();    

    const bg = _scene.add.nineslice
    (
      _x,
      _y,
      contentSize.x,
      contentSize.y,
      {
        key: "game_art",
        frame: _frame
      },
      [ 30 ]
    );

    this._m_bg = bg;

    // Set gap to 0

    this._m_gapTop = 0;
    this._m_gapBottom = 0;    

    // Set padding to 0

    this.setPadding(0);

    // Set the alignment function

    this.setLeftAlignment();

    return;

  }

  static CreateBorderBox(_x: number, _y:number, _scene: Phaser.Scene)
  : UIBox
  {

    const box = new UIBox(_x, _y, _scene, "box_bg.png");

    box.setPadding(20);

    box.setElementsGap(5);

    return box;

  }

  static CreateBorderBoxB(_x: number, _y: number, _scene: Phaser.Scene)
  : UIBox
  {

    const box = new UIBox(_x, _y, _scene, "box_bg_3.png");

    box.setPadding(20);
    box.setElementsGap(5);

    return box;

  }

  static CreateContentBox(_x: number, _y:number, _scene: Phaser.Scene)
  : UIBox
  {

    const box = new UIBox(_x, _y, _scene, "box_bg_2.png");

    box.setPadding(10);
    box.setElementsGap(5);

    return box;

  }

  static CreateContentBoxB(_x: number, _y:number, _scene: Phaser.Scene)
  : UIBox
  {

    const box = new UIBox(_x, _y, _scene, "box_bg_4.png");

    box.setPadding(10);
    box.setElementsGap(5);

    return box;

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
   * Set the horizontal and vertical anchor (origin) of this UI Object.
   * 
   * @param _x The horizontal anchor (origin) of this UI Object.
   * @param _y The vertical anchor (origin) of this UI Object.
   */
  setAnchor(_x: number, _y: number)
  : void
  {

    this._m_bg.setOrigin(_x, _y);

    this.updateBox();

    return;

  }

  /**
   * The horizontal anchor (origin) of this Game Object.
   */
  getAnchorX()
  : number
  {

    return this._m_bg.originX;

  }

  /**
   * The vertical anchor (origin) of this Game Object.
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

    this._m_aObjects.forEach
    (
      function(_object: UIObject)
      : void
      {

        _object.enable();

        return;

      }
    );

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

    this._updateContentBoxPosition();

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

    this._m_alignFn = null;

    super.destroy();

    return;

  }

  updateBoxSize()
  : void
  {

    // Reset content box size.

    const contentBox = this._m_contentBox;

    contentBox.width = 0;
    contentBox.height = 0;
    
    // Iterate over each UI Object.

    const aObjects = this._m_aObjects;

    const size = aObjects.length;

    let uiObject : UIObject;

    for(let i = 0; i < size; ++i)
    {

      uiObject = aObjects[i];

      const width = uiObject.getWidth();

      if(width > contentBox.width)
      {

        contentBox.width = width;

      }      

      contentBox.height += uiObject.getHeight() 
      + this._m_gapTop 
      + this._m_gapBottom;

    }

    // Update Box Size.

    const boxSize = this._m_boxSize;

    boxSize.x = contentBox.width + this._m_paddingLeft + this._m_paddingRight;

    boxSize.y = contentBox.height + this._m_paddingBottom + this._m_paddingTop;

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

   /**
   * Set the elements of this box to be center-aligned.
   */
  setCenterAlignment()
  : void
  {  

    this._m_alignFn = this._alignCenter;

    this.updateBox();

    return;

  }

  /**
   * Set the elements of this box to be left-aligned.
   */
  setLeftAlignment()
  : void
  {

    this._m_alignFn = this._alignLeft;

    this.updateBox();

    return;

  }

  /**
   * Set the elements of this box to be right-aligned.
   */
  setRightAlignment()
  : void
  {

    this._m_alignFn = this._alignRight;

    this.updateBox();

    return;

  }

  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Updates the width and height of the content box, according to the attached
   * elements in this UI Box.
   */
  private _updateContentBoxPosition()
  : void
  {

    const bg = this._m_bg;

    this._m_contentBox.setPosition
    (
      bg.x - (bg.width * bg.originX) + this._m_paddingLeft,
      bg.y - (bg.height * bg.originY) + this._m_paddingTop
    );

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

    const gapTop = this._m_gapTop;

    const gapBottom = this._m_gapBottom;

    const contentBox = this._m_contentBox;

    let position = new Phaser.Geom.Point
    (
      contentBox.x,
      contentBox.y
    );    

    for(let i = 0; i < size; ++i)
    {

      object = aObjects[i];

      // Set the initial position.

      object.setPosition
      (
        position.x, 
        position.y + (object.getHeight() * object.getAnchorY())
      );

      // Align object.

      this._m_alignFn.call(this, contentBox, object);

      // Set the position of the next element.

      position.y += object.getHeight() + gapTop + gapBottom;

    }

    return;

  }

  ///////////////////////////////////
  // Alignments

  /**
   * Set an UI Object aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   * @param _t value from 0.0 to 1.0 of the horizontal alignment.
   */
  private _horizontalAlignToBox
  (
    _contentBox: Phaser.Geom.Rectangle,
    _element : UIObject,
    _t : number
  )
  : void
  {

    // Horizontal position in the content box.

    const x1 = _contentBox.x + (_t * _contentBox.width);

    _element.setPosition
    (
      x1 + ( _element.getWidth() * (_element.getAnchorX() - _t)),
      _element.getY()
    );

    return;

  }

  /**
   * Set an UI Object to the left-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignLeft
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  )
  : void
  {

    this._horizontalAlignToBox(_contentBox, _element, 0.0);

    return;

  }

  /**
   * Set an UI Object to the center-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignCenter
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  )
  : void
  {

    this._horizontalAlignToBox(_contentBox, _element, 0.5);

    return;

  }

  /**
   * Set an UI Object to the right-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignRight
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  )
  : void
  {

    this._horizontalAlignToBox(_contentBox, _element, 1.0);

    return;

  }

  /**
   * Minimum width that a UI Box can has.
   */
  private static MIN_WIDTH : number = 65;

  /**
   * Minimum height that a UI Box can has.
   */
  private static MIN_HEIGHT : number = 65;

  // Horizontal Alignment Function

  /**
   * Reference to the active Horizontal Alignment Function.
   */
  private _m_alignFn : 
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  ) => void;

  /**
   * List of UI Objects included in this UI Box.
   */
  private _m_aObjects : Array<UIObject>;  

  /**
   * Top space added to the content box.
   */
  private _m_paddingTop: number;

  /**
   * Bottom space added to the content box.
   */
  private _m_paddingBottom: number;

  /**
   * Left space added to the content box.
   */
  private _m_paddingLeft: number;

  /**
   * Right space added to the content box.
   */
  private _m_paddingRight: number;

  /**
   * The space added at the top of each UI Element.
   */
  private _m_gapTop: number;

  /**
   * The space added at the bottom of each UI Element.
   */
  private _m_gapBottom: number;

  /**
   * Area that contains all the UI Objects of the UI Box.
   */
  private _m_contentBox: Phaser.Geom.Rectangle;

  /**
   * The size of the UI Box. This value includes the padding space.
   */
  private _m_boxSize: Point;

  /**
   * The UI Box background texture.
   */
  private _m_bg: Phaser.GameObjects.RenderTexture;

}