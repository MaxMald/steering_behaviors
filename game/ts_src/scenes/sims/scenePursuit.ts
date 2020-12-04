/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file scenePursuit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-29-2020
 */

import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButtonImg } from "../../managers/uiManager/uiButtonImg";
import { UIForceController } from "../../managers/uiManager/uiControllers/UIForceController";
import { UIMessageBox } from "../../managers/uiManager/uiControllers/UIMessageBox";
import { UISimulationController } from "../../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../../managers/uiManager/uiManager";
import { UIObject } from "../../managers/uiManager/uiObject";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant";
import { PursueForce } from "../../steeringBehavior/forcePursue";

export class ScenePursuit
  extends Phaser.Scene
{

  create()
  : void
  {

    ///////////////////////////////////
    // Master Manager
 
    this._m_master = Master.GetInstance();
 
    let master = this._m_master;
 
    // on simulation scene create.
 
    master.onSimulationSceneCreate(this);

    // Get simulation manager.
 
    let simManager : SimulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    // Get canvas size.
  
    let canvas = this.game.canvas;
  
    let width : number = canvas.width;
    let height : number = canvas.height;

    ///////////////////////////////////
    // Create scene buttons

    let mainMenuButton : UIButtonImg = UIButtonImg.CreateHomeButtonImg
    (
      width * 0.9,
      height * 0.1,
      this
    );

    mainMenuButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButtonImg;

        master.onSimulationSceneDestroy(this);
    
        this.scene.start('main_menu');
      },
      this
    );

    /****************************************************/
    /* Red Ship                                         */
    /****************************************************/

    const targetActor =  ShipFactory.CreateRedShip
    (
      this,
      "Red Ship"
    );
 
    // Add target to simulation manager.
 
    simManager.addActor(targetActor);

    // Create the target force controller.

    const targetFController = targetActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    // Create Constant force.

    const constantForce = new ForceConstant();

    constantForce.init
    (
      targetActor.getWrappedInstance(),
      new Phaser.Math.Vector2(0.4, 0.85),
      300,
      true 
    );

    targetFController.addForce("constant", constantForce);

    // Set target scale.

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.0
    );

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      300
    );
    
    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.5)
     );

    /****************************************************/
    /* Blue Ship                                        */
    /****************************************************/

    ///////////////////////////////////
    // Create SpaceShip Actor
    
    const blueShip = ShipFactory.CreateBlueShip(this, "Blue Ship");
 
    // Add ship to simulation manager.
 
    simManager.addActor(blueShip);

    const blueFController = blueShip.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    const pursuitForce = new PursueForce();

    pursuitForce.init
    (
      blueShip,
      targetActor,
      300
    );

    blueFController.addForce("pursuit", pursuitForce);    

    /****************************************************/
    /* UI                                               */
    /****************************************************/

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

     ///////////////////////////////////
     // Set Target

     uiManager.setTarget(blueShip);

    return;

  }

  update(_time : number, _delta : number)
   : void
   {
     
    // Update Master
 
     this._m_master.update(_time, _delta * 0.001);
 
     return;

   }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_master : Master;

}