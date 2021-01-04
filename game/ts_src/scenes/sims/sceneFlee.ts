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
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { MapScene } from "../../gameScene/mapScene";
import { AmbienceManager } from "../../managers/ambienceManager/ambienceManager";
import { DebugManager } from "../../managers/debugManager/debugManager";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIInfoBox } from "../../managers/uiManager/uiControllers/UIInfoBox";
import { UIManager } from "../../managers/uiManager/uiManager";
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

    // Camera fade in

    this.cameras.main.fadeIn(500, 0, 0, 0);

    ///////////////////////////////////
    // Master Manager

    this._m_master = Master.GetInstance();

    const master = this._m_master;

    // Master callback: "onSceneCreate" for each manager.

    master.onSceneCreate(this);

    // On simulation scene create.

    master.onSimulationSceneCreate(this);

    
     /****************************************************/
     /* Ambient                                          */
     /****************************************************/

     const ambienceMap = MapScene.CreateFromTiledMap("ambience_02", this);

     ambienceMap.clear();
     ambienceMap.destroy();

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
      new Phaser.Math.Vector2(width * 0.5, height * 0.45)
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
      new Phaser.Math.Vector2(width * 0.5, height * 0.65)
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

    /****************************************************/
     /* Foreground Ambience                              */
     /****************************************************/

     const ambienceMng = master.getManager<AmbienceManager>
     (
       ST_MANAGER_ID.kAmbienceManager
     );

     ambienceMng.createStarDust(this);

    /****************************************************/
    /* Debug Manager                                    */
    /****************************************************/

    const debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    debugManager.prepareDebugManager(this);
    
    /****************************************************/
     /* UI                                               */
     /****************************************************/    
    
    // Get UI Manager
    
    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    // Create the Simulation Map Scene

    SceneUIFactory.CreateSimulationUIScene
    (
      "simulation_ui",
      this,
      uiManager,
      this._openSceneInfo,
      this
    );

    // Set the active actor of the UI Manager.

    uiManager.setTarget(shipActor);

    // Display info

    this._openSceneInfo();
    
    ///////////////////////////////////
    // Set simulation to stop state
 
    this._m_master.stopSimulation();
    
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

  /**
    * Open the scene information box.
    */
   private _openSceneInfo()
   : void
   {

    // Pause Simulation.

    const master = this._m_master;

    master.pauseSimulation();

    // Get the UI Manager.

    const uiManger = master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    // Get the info box.

    const infoBox = uiManger.getUIController("infoBox") as UIInfoBox;

    // Set the book.

    infoBox.setBook("flee");

    // Open info box.

    infoBox.open();

    return;

   }
  
  private _m_master : Master;
}