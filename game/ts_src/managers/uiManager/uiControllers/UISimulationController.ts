/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UISimulationController.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-24-2020
 */

import { BaseActor } from "../../../actors/baseActor";
import { Ty_Sprite } from "../../../commons/stTypes";
import { UIBox } from "../uiBox/uiBox";
import { UIButtonImg } from "../uiButtonImg";
import { UILabel } from "../uiLabel";
import { UIController } from "./UIController";

export class UISimulationController
extends UIController
{

  /**
   * @summary Constructor of a new empty simulator controller.
   * 
   * @param _x The x position of the Box.
   * @param _y The y position of the Box.
   * @param _scene The scene where the box is gonna be created.
   * @param _title [optional] The title of the box.
   * @param _target [optional] The target to be attached to this box.
   */
  constructor
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene,
    _title ?: string,
    _target ?: BaseActor<Ty_Sprite>
  )
  {

    super();

    ////////////////////////////////////
    // UI

    // Create Box.

    const box = UIBox.CreateBorderBox
    (
      _x,
      _y,
      _scene
    );

    box.setAnchor(0.5, 0);

    this._m_box = box;

    // Box title.

    this._ui_boxTitle = "Box title";

    if(_title !== undefined)
    {

      this._ui_boxTitle = _title;

    }

    this._m_boxTitle = UILabel.CreateH2(0, 0, _scene, this._ui_boxTitle);

    box.add(this._m_boxTitle);
  }

  /**
   * @summary Constructor of a default media simulation controller.
   * @param _x The x position of the box.
   * @param _y The y position of the box.
   * @param _scene The scene where the box is gonna be created.
   * 
   * @todo Add subscribe methods to media buttons for simulation control.
   */
  static CreateSimControlBox
  (
    _x : number,
    _y : number,
    _scene : Phaser.Scene
  )
  : UISimulationController
  {
    const simControlBox = new UISimulationController(_x, _y, _scene, "Simulation controls");

    const buttonsBox = UIBox.CreateContentBoxB(0, 0, _scene);

    buttonsBox.setAnchor(0.5, 0.5);

    buttonsBox.setHorizontalBox();

    // stop button image

    const stopButton = UIButtonImg.CreateStopButtonImg
    (
      0,
      0,
      _scene
    );

    buttonsBox.add(stopButton);

    // play button image

    const playButton = UIButtonImg.CreatePlayButtonImg
    (
      0,
      0,
      _scene
    );

    buttonsBox.add(playButton);

    // pause button image

    const pauseButton = UIButtonImg.CreatePauseButtonImg
    (
      0,
      0,
      _scene
    );

    buttonsBox.add(pauseButton);
    
    simControlBox._m_box.add(buttonsBox);

    simControlBox._m_box.setCenterAlignment();

    return simControlBox;
  }

  //****************************************************/
  /* Private                                          */
  /****************************************************/
  
  // UI box components

  private _m_box : UIBox;

  private _m_boxTitle : UILabel;

  private _ui_boxTitle : string;
}