/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file game_init.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { Plugin } from "phaser3-nineslice";
import { Preload } from "./scenes/preload";
import { Boot } from "./scenes/boot";
import { MainMenu } from "./scenes/mainMenu";

/**
 * Starts Application.
 */
class GameInit
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/

    public constructor()
    { }

    /**
     * Starts Phaser Application.
     */
    public start()
    : void
    {

    var config = 
    {
      type: Phaser.WEBGL,
      scale: 
      {
        parent: 'phaser-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT
      },
      
      // Canvas Size

      width : 1024,

      height : 768,

      // Physic Engine : Disable

      /*
      physics: {
        default: 'arcade',
        arcade: {            
            debug: true
        }
      },
      */
      
      input:
      {
        gamepad:true
      },

      // Nine Slice Plugin

      plugins: {
        global: [ Plugin.DefaultCfg ],
      },

      // Background Color

      backgroundColor: 0x6ab4d4        
    }   

    ///////////////////////////////////
    // Init Game

    this.m_game = new Phaser.Game(config);
    
    ///////////////////////////////////
    // Create Scenes        

    this.m_game.scene.add('boot', Boot);
    this.m_game.scene.add('preload', Preload);
    this.m_game.scene.add('main_menu', MainMenu);

    ///////////////////////////////////
    // Start BOOT    

    this.m_game.scene.start('boot');

    return;
  }  

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  // Phaser Game Instance.

  private m_game : Phaser.Game;

}

export = GameInit;