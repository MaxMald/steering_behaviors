/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiButton.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-10-2020
 */


import { Ty_Image } from "../../commons/stTypes";
import { UIObject } from "./uiObject";



export class UIButton
extends UIObject
{
    /**
   * @summary Constructor of a new button.
   * 
   * @param _x The x position of the button.
   * @param _y The y position of the button.
   * @param _texture The texture name for the button.
   * @param _scene The scene where the button is gonna be created.
   * @param _label The text of the button.
   * @param _callback The callback function of the button.
   * @param _scaleMultiplier [optional] The scale multiplier for the button size.
   * @param _fontSize [optional] The font size of the button.
   */
  constructor
  (
    _x : number,
    _y : number,
    _texture : string,
    _scene : Phaser.Scene,
    _label : string,
    _callback : ()=>void,
    _scaleMultiplier ?: number,
    _fontSize ?: number
  )
  {

    super();

    // Create button sprite.

    const button = _scene.add.image
    (
      _x,
      _y,
      _texture
    );

    // Set button scale.

    if(_scaleMultiplier !== undefined)
    {
      button.setScale(1 * _scaleMultiplier, 1 * _scaleMultiplier);
    }
    else
    {
      button.setScale(0.5, 0.5);
    }

    // Set button interactive.

    button.setInteractive();

    // Set button label

    let label = _scene.add.text
    (
      _x,
      _y,
      _label,
      {
        fontFamily : 'Arial',
        fontSize : _fontSize !== undefined ? _fontSize : 32
      }
    );

    // Set label origin.
  
    label.setOrigin(0.5, 0.5)

    button.on('pointerdown', _callback, _scene);

    this._m_button = button;  

    return;
  }

  destroy()
  : void
  {
    this._m_button.destroy();

    this.destroy();
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  private _m_button : Ty_Image;
}