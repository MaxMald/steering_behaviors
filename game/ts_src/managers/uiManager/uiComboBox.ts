/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiComboBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-18-2020
 */

import { UILabelBox } from "./uiLabelBox";
import { UIObject } from "./uiObject";

export class UIComboBox
  extends UIObject
{

  constructor(_x: number, _y: number, _scene: Phaser.Scene)
  {

    super();

    this._m_scene = _scene;

    this._m_isOpen = false;

    // Labels

    const aOptions = new Array<UILabelBox>();

    this._m_aOptions = aOptions;

    for(let i = 0; i < 10; ++i)
    {

      aOptions.push(new UILabelBox(_x, _y,_scene,""));

    }

    // Selected Option

    const selectedLabel = new UILabelBox(_x, _y, _scene, "");

    this._m_selectedLabel = selectedLabel;

    // Update box

    this.updateCombo(undefined);

    this.setSelection("");

    return;

  }

    /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_selectedLabel.getWidth();

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_selectedLabel.getHeight();

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_selectedLabel.getX();

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_selectedLabel.getY();

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_selectedLabel.getZ();

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

    this._m_selectedLabel.move(_x, _y);

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

    this._m_selectedLabel.setPosition(_x, _y);

    return;

  }

  getAnchorX()
  : number
  {

    return this._m_selectedLabel.getAnchorX();

  }

  getAnchorY()
  : number
  {

    return this._m_selectedLabel.getAnchorY();

  }

  setSelection(_option: string)
  : void
  {

    this._m_selectedLabel.setText(_option);

    return;

  }

  updateCombo(_options: string[])
  : void
  {

    this._m_aOptionsStr = _options;

    const size = _options.length;

    const aOptions = this._m_aOptions;

    // Adds new elements to the pool if the number of options exceeds the size
    // of elements.

    if(size > aOptions.length)
    {

      const dif = size - aOptions.length;

      const scene = this._m_scene;

      for(let i = 0; i < dif; ++i)
      {

        aOptions.push(new UILabelBox( 0, 0, scene, ""));

      }

    }

    for(let i = 0; i < size; ++i)
    {

      aOptions[i].setText(_options[i])

    }

    this.closeCombo();

    return;

  }

  openCombo()
  : void
  {

    if(!this._m_isOpen)
    {

      const aOptionsStr = this._m_aOptionsStr;

      if(aOptionsStr === undefined)
      {

        return;

      }

      if(aOptionsStr.length <= 0)
      {

        return;

      }

      this._m_isOpen = true;

      const aOptions = this._m_aOptions;

      const size = aOptionsStr.length;

      const selectedLabel = this._m_selectedLabel;

      const height = selectedLabel.getHeight();

      let x : number = selectedLabel.getX();

      let y : number = selectedLabel.getY() + height; 

      for(let i = 0; i < size; ++i)
      {

        aOptions[i].setPosition(x, y);

        aOptions[i].enable();

        y += height;

      }

    }

    return;

  }

  closeCombo()
  : void
  {

    if(this._m_isOpen)
    {

      const aOptions = this._m_aOptions;

      const size = aOptions.length;

      for(let i = 0; i < size; ++i)
      {

        aOptions[i].disable();

      }

      this._m_isOpen = false;

    }

    return;

  }

  destroy()
  : void
  {

    this._m_selectedLabel.destroy();

    this._m_aOptions.forEach
    (
      function(_value: UILabelBox)
      : void
      {
        _value.destroy();
      }
    );
    this._m_aOptions = null;

    this._m_aOptionsStr = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_selectedLabel: UILabelBox;

  private _m_aOptions : Array<UILabelBox>;

  private _m_aOptionsStr : Array<String>;

  private _m_scene : Phaser.Scene;

  private _m_isOpen : Boolean;

}