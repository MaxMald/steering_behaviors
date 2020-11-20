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
     fleeActor0.sendMessage(ST_MESSAGE_ID.kSetMass,   75);
     pursueActor0.sendMessage(ST_MESSAGE_ID.kSetMass, 75);
 
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

     let pathSprt0 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt1 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt2 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt3 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt4 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt5 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt6 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let pathSprt7 : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');

     let pathActor0 = BaseActor.Create(pathSprt0, 'path0');
     let pathActor1 = BaseActor.Create(pathSprt1, 'path1');
     let pathActor2 = BaseActor.Create(pathSprt2, 'path2');
     let pathActor3 = BaseActor.Create(pathSprt3, 'path3');
     let pathActor4 = BaseActor.Create(pathSprt4, 'path4');
     let pathActor5 = BaseActor.Create(pathSprt5, 'path5');
     let pathActor6 = BaseActor.Create(pathSprt6, 'path6');
     let pathActor7 = BaseActor.Create(pathSprt7, 'path7');

     pathActor0.addComponent(new CmpSpriteController());
     pathActor1.addComponent(new CmpSpriteController());
     pathActor2.addComponent(new CmpSpriteController());
     pathActor3.addComponent(new CmpSpriteController());
     pathActor4.addComponent(new CmpSpriteController());
     pathActor5.addComponent(new CmpSpriteController());
     pathActor6.addComponent(new CmpSpriteController());
     pathActor7.addComponent(new CmpSpriteController());

     pathActor0.init();
     pathActor1.init();
     pathActor2.init();
     pathActor3.init();
     pathActor4.init();
     pathActor5.init();
     pathActor6.init();
     pathActor7.init();

     pathActor0.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor1.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor2.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor3.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor4.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor5.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor6.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
     pathActor7.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));

     pathActor0.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.1, height * 0.1));
     pathActor1.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.33, height * 0.5));
     pathActor2.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.1, height * 0.9));
     pathActor3.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.75, height * 0.5));
     pathActor4.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.5, height * 0.8));
     pathActor5.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.9, height * 0.9));
     pathActor6.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.9, height * 0.1));
     pathActor7.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(
                                                        width * 0.5, height * 0.33));

     let pathArray : Ty_Sprite[] = new Array(pathSprt0, pathSprt1, pathSprt2, pathSprt3,
                                             pathSprt4, pathSprt5, pathSprt7, pathSprt6);
     // Create Forces

     let followPath0 : FollowPathForce = new FollowPathForce();
     let followPath1 : FollowPathForce = new FollowPathForce();

     followPath0.init(shipSprtP0 , pathArray, 200, 30, forceControlP, 0, true);
     followPath1.init(fleeSprt0 , pathArray, 150, 15, forceControlF, 2);
 
     // Add forces to controler
     forceControlP.addForce('path_0', followPath0);
     forceControlF.addForce('path_1', followPath1);
 
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