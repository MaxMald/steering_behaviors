/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Provides a base control for the game components.
 *
 * @file iBaseComponent.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { BaseActor } from "../actors/baseActor";

/**
 * Provides a base control for the game components.
 */
export interface IBaseComponent<T>
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Initialize this component.
   */
  init(_actor : BaseActor<T>) : void;

  /**
   * Updates the component.
   */
  update(_actor : BaseActor<T>) : void;

  /**
   * Receive a message.
   * 
   * @param _id Message id. 
   * @param _obj Message object.
   */
  receive(_id : integer, _obj : any) : void;

  /**
   * Get this component identifier.
   */
  getID() : number;

  /**
   * Destroys the component.
   */
  destroy() : void;  
}