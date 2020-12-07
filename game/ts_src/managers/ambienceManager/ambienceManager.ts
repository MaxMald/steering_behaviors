/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file ambienceManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-04-2020
 */

import { ST_MANAGER_ID } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

export class AmbienceManager
implements IManager
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/

  static Create()
  : AmbienceManager
  {

    return new AmbienceManager();

  }
  
  init()
  : void 
  {
    
    
    return;

  }

  update(_dt: number)
  : void 
  {

    // Update each object.

    if(!this._m_isPaused)
    {

      this._m_aObjects.forEach
      (
        this.updateObject,
        this
      );

    }    

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

    return ST_MANAGER_ID.kAmbienceManager;
  
  }

  onPrepare()
  : void 
  {

    return; 

  }

  onSimulationSceneCreate(_scene: Phaser.Scene)
  : void 
  {

    return;
  
  }

  onSimulationSceneDestroy(_scene: Phaser.Scene)
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.destroy();
      this._m_starDustEmitter = undefined;

    }

    // Destroy ambience objects

    const aObject = this._m_aObjects;

    while(aObject.length)
    {

      const amObject = aObject.pop();

      amObject.destroy();

    }

    return;
  
  }

  onSimulationStart()
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.resume();

      this._m_isPaused = false;

    }

    return;

  }

  onSimulationPause()
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.pause();

      this._m_isPaused = true;

    }
    
    return;

  }

  onSimulationResume()
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.resume();

      this._m_isPaused = false;

    }

    return;
  
  }

  onSimulationStop()
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.pause();

      this._m_isPaused = true;

    }

    return;
  
  }

  onDebugEnable()
  : void 
  {

    return;
  
  }

  onDebugDisable()
  : void 
  {

    return;
  
  }

  addObject(_object: AmbienceObject)
  : void
  {

    this._m_aObjects.push(_object);

    return;

  }

  /**
   * Creates a phaser particle emitter for the star dust.
   * 
   * @param _scene Phaser scene. 
   */
  createStarDust(_scene: Phaser.Scene)
  : void
  {

    if(this._m_starDustEmitter === undefined)
    {

      // Emit over the canvas area

      const emitZone = new Phaser.Geom.Rectangle
      (
        0,
        0,
        _scene.game.canvas.width,
        _scene.game.canvas.height
      );

      // Create particles.

      const particles = _scene.add.particles("game_art");

      this._m_starDustEmitter = particles;

      // Create particles emitter.

      particles.createEmitter
      (
        {
          frame: ["blue_fare.png", "magenta_fare.png"],
          speed: { min: -10, max: 10 },
          lifespan: 1000,
          quantity: 1,
          scale: { min: 0.1, max: 0.4 },
          alpha: { start: 1, end: 0 },
          blendMode: 'ADD',
          emitZone: { source: emitZone }
        }
      );

    }

    return;

  }

  destroy()
  : void 
  {

    if(this._m_starDustEmitter !== undefined)
    {

      this._m_starDustEmitter.destroy();

    }

    // Destroy ambience objects

    const aObject = this._m_aObjects;

    while(aObject.length)
    {

      const amObject = aObject.pop();

      amObject.destroy();

    }

    this._m_master = null;

    return;
    
  }  

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private constructor()
  {

    this._m_starDustEmitter = undefined;

    this._m_aObjects = new Array<AmbienceObject>();

    this._m_isPaused = false;
  
    return;

  }

  private updateObject(_object: AmbienceObject)
  : void
  {

    _object.update();

    return;

  }
  
  /**
   * Reference to the master manager.
   */
  private _m_master: Master;

  /**
   * Reference to the star dust emitter.
   */
  private _m_starDustEmitter: Phaser.GameObjects.Particles.ParticleEmitterManager;

  /**
   * Array of parallax images
   */
  private _m_aObjects: Array<AmbienceObject>;

  /**
   * Indicates if the game is paused.
   */
  private _m_isPaused: boolean;

}

interface AmbienceObject
{
  
  update()
  : void;

  destroy()
  : void;
  
}