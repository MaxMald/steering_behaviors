/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceSeek.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-12-2020
 */

import { ST_TEXT_TYPE } from "../../../commons/stEnums";
import { SeekForce } from "../../../steeringBehavior/forceSeek";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceSeek
extends UIForce
{

  constructor(_scene : Phaser.Scene, _force?: SeekForce)
  {

    super();    

    // Create the box
    
    const box = UIBox.CreateContentBox(0,0,_scene);

    this._m_box = box;

    // Title

    this._m_title = UILabel.CreateH2(0, 0, _scene, "Seek Force");

    box.add(this._m_title);

    // Force Magnitude label

    this._m_force = UILabel.CreateStyleB(0, 0, _scene, "#");

    box.add(this._m_force);

    // Maximum Force Label.

    this._m_maxMagnitude = UILabel.CreateStyleB(0, 0, _scene, "#");

    box.add(this._m_maxMagnitude);

    // Maximum Force Slider.

    this._m_forceSlider = new UISlider
    (
      0,
      0,
      _scene,
      1,
      300
    );

    this._m_forceSlider.subscribe
    (
      "valueChanged",
      "UIForceSeek",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const maxMagnitude = slider.getValue();

        this.setMaximumMagnitudeLabel(maxMagnitude);

        if(this._m_seek !== undefined)
        {

          this._m_seek.setMaxMagnitude(maxMagnitude);

        }

        return;

      },
      this
    );

    box.add(this._m_forceSlider);

    // Set target.

    this.setTarget(_force);

    return;

  }

  update()
  {

    if(this._m_seek !== undefined)
    {

      this.setForceLabel(this._m_seek.getActualForce());
    
    }    

    return;

  }

  setTarget(_seekForce: SeekForce)
  : void
  {

    this._m_seek = _seekForce;

    if(_seekForce !== undefined)
    {

      this.setForceLabel(_seekForce.getActualForce());

      this._m_forceSlider.setValue(_seekForce.getMaxMagnitude());

    }

    return;

  }

  setMaximumMagnitudeLabel(_maxForce: number)
  : void
  {

    this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");

    return;

  }

  setForceLabel(_force: number)
  :void
  {

    this._m_force.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");

    return;

  }

  getBox()
  : UIBox
  {
    return this._m_box;
  }

  destroy()
  {

    this._m_box.destroy();

    this._m_seek = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force.
   */
  private _m_seek: SeekForce;

  // UI Elements.

  private _m_box: UIBox;

  private _m_title: UILabel;

  private _m_force: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}