/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file logo.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-12-2020
 */

export class ScnLogo
extends Phaser.Scene
{

  create()
  : void
  {

    // Set Background color

    this.cameras.main.setBackgroundColor(0x006496);

    // Display UAD Logo

    const logo = this.add.image
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      "menu_art",
      "uad_logo.png"
    );

    logo.setScale(0.5, 0.5);

    // Camera Fade In

    this.cameras.main.fadeIn(500, 0, 0, 0, )

    this.cameras.main.once
    (
      "camerafadeincomplete",
      this.onFadeInComplete,
      this
    );    

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private onFadeInComplete()
  : void
  {

    this.time.delayedCall(2000, this.onTimerComplete, [], this);

    return;

  }

  private onTimerComplete()
  :void
  {

    this.cameras.main.once
    (
      "camerafadeoutcomplete",
      this.onFadeOutComplete,
      this
    );

    this.cameras.main.fadeOut(500, 0, 0, 0);

    return;

  }

  private onFadeOutComplete()
  : void
  {

    this.scene.start('main_menu');

    return;

  }

}