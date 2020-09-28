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
 import { SimulationManager } from "../../managers/simulationManager/simulationManager";
 import { Master } from "../../master/master";
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
 
     let shipSprtP0 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let fleeSprt0 : Ty_Sprite = this.add.sprite(0, 0, 'space_ship');
 
     let fleeActor0 = BaseActor.Create<Ty_Sprite>(fleeSprt0, 'SpaceShip0');
     let pursueActor0 = BaseActor.Create<Ty_Sprite>(shipSprtP0, 'SpaceShipP0');
     
     this._m_shipP0 = pursueActor0;
     this._m_ship1 = fleeActor0;
 
     // Add ship to simulation manager.
 
     simManager.addActor(pursueActor0);
     simManager.addActor(fleeActor0);
 
     // Create and init components.
 
     pursueActor0.addComponent(new CmpSpriteController());
     pursueActor0.addComponent(new CmpForceController());

     fleeActor0.addComponent(new CmpSpriteController());
     fleeActor0.addComponent(new CmpForceController());

     // Init Actors
 
     fleeActor0.init();    
     pursueActor0.init();
 
     // Set the max speeds

     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 100);
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 80);

     // Set the scales

     pursueActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.125, 0.125)
     );

     fleeActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.2, 0.2)
     );
 
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

     // Set masses
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMass,   35);
     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMass, 35);
 
     // Create Force controlers

     let forceControlP = pursueActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let forceControlF = fleeActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Forces

     //// Wander

     let wander : WanderForce = new WanderForce();
     wander.init(fleeSprt0, 150, 100, 5, 90, 100);
     
     //// Pursue 

     let pursue : PursueForce = new PursueForce();

     pursue.init
     (
      shipSprtP0,
      fleeSprt0,
      250,
      15,
      fleeActor0.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );
 
     // Add forces to controler
     forceControlP.addForce('pursue_0', pursue );
     forceControlF.addForce('wander_0', wander);
 
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