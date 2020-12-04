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
import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { Ty_Sprite } from "../../commons/stTypes";
import { CmpForceController } from "../../components/cmpforceController";
import { AmbienceFactory } from "../../factories/ambienceFactory";
import { ShipFactory } from "../../factories/shipFactory";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIForceController } from "../../managers/uiManager/uiControllers/UIForceController";
import { UIMessageBox } from "../../managers/uiManager/uiControllers/UIMessageBox";
import { UISimulationController } from "../../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../../managers/uiManager/uiManager";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant";
import { FollowPathForce } from "../../steeringBehavior/forceFollowPath";
import { SeekForce } from "../../steeringBehavior/forceSeek";
 
  
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
 
     /****************************************************/
     /* Space Ship                                       */
     /****************************************************/
 
     // Get simulation manager.
 
     const simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
     
     const blueShip = ShipFactory.CreateBlueShip(this, "Blue Ship");
 
     // Add ship to simulation manager.
 
     simManager.addActor(blueShip);

     /****************************************************/
     /* Nodes                                            */
     /****************************************************/

     const canvas = this.game.canvas;
 
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
      hWidth,
      20,
      this
    );

    // Add UI force controller to the UI Manager.

    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    uiManager.addUIController("forceUI", uiForceController);

    uiManager.addUIController("messageBox", uiMessageBox);

    uiManager.addUIController("mediaSimUI", uiSimController);

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