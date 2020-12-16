/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file uiSceneFactory.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-05-2020
 */

import { MapScene } from "../gameScene/mapScene";
import { UIButtonImg } from "../managers/uiManager/uiButtonImg";
import { UIForceController } from "../managers/uiManager/uiControllers/UIForceController";
import { UIInfoBox } from "../managers/uiManager/uiControllers/UIInfoBox";
import { UISimulationController } from "../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../managers/uiManager/uiManager";
import { UIObject } from "../managers/uiManager/uiObject";
import { Master } from "../master/master";

export class SceneUIFactory
{

  /**
   * Create the UI Simulation scene from a tiled map.
   * 
   * Optional: set the info button callback and context.
   * 
   * @param _uiSceneKey Tiled Map Key.
   * @param _scene Phaser.Scene.
   * @param _uiManager UI Manager.
   * @param _infoButtonCallback (optional) set the info button callback.
   * @param _infoButtonContext (optional) set the info button callback context.
   */
  static CreateSimulationUIScene
  (
    _uiSceneKey: string,
    _scene : Phaser.Scene, 
    _uiManager: UIManager,
    _infoButtonCallback?: (_sender: UIObject, _args: any) => void,
    _infoButtonContext?: any
  )
  : MapScene
  {

    // Create UI Map

    const uiMap: MapScene = MapScene.CreateFromTiledMap(_uiSceneKey, _scene);

    ///////////////////////////////////
    // Force Manager

    const uiForceController = new UIForceController(uiMap,_scene);

    _uiManager.addUIController("forceUI", uiForceController);

    ///////////////////////////////////
    // Simulation Controller    
    
    const uiSimController = UISimulationController.CreateSimControlBox
    (
      uiMap
    );    

    _uiManager.addUIController("mediaSimUI", uiSimController);

    ///////////////////////////////////
    // Main Menu Button

    const mainMenuButton = uiMap.getObject<UIButtonImg>("menuButton");

    mainMenuButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender: UIObject, _args: any)
      : void
      {

        const master = Master.GetInstance();

        const scene = master.getSimulationScene();

        master.onSimulationSceneDestroy(scene);
    
        scene.scene.start('main_menu');

        return;

      },
      uiMap
    );

    ///////////////////////////////////
    // Info Button

    // Set the info button callback.

    if(_infoButtonCallback !== undefined)
    {

      const infoButton = uiMap.getObject<UIButtonImg>("infoButton");

      infoButton.subscribe
      (
        "buttonReleased",
        "button",
        _infoButtonCallback,
        _infoButtonContext
      );

    }    

    ///////////////////////////////////
    // Create Info Box
     
     // Create the info box.

     const infoBox = new UIInfoBox(_scene, "info_box");

     _uiManager.addUIController("infoBox", infoBox);

     infoBox.close();

    return uiMap;

  }

}