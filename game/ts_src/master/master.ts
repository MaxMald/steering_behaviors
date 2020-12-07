/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file master.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-09-2020
 */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { AmbienceManager } from "../managers/ambienceManager/ambienceManager";
import { DebugManager } from "../managers/debugManager/debugManager";
import { IManager } from "../managers/iManager";
import { NullManager } from "../managers/nullManager";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
import { UIManager } from "../managers/uiManager/uiManager";

export class Master
{
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Get the Master singleton.
   */
  static GetInstance() 
  : Master
  {
    return Master._INSTANCE;
  }

  /**
   * Prepare Master Module.
   */
  static Prepare()
  : void
  {
    if(Master._INSTANCE == null)
    {
      Master._INSTANCE = new Master();
      Master._INSTANCE._onPrepare();      
    }
    return;
  }

  /**
   * Shutdown Master Module
   */
  static Shutdown()
  : void
  {
    if(Master._INSTANCE != null)
    {
      Master._INSTANCE._onShutdown();
      Master._INSTANCE = null;
    }
    return;
  }

  /**
   * Updates the Master Manager and each Manager.
   * 
   * @param _time time elapsed since the game started (seconds). 
   * @param _dt delta time in (seconds).
   */
  update(_time : number, _dt : number)
  : void
  {
    // Timing

    this._m_time = _time;
    this._m_deltaTime = _dt;

    // Managers

    this._m_hManagers.forEach
    (
      this._updateManager,
      this
    );
    return;
  }

  /**
   * Get a Manager from this Master. Returns a Null Service if the manager not
   * exists.
   * 
   * @param _id Manager ID. 
   */
  getManager< T extends IManager>(_id : ST_MANAGER_ID)
  : T
  {
    let hManager = this._m_hManagers;

    if(hManager.has(_id))
    {
      return hManager.get(_id) as T;
    }

    // Notification.

    console.warn
    (
      "Manager with ID: " 
      + _id.toString() 
      + " not exits in the Master Manager, a Null Service was returned."
    );

    return new NullManager() as T;
  }

  /**
   * Adds a new Manager to this Master.
   * 
   * @param _manager 
   */
  addManager(_manager : IManager)
  : void
  {
    this._m_hManagers.set( _manager.getID() as ST_MANAGER_ID, _manager);

    _manager.setMasterManager(this);
    return;
  }

  /**
   * Call the 'onSimulationStart' of each manager.
   */
  startSimulation()
  : void
  {
    if(this.hasSimulationScene())
    {
      this._m_hManagers.forEach
      (
        this._managerSimulationStart,
        this
      );
    }
    else
    {
      console.error
      (
        "Can't start simulation if the manager doesn't has a simulation scene."
      );
    }
    return;
  }

  /**
   * Call the 'onSimulationPause' of each manager.
   */
  pauseSimulation()
  : void
  {
    if(this.hasSimulationScene())
    {
      this._m_hManagers.forEach
      (
        this._managerSimulationPause,
        this
      );
    }
    else
    {
      console.error
      (
        "Can't pause simulation if the manager doesn't has a simulation scene."
      );
    }
    return;
  }

  /**
   * Call the 'onSimulationResume' of each manager.
   */
  resumeSimulation()
  : void
  {
    if(this.hasSimulationScene())
    {
      this._m_hManagers.forEach
      (
        this._managerSimulationResume,
        this
      );
    }
    else
    {
      console.error
      (
        "Can't resume simulation if the manager doesn't has a simulation scene."
      );
    }
    return;
  }

  /**
   * Call the 'onSimulationStop' of each manager.
   */
  stopSimulation()
  : void
  {
    if(this.hasSimulationScene())
    {
      this._m_hManagers.forEach
      (
        this._managerSimulationStop,
        this
      );
    }
    else
    {
      console.error
      (
        "Can't stop simulation if the manager doesn't has a simulation scene."
      );
    }
    return;
  }

  /**
   * Call the 'onDebugEnable' of each manager.
   */
  enableDebugging()
  : void
  {
    if(!this._m_bDebugEnable)
    {
      this._m_bDebugEnable = !this._m_bDebugEnable;

      this._m_hManagers.forEach
      (
        this._managerDebugEnable,
        this
      );
    }
    return;
  }

  /**
   * Call the 'onDebugDisable' of each manager.
   */
  disableDebugging()
  : void
  {
    if(this._m_bDebugEnable)
    {
      this._m_bDebugEnable = !this._m_bDebugEnable;

      this._m_hManagers.forEach
      (
        this._managerDebugDisable,
        this
      );
    }
    return;
  }

  /**
   * Call the 'onSimulationSceneCreate' of each Manager.
   *  
   * @param _scene Simulation Scene. 
   */
  onSimulationSceneCreate(_scene : Phaser.Scene)
  : void
  {
    // Save Simulation Scene.

    this._m_simulationScene = _scene;

    // Callbacks.

    this._m_hManagers.forEach
    (
      function(_manager : IManager)
      : void
      {
        _manager.onSimulationSceneCreate(_scene);
        return;
      },
      this
    );
    return;
  }

