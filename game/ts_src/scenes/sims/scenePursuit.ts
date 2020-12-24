/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file scenePursuit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-29-2020
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
 
    const master = this._m_master;

    // Master callback: "onSceneCreate" for each manager.

    master.onSceneCreate(this);
 
    // on simulation scene create.
 
    master.onSimulationSceneCreate(this);

    /****************************************************/
     /* Ambient                                          */
     /****************************************************/

     const ambienceMap = MapScene.CreateFromTiledMap("ambience_04", this);

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

    /****************************************************/
    /* SSE Rhapsody Path                                */
    /****************************************************/
 
     const x : number = canvas.width * 0.6;
     const y : number = canvas.height * 0.65;

     let startNode : BaseActor<Ty_Sprite> = undefined;
     let prevNode : BaseActor<Ty_Sprite> = undefined;

     const t = ( Phaser.Math.PI2 / 4);

     for(let i = 0; i < 4; ++ i )
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
    /* SSE Rhapsody                                     */
    /****************************************************/

    const rhapsody =  ShipFactory.CreateYellowShip
    (
      this,
      "SSE Rhapsody"
    );
 
    // Add target to simulation manager.
 
    simManager.addActor(rhapsody);        

    // Set target scale.

    rhapsody.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      2.84
    );

    rhapsody.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      200
    );
 
    rhapsody.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.6, height * 0.6)
     );

     ///////////////////////////////////
     // Rhapsody Path Following

     const followPath = new FollowPathForce();

     followPath.init
     (
       rhapsody,
       2214,
       24,
       true
     );

     followPath.setForceToPathScale(14);

     followPath.setStartNode(startNode);

     const rhapsodyFController = rhapsody.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

     rhapsodyFController.addForce("Follow Path", followPath);

    /****************************************************/
    /* SS Nexus                                         */
    /****************************************************/

    ///////////////////////////////////
    // Create SpaceShip Actor
    
    const nexus = ShipFactory.CreateBlueShip(this, "ISS Nexus");
 
    // Add ship to simulation manager.
 
    simManager.addActor(nexus);

    nexus.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.12
    );

    const blueFController = nexus.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    const pursuitForce = new PursueForce();

    pursuitForce.init
    (
      nexus,
      rhapsody,
      1704
    );

    blueFController.addForce("pursuit", pursuitForce);
    
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

    uiManager.setTarget(nexus);

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

    infoBox.setBook("pursuit");

    // Open info box.

    infoBox.open();

    return;

   }

  private _m_master : Master;

}