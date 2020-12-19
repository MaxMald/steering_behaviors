import { ST_AUDIO_CLIP, ST_MANAGER_ID } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

export class AudioManager
implements IManager
{

  static Create()
  : AudioManager
  {

    return new AudioManager();

  }

  init()
  : void 
  {

    this._m_game = undefined;
    
    return;

  }

  update(_dt: number)
  : void 
  {

    return;

  }

  receive(_id: number, _msg: any)
  : void 
  {

    return;

  }

  setMasterManager(_master: Master)
  : void 
  {

    this._m_master = _master;

    return;
  
  }

  getID()
  : number 
  {

    return ST_MANAGER_ID.kAudioManager;
  
  }

  onPrepare()
  : void 
  {

    return;
  
  }

  /**
   * Called by Master when a game scene is been created.
   * @param _scene 
   */
  onSceneCreate(_scene: Phaser.Scene)
  : void
  {

    if(this._m_game === undefined)
    {

      this._m_game = _scene.game;

    }

    return;

  }

  /**
   * Called by Master when a game scene is been destroyed.
   * @param _scene 
   */
  onSceneDestroy(_scene: Phaser.Scene)
  : void
  {

    this.stop();
    this.removeAll();

    return;

  }

  onSimulationSceneCreate(_scene: Phaser.Scene)
  : void 
  {

    const bgm = this._m_game.sound.addAudioSprite
    (
      "gameAudio"    
    );

    bgm.play
    (
      ST_AUDIO_CLIP.kBGM_Space,
      {
        loop: true,
        volume: 0.0
      }
    )

    _scene.add.tween
    (
      {
        targets: bgm,
        volume: {from: 0.0, to: 0.5},
        duration: 5000,
        ease: "Linear"
      }
    );

    return;

  }

  onSimulationSceneDestroy(_scene: Phaser.Scene)
  : void 
  {

    return;

  }

  onSimulationStart()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kPlay);

    return;

  }

  onSimulationPause()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kNegativeB);

    return;

  }

  onSimulationResume()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kPlay);

    return;

  }

  onSimulationStop()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kStop);

    return;

  }

  onDebugEnable()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kPositiveD);

    return;

  }

  onDebugDisable()
  : void 
  {

    this.playClip(ST_AUDIO_CLIP.kNegativeB);

    return;

  }

  /**
   * Set the global volume of the audio manager.
   * 
   * @param _volume float amount from 0 to 1. 
   */
  setGlobalVolume(_volume: number)
  : void
  {

    this._m_game.sound.volume = _volume;

    return;

  }

  /**
   * Mute audio manager.
   */
  mute()
  : void
  {

    this._m_game.sound.mute = true;
    
    return;

  }

  /**
   * Unmute audio manager.
   */
  unmute()
  : void
  {

    this._m_game.sound.mute = false;
    
    return;

  }

  /**
   * Stops all the sounds in the game.
   */
  stop()
  : void
  {

    this._m_game.sound.stopAll();
    return;

  }

  /**
   * Removes all sounds from the manager, destroying the sounds.
   */
  removeAll()
  : void
  {

    this._m_game.sound.removeAll();

  }

  /**
   * Plays a clip.
   * 
   * @param _clip key of the sound
   * @param _loop Looping clip? default: false.
   * @param _volume Volume [0 - 1] default: 1.
   */
  playClip
  (
    _clip: ST_AUDIO_CLIP,
    _loop: boolean = false,
    _volume: number = 1
  )
  : void
  {

    this._m_game.sound.playAudioSprite
    (
      "gameAudio",
      _clip,
      {
        loop: _loop,
        volume: _volume
      }
    );

    return;

  }

  /**
   * Pauses all the sounds in the game.
   */
  pause()
  : void
  {

    this._m_game.sound.pauseAll();

    return;

  }

  /**
   * Resumes all the sounds in the game.
   */
  resume()
  {

    this._m_game.sound.resumeAll();

    return;

  }

  destroy()
  : void 
  {

    this._m_game = null;
    this._m_master = null;

    return;

  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private constructor()
  {

  };
  
  private _m_game: Phaser.Game;

  /**
   * Master manager.
   */
  private _m_master: Master;

}