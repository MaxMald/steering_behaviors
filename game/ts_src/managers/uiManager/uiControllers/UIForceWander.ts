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
      9999
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

    // Target Distance Label.

    this._m_targetDistanceLabel = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_targetDistanceLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._m_targetDistanceLabel);

    // Target Distance Slider.

    this._m_targetDistanceSlider = new UISlider
    (
      0,
      0,
      _scene,
      10,
      200
    );

    this._m_targetDistanceSlider.subscribe
    (
      "valueChanged",
      "UIForceWander",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const targetDistance = slider.getValue();

        this.setTargetDistanceLabel(targetDistance);

        if(this._m_wander !== undefined)
        {

          this._m_wander.setTargetDistance(targetDistance);          

        }

        return;

      },
      this
    );

    box.add(this._m_targetDistanceSlider);

    // Circle Radius Label.

    this._m_circleRadiusLabel = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_circleRadiusLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._m_circleRadiusLabel);

    // Maximum Force Slider.

    this._m_circleRadiusSlider = new UISlider
    (
      0,
      0,
      _scene,
      10,
      200
    );

    this._m_circleRadiusSlider.subscribe
    (
      "valueChanged",
      "UIForceWander",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const circleRadius = slider.getValue();

        this.setCircleRadiusLabel(circleRadius);

        if(this._m_wander !== undefined)
        {

          this._m_wander.setCircleRadius(circleRadius);          

        }

        return;

      },
      this
    );

    box.add(this._m_circleRadiusSlider);

    // Displacement Angle Label.

    this._m_displacementAngleLabel = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_displacementAngleLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._m_displacementAngleLabel);

    // Maximum Force Slider.

    this._m_displacementAngleSlider = new UISlider
    (
      0,
      0,
      _scene,
      0,
      360
    );

    this._m_displacementAngleSlider.subscribe
    (
      "valueChanged",
      "UIForceWander",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const displacementAngle = slider.getValue();

        this.setDisplacementAngleLabel(displacementAngle);

        if(this._m_wander !== undefined)
        {

          this._m_wander.setDisplacementAngle(displacementAngle);          

        }

        return;

      },
      this
    );

    box.add(this._m_displacementAngleSlider);

    // Angle Change Label.

    this._m_angleChangeLabel = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._m_angleChangeLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._m_angleChangeLabel);

    // Maximum Force Slider.

    this._m_angleChangeSlider = new UISlider
    (
      0,
      0,
      _scene,
      0,
      360
    );

    this._m_angleChangeSlider.subscribe
    (
      "valueChanged",
      "UIForceWander",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const angleChange = slider.getValue();

        this.setAngleChangeLabel(angleChange);

        if(this._m_wander !== undefined)
        {

          this._m_wander.setAngleChange(angleChange);          

        }

        return;

      },
      this
    );

    box.add(this._m_angleChangeSlider);

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

   const wanderForce = _force as WanderForce;

   this._m_wander = wanderForce;

    if(wanderForce !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kWander)
      {

        throw new Error("UI Wander Force: Incorrect force.");

      }

      this.setForceLabel(wanderForce.getActualForce());

      this._m_forceSlider.setValue(wanderForce.getMaxMagnitude());

      this._m_targetDistanceSlider.setValue(wanderForce.getTargetDistance());

      this._m_circleRadiusSlider.setValue(wanderForce.getCircleRadius());

      this._m_displacementAngleSlider.setValue(wanderForce.getDisplacementAngle());

      this._m_angleChangeSlider.setValue(wanderForce.getAngleChange());

    }

    return;

  }

  onSimulationStop()
  : void
  {
    this._m_wander.setInitMaxMagnitude();
    
    this._m_forceSlider.setValue(this._m_wander.getInitMaxMagnitude());

    this._m_wander.setInitTargetDistance();

    this._m_targetDistanceSlider.setValue(this._m_wander.getInitTargetDistance());

    this._m_wander.setInitCircleRadius();

    this._m_circleRadiusSlider.setValue(this._m_wander.getInitCircleRadius());

    this._m_wander.setInitDisplacementAngle();

    this._m_displacementAngleSlider.setValue(this._m_wander.getInitDisplacementAngle());

    this._m_wander.setInitAngleChange();

    this._m_angleChangeSlider.setValue(this._m_wander.getInitAngleChange());

    return;
  }

  setMaximumMagnitudeLabel(_maxForce: number)
  : void
  {

    this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toFixed(2) + " uN.");

    return;

  }

  setTargetDistanceLabel(_targetDistance: number)
  : void
  {

    this._m_targetDistanceLabel.setText("Distance to target: " + _targetDistance.toFixed(2) + " mts.");

    return;

  }

  setCircleRadiusLabel(_circleRadius: number)
  : void
  {

    this._m_circleRadiusLabel.setText("Circle radius: " + _circleRadius.toFixed(2) + " mts.");

    return;

  }

  setDisplacementAngleLabel(_displacementAngle: number)
  : void
  {

    this._m_displacementAngleLabel.setText("Displacement angle: " + _displacementAngle.toFixed(2) + " mts.");
    return;

  }

  setAngleChangeLabel(_angleChange: number)
  : void
  {

    this._m_angleChangeLabel.setText("Angle change: " + _angleChange.toFixed(2) + " mts.");

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

  private _m_box : UIBox;

  private _m_labelForce : UILabel;

  private _m_maxMagnitude : UILabel;

  private _m_targetDistanceLabel : UILabel;

  private _m_circleRadiusLabel : UILabel;

  private _m_displacementAngleLabel : UILabel;

  private _m_angleChangeLabel : UILabel;

  private _m_forceSlider : UISlider;

  private _m_targetDistanceSlider : UISlider;

  private _m_circleRadiusSlider : UISlider;

  private _m_displacementAngleSlider : UISlider;

  private _m_angleChangeSlider : UISlider;

}