/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceFlee.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since December-04-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { FleeForce } from "../../../steeringBehavior/forceFlee";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceFlee
extends UIForce
{

  constructor(_scene : Phaser.Scene)
  {

    super();    

    // Create the box
    
    const box = UIBox.CreateForceBox(0,0,_scene);

    this._m_box = box;

    // Title

    const title = UILabel.CreateStyleB(0, 0, _scene, "Flee Force", 25);

    title.setTint(ST_COLOR_ID.kGold);

    this._m_title = title;

    box.add(title);

    // Force Magnitude label

    this._m_labelForce = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_labelForce.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._m_labelForce);

    // Maximum Force Label.

    this._m_maxMagnitude = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_maxMagnitude.setTint(ST_COLOR_ID.kSkyBlueNeon);

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
      "UIForceFlee",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const maxMagnitude = slider.getValue();

        this.setMaximumMagnitudeLabel(maxMagnitude);

        if(this._m_flee !== undefined)
        {

          this._m_flee.setMaxMagnitude(maxMagnitude);

        }

        return;

      },
      this
    );

    box.add(this._m_forceSlider);

    // Set target.

    this.setTarget(undefined);

    return;

  }

  update()
  : void
  {

    if(this._m_flee !== undefined)
    {

      this.setForceLabel(this._m_flee.getActualForce());
    
    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

    this._m_flee = _force as FleeForce;

    if(this._m_flee !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kFlee)
      {

        throw new Error("UI Flee Force: Incorrect force.");

      }

      this.setForceLabel(this._m_flee.getActualForce());

      this._m_forceSlider.setValue(this._m_flee.getMaxMagnitude());

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

    this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");

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

    this._m_flee = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force.
   */
  private _m_flee: FleeForce;

  // UI Elements.

  private _m_box: UIBox;

  private _m_title: UILabel;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}