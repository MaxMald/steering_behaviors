/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file boot.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

/**
 * This scene should called once in the game. Start the game manager module.
 */
export class Boot
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Preload needed assets.
   */
  preload()
  : void
  {
    // TODO

    return;
  }
  
  /**
   * Start the game manager module and start the preload scene.
   */
  create()
  : void
  {
    // TODO
    
    this.scene.start('preload');
    return;
  }
}