/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file boot.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { Master } from "../master/master";

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

    this.load.path = "./game/assets/";
    
    this.load.atlas
    (
      'loading_ui',
      'images/loading_ui.png',
      'images/loading_ui.js'
    );

    this.load.image
    (
      'loading_bg',
      'images/loading_bg.jpg'
    );

    return;
  }
  
  /**
   * Start the game manager module and start the preload scene.
   */
  create()
  : void
  {
    // Create Master

    Master.Prepare();

    // Load Preloading.
    
    this.scene.start('preload');

    return;
  }
}