import { BaseActor } from "../../../actors/baseActor";
import { ST_COMPONENT_ID, ST_TEXT_TYPE } from "../../../commons/stEnums";
import { Ty_Sprite } from "../../../commons/stTypes";
import { CmpForceController } from "../../../components/cmpforceController";
import { UIBox } from "../uiBox";
import { UILabel } from "../uiLabel";
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

    if(_target !== undefined)
    {

      this.setActor(_target);

    }
    else
    {

      this._m_target = undefined;
      this._m_forceController = undefined;

    }    

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

    // Box Title

    const title = new UILabel
    (
      0, 
      0, 
      _scene, 
      "Force Controller",
      ST_TEXT_TYPE.H2 
    );

    box.add(title);

    // Actor Name

    this._ui_actorName = new UILabel
    (
      0,
      0, 
      _scene, 
      "Name: ",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_actorName);

    // Actual Speed

    this._ui_actualSpeed = new UILabel
    (
      0,
      0,
      _scene,
      "Speed: 0.0 au/secs.",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_actualSpeed);

    // Max Speed Label

    this._ui_maxSpeed = new UILabel
    (
      0,
      0,
      _scene,
      "Max. Speed: 0.0 au/secs.",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_maxSpeed);

    // Max Speed Slider

    this._ui_maxSpeedSlider = new UISlider
    (
      0,
      0,
      _scene,
      0,
      100
    );

    box.add(this._ui_maxSpeedSlider);

    // Mass Label

    this._ui_mass = new UILabel
    (
      0,
      0,
      _scene,
      "Mass: 0.0 tg",
      ST_TEXT_TYPE.Normal
    );

    box.add(this._ui_mass);

    // Mass Slider

    this._ui_massSlider = new UISlider
    (
      0,
      0,
      _scene,
      0,
      10
    );

    box.add(this._ui_massSlider);

    return;

  }

  setActor(_actor: BaseActor<Ty_Sprite>)
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

    this._m_forceController = _actor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    // TODO

    return;

  }

  disableUI()
  : void
  {

    // TODO

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

  private _ui_maxSpeedSlider;

  private _ui_actualSpeed: UILabel;

}