/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Scene for the Flee force behavior.
 *
 * @file sceneFlee.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-27-2020
 */

import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButton } from "../../managers/uiManager/uiButton";
import { UISimulationController } from "../../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../../managers/uiManager/uiManager";
import { UIObject } from "../../managers/uiManager/uiObject";
import { Master } from "../../master/master";
import { FleeForce } from "../../steeringBehavior/forceFlee";

 

 export class ScnFlee
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

    // On simulation scene create.

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

    let mainMenuButton : UIButton = UIButton.CreateThemeButton
    (
      width * 0.1,
      height * 0.9,
      this,
      'Main menu'
    );

    mainMenuButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButton;

        master.onSimulationSceneDestroy(this);
    
        this.scene.start('main_menu');
      },
      this
    );

    let debugButton : UIButton = UIButton.CreateColorButton
    (
      width * 0.9,
      height * 0.9,
      this,
      'Debug Gizmos big text',
      0x9000ff
    );

    debugButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButton;

        if(master.isDebugEnable())
        {
          master.disableDebugging();
        }
        else
        {
          master.enableDebugging();
        }
      },
      this
    );
    
    ///////////////////////////////////
    // Create SpaceShip Actor

    // Create Actor.

    let shipActor = ShipFactory.CreateBlueShip(this, "Blue Ship");

    // Add Actor to simulation manager.

    simManager.addActor(shipActor);

    // Set Actor initial speed.

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetSpeed,
      75
    );

    // Set Actor max speed.

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      75
    );
    
    // Set Actor position.
  
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.25)
    );

    ///////////////////////////////////
    // Create target Actor

    // Create Target.

    let targetActor = ShipFactory.CreateRedShip(this, "Red Ship");

    // Add Target to simulation manager.

    simManager.addActor(targetActor);

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      50
    );
    
    // Set Target position.
  
    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.5)
    );

    ///////////////////////////////////
    // Create a Force

    // Create the force.

    let flee : FleeForce = new FleeForce();

    // Init the force.

    flee.init
    (
      shipActor.getWrappedInstance(),
      targetActor.getWrappedInstance(),
      100
    );
    
    // Get Force Actor component.
    
    let shipController = shipActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    shipController.addForce('flee_1', flee);
    
    ///////////////////////////////////
    // UI
    const uiSimController = UISimulationController.CreateSimControlBox
    (
      width * 0.5,
      20,
      this
    );
    
    // Add UI force controller to the UI Manager.
    
    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);
    
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

     return;
   }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_master : Master;
}