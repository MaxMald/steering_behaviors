/**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file devMax.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

 import { BaseActor } from "../../actors/baseActor";
 import { ST_COLOR_ID, ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID, ST_TEXT_TYPE } from "../../commons/stEnums";
 import { Ty_Sprite, V2 } from "../../commons/stTypes";
 import { CmpForceController } from "../../components/cmpforceController";
 import { CmpSpriteController } from "../../components/cmpSpriteController";
 import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIBox } from "../../managers/uiManager/uiBox";
import { UILabel } from "../../managers/uiManager/uiLabel";
import { UIObject } from "../../managers/uiManager/uiObject";
import { UISlider } from "../../managers/uiManager/uiSlider";
import { UISwitch } from "../../managers/uiManager/uiSwitch";
 import { Master } from "../../master/master";
 import { SeekForce } from "../../steeringBehavior/forceSeek";
 
  
 export class ScnDevMax 
 extends Phaser.Scene
 {
   /****************************************************/
   /* Public                                           */
   /****************************************************/
   
   create()
   : void
   {    
 
     ///////////////////////////////////
     // Master Manager
 
     this._m_master = Master.GetInstance();
 
     let master = this._m_master;
 
     // on simulation scene create.
 
     master.onSimulationSceneCreate(this);
 
     ///////////////////////////////////
     // Create SpaceShip Actor
 
     // Get simulation manager.
 
     let simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     // Step I : Create Phaser GameObject
 
     let shipSprite : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
 
     // Set II : create Actor.
 
     let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, 'SpaceShip');
     
     this._m_ship = shipActor;
 
     // Add ship to simulation manager.
 
     simManager.addActor(shipActor);
 
     // Create and init components.
 
     shipActor.addComponent(new CmpSpriteController());
     shipActor.addComponent(new CmpForceController());
 
     shipActor.init();
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       500
     );
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.2, 0.2)
     );
 
     let canvas = this.game.canvas;
 
     let width : number = canvas.width;
     let height : number = canvas.height;
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.5)
     );
     
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMass,
       1
     );

     ///////////////////////////////////
     // UI

    // Create switch

     const toggleButton = new UISwitch( width* 0.5, height * 0.5, this);

     toggleButton.subscribe("toggleOn", "maxScene", this._onToggleOn, this);
     toggleButton.subscribe("toggleOff", "maxScene", this._onToggleOff, this);
 
     const slider = new UISlider
     (
      width * 0.5,
      height * 0.5,
      this,
      10,
      50
     );

     // Create Slider

     slider.subscribe("valueChanged", "maxScene", this._onSliderChanged, this);

     // Create Text: H1

     const h1 = new UILabel
     (
       width,
       height,
       this,
       "Text: H1",
       ST_TEXT_TYPE.H1,
       ST_COLOR_ID.kBlack
     );

     // Create Text: H2

     const h2 = new UILabel
     (
       width,
       height,
       this,
       "Text: H2",
       ST_TEXT_TYPE.H2,
       ST_COLOR_ID.kBlue
     );

     // Create Text: H1

     const normalText = new UILabel
     (
       width,
       height,
       this,
       "Text: Normal",
       ST_TEXT_TYPE.Normal,
       ST_COLOR_ID.kRed
     );

     // Create Box Container

     const box = new UIBox(width * 0.5, height * 0.5, this);
     
     box.add(slider);

     box.add(toggleButton);

     box.add(h1);

     box.add(h2);

     box.add(normalText);

     box.setPadding(35);

     box.setElementsGap(10);

     ///////////////////////////////////
     // Create Target
 
     this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
 
     this._m_target_position = new Phaser.Math.Vector2();
 
     let targetSprite = this.add.sprite(0, 0, 'space_ship');
 
     let targetActor =  BaseActor.Create<Ty_Sprite>
     (
       targetSprite,
       'target'
     );
 
     this._m_target = targetActor;
 
     // Add target to simulation manager.
 
     simManager.addActor(targetActor);
 
     targetActor.addComponent(new CmpSpriteController());
 
     targetActor.init();    
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.1, 0.1)
     );
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.25)
     );
 
     ///////////////////////////////////
     // Create a Force
 
     // Step I : Create the force
 
     let seek : SeekForce = new SeekForce();
 
     seek.init
     (
       shipSprite,
       targetSprite,
       125
     );
 
     // Step II : Get Component
 
     let forceControl = shipActor.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );
 
     forceControl.addForce('seek_1', seek );
 
     ///////////////////////////////////
     // Active Debugging
 
     this._m_master.enableDebugging();
 
     return;
   }
 
   update(_time : number, _delta : number)
   : void
   {
     // Update Master
 
     this._m_master.update(_time, _delta * 0.001);
 
     // Target Oscillation 
 
     let x = 300 * Math.sin(_time * 0.001);
 
     this._m_target_position.setTo
     (
       this._m_target_center.x + x,
       this._m_target_center.y
     );
 
     this._m_target.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       this._m_target_position
     );
 
     return;
   }
 
   /****************************************************/
   /* Private                                          */
   /****************************************************/ 

   private _onToggleOn(_sender: UIObject, _args: any)
   : void
   {

    console.log("switch on");

    return;

   }

   private _onToggleOff(_sender: UIObject, _args: any)
   : void
   {

    console.log("switch off");

    return;

   }

   private _onSliderChanged(_sender: UIObject, _args: any)
   : void
   {

    const slider = _sender as UISlider;

    console.log(slider.getValue());

    return;

   }
 
   private _m_target_center : V2;
 
   private _m_target_position : V2;
 
   private _m_target : BaseActor<Ty_Sprite>;
 
   private _m_ship : BaseActor<Ty_Sprite>;
 
   private _m_master : Master;
 }