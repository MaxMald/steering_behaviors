/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Provides a common control for every actor.
 *
 * @file iActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

 /**
  * Provides a common control for every actor.
  */
 export interface IActor
 {
   /****************************************************/
   /* Public                                           */
   /****************************************************/

   /**
    * Initilize the actor.
    */
   init()
   : void;

   /**
    * Update the actor.
    */
   update()
   : void;
   
   /**
    * Send a message.
    * 
    * @param _id message id. 
    * @param _obj message.
    */
  sendMessage(_id : number, _obj : any)
  : void;

  /**
   * Get the actor's name.
   */
  getName()
  : string;

  /**
   * Destroy actor.
   */
  destroy()
  : void;
 }
