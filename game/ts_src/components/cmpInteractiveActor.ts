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
import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID, ST_SIM_SATE } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { SimulationManager } from "../managers/simulationManager/simulationManager";
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

    // Get Managers

    const master = Master.GetInstance();

    this._m_simulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

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

    this._m_moveVector = new Phaser.Math.Vector2();

    const sprite = _actor.getWrappedInstance();

    // Set the interactive sprite and enable de dragging feature.

    sprite.setInteractive({draggable: true});
    
    // Pointer Events.

    sprite.on("pointerdown", this.selectActor, this);
    sprite.on("pointerover", this.focusActor, this);
    sprite.on("pointerout", this.clearFocus, this);

    // Dragging Events

    sprite.on("drag", this.dragActor, this);
    sprite.on("dragstart", this.dragStart, this);
    sprite.on("dragend", this.dragEnd, this);

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

  /**
   * Define this actor as the focussed actor in the UI Manager.
   */
  focusActor()
  : void
  {

    this._m_uiManager.focusActor(this._m_self);

    return;

  }

  /**
   * Undefined the actor focussed in the UI Manager.
   */
  clearFocus()
  : void
  {

    this._m_uiManager.clearFocusActor();

    return;

  }

  /**
   * Enable the dragging mark (ghost effect).
   */
  dragStart()
  : void
  {

    this._m_uiManager.setTarget(this._m_self);

    this._m_self.sendMessage
    (
      ST_MESSAGE_ID.kSetAlpha,
      0.5
    );

    return;

  }

  /**
   * Remove dragging mark (ghost effect). 
   */
  dragEnd()
  : void
  {

    this._m_self.sendMessage
    (
      ST_MESSAGE_ID.kSetAlpha,
      1.0
    );

    return;

  }

  /**
   * Called by the Phaser Event System.
   * 
   * @param _pointer 
   * @param _dragX 
   * @param _dragY 
   */
  dragActor
  (
    _pointer : Phaser.Input.Pointer, 
    _dragX : number,
    _dragY : number
  )
  : void
  {

    if(this._m_simulationManager.getState() === ST_SIM_SATE.kStopped)
    {

      this._m_self.sendMessage
      (
        ST_MESSAGE_ID.kSetPosition,
        this._m_moveVector.set(_dragX, _dragY)
      );

    }    

    return;

  }

  destroy()
  : void 
  {

    this._m_uiManager = null;
    this._m_simulationManager = null;
    this._m_self = null;
    this._m_moveVector = null;

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Reference to the simulation manager.
   */
  private _m_simulationManager: SimulationManager;

  /**
   * Reference to the UI Manager.
   */
  private _m_uiManager: UIManager;

  /**
   * Reference to the actor's sprite.
   */
  private _m_self: BaseActor<Ty_Sprite>;

  /**
   * Vector with the position values, used by the actor message system.
   */
  private _m_moveVector: V2;

}