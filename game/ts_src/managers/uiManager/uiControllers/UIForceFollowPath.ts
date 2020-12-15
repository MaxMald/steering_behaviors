/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceFollowPath.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-03-2020
 */

import { ST_COLOR_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { FollowPathForce } from "../../../steeringBehavior/forceFollowPath";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIForce } from "./UIForce";

export class UIForceFollowPath
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

    const title = UILabel.CreateStyleB(0, 0, _scene, "Follow Path Force", 25);

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
      "UIForceFollowPath",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const maxMagnitude = slider.getValue();

        this.setMaximumMagnitudeLabel(maxMagnitude);

        if(this._m_followPath !== undefined)
        {

          this._m_followPath.setMaxMagnitude(maxMagnitude);

        }

        return;

      },
      this
    );

    box.add(this._m_forceSlider);

    // Radius of vision label

    const visionLabel = UILabel.CreateStyleB(0, 0, _scene, "#");

    visionLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    this._m_visionLabel = visionLabel;

    box.add(visionLabel);

    // Force To Path Scale Slider.

    this._m_visionSlider = new UISlider
    (
      0,
      0,
      _scene,
      10,
      50
    );

    this._m_visionSlider.subscribe
    (
      "valueChanged",
      "UIForceFollowPath",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const vision = slider.getValue();

        this.setVisionRadiusLabel(vision);

        if(this._m_followPath !== undefined)
        {

          this._m_followPath.setVisionRadius(vision);

        }

        return;

      },
      this
    );

    box.add(this._m_visionSlider);

    // Force To Path Label

    const forcePathLabel = UILabel.CreateStyleB(0, 0, _scene, "Force to Path Scale");

    forcePathLabel.setTint(ST_COLOR_ID.kSkyBlueNeon);

    this._m_forceToPathLabel = forcePathLabel;

    box.add(forcePathLabel);

    // Force To Path Scale Slider.

    this._m_forceToPathSlider = new UISlider
    (
      0,
      0,
      _scene,
      1,
      10
    );

    this._m_forceToPathSlider.subscribe
    (
      "valueChanged",
      "UIForceFollowPath",
      function(_sender: UIObject, _args: any)
      {

        const slider = _sender as UISlider;

        const scale = slider.getValue();

        this.setForceToPathScaleLabel(scale);

        if(this._m_followPath !== undefined)
        {

          this._m_followPath.setForceToPathScale(scale);

        }

        return;

      },
      this
    );

    box.add(this._m_forceToPathSlider);

    // Set target.

    this.setTarget(undefined);

    return;

  }

  update()
  : void
  {

    if(this._m_followPath !== undefined)
    {

      this.setForceLabel(this._m_followPath.getActualForce());
    
    }

    return;

  }

  setTarget(_force: IForce)
  : void
  {   

    // Save value.

    this._m_followPath = _force as FollowPathForce;

    if(this._m_followPath !== undefined)
    {

      if(_force.getType() !== ST_STEER_FORCE.kFollowPath)
      {

        throw new Error("UI Follow Path Force: Incorrect force.");

      }

      this.setForceLabel(this._m_followPath.getActualForce());

      this._m_forceSlider.setValue(this._m_followPath.getMaxMagnitude());

      this._m_forceToPathSlider.setValue(this._m_followPath.getForceToPathScale());

      this._m_visionSlider.setValue(this._m_followPath.getVisionRadius());

    }

    return;

  }

  setMaximumMagnitudeLabel(_maxForce: number)
  : void
  {

    this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");

    return;

  }

  setForceToPathScaleLabel(_scale: number)
  : void
  {

    this._m_forceToPathLabel.setText("Force to Path Scale: " + _scale.toFixed(2) + " units.");

    return;

  }

  setVisionRadiusLabel(_vision: number)
  : void
  {

    this._m_visionLabel.setText("Radius of Vision: " + _vision.toFixed(2) + " km. ");

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

    this._m_followPath = undefined;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force.
   */
  private _m_followPath: FollowPathForce;

  // UI Elements.

  private _m_box: UIBox;

  private _m_title: UILabel;

  private _m_labelForce: UILabel;

  private _m_maxMagnitude: UILabel;

  private _m_forceToPathLabel: UILabel;

  private _m_visionLabel: UILabel;

  private _m_forceSlider: UISlider;

  private _m_forceToPathSlider: UISlider;

  private _m_visionSlider: UISlider;

}