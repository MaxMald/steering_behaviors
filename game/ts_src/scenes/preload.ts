/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file preload.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { Ty_Image } from "../commons/stTypes";
import { UIManager } from "../managers/uiManager/uiManager";
import { Master } from "../master/master";

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

    ///////////////////////////////////
    // Load Assets

    const loader = this.load;

    loader.path = "./game/assets/";

    /****************************************************/
    /* Animation                                        */
    /****************************************************/

    loader.animation
    (
      'afireBack',
      'animations/backFireAnimation.json'
    );

    loader.animation
    (
      "satellite_a",
      "animations/ambienceAnimations.json"
    );

    loader.image
    (
      'button',
      'images/button.png'
    );

    /****************************************************/
    /* Images                                           */
    /****************************************************/

    loader.image
    (
      "bg_space_01",
      "images/bg_space_01.png"
    )

    /****************************************************/
    /* Atlas                                            */
    /****************************************************/

    loader.atlas
    (
      'game_art',
      "images/game_art/game_art.png",
      "images/game_art/game_art.js"
    );

    loader.atlas
    (
      'menu_art',
      "images/game_menu/menu_art.png",
      "images/game_menu/menu_art.js"
    );

    loader.atlas
    (
      'tutorial_book',
      "images/tutorial_book/tutorial_book.png",
      "images/tutorial_book/tutorial_book.js"
    );

    /****************************************************/
    /* Bitmap Fonts                                     */
    /****************************************************/

    loader.bitmapFont
    (
      'odin_rounded',
      'images/odin_rounded_bitmapfont.png',
      'images/odin_rounded_bitmapfont.xml'
    );

    loader.bitmapFont
    (
      'supercomputer',
      'images/supercomputer_bitmapfont.png',
      'images/supercomputer_bitmapfont.xml'
    );

    /****************************************************/
    /* Tile Maps                                        */
    /****************************************************/

    loader.tilemapTiledJSON
    (
      "ambience_01",
      "tiledMaps/ambience_01.json"
    );

    loader.tilemapTiledJSON
    (
      "simulation_ui",
      "tiledMaps/simulation_ui.json"
    );

    loader.tilemapTiledJSON
    (
      "info_box",
      "tiledMaps/info_box.json"
    );

    loader.tilemapTiledJSON
    (
      "main_menu",
      "tiledMaps/main_menu.json"
    );

    /****************************************************/
    /* Text                                             */
    /****************************************************/

    loader.text
    (
      "infoBox",
      "infoBox/infoBox.json"
    );

    /****************************************************/
    /* Loading Scene                                    */
    /****************************************************/

    const hWidth = this.game.canvas.width * 0.5;

    const hHeight = this.game.canvas.height * 0.5;

    ///////////////////////////////////
    // Background
    
    this.add.image(hWidth, hHeight,'loading_bg');

    ///////////////////////////////////
    // Loading Bar BG

    const barBG = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "loading_bar_bg.png"
    );

    this.loadingBarBG = barBG;

    ///////////////////////////////////
    // Loading Bar

    const bar = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "loading_bar.png"
    );

    this.loadingBar = bar;

    // Loading Bar Rectangle

    this.loadingCropRect = new Phaser.Geom.Rectangle(0, 0, 0, bar.height);

    bar.setCrop(this.loadingCropRect);

    // Start Button

    const start = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "start_button.png"
    );

    start.setInteractive();

    start.on("pointerup", this.onClickStart, this);
    start.on("pointerover", this.onOverStart, this);
    start.on("pointerout", this.onOutStart, this);    

    start.setVisible(false);
    start.setActive(false);

    this.startButton = start;

    this.onOutStart();

    // Callbacks

    loader.on('progress', this.updateBar, this);

    loader.on('complete', this.onComplete, this);

    return;
  }

  updateBar()
  : void
  {

    const rect = this.loadingCropRect;

    const bar = this.loadingBar;

    rect.width = this.load.progress * bar.width;

    bar.setCrop(rect);

    return;

  }

  onComplete()
  : void
  {

    this.onLoadComplete();

    this.loadingBar.setVisible(false);
    this.loadingBar.setActive(false);

    this.loadingBarBG.setVisible(false);
    this.loadingBarBG.setActive(false);

    this.startButton.setVisible(true);
    this.startButton.setActive(true);

    return;

  }

  onClickStart()
  : void
  {
    
    //this.scene.start('logo');
    this.scene.start('main_menu');


    return;

  }

  onOverStart()
  : void
  {

    this.startButton.setScale(1.0, 1.0);

    return;

  }

  onOutStart()
  : void
  {

    this.startButton.setScale(0.8, 0.8);

    return;

  }

  onLoadComplete()
  : void
  {

    const master = Master.GetInstance();

    // UI Manager callback

    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);
    uiManager.onAssetLoadingComplete(this.game);

    return;

  }

  loadingCropRect: Phaser.Geom.Rectangle;

  loadingBarBG: Ty_Image;

  loadingBar: Ty_Image;

  startButton: Ty_Image;

}