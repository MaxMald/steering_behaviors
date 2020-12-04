/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file ambienceFactory.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-03-2020
 */

import { BaseActor } from "../actors/baseActor";
import { ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { cmpInteractiveActor } from "../components/cmpInteractiveActor";
import { CmpSpriteController } from "../components/cmpSpriteController";

export class AmbienceFactory
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a red satellite (animated).
   * 
   * @param _x position in x axis. 
   * @param _y position in y axis.
   * @param _scene phaser scene.
   * @param _name game object unique name.
   */
  static CreateSatellite
  (
    _x: number, 
    _y: number, 
    _scene: Phaser.Scene,
    _name: string
  )
  : BaseActor<Ty_Sprite>
  {

    // Step I : Create Phaser GameObject
 
    let sprite : Ty_Sprite = _scene.add.sprite
    (
       0, 
       0, 
       'game_art', 
       'Bomb_3_Idle_000.png'
    );
 
    // Set II : create Actor.

    let actor = BaseActor.Create<Ty_Sprite>(sprite, _name);

    // Create and init components.

    actor.addComponent(new CmpSpriteController());
    actor.addComponent(new CmpForceController());
    actor.addComponent(new cmpInteractiveActor());
    
    actor.init();
    
    actor.sendMessage
    (
      ST_MESSAGE_ID.kPlayAnimation,
      "satellite_a"
    );
    
    actor.sendMessage
    (
      ST_MESSAGE_ID.kSetPosition,
      new Phaser.Math.Vector2(_x, _y)
    );

   return actor;

  }

}