  /**
   * Call the 'onSimulationSceneDestroy' of each Manager.
   * 
   * @param _scene Simulation Scene. 
   */
  onSimulationSceneDestroy(_scene : Phaser.Scene)
  : void
  {

    // Callbacks

    this._m_hManagers.forEach
    (
      function(_manager : IManager)
      : void
      {
        _manager.onSimulationSceneDestroy(_scene);
        return;
      },
      this
    );

    // Detach reference.

    this._m_simulationScene = null;

    return;
  }

  /**
   * Gets the delta time value (seconds).
   * 
   * @returns delta time in seconds.
   */
  getDeltaTime()
  : number
  {
    return this._m_deltaTime;
  }

  /**
   * Get the time elapsed since the game started (seconds).
   * 
   * @returns time elapsed in seconds.
   */
  getGameTime()
  : number
  {
    return this._m_time;
  }

  /**
   * Get the Simulation Scene. If the Master Manager doesn't has a simulation
   * scene, it will throw an error.
   * 
   * @returns Phaser Scene.
   */
  getSimulationScene()
  : Phaser.Scene
  {
    if(this._m_simulationScene === null)
    {
      throw new Error("Master doesn't has any simulation scene.");
    }

    return this._m_simulationScene;
  }

  /**
   * Check if the Master has a simulation scene.
   * 
   * @returns true if it has a simulation scene.
   */
  hasSimulationScene()
  : boolean
  {
    return this._m_simulationScene !== null;
  }

  /**
   * Check if the debug feature is enable.
   * 
   * @returns true if the debug feature is enable.
   */
  isDebugEnable()
  : boolean
  {
    return this._m_bDebugEnable;
  }

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  // Private constructor.
  private constructor()
  { }

  /**
   * Create Master and Managers.
   */
  private _onPrepare()
  : void
  {
    this._m_hManagers = new Map<ST_MANAGER_ID, IManager>();
    let hManagers = this._m_hManagers;

    ///////////////////////////////////
    // Create Managers

    this.addManager(DebugManager.Create());
    this.addManager(SimulationManager.Create());
    this.addManager(UIManager.Create());
    this.addManager(AmbienceManager.Create());
    
    // onPrepare Callback.

    hManagers.forEach
    (
      function(_manager : IManager)
      : void
      {
        _manager.onPrepare();
        return;
      }
    );

    // init

    hManagers.forEach
    (
      function(_manager : IManager)
      : void
      {
        _manager.init();
        return;
      }
    );
    return
  }

  /**
   * Destroys managers and Master instance.
   */
  private _onShutdown()
  : void
  {
    let hManagers = this._m_hManagers;

    // Destroy Callback.

    hManagers.forEach
    (
      function(_manager : IManager)
      : void
      {
        _manager.destroy();
        return;
      }
    );

    // Clear Managers.

    hManagers.clear();
    hManagers = null;

    return;
  }

  /**
   * Called when master is been updated.
   * 
   * @param _manager 
   */
  private _updateManager(_manager : IManager)
  : void
  {
    _manager.update(this._m_deltaTime);
    return;
  }

  /**
   * Called when simulation start.
   * 
   * @param _manager 
   */
  private _managerSimulationStart(_manager : IManager)
  : void
  {
    _manager.onSimulationStart();
    return;
  }

  /**
   * Called when simulation pause.
   * 
   * @param _manager 
   */
  private _managerSimulationPause(_manager : IManager)
  : void
  {
    _manager.onSimulationPause();
    return;
  }

  /**
   * Called when simulation resume.
   * 
   * @param _manager 
   */
  private _managerSimulationResume(_manager : IManager)
  : void
  {
    _manager.onSimulationResume();
    return;
  }

  /**
   * Called when simulation stop.
   * 
   * @param _manager 
   */
  private _managerSimulationStop(_manager : IManager)
  : void
  {
    _manager.onSimulationStop();
    return;
  }

  /**
   * Called when debug had been enable.
   * 
   * @param _manager 
   */
  private _managerDebugEnable(_manager : IManager)
  : void
  {
    _manager.onDebugEnable();
    return;
  }

  /**
   * Called when debug had been disable.
   * 
   * @param _manager 
   */
  private _managerDebugDisable(_manager : IManager)
  : void
  {
    _manager.onDebugDisable();
    return;
  }

  /**
   * Singleton.
   */
  private static _INSTANCE : Master;

  /**
   * Table of managers.
   */
  private _m_hManagers : Map<ST_MANAGER_ID, IManager>;

  /**
   * Indicates if the debug feature is enable.
   */
  private _m_bDebugEnable : boolean;

  /**
   * Reference to the simulation scene.
   */
  private _m_simulationScene : Phaser.Scene;

  /**
   * Delta time in seconds.
   */
  private _m_deltaTime : number;

  /**
   * Time elapsed since the game started.
   */
  private _m_time : number;
}