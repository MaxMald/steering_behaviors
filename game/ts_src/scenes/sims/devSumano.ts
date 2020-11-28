/**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file devSumano.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

 import { BaseActor } from "../../actors/baseActor";
 import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
 import { Ty_Sprite, V2 } from "../../commons/stTypes";
 import { CmpForceController } from "../../components/cmpforceController";
 import { CmpSpriteController } from "../../components/cmpSpriteController";
import { ShipFactory } from "../../factories/shipFactory";
 import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UISimulationController } from "../../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../../managers/uiManager/uiManager";
 import { Master } from "../../master/master";
import { FollowPathForce } from "../../steeringBehavior/forceFollowPath";
import { PursueForce } from "../../steeringBehavior/forcePursue";
 import { SeekForce } from "../../steeringBehavior/forceSeek";
import { WanderForce } from "../../steeringBehavior/forceWander";
 
  
 export class ScnDevSumano 
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

     ///////////////////////////////////
     // Active Debugging
 
     master.enableDebugging();
 
     // on simulation scene create.
 
     master.onSimulationSceneCreate(this);
 
     
 
     // Get simulation manager.
 
     let simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     ///////////////////////////////////
     // Create Sprites and Actors
 
     let fleeActor0 = ShipFactory.CreateBlueShip(this, "Blue Ship");
     let pursueActor0 = ShipFactory.CreateRedShip(this, "Red Ship");
     
     this._m_shipP0 = pursueActor0;
     this._m_ship1 = fleeActor0;
 
     // Add ship to simulation manager.
 
     simManager.addActor(pursueActor0);
     simManager.addActor(fleeActor0);
 
     // Set the max speeds

     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 100);
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 80);
 
     // Get canvas data
     let canvas = this.game.canvas;
 
     let width : number = canvas.width;
     let height : number = canvas.height;
 
     // Set Positions
     pursueActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.45, height * 0.45)
     );

    fleeActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.55, height * 0.55)
     );
 
     // Create Force controlers

     let forceControlP = pursueActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let forceControlF = fleeActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create path sprites and array to follow

     let pathActor0 = ShipFactory.CreateRedShip(this, 'path0');
     let pathActor1 = ShipFactory.CreateRedShip(this, 'path1');
     let pathActor2 = ShipFactory.CreateRedShip(this, 'path2');
     let pathActor3 = ShipFactory.CreateRedShip(this, 'path3');
     let pathActor4 = ShipFactory.CreateRedShip(this, 'path4');
     let pathActor5 = ShipFactory.CreateRedShip(this, 'path5');
     let pathActor6 = ShipFactory.CreateRedShip(this, 'path6');
     let pathActor7 = ShipFactory.CreateRedShip(this, 'path7');

     pathActor0.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor1.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor2.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor3.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor4.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor5.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor6.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor7.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));

     pathActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.1, height * 0.1)
     );
     
     pathActor1.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.33, height * 0.5)
     );

     pathActor2.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.1, height * 0.9)
     );

     pathActor3.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.75, height * 0.5)
     );

     pathActor4.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.8)
     );

     pathActor5.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.9, height * 0.9)
     );

     pathActor6.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.9, height * 0.1)
     );

     pathActor7.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.33)
     );

     let pathArray : Ty_Sprite[] = new Array
     (
       pathActor0.getWrappedInstance(),
       pathActor1.getWrappedInstance(),
       pathActor2.getWrappedInstance(),
       pathActor3.getWrappedInstance(),
       pathActor4.getWrappedInstance(),
       pathActor5.getWrappedInstance(),
       pathActor6.getWrappedInstance(),
       pathActor7.getWrappedInstance());
     // Create Forces

     let followPath0 : FollowPathForce = new FollowPathForce();
     let followPath1 : FollowPathForce = new FollowPathForce();

     followPath0.init(pursueActor0.getWrappedInstance(), pathArray, 200, 30, forceControlP, 0, true);
     followPath1.init(fleeActor0.getWrappedInstance(), pathArray, 150, 15, forceControlF, 2);
 
     // Add forces to controler
     forceControlP.addForce('path_0', followPath0);
     forceControlF.addForce('path_1', followPath1);
 
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
    
    uiManager.setTarget(pursueActor0);
    
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
 
   private _m_ship1 : BaseActor<Ty_Sprite>;

   private _m_shipP0 : BaseActor<Ty_Sprite>;
 
   private _m_master : Master;
 }