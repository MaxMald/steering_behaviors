/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceArrival.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-27-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { ArrivalForce } from "../../../steeringBehavior/forceArrival";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceArrival
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

    const title = UILabel.CreateStyleA(0, 0, _scene, "Arrive Force", 25);

    title.setTint(ST_COLOR_ID.kGold);

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

        if(this._m_arrival !== undefined)
        {

          this._m_arrival.setMaxMagnitude(maxMagnitude);

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

    if(this._m_arrival !== undefined)
    {

      this.setForceLabel(this._m_arrival.getActualForce());

      return;

    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

   const arrivalForce = _force as ArrivalForce;

   this._m_arrival = arrivalForce;

    if(arrivalForce !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kArrive)
      {

        throw new Error("UI Arrive Force: Incorrect force.");

      }

      this.setForceLabel(arrivalForce.getActualForce());

      this._m_forceSlider.setValue(arrivalForce.getMaxMagnitude());

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

    this._m_arrival = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_arrival: ArrivalForce;

  ////////////////////////////////////
  // UI Elements

  private _m_box: UIBox;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}