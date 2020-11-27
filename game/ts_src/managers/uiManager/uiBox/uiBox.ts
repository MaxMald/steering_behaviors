/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-10-2020
 */

import { Point } from "../../../commons/stTypes";
import { UIObject } from "../uiObject";
import { UIBoxState } from "./states/uiBoxState";
import { UIHorizontalBox } from "./states/uiHorizontalBox";
import { UIVerticalBox } from "./states/uiVerticalBox";

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

    // Initialize properties

    this._m_verticalState = new UIVerticalBox(this);
    this._m_horizontalState = new UIHorizontalBox(this);

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

    this._m_gap = 0;

    // Set enable flag

    this._isEnable = true;
    
    // Set Vertical Box

    this.setVerticalBox();

    // Set padding to 0

    this.setPadding(0);

    // Set left alignment

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

    this._m_bg.setActive(true);
    this._m_bg.setVisible(true);

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

    this._m_bg.setActive(false);
    this._m_bg.setVisible(false);

    this._isEnable = false;

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

    this._m_activeState.update();

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
   * Set an space between each UI Object in this box.
   * 
   * @param _gap: space between each UI Object in this box.
   * */
  setElementsGap(_gap: number)
  : void
  {

    this._m_gap = _gap;

    this.updateBox();

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

    this._m_activeState = null;
    
    this._m_verticalState.destroy();
    this._m_verticalState = null;
    this._m_horizontalState.destroy();
    this._m_horizontalState = null;

    super.destroy();

    return;

  }

  /**
   * The UI Objects will be order in a row (horizontal).
   */
  setHorizontalBox()
  : void
  {

    this._m_activeState = this._m_horizontalState;

    return;

  }

  /**
   * The UI Objects will be order in a column (vertical).
   */
  setVerticalBox()
  : void
  {

    this._m_activeState = this._m_verticalState;

    return;

  }

   /**
   * Set the elements of this box to be center-aligned.
   */
  setCenterAlignment()
  : void
  {  

    this._m_activeState.setCenterAlignment();

    return;

  }

  /**
   * Set the elements of this box to be left-aligned.
   */
  setLeftAlignment()
  : void
  {

    this._m_activeState.setLeftAlignment();

    return;

  }

  /**
   * Set the elements of this box to be right-aligned.
   */
  setRightAlignment()
  : void
  {

    this._m_activeState.setRightAlignment();

    return;

  }

  /**
   * Set all the UI Objects top-aligned to the UI Box.
   */
  setTopAlignment()
  : void
  {

    this._m_activeState.setTopAlignment();

    return;

  }

  /**
   * Set all the UI Objects bottom-aligned to the UI Box.
   */
  setBottomAlignment()
  : void
  {

    this._m_activeState.setBottomAlignment();

    return;

  }

  /**
   * Resize the background texture to fit with the content box.
   */
  resizeBackground()
  : void
  {

    const boxSize = this._m_boxSize;

    if(boxSize.x < UIBox.MIN_WIDTH)
    {
      boxSize.x = UIBox.MIN_WIDTH;
    }

    if(boxSize.y < UIBox.MIN_HEIGHT)
    {
      boxSize.y = UIBox.MIN_HEIGHT;
    }

    this._m_bg.resize
    (
      boxSize.x, 
      boxSize.y
    );

    return;

  }  

  /**
   * List of UI Objects included in this UI Box.
   */
  _m_aObjects : Array<UIObject>;  

  /**
   * Top space added to the content box.
   */
  _m_paddingTop: number;

  /**
   * Bottom space added to the content box.
   */
  _m_paddingBottom: number;

  /**
   * Left space added to the content box.
   */
  _m_paddingLeft: number;

  /**
   * Right space added to the content box.
   */
  _m_paddingRight: number;

  /**
   * The space added between each UI Element.
   */
  _m_gap: number;

  /**
   * Area that contains all the UI Objects of the UI Box.
   */
  _m_contentBox: Phaser.Geom.Rectangle;

  /**
   * The size of the UI Box. This value includes the padding space.
   */
  _m_boxSize: Point;

  /**
   * The UI Box background texture.
   */
  _m_bg: Phaser.GameObjects.RenderTexture;

  
  /****************************************************/
  /* Private                                          */
  /****************************************************/ 

  /**
   * Minimum width that a UI Box can has.
   */
  private static MIN_WIDTH : number = 65;

  /**
   * Minimum height that a UI Box can has.
   */
  private static MIN_HEIGHT : number = 65;

  /**
   * Indicates if this box is enabled.
   */
  private _isEnable: boolean;

  /**
   * The active state of the UI Box.
   */
  private _m_activeState: UIBoxState;

  /**
   * Vertical Order State.
   */
  private _m_verticalState: UIVerticalBox;

  /**
   * Horizontal Order State.
   */
  private _m_horizontalState: UIHorizontalBox;

}