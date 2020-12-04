/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceFlee.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-27-2020
 */

import { ST_STEER_FORCE } from "../commons/stEnums";
import { Ty_Sprite } from "../commons/stTypes";
import { SeekForce } from "./forceSeek";

export class FleeForce
extends SeekForce
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/

  update(_dt: number): void {
    // Get the target object

    let target : Ty_Sprite = this._m_target;
    
    // Get self object

    let self : Ty_Sprite = this._m_self;
    
    // Get reference to force controller

    let forceController = this._m_controller;
    
    // Get actual velocity

    let actualVelocity = forceController.getVelocity();

    // Calculate desire velocity 
    
    let desireVelocity = this._m_desireVelocity;

    desireVelocity.set
    (
      self.x - target.x,
      self.y - target.y 
    );

    desireVelocity.setLength(this._m_seekMaxLength);

    // Calculate the seek force

    let seekForce = this._m_seekForce;
   
    seekForce.copy(desireVelocity);

    seekForce.subtract(actualVelocity);

    // Truncate the seek force if it exceeds the maximum length allowed.

    seekForce.limit(this._m_seekMaxLength);

    // Add force to the controller.

    forceController.addSteerForce(seekForce.x, seekForce.y);

    return;
  }

  getType(): number {
    return ST_STEER_FORCE.kFlee;
  }  
}