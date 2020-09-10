 /**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file mainMenu.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

import { BaseActor } from "../actors/baseActor";
import { ST_COMPONENT_ID, ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { CmpSpriteController } from "../components/cmpSpriteController";
import { SeekForce } from "../steeringBehaviour/forceSeek";

 
export class MainMenu 
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {    
    ///////////////////////////////////
    // Create SpaceShip Actor

    // Step I : Create Phaser GameObject

    let shipSprite : Ty_Sprite = this.add.sprite( 0, 0,'space_ship');

    // Set II : create Actor.

    let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, 'SpaceShip');
    
    this._m_ship = shipActor;

    // Create and init components.

    shipActor.addComponent(new CmpSpriteController());
    shipActor.addComponent(new CmpForceController());

    shipActor.init();

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      1000
    );

    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetSpeed,
      0
    );

    shipActor.sendMessage
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
    
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      10
    );

    ///////////////////////////////////
    // Create Target

    let targetSprite = this.add.sprite(0, 0, 'space_ship');

    let targetActor =  BaseActor.Create<Ty_Sprite>
    (
      targetSprite,
      'target'
    );

    targetActor.addComponent(new CmpSpriteController());

    targetActor.init();    

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.1, 0.1)
    );

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(width * 0.5, height * 0.25)
    );

    ///////////////////////////////////
    // Create a Force

    // Step I : Create the force

    let seek : SeekForce = new SeekForce();

    seek.init
    (
      shipSprite,
      targetSprite,
      0
    );

    // Step II : Get Component

    let forceControl = shipActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    forceControl.addForce('seek_1', seek );

    return;
  }

  update(_time : number, _delta : number)
  : void
  {
    this._m_ship.update();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/ 

  private _m_ship : BaseActor<Ty_Sprite>;
}