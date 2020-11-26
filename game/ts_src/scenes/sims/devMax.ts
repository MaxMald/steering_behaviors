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
 import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
 import { Ty_Sprite, V2 } from "../../commons/stTypes";
 import { CmpForceController } from "../../components/cmpforceController";
 import { CmpSpriteController } from "../../components/cmpSpriteController";
 import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIDialogBox } from "../../managers/uiManager/uiControllers/UIDialogBox";
import { UIForceController } from "../../managers/uiManager/uiControllers/UIForceController";
import { UIMessageBox } from "../../managers/uiManager/uiControllers/UIMessageBox";
import { UISimulationController } from "../../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../../managers/uiManager/uiManager";
import { UIObject } from "../../managers/uiManager/uiObject";
import { UISlider } from "../../managers/uiManager/uiSlider";
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
 
     let shipSprite : Ty_Sprite = this.add.sprite( 0, 0, 'game_art', 'blueShip.png');
 
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
     // Create Target
 
     this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
 
     this._m_target_position = new Phaser.Math.Vector2();
 
     let targetSprite = this.add.sprite(0, 0, 'game_art', 'redShip.png');
 
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
     // UI

    const uiForceController = new UIForceController
    (
      20,
      20,
      this
    );

    const uiMessageBox = UIMessageBox.CreateYesNo
    (
      400,
      200,
      this,
      "Hello World",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      function(_buttonKey)
      {
        return;
      },
      this
    );

    const uiSimController = UISimulationController.CreateSimControlBox
    (
      width * 0.5,
      20,
      this
    );

    // Add UI force controller to the UI Manager.

    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    uiManager.addUIController("forceUI", uiForceController);

    uiManager.addUIController("messageBox", uiMessageBox);

    uiManager.addUIController("mediaSimUI", uiSimController);

    // Set the active actor of the UI Manager.

    uiManager.setTarget(shipActor);

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
     let y = 300 * Math.cos(_time * 0.001);
 
     this._m_target_position.setTo
     (
       this._m_target_center.x + x,
       this._m_target_center.y + y
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