/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary UI Force for the Obstacle Avoidance scene.
 *
 * @file UIForceObstacleAvoidance.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since December-01-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { ObstacleAvoidanceForce } from "../../../steeringBehavior/forceObstacleAvoidance";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceObstacleAvoidance
extends UIForce
{

  constructor(_scene: Phaser.Scene)
  {

    super();

    // Create the box
    
    const box = UIBox.CreateForceBox(0,0,_scene);

    this._m_box = box;    

    // Title

    const title = UILabel.CreateStyleA(0, 0, _scene, "Obstacle Avoidance Force", 20);

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
      "UIForceObstacleAvoidance",
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

    if(this._m_obstacleAvoidance !== undefined)
    {

      this.setForceLabel(this._m_obstacleAvoidance.getActualForce());

      return;

    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

   const arrivalForce = _force as ObstacleAvoidanceForce;

   this._m_obstacleAvoidance = arrivalForce;

    if(arrivalForce !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kObstacleAvoidance)
      {

        throw new Error("UI Obstacle Avoidance Force: Incorrect force.");

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

    this._m_obstacleAvoidance = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_obstacleAvoidance: ObstacleAvoidanceForce;

  ////////////////////////////////////
  // UI Elements

  private _m_box: UIBox;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceSlider: UISlider;

}