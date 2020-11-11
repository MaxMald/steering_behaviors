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
import { ST_MANAGER_ID } from "../../commons/stEnums";
import { Ty_Image } from "../../commons/stTypes";
import { Master } from "../../master/master";
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

    return;
  
  }

  update(_dt: number)
  : void 
  {

    this._m_aControllers.forEach
    (
      this._updateController
    );

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
   * The view target.
   */
  public m_target: BaseActor<Ty_Image>;

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

  /**
   * A map of controllers or the scene.
   */
  private _m_aControllers : Map<string, UIController>;    

  /**
   * Reference to the master manager.
   */
  private _m_master: Master;

 }