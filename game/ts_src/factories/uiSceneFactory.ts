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
import { UISimulationController } from "../managers/uiManager/uiControllers/UISimulationController";
import { UIManager } from "../managers/uiManager/uiManager";
import { UIObject } from "../managers/uiManager/uiObject";
import { Master } from "../master/master";

export class SceneUIFactory
{

  static CreateSimulationUIScene
  (
    _uiSceneKey: string,
    _scene : Phaser.Scene, 
    _uiManager: UIManager
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

    return uiMap;

  }

}