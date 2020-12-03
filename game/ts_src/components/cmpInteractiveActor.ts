/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary Provides the feature to be focused by the UI Manager when the
 * pointer click over the wrapped instance (sprite).
 *
 * @file cmpInteractiveActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-02-2020
 */

import { BaseActor } from "../actors/baseActor";
import { ST_COMPONENT_ID, ST_MANAGER_ID } from "../commons/stEnums";
import { Ty_Sprite } from "../commons/stTypes";
import { UIManager } from "../managers/uiManager/uiManager";
import { Master } from "../master/master";
import { IBaseComponent } from "./iBaseComponent";

/**
 * Provides the feature to be focused by the UI Manager when the pointer click
 * over the wrapped instance (sprite).
 */
export class cmpInteractiveActor
implements IBaseComponent<Ty_Sprite>
{

  constructor()
  {

    // Get the UI Manager

    const master = Master.GetInstance();

    this._m_uiManager = master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    return;

  }

  init(_actor: BaseActor<Phaser.GameObjects.Sprite>)
  : void 
  {

    this._m_self = _actor;

    const sprite = _actor.getWrappedInstance();

    sprite.setInteractive();
    
    sprite.on("pointerup", this.selectActor, this);
    sprite.on("pointerover", this.focusActor, this);
    sprite.on("pointerout", this.clearFocus, this);

    return;

  }

  update(_actor: BaseActor<Phaser.GameObjects.Sprite>)
  : void 
  {

    return;

  }

  receive(_id: number, _obj: any)
  : void 
  {

    return;

  }

  onSimulationStart()
  : void 
  {

    return;

  }

  onSimulationPause()
  : void 
  {

    return;

  }

  onSimulationResume()
  : void 
  {

    return;

  }

  onSimulationStop()
  : void 
  {

    return;

  }

  onDebugEnable()
  : void 
  {

    return;

  }

  onDebugDisable()
  : void 
  {

    return;

  }

  getID()
  : number 
  {

    return ST_COMPONENT_ID.kInteractiveActor;

  }

  /**
   * Focus the UI Manager on this actor.
   */
  selectActor()
  : void
  {

    this._m_uiManager.setTarget(this._m_self);

    return;

  }

  focusActor()
  : void
  {

    this._m_uiManager.focusActor(this._m_self);

    return;

  }

  clearFocus()
  : void
  {

    this._m_uiManager.clearFocusActor();

    return;

  }

  destroy()
  : void 
  {

    this._m_uiManager = null;
    this._m_self = null;

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_uiManager: UIManager;

  private _m_self: BaseActor<Ty_Sprite>;

}