/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIForceFactory.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-12-2020
 */

import { ST_STEER_FORCE } from "../../../commons/stEnums";
import { SeekForce } from "../../../steeringBehavior/forceSeek";
import { IForce } from "../../../steeringBehavior/iForce";
import { UIForce } from "./UIForce";
import { UIForceSeek } from "./UIForceSeek";

export class UIForceFactory
{
  /****************************************************/
  /* Private                                          */
  /****************************************************/  

  public constructor()
  {

    // Factories map.

    const aFactories = new  Map<number, (_scene: Phaser.Scene, force: IForce) => UIForce>();

    this._hFactories = aFactories;

    // Add factories.

    aFactories.set(ST_STEER_FORCE.kSeek, this.createUIForceSeek);

    return;

  }

  createUIForce(_scene: Phaser.Scene, _force: IForce)
  : UIForce
  {

    const type = _force.getType();

    const aFactories = this._hFactories;

    if(aFactories.has(type))
    {

      const fnFactory = aFactories.get(type);

      return fnFactory.call(this, _scene, _force);

    }

    throw new Error("No Factory for : " + _force + " force.");

  }

  createUIForceSeek(_scene: Phaser.Scene, _force: IForce)
  : UIForce
  {

    const uiForce = new UIForceSeek(_scene, _force as SeekForce);

    return uiForce;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _hFactories: Map<number, (_scene: Phaser.Scene, force: IForce) => UIForce>; 

}