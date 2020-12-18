import { BaseActor } from "../../../actors/baseActor";
import { ST_COLOR_ID, ST_COMPONENT_ID, ST_STEER_FORCE } from "../../../commons/stEnums";
import { Ty_Sprite } from "../../../commons/stTypes";
import { CmpForceController } from "../../../components/cmpforceController";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIBox } from "../uiBox/uiBox";
import { UIComboBox } from "../uiComboBox";
import { UILabel } from "../uiLabel";
import { UIObject } from "../uiObject";
import { UISlider } from "../uiSlider";
import { UISpeedometer } from "../uiSpeedometer";
import { UIController } from "./UIController";
import { UIForce } from "./UIForce";
import { UIForceArrival } from "./UIForceArrival";
import { UIForceEvade } from "./UIForceEvade";
import { UIForcePursuit } from "./UIForcePursuit";
import { UIForceObstacleAvoidance } from "./UIForceObstacleAvoidance";
import { UIForceSeek } from "./UIForceSeek";
import { UIForceWander } from "./UIForceWander";
import { UIForceFollowPath } from "./UIForceFollowPath";
import { UIForceConstant } from "./UIForceConstant";
import { UIForceFlee } from "./UIForceFlee";
import { MapScene } from "../../../gameScene/mapScene";
import { UIGroup } from "../uiGroup";
import { STRectangle } from "../../../commons/stRectangle";
import { UIImage } from "../uiImage";
import { MxListener } from "listeners/mxListener";
import { MxListenerManager } from "listeners/mxListenerManager";

/**
 * Events:
 * 
 * * targetChanged:
 * * forceChanged:
 */
