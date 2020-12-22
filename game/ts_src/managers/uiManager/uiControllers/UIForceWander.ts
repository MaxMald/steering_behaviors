/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary UI Force for the Wander scene.
 *
 * @file UIForceWander.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since December-01-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { WanderForce } from "../../../steeringBehavior/forceWander";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceWander
extends UIForce
{

  constructor(_scene: Phaser.Scene)
  {

    super();

    // Create the box
    
    const box = UIBox.CreateForceBox(0,0,_scene);

    box.setClearBox(true);

    box.setPadding(0);

    this._m_box = box;    

    // Title

    const title = UILabel.CreateStyleB(0, 0, _scene, "Wander Force", 25);

    title.setTint(ST_COLOR_ID.kGold);

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
      "UIForceWander",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const maxMagnitude = slider.getValue();

        this.setMaximumMagnitudeLabel(maxMagnitude);

        if(this._m_wander !== undefined)
        {

          this._m_wander.setMaxMagnitude(maxMagnitude);          

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

    if(this._m_wander !== undefined)
    {

      this.setForceLabel(this._m_wander.getActualForce());

      return;

    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

   const arrivalForce = _force as WanderForce;

   this._m_wander = arrivalForce;

    if(arrivalForce !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kWander)
      {

        throw new Error("UI Wander Force: Incorrect force.");

      }

      this.setForceLabel(arrivalForce.getActualForce());

      this._m_forceSlider.setValue(arrivalForce.getMaxMagnitude());

    }

    return;

  }

  onSimulationStop()
  : void
  {
    this._m_wander.setInitMaxMagnitude();
    
    this._m_forceSlider.setValue(this._m_wander.getInitMaxMagnitude());

    return;
  }

  setMaximumMagnitudeLabel(_maxForce: number)
  : void
  {

    this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toFixed(2) + " uN.");

    return;

  }

  setForceLabel(_force: number)
  :void
  {

    this._m_labelForce.setText("Force Magnitude: " + _force.toFixed(2) + " uN.");

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

    this._m_wander = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_wander: WanderForce;

  ////////////////////////////////////
  // UI Elements

  private _m_box: UIBox;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}