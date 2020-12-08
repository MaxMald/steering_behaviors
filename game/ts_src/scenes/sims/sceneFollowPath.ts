/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file sceneFollowPath.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-03-2020
 */
import { BaseActor } from "../../actors/baseActor";
import { ST_COMPONENT_ID, ST_MANAGER_ID } from "../../commons/stEnums";
import { Ty_Sprite } from "../../commons/stTypes";
import { CmpForceController } from "../../components/cmpforceController";
import { AmbienceFactory } from "../../factories/ambienceFactory";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButtonImg } from "../../managers/uiManager/uiButtonImg";
import { UIManager } from "../../managers/uiManager/uiManager";
import { UIObject } from "../../managers/uiManager/uiObject";
import { Master } from "../../master/master";
import { FollowPathForce } from "../../steeringBehavior/forceFollowPath";
 
  
 export class SceneFollowPath 
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
 
     // Get simulation manager.
 
     const simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );

     // Get canvas size.
  
    let canvas = this.game.canvas;
  
    let width : number = canvas.width;
    let height : number = canvas.height;

     /****************************************************/
     /* Space Ship                                       */
     /****************************************************/
     
     const blueShip = ShipFactory.CreateBlueShip(this, "Blue Ship");
 
     // Add ship to simulation manager.
 
     simManager.addActor(blueShip);

     /****************************************************/
     /* Nodes                                            */
     /****************************************************/
 
     const hWidth : number = canvas.width * 0.5;
     const hHeight : number = canvas.height * 0.5;

     let startNode : BaseActor<Ty_Sprite> = undefined;
     let prevNode : BaseActor<Ty_Sprite> = undefined;

     const t = ( Phaser.Math.PI2 / 10);

     for(let i = 0; i < 10; ++ i )
     {

      const node = AmbienceFactory.CreateSatellite
      (
        hWidth + ( Math.sin(t * i) * 200 ),
        hHeight + ( Math.cos(t * i) * 200),
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
     /* Forces                                           */
     /****************************************************/
 
     const followPath = new FollowPathForce();

     followPath.init
     (
       blueShip,
       150,
       15,
       true
     );

     followPath.setStartNode(startNode);

     const blueShipFController = blueShip.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     blueShipFController.addForce("Follow Path", followPath);

    /****************************************************/
     /* UI                                               */
     /****************************************************/    
    
    // Get UI Manager
    
    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    // Create the Simulation Map Scene

    SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);

    // Set the active actor of the UI Manager.

    uiManager.setTarget(blueShip);

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