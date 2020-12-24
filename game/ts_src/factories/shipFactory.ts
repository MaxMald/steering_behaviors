/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Factory functions for ship creation.
 *
 * @file shipFactory.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-26-2020
 */



import { BaseActor } from "../actors/baseActor";
import { ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { cmpInteractiveActor } from "../components/cmpInteractiveActor";
import { CmpShipPropulsor } from "../components/cmpShipPropulsor";
import { CmpSpriteController } from "../components/cmpSpriteController";

export class ShipFactory
{
  /**
   * @summary Creates a blue ship actor.
   * 
   * @param _scene The scene where this actor is gonna be created.
   * @param _UniqueName The actor's names, used as an identifier.
   */
  static CreateBlueShip(_scene : Phaser.Scene, _UniqueName : string)
  : BaseActor<Phaser.GameObjects.Sprite>
  {

     // Step I : Create Phaser GameObject
 
     let shipSprite : Ty_Sprite = _scene.add.sprite( 0, 0, 'game_art', 'blueShip.png');
 
     // Set II : create Actor.
 
     let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, _UniqueName);
 
     // Create and init components.

     let shipPropulsor = new CmpShipPropulsor();

     shipActor.addComponent(new CmpSpriteController());
     shipActor.addComponent(new CmpForceController());
     shipActor.addComponent(new cmpInteractiveActor());
     shipActor.addComponent(shipPropulsor);
     
     shipActor.init();
     
     shipPropulsor.setAnimation("blueBackFire");
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       500
     );

    // Set Actor scale.
    
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
     let canvas = _scene.game.canvas;
 
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
       1
     );

    return shipActor;
  }

  /**
   * @summary Creates a yellow ship actor.
   * 
   * @param _scene The scene where this actor is gonna be created.
   * @param _UniqueName The actor's names, used as an identifier.
   */
  static CreateYellowShip(_scene : Phaser.Scene, _UniqueName : string)
  : BaseActor<Phaser.GameObjects.Sprite>
  {

     // Step I : Create Phaser GameObject
 
     let shipSprite : Ty_Sprite = _scene.add.sprite
     ( 
       0, 
       0, 
       'game_art', 
       'yellowShip.png'
     );
 
     // Set II : create Actor.
 
     let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, _UniqueName);
 
     // Create and init components.

     let shipPropulsor = new CmpShipPropulsor();

     shipActor.addComponent(new CmpSpriteController());
     shipActor.addComponent(new CmpForceController());
     shipActor.addComponent(new cmpInteractiveActor());
     shipActor.addComponent(shipPropulsor);
     
     shipActor.init();
     
     shipPropulsor.setAnimation("blueBackFire");
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       500
     );
 
     let canvas = _scene.game.canvas;
 
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
       1
     );

    return shipActor;
  }

  /**
   * @summary Creates a red ship actor.
   * 
   * @param _scene The scene where this actor is gonna be created.
   * @param _UniqueName The actor's names, used as an identifier.
   */
  static CreateRedShip(_scene : Phaser.Scene, _UniqueName : string)
  : BaseActor<Phaser.GameObjects.Sprite>
  {

     // Step I : Create Phaser GameObject
 
     let shipSprite : Ty_Sprite = _scene.add.sprite( 0, 0, 'game_art', 'redShip.png');
 
     // Set II : create Actor.
 
     let shipActor = BaseActor.Create<Ty_Sprite>(shipSprite, _UniqueName);
 
     // Create and init components.

     let shipPropulsor = new CmpShipPropulsor();

     shipActor.addComponent(new CmpSpriteController());
     shipActor.addComponent(new CmpForceController());
     shipActor.addComponent(new cmpInteractiveActor());
     shipActor.addComponent(shipPropulsor);
     
     shipActor.init();
     
     shipPropulsor.setAnimation("redBackFire");
 
     shipActor.sendMessage
     (
       ST_MESSAGE_ID.kSetMaxSpeed,
       500
     );

    // Set Actor scale.
    
    shipActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
     let canvas = _scene.game.canvas;
 
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
       1
     );

    return shipActor;
  }
}