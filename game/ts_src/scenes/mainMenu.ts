 /**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file mainMenu.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

import { ST_COLOR_ID } from "../commons/stEnums";
import { UIBox } from "../managers/uiManager/uiBox/uiBox";
import { UIButton } from "../managers/uiManager/uiButton";
import { UIObject } from "../managers/uiManager/uiObject";

 
export class MainMenu 
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  { 
    
    // Buttons Box

    const box = UIBox.CreateBorderBox
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      this
    );

    box.setAnchor(0.5, 0.5);

    box.setCenterAlignment();

    ///////////////////////////////////
    // Seek

    const seek = UIButton.CreateColorButton
    (
      0,
      0,
      this,
      "Seek",
      ST_COLOR_ID.kWhite
    );

    seek.subscribe
    (
      "buttonReleased",
      "MainMenu",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.scene.start('sceneSeek');

        return;

      },
      this
    )

    box.add(seek);

    ///////////////////////////////////
    // Flee

    const flee = UIButton.CreateColorButton
    (
      0,
      0,
      this,
      "Flee",
      ST_COLOR_ID.kWhite
    );

    flee.subscribe
    (
      "buttonReleased",
      "MainMenu",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.scene.start('sceneFlee');

        return;

      },
      this
    )

    box.add(flee);

    ///////////////////////////////////
    // Arrival

    const arrival = UIButton.CreateColorButton
    (
      0,
      0,
      this,
      "Arrival",
      ST_COLOR_ID.kWhite
    );

    arrival.subscribe
    (
      "buttonReleased",
      "MainMenu",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.scene.start('sceneArrival');

        return;

      },
      this
    )

    box.add(arrival);

    ///////////////////////////////////
    // Wander

    const wander = UIButton.CreateColorButton
    (
      0,
      0,
      this,
      "Wander",
      ST_COLOR_ID.kWhite
    );

    wander.subscribe
    (
      "buttonReleased",
      "MainMenu",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.scene.start('sceneWander');

        return;

      },
      this
    )

    box.add(wander);

    ///////////////////////////////////
    // Obstacle Avoidance

    const oAvoidance = UIButton.CreateColorButton
    (
      0,
      0,
      this,
      "Obstacle Avoidance",
      ST_COLOR_ID.kWhite
    );

    oAvoidance.subscribe
    (
      "buttonReleased",
      "MainMenu",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.scene.start('sceneObstacleAvoidance');

        return;

      },
      this
    )

    box.add(oAvoidance);

    return;
  }

  update(_time : number, _delta : number)
  : void
  {   
    return;
  }
}