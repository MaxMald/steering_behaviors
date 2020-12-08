/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceConstant.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-04-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { ForceConstant } from "../../../steeringBehavior/forceConstant";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceConstant
extends UIForce
{

  constructor(_scene : Phaser.Scene)
  {

    super();    

    // Create the box
    
    const box = UIBox.CreateForceBox(0,0,_scene);

    box.setClearBox(true);

    box.setPadding(0);

    this._m_box = box;

    // Title

    const title = UILabel.CreateStyleA(0, 0, _scene, "Constant Force", 25);

    title.setTint(ST_COLOR_ID.kGold);

    this._m_title = title;

    box.add(title);

    // Force Magnitude label

    this._m_labelForce = UILabel.CreateStyleB(0, 0, _scene, "#");

    box.add(this._m_labelForce);

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

        if(this._m_force !== undefined)
        {

          this._m_force.setMaxMagnitude(maxMagnitude);

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

    if(this._m_force !== undefined)
    {

      this.setForceLabel(this._m_force.getActualForce());
    
    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

    this._m_force = _force as ForceConstant;

    if(this._m_force !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kConstant)
      {

        throw new Error("UI Constant Force: Incorrect force.");

      }

      this.setForceLabel(this._m_force.getActualForce());

      this._m_forceSlider.setValue(this._m_force.getMaxMagnitude());

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

    this._m_force = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force.
   */
  private _m_force: ForceConstant;

  // UI Elements.

  private _m_box: UIBox;

  private _m_title: UILabel;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}