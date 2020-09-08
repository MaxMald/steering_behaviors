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
   * Safely destroys this force.
   */
  destroy()
  : void;
}