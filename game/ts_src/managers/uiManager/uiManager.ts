/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-11-2020
 */

import { BaseActor } from "../../actors/baseActor";
import { ST_COLOR_ID, ST_MANAGER_ID } from "../../commons/stEnums";
import { Ty_Image, Ty_Sprite } from "../../commons/stTypes";
import { Master } from "../../master/master";
import { DebugManager } from "../debugManager/debugManager";
import { IManager } from "../iManager";
import { UIController } from "./uiControllers/UIController";

export class UIManager
 implements IManager
 {

  static Create()
  : UIManager
  {

    return new UIManager();

  }  

  init()
  : void 
  {

    this._m_aControllers = new Map<string, UIController>();

    this.m_target = undefined;
    this.m_focusedActor = undefined;

    // Get Debug Manager

    const master = Master.GetInstance();

    this._m_debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    return;
  
  }

  update(_dt: number)
  : void 
  {

    this._m_aControllers.forEach
    (
      this._updateController
    );

    if(this.m_target !== undefined)
    {

      const sprite = this.m_target.getWrappedInstance();

      const w = sprite.displayWidth;
      const h = sprite.displayHeight;

      const size = (w > h ? w : h) * 0.6;

      this._m_debugManager.drawCircle
      (
        sprite.x,
        sprite.y,
        size,
        3,
        ST_COLOR_ID.kGreen
      );

      this._m_debugManager.drawCircle
      (
        sprite.x,
        sprite.y,
        size * 1.1,
        1.5,
        ST_COLOR_ID.kGreen,
        0.4
      );

    }

    if(this.m_focusedActor !== undefined)
    {

      const sprite = this.m_focusedActor.getWrappedInstance();

      const w = sprite.displayWidth;
      const h = sprite.displayHeight;

      const size = (w > h ? w : h) * 0.6;

      this._m_debugManager.drawCircle
      (
        sprite.x,
        sprite.y,
        size,
        3,
        ST_COLOR_ID.kOrange
      );

      this._m_debugManager.drawCircle
      (
        sprite.x,
        sprite.y,
        size * 1.1,
        1.5,
        ST_COLOR_ID.kOrange,
        0.4
      );


    }

    return;
  
  }

  receive(_id: number, _msg: any)
  : void 
  {

    return;
  
  }

  setMasterManager(_master: Master)
  : void 
  {

    this._m_master = _master;

    return;
  
  }

  getID()
  : number 
  {

    return ST_MANAGER_ID.kUIManager;
  
  }

  onPrepare()
  : void 
  {

    return;
  
  }

  onSimulationSceneCreate(_scene: Phaser.Scene)
  : void 
  {    

    return;
  
  }

  onSimulationSceneDestroy(_scene: Phaser.Scene)
  : void 
  {
    
    // Destroy the UI Controllers.

    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.destroy();

        return;

      }
    );

    this._m_aControllers.clear();

    this.m_target = undefined;
    this.m_focusedActor = undefined;

    return;

  }

  onSimulationStart()
  : void 
  {

    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.onSimulationStart();

        return;

      }
    );
    
    return;

  }

  onSimulationPause()
  : void 
  {

    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.onSimulationPause();

        return;

      }
    );

    return;
  
  }

  onSimulationResume()
  : void 
  {

    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.onSimulationResume();

        return;

      }
    );

    return;

  }

  onSimulationStop()
  : void 
  {
    
    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.onSimulationStop();

        return;

      }
    );

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

  /**
   * Set the target of this UIManager. 
   * 
   * @param _target 
   */
  setTarget(_target: BaseActor<Ty_Image>)
  : void
  {

    this.m_target = _target;

    this.clearFocusActor();

    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.setTarget(_target);

        return;

      }
    );    

    return;

  }

  /**
   * Set the focused actor of the UI Manager.
   * 
   * @param _actor The focused actor.
   */
  focusActor(_actor: BaseActor<Ty_Sprite>)
  : void
  {

    if(_actor !== this.m_target)
    {

      this.m_focusedActor = _actor;

    }

    return;

  }

  /**
   * Undefined the focused actor.
   */
  clearFocusActor()
  : void
  {

    this.m_focusedActor = undefined;

    return;

  }

  /**
   * Get an UIController by its names. Returns null if the controller doesn't 
   * exists.
   * 
   * @param _name name of the UIController. 
   */
  getUIController(_name: string)
  : UIController
  {

    const aControllers = this._m_aControllers;

    if(aControllers.has(_name))
    {

      return aControllers.get(_name);

    }
    else
    {

      return null;

    }

  }

  /**
   * Adds a UIController to the UIManager.
   * 
   * @param _name Identifier of the UIController. 
   * @param _uiController UIController.
   */
  addUIController(_name: string, _uiController: UIController)
  : void
  {

    this._m_aControllers.set(_name, _uiController);

    _uiController.setMasterManager(this._m_master);
    _uiController.setUIManager(this);

    return;

  }

  destroy()
  : void 
  {
    
    this._m_aControllers.forEach
    (
      function(_controller: UIController)
      : void
      {

        _controller.destroy();

        return;

      }
    );

    this._m_aControllers.clear();
    this._m_aControllers = null;

    this.m_target = undefined;

    return;

  }

  /**
   * The selected actor of the UI Controller. This agent is defined when the
   * pointer click over an interactive actor.
   */
  public m_target: BaseActor<Ty_Image>;

  /**
   * The focused actor by the main pointer. This agent is defined when the
   * pointer is over an interactive actor.
   */
  public m_focusedActor: BaseActor<Ty_Sprite>;

  /****************************************************/
  /* Private                                          */
  /****************************************************/  

  private constructor()
  {

    return;
    
  }

  private _updateController(_controller: UIController)
  : void
  {

    _controller.update();

    return;

  }

  private _m_debugManager: DebugManager;

  /**
   * A map of controllers or the scene.
   */
  private _m_aControllers : Map<string, UIController>;    

  /**
   * Reference to the master manager.
   */
  private _m_master: Master;  

 }