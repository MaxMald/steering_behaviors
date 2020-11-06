import { Master } from "../../master/master";

export class UIObject
{

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

  /**
   * Safely destroys this manager.
   */
  destroy()
  : void
  {

    return;

  }

}