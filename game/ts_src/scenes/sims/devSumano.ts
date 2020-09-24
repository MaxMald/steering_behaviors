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
 
     
 
     // Get simulation manager.
 
     let simManager : SimulationManager = master.getManager<SimulationManager>
     (
       ST_MANAGER_ID.kSimManager
     );
 
     ///////////////////////////////////
     // Create Sprites and Actors
 
     let shipSprtP0 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let seekSprt0 : Ty_Sprite = this.add.sprite(0, 0, 'space_ship');
     let fleeSprt0 : Ty_Sprite = this.add.sprite(0, 0, 'space_ship');

     shipSprtP0.setTint(5, 5, 5, 5);
     //shipSprt0.setTint(0, 0, 0, 255);
     //shipSprt1.setTint(255, 255, 255, 255);
 
     let seekActor0 = BaseActor.Create<Ty_Sprite>(seekSprt0, 'SpaceShip');
     let fleeActor0 = BaseActor.Create<Ty_Sprite>(fleeSprt0, 'SpaceShip0');
     let pursueActor0 = BaseActor.Create<Ty_Sprite>(shipSprtP0, 'SpaceShipP0');
     
     this._m_shipP0 = pursueActor0;
     this._m_ship0 = seekActor0;
     this._m_ship1 = fleeActor0;
 
     // Add ship to simulation manager.
 
     simManager.addActor(pursueActor0);
     simManager.addActor(seekActor0);
     simManager.addActor(fleeActor0);
 
     // Create and init components.
 
     pursueActor0.addComponent(new CmpSpriteController());
     pursueActor0.addComponent(new CmpForceController());

     seekActor0.addComponent(new CmpSpriteController());
     seekActor0.addComponent(new CmpForceController());

     fleeActor0.addComponent(new CmpSpriteController());
     fleeActor0.addComponent(new CmpForceController());

     // Init Actors
 
     seekActor0.init();    
     fleeActor0.init();    
     pursueActor0.init();
 
     // Set the max speeds

     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 250);
     seekActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 200);
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 200);

     // Set the scales

     pursueActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.125, 0.125)
     );

     seekActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.1, 0.1)
     );
     
     fleeActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.2, 0.2)
     );
 
     // Obtain canvas data
     let canvas = this.game.canvas;
 
     let width : number = canvas.width;
     let height : number = canvas.height;
 
     // Set Positions
     seekActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.535, height * 0.75)
     );

     pursueActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.825, height * 0.25)
     );

    fleeActor0.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.25, height * 0.25)
     );

     // Set masses

     seekActor0.sendMessage(ST_MESSAGE_ID.kSetMass,   50);
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMass,   50);
     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMass, 50);
 
     // Create Force controlers

     let forceControlP = pursueActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let forceControlS = seekActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let forceControlF = fleeActor0.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Forces

     //// Seek-s & Flee-s
     let flee : SeekForce = new SeekForce();
     flee.init(fleeSprt0, shipSprtP0, -100);

     let seek0 : SeekForce = new SeekForce();
     seek0.init(seekSprt0, shipSprtP0, 100);

     let seek1 : SeekForce = new SeekForce();
     seek1.init(fleeSprt0, seekSprt0, 100);
     
     //// Pursue / Evade

     let pursue : PursueForce = new PursueForce();
     let evade : PursueForce = new PursueForce();

     pursue.init
     (
      shipSprtP0,
      fleeSprt0,
      250,
      10,
      fleeActor0.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );

     evade.init
     (
      shipSprtP0,
      seekSprt0,
      -100,
      5,
      seekActor0.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );
 
     // Add forces to controler
     forceControlP.addForce('pursue_0', pursue );
     forceControlP.addForce('evade_0', evade );
     forceControlF.addForce('flee_0', flee );
     forceControlF.addForce('seek_1', seek1 );
     forceControlS.addForce('seek_0', seek0)
 
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