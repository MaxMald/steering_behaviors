import { BaseActor } from "../../../actors/baseActor";
import { ST_COMPONENT_ID, ST_TEXT_TYPE } from "../../../commons/stEnums";
import { Ty_Sprite } from "../../../commons/stTypes";
import { CmpForceController } from "../../../components/cmpforceController";
import { UIBox } from "../uiBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UIController } from "./UIController";

export class UIForceController
  extends UIController
{

  constructor
  (
    _x: number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _target ?: BaseActor<Ty_Sprite>
  )
  {

    super();

    ///////////////////////////////////
    // UI

    // Create box.

    const box = new UIBox
    (
      _x, 
      _y,
      _scene
    );

    box.setPadding(20);

    box.setElementsGap(5);

    this._ui_box = box;

    // Actor Name

    this._ui_actorName = new UILabel
    (
      0,
      0, 
      _scene, 
      "#",
      ST_TEXT_TYPE.H2
    );

    box.add(this._ui_actorName);

    // Actual Speed

    this._ui_actualSpeed = new UILabel
    (
      0,
      0,
      _scene,
      "#",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_actualSpeed);

    // Max Speed Label

    this._ui_maxSpeed = new UILabel
    (
      0,
      0,
      _scene,
      "#",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_maxSpeed);

    // Max Speed Slider

    this._ui_maxSpeedSlider = new UISlider
    (
      0,
      0,
      _scene,
      1,
      300
    );

    box.add(this._ui_maxSpeedSlider);

    this._ui_maxSpeedSlider.subscribe
    (
      "valueChanged", 
      "label",
      function(_sender : UIObject, _args)
      {

        const slider = _sender as UISlider;

        const maxSpeed = slider.getValue();

        this.setMaxSpeed(maxSpeed);

        if(this._m_forceController !== undefined)
        {

          this._m_forceController.setMaxSpeed(maxSpeed);

        }

        return;

      } ,
      this
    );

    // Mass Label

    this._ui_mass = new UILabel
    (
      0,
      0,
      _scene,
      "#",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_mass);

    // Mass Slider

    this._ui_massSlider = new UISlider
    (
      0,
      0,
      _scene,
      1,
      10
    );

    box.add(this._ui_massSlider);

    this._ui_massSlider.subscribe
    (
      "valueChanged", 
      "label",
      function(_sender : UIObject, _args)
      {

        const slider = _sender as UISlider;

        const mass = slider.getValue();

        this.setMass(mass);

        if(this._m_forceController !== undefined)
        {

          this._m_forceController.setMass(mass);

        }

        return;

      } ,
      this
    );

    ///////////////////////////////////
    // Actor

    this.setTarget(undefined);

    return;

  }

  update()
  : void
  {

    if(this._m_forceController !== undefined)
    {

      this.setActualSpeed(this._m_forceController.getSpeed());

    }

    return;

  }

  setTarget(_actor: BaseActor<Ty_Sprite>)
  : void
  {

    if(_actor === undefined)
    {

      this._m_target = undefined;

      this._m_forceController = undefined;

      this.disableUI();

      return;

    }

    this._m_target = _actor;

    const forceController = _actor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    this._m_forceController = forceController;

    // Actor Name.

    this.setActorName(_actor.getName());

    // Actor Mass.

    this._ui_massSlider.setValue(forceController.getMass());

    // Actor Max Speed.

    this._ui_maxSpeedSlider.setValue(forceController.getMaxSpeed());

    // Update box.

    this._ui_box.updateBox();

    return;

  }

  disableUI()
  : void
  {

    this.setActorName("");
    this.setActualSpeed(0);
    this.setMaxSpeed(0);
    this.setMass(0);

    return;

  }

  setActorName(_name: string)
  : void
  {

    this._ui_actorName.setText(_name);

    return;

  }

  setActualSpeed(_speed: number)
  : void
  {

    this._ui_actualSpeed.setText("Speed: " + _speed.toPrecision(3) + " km/secs. ");

    return;

  }

  setMaxSpeed(_speed: number)
  : void
  {

    this._ui_maxSpeed.setText("Max. Speed: " + _speed.toPrecision(3) + " km/secs. ");

    return;

  }

  setMass(_mass: number)
  : void
  {

    this._ui_mass.setText("Mass: " + _mass.toPrecision(3) + " tg.");

    return;

  }

  /**
  * Safely destroys the object.
  */
  public destroy()
  : void  
  {

    this._m_target = undefined;
    
    this._m_forceController = undefined;

    this._ui_box.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  // Target
  
  private _m_target: BaseActor<Ty_Sprite>;

  private _m_forceController: CmpForceController;

  // UI Objects

  private _ui_box: UIBox;

  private _ui_actorName: UILabel;

  private _ui_mass: UILabel;

  private _ui_massSlider: UISlider;

  private _ui_maxSpeed: UILabel;

  private _ui_maxSpeedSlider: UISlider;

  private _ui_actualSpeed: UILabel;

}