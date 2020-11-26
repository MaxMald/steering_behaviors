/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file preload.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { Ty_Image, Ty_Sprite } from "../commons/stTypes";

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

    this.load.path = "./game/assets/";

    // TODO

    this.load.image
    (
      'button',
      'images/button.png'
    );

    this.load.atlas
    (
      'game_art',
      "images/game_art/game_art.png",
      "images/game_art/game_art.js"
    );

    this.load.bitmapFont
    (
      'odin_rounded',
      'images/odin_rounded_bitmapfont.png',
      'images/odin_rounded_bitmapfont.xml'
    );

    this.load.bitmapFont
    (
      'supercomputer',
      'images/supercomputer_bitmapfont.png',
      'images/supercomputer_bitmapfont.xml'
    );

    ///////////////////////////////////
    // Scene

    const hWidth = this.game.canvas.width * 0.5;

    const hHeight = this.game.canvas.height * 0.5;

    // Space Background
    
    this.add.image(hWidth, hHeight,'loading_bg');

    // Space Ship

    const spaceShip = this.add.image
    (
      hWidth, 
      300, 
      "loading_ui", 
      "loading_ship.png"
    );

    this.add.tween
    (
      {
        targets: spaceShip,
        y: 250,
        ease: "Quad.easeInOut",
        duration: 3000,
        yoyo: true,
        repeat: -1
      }
    );


    // Loading Bar

    const barBG = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "loading_bar_bg.png"
    );

    this.loadingBarBG = barBG;

    const bar = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "loading_bar.png"
    );

    bar.scaleX = 0.0;

    this.loadingBar = bar;

    // Start Button

    const start = this.add.image
    (
      hWidth,
      hHeight + 100,
      "loading_ui",
      "start_button.png"
    );

    start.setInteractive();

    start.on("pointerdown", this.onClickStart, this);
    start.on("pointerover", this.onOverStart, this);
    start.on("pointerout", this.onOutStart, this);    

    start.setVisible(false);
    start.setActive(false);

    this.startButton = start;

    // Callbacks

    this.load.on('progress', this.updateBar, this);

    this.load.on('complete', this.onComplete, this);

    return;
  }

  updateBar()
  : void
  {

    this.loadingBarBG.scaleX = this.load.progress;

    return;

  }

  onComplete()
  : void
  {

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

  loadingBarBG: Ty_Image;

  loadingBar: Ty_Image;

  startButton: Ty_Image;

}