import { MxUObject } from "gameObjects/mxUObject";
import { MxListener } from "listeners/mxListener";
import { MxListenerManager } from "listeners/mxListenerManager";
import { Master } from "../../master/master";

export class UIObject
{

  constructor()
  {

    this._m_listenerManager = new MxListenerManager<UIObject, any>();

    return;

  }

  /**
   * Initialize the Manager. Called by Master when the App before the application
   * was created
   */
  init() 
  : void
  {

    return;

  }

  /**
   * Called by Master, each game loop.
   * 
   * @param _dt delta time in seconds. 
   */
  update( _dt : number )
  : void
  {

    return;

  }

  /**
   * Set the Master Manager
   * 
   * @param _master Master Manager. 
   */
  setMasterManager(_master : Master)
  : void
  {

    return;

  }

  /**
   * Called by Master when the simulation is going to start.
   */
  onSimulationStart()
  : void
  {

    return;

  }

  /**
   * Called by Master when the simulation had been paused.
   */
  onSimulationPause()
  : void
  {

    return;

  }

  /**
   * Called by Master when the game is going to be resumed..
   */
  onSimulationResume()
  : void
  {

    return;

  }

  /**
   * Called by Master when the game is shutdown.
   */
  onSimulationStop()
  : void
  {

    return;

  }

  subscribe
  (
    _event: string, 
    _username: string, 
    _fn: (_sender: UIObject, _args: any)=>void, 
    _context: any
  )
  : void
  {

    this._m_listenerManager.suscribe
    (
      _event, 
      _username, 
      new MxListener<UIObject,any>(_fn, _context)
    );

    return;

  }

  unsubscribe
  (
    _event: string,
    _username: string
  )
  : void
  {

    this._m_listenerManager.unsuscribe
    (
      _event,
      _username
    );

    return;

  }

  /**
   * Safely destroys this manager.
   */
  destroy()
  : void
  {

    this._m_listenerManager.destroy();

    return;

  }

  protected _m_listenerManager : MxListenerManager<UIObject, any>;

}