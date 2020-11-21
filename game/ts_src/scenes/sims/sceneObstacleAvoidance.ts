/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Scene for the Wander force behavior.
 *
 * @file sceneWander.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since October-24-2020
 */

import { Bodies } from "matter";
import { BaseActor } from "../../actors/baseActor";
import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { Ty_Sprite, V2 } from "../../commons/stTypes";
import { CmpForceController } from "../../components/cmpforceController";
import { CmpSpriteController } from "../../components/cmpSpriteController";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButton } from "../../managers/uiManager/uiButton";
import { UIObject } from "../../managers/uiManager/uiObject";
import { Master } from "../../master/master";
import { ObstacleAvoidanceForce } from "../../steeringBehavior/forceObstacleAvoidance";
import { WanderForce } from "../../steeringBehavior/forceWander";

export class ScnObstacleAvoidance
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

    // On simulation scene create.

    master.onSimulationSceneCreate(this);

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
    // Create scene buttons

    let mainMenuButton : UIButton = UIButton.CreateColorButton
    (
      width * 0.1,
      height * 0.9,
      this,
      'Main menu',
      0x2272F1
    );

    mainMenuButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButton;

        master.onSimulationSceneDestroy(this);
    
        this.scene.start('main_menu');
      },
      this
    );

    let debugButton : UIButton = UIButton.CreateColorButton
    (
      width * 0.9,
      height * 0.9,
      this,
      'Debug',
      0x9000ff
    );

    debugButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButton;

        if(master.isDebugEnable())
        {
          master.disableDebugging();
        }
        else
        {
          master.enableDebugging();
        }
      },
      this
    );
    
    ///////////////////////////////////
    // Create SpaceShip Actor

    // Create Phaser GameObject.

    let shipSprite : Ty_Sprite = this.add.sprite(0, 0,'space_ship');

    // Create Actor.

    let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, 'SpaceShip');

    // Add Actor to simulation manager.

    simManager.addActor(shipActor);

    // Create and init components.

    shipActor.addComponent(new CmpSpriteController());
    shipActor.addComponent(new CmpForceController());

    shipActor.init();

    // Set Actor max speed.

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      50
    );

    // Set Actor scale.
    
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.1, 0.1)
    );

    // Set Actor Mass.
    
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      1
    );
    
    // Set Actor position.
  
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.5)
    );

    ////////////////////////////////////
    // Create obstacles actors

    // Create Phaser GameObject.
    
    let obstacleSprite0 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite1 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite2 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite3 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite4 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite5 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite6 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');
    let obstacleSprite7 : Ty_Sprite = this.add.sprite(0, 0,'space_ship');

    // Create obstacle Actors.

    let obstacleActor0 = BaseActor.Create<Ty_Sprite>(obstacleSprite0, 'obstacle0');
    let obstacleActor1 = BaseActor.Create<Ty_Sprite>(obstacleSprite1, 'obstacle1');
    let obstacleActor2 = BaseActor.Create<Ty_Sprite>(obstacleSprite2, 'obstacle2');
    let obstacleActor3 = BaseActor.Create<Ty_Sprite>(obstacleSprite3, 'obstacle3');
    let obstacleActor4 = BaseActor.Create<Ty_Sprite>(obstacleSprite4, 'obstacle4');
    let obstacleActor5 = BaseActor.Create<Ty_Sprite>(obstacleSprite5, 'obstacle5');
    let obstacleActor6 = BaseActor.Create<Ty_Sprite>(obstacleSprite6, 'obstacle6');
    let obstacleActor7 = BaseActor.Create<Ty_Sprite>(obstacleSprite7, 'obstacle7');

    // Add obstacles to simulation manager.

    simManager.addActor(obstacleActor0);
    simManager.addActor(obstacleActor1);
    simManager.addActor(obstacleActor2);
    simManager.addActor(obstacleActor3);
    simManager.addActor(obstacleActor4);
    simManager.addActor(obstacleActor5);
    simManager.addActor(obstacleActor6);
    simManager.addActor(obstacleActor7);

    // Create and init obstacles components.

    obstacleActor0.addComponent(new CmpSpriteController);
    obstacleActor0.addComponent(new CmpForceController);
    obstacleActor1.addComponent(new CmpSpriteController);
    obstacleActor1.addComponent(new CmpForceController);
    obstacleActor2.addComponent(new CmpSpriteController);
    obstacleActor2.addComponent(new CmpForceController);
    obstacleActor3.addComponent(new CmpSpriteController);
    obstacleActor3.addComponent(new CmpForceController);
    obstacleActor4.addComponent(new CmpSpriteController);
    obstacleActor4.addComponent(new CmpForceController);
    obstacleActor5.addComponent(new CmpSpriteController);
    obstacleActor5.addComponent(new CmpForceController);
    obstacleActor6.addComponent(new CmpSpriteController);
    obstacleActor6.addComponent(new CmpForceController);
    obstacleActor7.addComponent(new CmpSpriteController);
    obstacleActor7.addComponent(new CmpForceController);

    obstacleActor0.init();
    obstacleActor1.init();
    obstacleActor2.init();
    obstacleActor3.init();
    obstacleActor4.init();
    obstacleActor5.init();
    obstacleActor6.init();
    obstacleActor7.init();

    // Set obstacle actors max speed.

    obstacleActor0.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor1.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor2.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor3.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor4.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor5.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor6.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);
    obstacleActor7.sendMessage(ST_MESSAGE_ID.kSetMaxSpeed, 25);

    // Set obstacle actors scale.

    obstacleActor0.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor1.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor2.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor3.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor4.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor5.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor6.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
    obstacleActor7.sendMessage(ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));

    // Set obstacle actors Mass.

    obstacleActor0.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor1.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor2.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor3.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor4.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor5.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor6.sendMessage(ST_MESSAGE_ID.kSetMass, 1);
    obstacleActor7.sendMessage(ST_MESSAGE_ID.kSetMass, 1);

    // Set obstacle actors positions.
    obstacleActor0.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.35));
    obstacleActor1.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.35));
    obstacleActor2.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.45));
    obstacleActor3.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.45));
    obstacleActor4.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.55));
    obstacleActor5.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.55));
    obstacleActor6.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.65));
    obstacleActor7.sendMessage(ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.65));

    // Create the obstacles array.

    let obstaclesArray : Ty_Sprite[] = new Array
    (
      obstacleSprite0,
      obstacleSprite1,
      obstacleSprite2,
      obstacleSprite3,
      obstacleSprite4,
      obstacleSprite5,
      obstacleSprite6,
      obstacleSprite7
    );
    ///////////////////////////////////
    // Create a Force

    // Create the force.

    let obstacleAvoidance : ObstacleAvoidanceForce = new ObstacleAvoidanceForce();

    let obstacleWander0 : WanderForce = new WanderForce();
    let obstacleWander1 : WanderForce = new WanderForce();
    let obstacleWander2 : WanderForce = new WanderForce();
    let obstacleWander3 : WanderForce = new WanderForce();
    let obstacleWander4 : WanderForce = new WanderForce();
    let obstacleWander5 : WanderForce = new WanderForce();
    let obstacleWander6 : WanderForce = new WanderForce();
    let obstacleWander7 : WanderForce = new WanderForce();

    // Init the force.

    obstacleAvoidance.init
    (
      shipSprite,
      100,
      obstaclesArray,
      100
    );

    obstacleWander0.init(obstacleSprite0, 50, 25, 5, 45, 100);
    obstacleWander1.init(obstacleSprite1, 50, 25, 5, 45, 100);
    obstacleWander2.init(obstacleSprite2, 50, 25, 5, 45, 100);
    obstacleWander3.init(obstacleSprite3, 50, 25, 5, 45, 100);
    obstacleWander4.init(obstacleSprite4, 50, 25, 5, 45, 100);
    obstacleWander5.init(obstacleSprite5, 50, 25, 5, 45, 100);
    obstacleWander6.init(obstacleSprite6, 50, 25, 5, 45, 100);
    obstacleWander7.init(obstacleSprite7, 50, 25, 5, 45, 100);
    
    // Get Force Actor component.
    
    let shipController = shipActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    // Get Force obstacles component.

    let obstacle0Controller = obstacleActor0.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle1Controller = obstacleActor1.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle2Controller = obstacleActor2.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle3Controller = obstacleActor3.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle4Controller = obstacleActor4.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle5Controller = obstacleActor5.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle6Controller = obstacleActor6.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);
    let obstacle7Controller = obstacleActor7.getComponent<CmpForceController>(ST_COMPONENT_ID.kForceController);

    shipController.addForce('obstacleAvoidance_1', obstacleAvoidance);

    obstacle0Controller.addForce('obstacleWander_0', obstacleWander0);
    obstacle1Controller.addForce('obstacleWander_1', obstacleWander1);
    obstacle2Controller.addForce('obstacleWander_2', obstacleWander2);
    obstacle3Controller.addForce('obstacleWander_3', obstacleWander3);
    obstacle4Controller.addForce('obstacleWander_4', obstacleWander4);
    obstacle5Controller.addForce('obstacleWander_5', obstacleWander5);
    obstacle6Controller.addForce('obstacleWander_6', obstacleWander6);
    obstacle7Controller.addForce('obstacleWander_7', obstacleWander7);

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

  ///////////////////////////////////
  // Callbacks

  private _onDebug()
  : void
  {
    if(this._m_master.isDebugEnable())
    {
      this._m_master.disableDebugging();
    }
    else
    {
      this._m_master.enableDebugging();
    }

    return;
  }

  private _onMainMenu()
  : void
  {

    this._m_master.onSimulationSceneDestroy(this);

    this.scene.start('main_menu');

    return;
  }
}