import { BaseActor } from "../../../actors/baseActor";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { Ty_Sprite } from "../../../commons/stTypes";
import { CmpForceController } from "../../../components/cmpforceController";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UIButton } from "../uiButton";
import { UIButtonImg } from "../uiButtonImg";
import { UIComboBox } from "../uiComboBox";
import { UIImage } from "../uiImage";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UISpeedometer } from "../uiSpeedometer";
import { UIController } from "./UIController";
import { UIForce } from "./UIForce";
import { UIForceFactory } from "./UIForceFactory";
import { UIForceSeek } from "./UIForceSeek";

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

    const box = UIBox.CreateBorderBox
    (
      _x, 
      _y,
      _scene
    );    

    this._ui_box = box;

    box.setElementsGap(7.5);

    // Actor Name

    const actorName = UILabel.CreateStyleA(0, 0, _scene, "", 32 );

    this._ui_actorName = actorName;

    actorName.setTint(ST_COLOR_ID.kGold);

    box.add(actorName);

    // Separator

    box.add
    (
      new UIImage(0,0,_scene, "game_art", "separator_a.png")
    );

    // Speedometer 

    const speedometer = new UISpeedometer(0,0,_scene);

    this._ui_speedometer = speedometer;

    box.add(speedometer);

    // Actual Speed

    this._ui_actualSpeed = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._ui_actualSpeed.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(this._ui_actualSpeed);

    // Max Speed Label

    this._ui_maxSpeed = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._ui_maxSpeed.setTint(ST_COLOR_ID.kSkyBlueNeon);

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

    this._ui_mass = UILabel.CreateStyleB(0, 0, _scene, "#");

    this._ui_mass.setTint(ST_COLOR_ID.kSkyBlueNeon);

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

    // SteerForce Title

    const steerTitle = UILabel.CreateStyleB
    (
      0,
      0,
      _scene,
      "Steer Force",
      25  
    );

    box.add(steerTitle);

    // Separator

    box.add
    (
      new UIImage(0,0,_scene, "game_art", "separator_a.png")
    );

    steerTitle.setTint(ST_COLOR_ID.kGold);

    // Select Force Label

    const selectForce = UILabel.CreateStyleB
    (
      0,
      0,
      _scene,
      "Select Steer Force"
    );

    selectForce.setTint(ST_COLOR_ID.kSkyBlueNeon);

    box.add(selectForce);

    // Combo Box.

    const comboBox = new UIComboBox(0, 0, _scene);

    comboBox.updateCombo(["Option 1", "Option 2", "Option 3"]);

    box.add(comboBox);

    box.setLeftAlignment();

    ///////////////////////////////////
    // UI Force

    // Create UI force list

    const hUIForce = new Map<ST_STEER_FORCE, UIForce>();

    this._m_aUIForce = hUIForce;

    // Create each UI Force and add it to the box.

    this._addUIForce(ST_STEER_FORCE.kSeek, new UIForceSeek(_scene, undefined));

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

      // Update Active UI Force

      const activeUIForce = this._m_activeUIForce;
      
      if(activeUIForce !== undefined)
      {

        activeUIForce.update();

      }

    }

    this._updateSpeedometer();

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
      
      this.setActiveForce(undefined);

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

    // Forces

    let aForces: Map<string, IForce> = forceController.getForces();

    const scene = this.m_master.getSimulationScene();

    // Get the first force available.

    if(aForces.size > 0)
    {

      const force : IForce = aForces.values().next().value;

      this.setActiveForce
      (
        force
      );

    }

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
   * Set the active force.
   * 
   * @param _type the type of the force. 
   * @param _force the force.
   */
  setActiveForce(_force: IForce)
  : void
  {

    // Disable active UI Force.

    let activeForce = this._m_activeUIForce;

    if(activeForce !== undefined)
    {

      activeForce.getBox().disable();

      this._m_activeUIForce = undefined;

    }

    // Set Active.

    if(_force !== undefined)
    {

      activeForce = this._m_aUIForce.get(_force.getType() as ST_STEER_FORCE);

      if(activeForce === undefined)
      {

        throw new Error("UI Force does not exists!");

      }

      activeForce.getBox().enable();

      activeForce.setTarget(_force);

      this._m_activeUIForce = activeForce;

    };

    // Update box.

    this._ui_box.updateBox();

    return;

  }

  /**
  * Safely destroys the object.
  */
  destroy()
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

  private _addUIForce(_type: ST_STEER_FORCE, _uiForce: UIForce)
  : void
  {

    // Add UI Box to this UI Force Controller

    const box = _uiForce.getBox();

    this._ui_box.add(box);

    // ... and disable it!

    box.disable();    

    // Add to UI Force Map

    this._m_aUIForce.set(_type, _uiForce);

    return;

  }

  private _updateSpeedometer()
  : void
  {

    const forceController = this._m_forceController;

    if(forceController !== undefined)
    {      

      const t = forceController.getSpeed() / forceController.getMaxSpeed();

      this._ui_speedometer.updatePointerAngle(-180.0 * (1 - t));

    }
    else
    {

      this._ui_speedometer.updatePointerAngle(180.0);

    }

    return;

  }
  
  // Target
  
  private _m_target: BaseActor<Ty_Sprite>;

  private _m_forceController: CmpForceController;

  // Steer Force

  /**
   * Reference to the map of forces.
   */
  private _m_aUIForce : Map<ST_STEER_FORCE, UIForce>;

  /**
   * The active UI Force.
   */
  private _m_activeUIForce : UIForce;

  // UI Objects

  private _ui_speedometer: UISpeedometer;

  private _ui_box: UIBox;

  private _ui_actorName: UILabel;

  private _ui_mass: UILabel;

  private _ui_massSlider: UISlider;

  private _ui_maxSpeed: UILabel;

  private _ui_maxSpeedSlider: UISlider;

  private _ui_actualSpeed: UILabel;

}