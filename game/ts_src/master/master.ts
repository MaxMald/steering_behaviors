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
import { IManager } from "../managers/iManager";
import { NullManager } from "../managers/nullManager";

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
    if(Master._INSTANCE === null)
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
    if(Master._INSTANCE !== null)
    {
      Master._INSTANCE._onShutdown();
      Master._INSTANCE = null;
    }
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

    // TODO
    
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
   * Singleton.
   */
  private static _INSTANCE : Master;

  /**
   * Table of managers.
   */
  private _m_hManagers : Map<ST_MANAGER_ID, IManager>;
}