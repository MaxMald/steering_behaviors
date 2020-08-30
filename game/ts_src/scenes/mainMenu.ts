 /**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file mainMenu.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */
 
export class MainMenu 
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {    
    // TODO

    this.add.image
    (
      this.game.canvas.width * 0.5,

      this.game.canvas.height * 0.5,

      'space_ship'
    );

    return;
  }

  update(_time : number, _delta : number)
  : void
  {  
    // TODO

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/ 
}