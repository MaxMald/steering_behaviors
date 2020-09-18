/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file preload.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

/**
 * Preload test assets and start pilot level.
 */
export class Preload
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  preload()
  : void
  {
    this.load.path = "./game/assets/";

    // TODO

    this.load.image
    (
      'space_ship',
      'images/space_ship.png'
    );

    this.load.image
    (
      'button',
      'images/button.png'
    )

    return;
  }

  create()
  : void
  {
    // Start pilot scene

    this.scene.start('main_menu');
    return;
  }
}