/**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file sceneSeek.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

import { BaseActor } from "../../actors/baseActor";
import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { Ty_Sprite } from "../../commons/stTypes";
import { CmpForceController } from "../../components/cmpforceController";
import { AmbienceFactory } from "../../factories/ambienceFactory";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { MapScene } from "../../gameScene/mapScene";
import { AmbienceManager } from "../../managers/ambienceManager/ambienceManager";
import { DebugManager } from "../../managers/debugManager/debugManager";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIInfoBox } from "../../managers/uiManager/uiControllers/UIInfoBox";
import { UIManager } from "../../managers/uiManager/uiManager";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant";
import { FollowPathForce } from "../../steeringBehavior/forceFollowPath";
import { SeekForce } from "../../steeringBehavior/forceSeek";
 
  
 export class ScnSeek 
 extends Phaser.Scene
 {
   /****************************************************/
   /* Public                                           */
   /****************************************************/
   
   create()
   : void
   {    

    // Camera fade in

    this.cameras.main.fadeIn(500, 0, 0, 0, );
 
     ///////////////////////////////////
     // Master Manager
 
     this._m_master = Master.GetInstance();
 
     let master = this._m_master;

     // Master callback: "onSceneCreate" for each manager.

     master.onSceneCreate(this);
 
     // on simulation scene create.
 
     master.onSimulationSceneCreate(this);

     /****************************************************/
     /* Ambient                                          */
     /****************************************************/

    const ambienceMap = MapScene.CreateFromTiledMap("ambience_01", this);

    ambienceMap.clear();
    ambienceMap.destroy();

     /****************************************************/
     /* SS Nexus                                         */
     /****************************************************/
 
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
     
     const nexus = ShipFactory.CreateBlueShip(this, "ISS Nexus");
 
     // Add ship to simulation manager.
 
     simManager.addActor(nexus);

     nexus.sendMessage
     (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.6)
     );

     nexus.sendMessage
     (
       ST_MESSAGE_ID.kSetMass,
       3.17
     );

    /****************************************************/
    /* Scarlet Mist Path                                */
    /****************************************************/
 
    const x : number = canvas.width * 0.6;
    const y : number = canvas.height * 0.65;

    let startNode : BaseActor<Ty_Sprite> = undefined;
    let prevNode : BaseActor<Ty_Sprite> = undefined;

    const t = ( Phaser.Math.PI2 / 3);

    for(let i = 0; i < 3; ++ i )
    {

     const node = AmbienceFactory.CreateSatellite
     (
       x + ( Math.sin(t * i) * 200 ),
       y + ( Math.cos(t * i) * 200),
       this,
       "Satellite_" + i.toString() 
     );

     if(prevNode === undefined)
     {

       startNode = node;
       prevNode = node;

     }
     else
     {

       prevNode.setNext(node);
       node.setPrevious(prevNode);

       prevNode = node;

     }

    }

     /****************************************************/
     /* Scarlet Mist                                     */
     /****************************************************/

     const scarletMist =  ShipFactory.CreateRedShip
     (
       this,
       "Scarlet Mist"
     );
 
     // Add target to simulation manager.
 
     simManager.addActor(scarletMist);

     // Create the target force controller.

     const targetFController = scarletMist.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

    scarletMist.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.0
    );

    scarletMist.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      203
    );
 
    scarletMist.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.7, height * 0.6)
     );

     ///////////////////////////////////
     // Scarlet Mist Following

     const followPath = new FollowPathForce();

     followPath.init
     (
       scarletMist,
       2214,
       24,
       true
     );

     followPath.setForceToPathScale(14);

     followPath.setStartNode(startNode);

     const rhapsodyFController = scarletMist.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

     rhapsodyFController.addForce("Follow Path", followPath);
 
     ///////////////////////////////////
     // Create a Force
 
     // Step I : Create the force
 
     let seek : SeekForce = new SeekForce();
 
     seek.init
     (
       nexus.getWrappedInstance(),
       scarletMist.getWrappedInstance(),
       1940
     );
 
     // Step II : Get Component
 
     let forceControl = nexus.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );
 
     forceControl.addForce('Seek', seek );

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

     const uiMapScene: MapScene = SceneUIFactory.CreateSimulationUIScene
     (
       "simulation_ui", 
       this, 
       uiManager,
       this._openSceneInfo,
       this
      );

     // Set the active actor of the UI Manager.

     uiManager.setTarget(nexus);

     // Display Info

     this._openSceneInfo();

     ///////////////////////////////////
     // Stop Simulation
 
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

    infoBox.setBook("seek");

    // Open info box.

    infoBox.open();

    return;

   }
 
   private _m_master : Master;
 }