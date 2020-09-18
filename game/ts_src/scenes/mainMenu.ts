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
    let midWidth = this.game.canvas.width * 0.5;

    this._createButton
    (
      midWidth,
      150,
      'Max',
      this._onDevMax
    );

    this._createButton
    (
      midWidth,
      300,
      'Alex',
      this._onDevAlex
    );

    this._createButton
    (
      midWidth,
      450,
      'Suma',
      this._onDevSumano
    );
    return;
  }

  update(_time : number, _delta : number)
  : void
  {   
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Create a new button.
   * 
   * @param _x The x position of the button. 
   * @param _y The y position of the button.
   * @param _label The text of the button.
   * 
   */
  private _createButton
  (
    _x : number, 
    _y : number, 
    _label : string,
    _callback : ()=>void
  )
  : void
  {

    // Create sprite.

    let button = this.add.image
    (
      _x,
      _y,
      'button'
    );

    button.setScale(0.5, 0.5);

    // Set interactive.

    button.setInteractive();

    // Label

    let label = this.add.text
    (
      _x,
      _y,
      _label,
      {
        fontFamily : 'Arial',
        fontSize : 32
      }
    );

    label.setOrigin(0.5, 0.5);

    // Set callback.

    button.on('pointerdown', _callback, this);

    return;
  }

  ///////////////////////////////////
  // Callbacks

  private _onDevAlex()
  : void
  {
    this.scene.start('devAlex');
    return;
  }

  private _onDevMax()
  : void
  {
    this.scene.start('devMax');
    return;
  }

  private _onDevSumano()
  : void
  {
    this.scene.start('devSumano');
    return;
  }
}