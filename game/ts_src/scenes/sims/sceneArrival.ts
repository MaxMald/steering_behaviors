/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Scene for the Arrival force behavior.
 *
 * @file sceneArrival.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since October-24-2020
 */

import { BaseActor } from "../../actors/baseActor";
import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { Ty_Sprite, V2 } from "../../commons/stTypes";
import { CmpForceController } from "../../components/cmpforceController";
import { CmpSpriteController } from "../../components/cmpSpriteController";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButton } from "../../managers/uiManager/uiButton";
import { Master } from "../../master/master";
import { ArrivalForce } from "../../steeringBehavior/forceArrival";

export class ScnArrival
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

    let mainMenuButton : UIButton = new UIButton
    (
      width * 0.1,
      height * 0.9,
      'button',
      this,
      'Main menu',
      this._onMainMenu,
      0.25,
      24
    );

    let debugButton : UIButton = new UIButton
    (
      width * 0.9,
      height * 0.9,
      'button',
      this,
      'Debug',
      this._onDebug,
      0.25
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

    // Set Actor initial speed.

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetSpeed,
      75
    );

    // Set Actor max speed.

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      75
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
      new Phaser.Math.Vector2(width * 0.5, height * 0.25)
    );

    ///////////////////////////////////
    // Create target Actor

    // Create Phaser GameObject.

    let targetSprite : Ty_Sprite = this.add.sprite(0, 0,'space_ship');

    // Create Target.

    let targetActor = BaseActor.Create<Ty_Sprite>(targetSprite, 'target');

    // Add Target to simulation manager.

    simManager.addActor(targetActor);

    // Create and init components.

    targetActor.addComponent(new CmpSpriteController());
    targetActor.addComponent(new CmpForceController());

    targetActor.init();

    // Set Actor max speed.

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      50
    );

    // Set Target scale.
    
    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.1, 0.1)
    );

    // Set Target Mass.

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      1
    );
    
    // Set Target position.
  
    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.5)
    );

    ///////////////////////////////////
    // Create a Force

    // Create the force.

    let arrival : ArrivalForce = new ArrivalForce();

    // Init the force.

    arrival.init
    (
      shipSprite,
      targetSprite,
      100,
      100
    );
    
    // Get Force Actor component.
    
    let shipController = shipActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    shipController.addForce('arrival_1', arrival);    

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