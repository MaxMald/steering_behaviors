/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file iForce.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { CmpForceController } from "../components/cmpForceController";

/**
 * Provides a base controller for each force.
 */
export interface IForce
{
  /**
   * Set the controller of this force.
   * 
   * @param _controller Force controller.
   */
  setController(_controller : CmpForceController)
  : void;

  /**
   * Updates this force.
   * 
   * @param _dt delta time in seconds. 
   */
  update(_dt : number)
  : void;

  /**
   * Updates the debugging logic. Called only when the debugging feature is 
   * enable.
   * 
   * @param _dt delta time in seconds.
   */
  updateDebug(_dt : number)
  : void;

  /**
   * Called when the debug feature had been enable.
   */
  onDebugEnable()
  : void;

  /**
   * Called when the debug feature had been disable.
   */
  onDebugDisable()
  : void;

  /**
   * Get the type of this force.
   */
  getType()
  : number;

  /**
   * Get the max magnitude of this force.
   */
  getMaxMagnitude()
  : number;

  /**
   * Get the actual force of this force.
   */
  getActualForce()
  : number;

  /**
   * Safely destroys this force.
   */
  destroy()
  : void;
  
  /**
   * Called when the simulation had stopped.
   */
  onSimulationStop()
  : void;
}