export class UIForceController
  extends UIController
{

  constructor
  (
    _uiScene : MapScene,
    _scene : Phaser.Scene
  )
  {

    super();    

    ///////////////////////////////////
    // Listeners

    this._m_listeners = new MxListenerManager<UIForceController, any>();

    this._m_listeners.addEvent("targetChanged");
    this._m_listeners.addEvent("forceChanged");

    ///////////////////////////////////
    // UI

    // Create Group.

    const group = new UIGroup();

    this._ui_group = group;

    ///////////////////////////////////
    // Actor Name

    const actorName = _uiScene.getObject<UILabel>("ship_name");

    this._ui_actorName = actorName;

    group.add(actorName);

    ///////////////////////////////////
    // Speedometer 

    const speedometer = _uiScene.getObject<UISpeedometer>("speedometer");

    this._ui_speedometer = speedometer;

    group.add(speedometer);

    ///////////////////////////////////
    // Speed Label

    this._ui_actualSpeed = _uiScene.getObject<UILabel>("speed_label");

    group.add(this._ui_actualSpeed);

    ///////////////////////////////////
    // Max. Speed Label

    this._ui_maxSpeed = _uiScene.getObject<UILabel>("maxSpeed_label");

    group.add(this._ui_maxSpeed);

    ///////////////////////////////////
    // Max. Speed slider

    this._ui_maxSpeedSlider = _uiScene.getObject<UISlider>("maxSpeed_slider");

    group.add(this._ui_maxSpeedSlider);

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

    ///////////////////////////////////
    // Mass Label

    this._ui_mass = _uiScene.getObject<UILabel>("mass_label");

    group.add(this._ui_mass);

    ///////////////////////////////////
    // Mass Slider

    this._ui_massSlider = _uiScene.getObject<UISlider>("mass_slider");

    group.add(this._ui_massSlider);

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
    // UI Force Box

    const forceArea = _uiScene.getObject<STRectangle>("force_area");

    this._ui_box = UIBox.CreateContentBox(forceArea.x, forceArea.y, _scene);

    this._ui_box.setPadding(15, 20);

    ///////////////////////////////////
    // Force Combo Box

    // Select Force Label

    const selectForce = UILabel.CreateStyleB(0, 0, _scene, "Select Force");

    selectForce.setTint(ST_COLOR_ID.kSkyBlueNeon);

    this._ui_box.add(selectForce);

    // Combo Box

    const comboBox = new UIComboBox(0, 0, _scene);

    this._ui_forceComboBox = comboBox;

    comboBox.updateCombo(undefined);

    this._ui_box.add(comboBox);

    comboBox.subscribe
    (
      "selectionChanged", 
      "UIController",
      this._onForceComboBoxChanged,
      this
    );

    // Separator.

    this._ui_box.add(new UIImage(0, 0, _scene, "game_art", "separator_a.png"));

    ///////////////////////////////////
    // UI Force

    // Create UI force list

    const hUIForce = new Map<ST_STEER_FORCE, UIForce>();

    this._m_aUIForce = hUIForce;

    // Create each UI Force and add it to the box.

    this._addUIForce(ST_STEER_FORCE.kSeek, new UIForceSeek(_scene));
    this._addUIForce(ST_STEER_FORCE.kFlee, new UIForceFlee(_scene));
    this._addUIForce(ST_STEER_FORCE.kArrive, new UIForceArrival(_scene));
    this._addUIForce(ST_STEER_FORCE.kPursue, new UIForcePursuit(_scene));
    this._addUIForce(ST_STEER_FORCE.kEvade, new UIForceEvade(_scene));
    this._addUIForce(ST_STEER_FORCE.kWander, new UIForceWander(_scene));
    this._addUIForce(ST_STEER_FORCE.kObstacleAvoidance, new UIForceObstacleAvoidance(_scene));
    this._addUIForce(ST_STEER_FORCE.kFollowPath, new UIForceFollowPath(_scene));
    this._addUIForce(ST_STEER_FORCE.kConstant, new UIForceConstant(_scene));

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

    ///////////////////////////////////
    // Forces

    // update Force Combo Box

    this._updateForceComboBox(forceController);

    // Update box.

    this._ui_box.updateBox();

    ////////////////////////////////////
    // Callback

    this._m_listeners.call("targetChanged", this, undefined);

    return;

  }

  /**
   * Triggered whe the simulation had been stop. Called by the UIManager.
   */
  onSimulationStop()
  : void 
  {

    // Get the force controller.

    const forceController = this._m_forceController;

    // Get all forces the force controller has.

    const forces = forceController.getForces();

    // Get all the UI forces.

    const uiForces = this._m_aUIForce;

    // Actor Mass.

    this._ui_massSlider.setValue(forceController.getInitMass());

    // Actor Max Speed.

    this._ui_maxSpeedSlider.setValue(forceController.getInitMaxSpeed());

    forces.forEach(force => {
      uiForces.get(force.getType() as ST_STEER_FORCE).onSimulationStop();
    });
    
    return;

  }

  disableUI()
  : void
  {

    this.setActorName("");
    this.setActualSpeed(0);
    this.setMaxSpeed(0);
    this.setMass(0);
    this._ui_forceComboBox.updateCombo(undefined);

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

    this._ui_actualSpeed.setText("Speed: " + _speed.toFixed(3) + " km/secs. ");

    return;

  }

  setMaxSpeed(_speed: number)
  : void
  {

    this._ui_maxSpeed.setText("Max. Speed: " + _speed.toFixed(3) + " km/secs. ");

    return;

  }

  setMass(_mass: number)
  : void
  {

    this._ui_mass.setText("Mass: " + _mass.toFixed(3) + " tg.");

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

        console.error("UI Force does not exists.");

        this._m_activeUIForce = undefined;

        return;

      }

      activeForce.getBox().enable();

      activeForce.setTarget(_force);

      this._m_activeUIForce = activeForce;      

    };

    // Update box.

    this._ui_box.updateBox();

    this._m_listeners.call("forceChanged", this, undefined);

    return;

  }

  subscribe
  (
    _event: string, 
    _username: string,
    _fn: (_simulationManager: UIForceController, _args: any) => void,
    _context: any
  )
  : void
  {

    this._m_listeners.suscribe
    (
      _event, 
      _username,
      new MxListener<UIForceController, any>(_fn, _context), 
    );

    return;

  }

  unsubscribe
  (
    _event: string,
    _username: string
  )
  : void
  {

    this._m_listeners.unsuscribe
    (
      _event,
      _username
    );

    return;

  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void  
  {

    this._m_listeners.destroy();

    this._m_target = undefined;
    
    this._m_forceController = undefined;

    this._ui_group.destroy();

    this._ui_box.destroy();

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Update values of the Force Combo Box.
   * 
   * @param _forceController Force controller
   */
  private _updateForceComboBox(_forceController : CmpForceController)
  : void
  {

    const hForces = _forceController.getForces();

    const aForceName = new Array<string>();

    hForces.forEach
    (
      function(_value: IForce, _name: string)
      : void
      {

        aForceName.push(_name);

      }
    );

    this._ui_forceComboBox.updateCombo(aForceName);

    this._ui_forceComboBox.selectFirstOption();

    return;

  }

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

  private _onForceComboBoxChanged(_object : UIObject, _option: any)
  : void
  {

    if(_option !== undefined)
    {

      const forceName = _option as string;

      if(forceName !== "")
      {

        const forceController = this._m_forceController;

        if(forceController !== undefined)
        {

          this.setActiveForce(forceController.getForce(forceName));

          return;

        }

      }

    }

    this.setActiveForce(undefined);

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

  private _ui_forceComboBox: UIComboBox;

  private _ui_box: UIBox;

  private _ui_actorName: UILabel;

  private _ui_mass: UILabel;

  private _ui_massSlider: UISlider;

  private _ui_maxSpeed: UILabel;

  private _ui_maxSpeedSlider: UISlider;

  private _ui_actualSpeed: UILabel;

  private _ui_group: UIGroup;

  private _m_listeners: MxListenerManager<UIForceController, any>;

}