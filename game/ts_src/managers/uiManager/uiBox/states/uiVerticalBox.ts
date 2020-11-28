/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiVerticalBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-21-2020
 */

import { UIObject } from "../../uiObject";
import { UIBox } from "../uiBox";
import { UIBoxState } from "./uiBoxState";

export class UIVerticalBox
 extends UIBoxState
{

  constructor(_uiBox: UIBox)
  {

    super(_uiBox);

    this._m_hAlignFn = this._alignLeft;

    return;

  }

  update()
  {   

    const box = this.m_uiBox;

    const aObjects = box._m_aObjects;

    const size = aObjects.length;    

    const boxSize = box._m_boxSize;

    // Add Padding.

    boxSize.x = box._m_paddingLeft + box._m_paddingRight;
    boxSize.y = box._m_paddingTop + box._m_paddingBottom;

    // Add Content space.

    const gap = box._m_gap;

    let elementH : number;
    let elementW : number;

    const contentBox = box._m_contentBox;
    
    contentBox.width = 0;
    contentBox.height = 0;

    let object : UIObject;

    const lastIndex = size - 1;

    for(let i = 0; i < size; ++i)
    {

      object = aObjects[i];

      // Skip disable object.

      if(!object.isEnable())
      {

        continue;

      }

      elementH = object.getHeight();

      if(i < lastIndex)
      {

        elementH += gap;

      }

      elementW = object.getWidth();

      contentBox.height += elementH;
      if(contentBox.width < elementW)
      {

        contentBox.width = elementW;

      }

    }

    boxSize.x += contentBox.width;
    boxSize.y += contentBox.height;

    // Resize background texture.

    box.resizeBackground();

    // Set Content Box Position.

    const boxBG = box._m_bg;

    contentBox.x = boxBG.x - (boxBG.originX * boxBG.width) + box._m_paddingLeft;
    contentBox.y = boxBG.y - (boxBG.originY * boxBG.height) + box._m_paddingTop;

    // Position UI Objects.

    let position = new Phaser.Geom.Point
    (
      contentBox.x,
      contentBox.y
    );  
    
    for(let i = 0; i < size; ++i)
    {

      object = aObjects[i];

      if(!object.isEnable())
      {

        continue;

      }

      // Set the initial position.

      object.setPosition
      (
        position.x, 
        position.y + (object.getHeight() * object.getAnchorY())
      );

      // Align object.

      this._m_hAlignFn.call(this, contentBox, object);

      // Set the position of the next element.

      position.y += object.getHeight() + gap;

    }

    return;

  }

  /**
   * Set all the UI Objects center-aligned to the UI Box.
   */
  setCenterAlignment()
  : void
  {

    this._m_hAlignFn = this._alignCenter;

    this.update();

    return;

  }

  /**
   * Set all the UI Objects left-aligned to the UI Box.
   */
  setLeftAlignment()
  : void
  {

    this._m_hAlignFn = this._alignLeft;

    this.update();

    return;

  }

  /**
   * Set all the UI Objects right-aligned to the UI Box.
   */
  setRightAlignment()
  : void
  {

    this._m_hAlignFn = this._alignRight;

    this.update();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

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
   * Reference to the active Horizontal Alignment Function.
   */
  private _m_hAlignFn : 
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  ) => void;

}