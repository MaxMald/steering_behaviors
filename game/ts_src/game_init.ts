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
import { ScnSeek } from "./scenes/sims/sceneSeek";
import { ScnArrival } from "./scenes/sims/sceneArrival";
import { ScnWander } from "./scenes/sims/sceneWander";
import { SceneEvade } from "./scenes/sims/sceneEvade";
import { ScnObstacleAvoidance } from "./scenes/sims/sceneObstacleAvoidance";
import { ScnFlee } from "./scenes/sims/sceneFlee";
import { ScenePursuit } from "./scenes/sims/scenePursuit";
import { SceneFollowPath } from "./scenes/sims/sceneFollowPath";
import { ScnLogo } from "./scenes/logo";
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

      backgroundColor: 0x0b032b        
    }   

    ///////////////////////////////////
    // Init Game

    this.m_game = new Phaser.Game(config);
    
    ///////////////////////////////////
    // Create Scenes      
    
    const sceneManager = this.m_game.scene;

    sceneManager.add('boot', Boot);
    sceneManager.add('preload', Preload);
    sceneManager.add("logo", ScnLogo);
    sceneManager.add('main_menu', MainMenu);

    sceneManager.add('sceneSeek', ScnSeek);
    sceneManager.add('sceneFlee', ScnFlee);
    sceneManager.add('sceneArrival', ScnArrival);
    sceneManager.add('scenePursuit', ScenePursuit);
    sceneManager.add('sceneEvade', SceneEvade);
    sceneManager.add('sceneWander', ScnWander);
    sceneManager.add('sceneFollowPath', SceneFollowPath);
    sceneManager.add('sceneObstacleAvoidance', ScnObstacleAvoidance);

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