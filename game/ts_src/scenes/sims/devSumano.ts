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
 
     ///////////////////////////////////
     // Create SpaceShip Actor
 
     // Get simulation manager.
 
     let simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     // Step I : Create Phaser GameObject
 
     let shipSprtP0 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     //let shipSprt0 : Ty_Sprite = this.add.sprite(0, 0, 'space_ship');
     let fleeSprt0 : Ty_Sprite = this.add.sprite(0, 0, 'space_ship');

     shipSprtP0.setTint(5, 5, 5, 5);
     //shipSprt0.setTint(0, 0, 0, 255);
     //shipSprt1.setTint(255, 255, 255, 255);
 
     //let shipActor0 = BaseActor.Create<Ty_Sprite>(shipSprt1, 'SpaceShip');
     let FleeActor = BaseActor.Create<Ty_Sprite>(fleeSprt0, 'SpaceShip0');
     let shipActorP0 = BaseActor.Create<Ty_Sprite>(shipSprtP0, 'SpaceShipP0');
     
     this._m_shipP0 = shipActorP0;
     //this._m_ship0 = shipActor1;
     this._m_ship1 = FleeActor;
 
     // Add ship to simulation manager.
 
     simManager.addActor(shipActorP0);
     //simManager.addActor(shipActor0);
     simManager.addActor(FleeActor);
 
     // Create and init components.
 
     shipActorP0.addComponent(new CmpSpriteController());
     shipActorP0.addComponent(new CmpForceController());

     //shipActor0.addComponent(new CmpSpriteController());
     //shipActor0.addComponent(new CmpForceController());

     FleeActor.addComponent(new CmpSpriteController());
     FleeActor.addComponent(new CmpForceController());

     // Init Actors
 
     //shipActor0.init();    
     FleeActor.init();    
     shipActorP0.init();
 
     // Set the max speeds

     shipActorP0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 80);
     //shipActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 200);
     FleeActor.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 50);

     // Set the scales

     shipActorP0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.125, 0.125)
     );

    //  shipActor0.sendMessage
    //  (
    //    ST_MESSAGE_ID.kSetScale,
    //    new Phaser.Math.Vector2(0.1, 0.1)
    //  );
     
    FleeActor.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.2, 0.2)
     );
 
     // Obtain canvas data
     let canvas = this.game.canvas;
 
     let width : number = canvas.width;
     let height : number = canvas.height;
 
     // Set Positions
     shipActorP0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.735, height * 0.75)
     );

    //  shipActor0.sendMessage
    //  (
    //    ST_MESSAGE_ID.kSetPosition,
    //    new Phaser.Math.Vector2(width * 0.25, height * 0.25)
    //  );

    FleeActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.25, height * 0.25)
     );

     // Set masses

     //shipActor0.sendMessage(ST_MESSAGE_ID.kSetMass, 10);
     FleeActor.sendMessage(ST_MESSAGE_ID.kSetMass, 10);
     shipActorP0.sendMessage(ST_MESSAGE_ID.kSetMass, 10);
 
     // Create Force controlers

     let forceControlP = shipActorP0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

    //  let forceControl = shipActor0.getComponent<CmpForceController>
    //  (
    //    ST_COMPONENT_ID.kForceController
    //  );

     let forceControlF = FleeActor.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Forces

     //// Seek-s & Flee-s
     let flee : SeekForce = new SeekForce();
     flee.init(fleeSprt0, shipSprtP0, -100);

     let seek0 : SeekForce = new SeekForce();
     //seek0.init(shipSprt0, shipSprtP0, 100);

     let seek1 : SeekForce = new SeekForce();
     //seek1.init(shipSprt1, shipSprt0, 100);
     
     //// Pursue / Evade

     let pursue : PursueForce = new PursueForce();
     let evade : PursueForce = new PursueForce();

     pursue.init
     (
      shipSprtP0,
      fleeSprt0,
      250,
      10,
      FleeActor.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );

    //  evade.init
    //  (
    //   shipSprtP0,
    //   shipSprt1,
    //   -100,
    //   5,
    //   shipActor1.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
    //  );
 
     // Add forces to controler
     forceControlP.addForce('pursue_1', pursue );
     forceControlF.addForce('flee_1', flee );
 
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
 
   private _m_ship0 : BaseActor<Ty_Sprite>;
 
   private _m_ship1 : BaseActor<Ty_Sprite>;

   private _m_shipP0 : BaseActor<Ty_Sprite>;
 
   private _m_master : Master;
 }