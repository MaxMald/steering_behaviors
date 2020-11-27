/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiHorizontalBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-21-2020
 */

import { UIObject } from "../../uiObject";
import { UIBox } from "../uiBox";
import { UIBoxState } from "./uiBoxState";

export class UIHorizontalBox 
extends UIBoxState
{
  
  constructor(_uiBox: UIBox)
  {

    super(_uiBox);

    this._m_vAlignFn = this._alignTop;

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

      elementW = object.getWidth();

      // Add gap space. No gap for the last element.

      if(i < lastIndex)
      {

        elementW += gap;

      }

      contentBox.width += elementW;
      if(contentBox.height < elementH)
      {

        contentBox.height = elementH;

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

      // Set the initial position.

      object.setPosition
      (
        position.x + (object.getWidth() * object.getAnchorX()),
        position.y
      );

      // Align object.

      this._m_vAlignFn.call(this, contentBox, object);

      // Set the position of the next element.
      
      position.x += object.getWidth() + gap;

    }

    return;

  }

  /**
   * Set all the UI Objects top-aligned to the UI Box.
   */
  setTopAlignment()
  : void
  {

    this._m_vAlignFn = this._alignTop;

    this.update();

    return;

  }

  /**
   * Set all the UI Objects top-aligned to the UI Box.
   */
  setCenterAlignment()
  : void
  {

    this._m_vAlignFn = this._alignMiddle;

    this.update();

    return;

  }

  /**
   * Set all the UI Objects top-aligned to the UI Box.
   */
  setBottomAlignment()
  : void
  {

    this._m_vAlignFn = this._alignBottom;

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
  private _verticalAlignToBox
  (
    _contentBox: Phaser.Geom.Rectangle,
    _element : UIObject,
    _t : number
  )
  : void
  {

    // Horizontal position in the content box.

    const y1 = _contentBox.y + (_t * _contentBox.height);

    _element.setPosition
    (
      _element.getX(),
      y1 + ( _element.getHeight() * (_element.getAnchorY() - _t))      
    );

    return;

  }

  /**
   * Set an UI Object to the top-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignTop
  (
    _contentBox: Phaser.Geom.Rectangle,
    _element: UIBox
  )
  : void
  {

    this._verticalAlignToBox(_contentBox, _element, 0.0);

    return;

  }

  /**
   * Set an UI Object to the middle-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignMiddle
  (
    _contentBox: Phaser.Geom.Rectangle,
    _element: UIBox
  )
  : void
  {

    this._verticalAlignToBox(_contentBox, _element, 0.5);

    return;

  }

  /**
   * Set an UI Object to the bottom-aligned to the area of a Box.
   * 
   * @param _contentBox Box where the UI Object will be aligned.
   * @param _element UI Object to be aligned.
   */
  private _alignBottom
  (
    _contentBox: Phaser.Geom.Rectangle,
    _element: UIBox
  )
  : void
  {

    this._verticalAlignToBox(_contentBox, _element, 1.0);

    return;

  }

  /**
   * Reference to the active Horizontal Alignment Function.
   */
  private _m_vAlignFn : 
  (
    _contentBox: Phaser.Geom.Rectangle, 
    _element : UIObject
  ) => void;

}