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
 
     let shipSprite : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
     let shipSpriteP : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');
 
     // Set II : create Actor.
 
     let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, 'SpaceShip');
     let shipActorP = BaseActor.Create<Ty_Sprite>(shipSpriteP, 'SpaceShip');
     
     this._m_ship = shipActor;
     this._m_shipP = shipActorP;
 
     // Add ship to simulation manager.
 
     simManager.addActor(shipActor);
     simManager.addActor(shipActorP);
 
     // Create and init components.
 
     shipActor.addComponent(new CmpSpriteController());
     shipActor.addComponent(new CmpForceController());

     shipActorP.addComponent(new CmpSpriteController());
     shipActorP.addComponent(new CmpForceController());
 
     shipActor.init();
     shipActorP.init();
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       250
     );

     shipActorP.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       250
     );
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.1, 0.1)
     );

     shipActorP.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.2, 0.2)
     );
 
     let canvas = this.game.canvas;
 
     let width : number = canvas.width;
     let height : number = canvas.height;
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.5)
     );

     shipActorP.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.35, height * 0.75)
     );
     
     shipActor.sendMessage(ST_MESSAGE_ID.kSetMass, 20);

     shipActorP.sendMessage(ST_MESSAGE_ID.kSetMass, 20);
 
     ///////////////////////////////////
     // Create Target
 
     //this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
 
     //this._m_target_position = new Phaser.Math.Vector2();
 
     let targetSprite = this.add.sprite(0, 0, 'space_ship');
 
     let targetActor =  BaseActor.Create<Ty_Sprite>(targetSprite, 'target');
 
     this._m_target = targetActor;
 
     // Add target to simulation manager.
 
     simManager.addActor(targetActor);
 
     targetActor.addComponent(new CmpSpriteController());
     targetActor.addComponent(new CmpForceController());
 
     targetActor.init();    

     targetActor.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 200);
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetScale,
       new Phaser.Math.Vector2(0.1, 0.1)
     );
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.25, height * 0.25)
     );

     targetActor.sendMessage(ST_MESSAGE_ID.kSetMass, 20);

     

     let forceControl_t = targetActor.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let seek_t : SeekForce = new SeekForce();
     seek_t.init(targetSprite, shipSpriteP, 200);

     let flee : SeekForce = new SeekForce();
     flee.init(targetSprite, shipSprite, -100);

     forceControl_t.addForce('seek_t', seek_t);
     forceControl_t.addForce('flee_1', flee );
 
     ///////////////////////////////////
     // Create a Force
 
     // Step I : Create the force
 
     

     // Step II : Get Component
 
     let forceControl = shipActor.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let forceControlP = shipActorP.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     let seek : SeekForce = new SeekForce();

     let pursue : PursueForce = new PursueForce();
     let evade : PursueForce = new PursueForce();

     pursue.init
     (
      shipSpriteP,
      shipSprite,
      250,
      10,
      shipActor.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );

     evade.init
     (
      shipSpriteP,
      shipSprite,
      -100,
      5,
      targetActor.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController)
     );
 
     seek.init
     (
       shipSprite,
       targetSprite,
       250,
       forceControl
     );
 
     forceControl.addForce('seek_1', seek );
     
     forceControlP.addForce('pursue_1', pursue );
     forceControlP.addForce('evade_1', evade );
 
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
 
     // Target Oscillation 
 
     //let x = 300 * Math.sin(_time * 0.001);
 
    //  this._m_target_position.setTo
    //  (
    //    this._m_target_center.x,// + x,
    //    this._m_target_center.y
    //  );
 
    //  this._m_target.sendMessage
    //  (
    //    ST_MESSAGE_ID.kSetPosition,
    //    this._m_target_position
    //  );
 
     return;
   }
 
   /****************************************************/
   /* Private                                          */
   /****************************************************/ 
 
   private _m_target_center : V2;
 
   private _m_target_position : V2;
 
   private _m_target : BaseActor<Ty_Sprite>;
 
   private _m_ship : BaseActor<Ty_Sprite>;

   private _m_shipP : BaseActor<Ty_Sprite>;
 
   private _m_master : Master;
 }