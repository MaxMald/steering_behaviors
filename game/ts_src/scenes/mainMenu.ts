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

    // Max Dev scene button
    this._createButton
    (
      midWidth,
      75,
      'Max',
      this._onDevMax
    );

    // Flee scene button
    this._createButton
    (
      midWidth,
      225,
      'Flee',
      this._onSceneFlee
    );

    // Arrival scene button
    this._createButton
    (
      midWidth - 300,
      300,
      'Arrival',
      this._onSceneArrival
    );

    // Wander scene button
    this._createButton
    (
      midWidth,
      300,
      'Wander',
      this._onSceneWander
    );

    // Obstacle Avoidance scene button
    this._createButton
    (
      midWidth + 300,
      300,
      'Obstacle Avoidance',
      this._onSceneObstacleAvoidance
    );

    // Sumano Dev scene button
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

  private _onSceneFlee()
  : void
  {
    this.scene.start('sceneFlee');
    return;
  }

  private _onSceneArrival()
  : void
  {
    this.scene.start('sceneArrival');
    return;
  }

  private _onSceneWander()
  : void
  {
    this.scene.start('sceneWander');
    return;
  }

  private _onSceneObstacleAvoidance()
  : void
  {
    this.scene.start('sceneObstacleAvoidance');
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