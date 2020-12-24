/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file sceneEvade.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-02-2020
 */

import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { MapScene } from "../../gameScene/mapScene";
import { AmbienceManager } from "../../managers/ambienceManager/ambienceManager";
import { DebugManager } from "../../managers/debugManager/debugManager";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIButtonImg } from "../../managers/uiManager/uiButtonImg";
import { UIManager } from "../../managers/uiManager/uiManager";
import { UIObject } from "../../managers/uiManager/uiObject";
import { Master } from "../../master/master";
import { EvadeForce } from "../../steeringBehavior/forceEvade";
import { SeekForce } from "../../steeringBehavior/forceSeek";

export class SceneEvade
  extends Phaser.Scene
{

  create()
  : void
  {

    ///////////////////////////////////
    // Master Manager
 
    this._m_master = Master.GetInstance();
 
    const master = this._m_master;

    // Master callback: "onSceneCreate" for each manager.

    master.onSceneCreate(this);
 
    // on simulation scene create.
 
    master.onSimulationSceneCreate(this);

    /****************************************************/
     /* Ambient                                          */
     /****************************************************/

     const ambienceMap = MapScene.CreateFromTiledMap("ambience_05", this);

     ambienceMap.clear();
     ambienceMap.destroy();

    // Get simulation manager.
 
    let simManager : SimulationManager = master.getManager<SimulationManager>
    (
      ST_MANAGER_ID.kSimManager
    );

    // Get canvas size.
  
    let canvas = this.game.canvas;
  
    let width : number = canvas.width;
    let height : number = canvas.height;

    ///////////////////////////////////
    // Create scene buttons

    let mainMenuButton : UIButtonImg = UIButtonImg.CreateHomeButtonImg
    (
      width * 0.9,
      height * 0.1,
      this
    );

    mainMenuButton.subscribe
    (
      "buttonReleased",
      "button",
      function(_sender : UIObject, _args)
      {

        const button = _sender as UIButtonImg;

        master.onSimulationSceneDestroy(this);
    
        this.scene.start('main_menu');
      },
      this
    );

    /****************************************************/
    /* Red Ship                                         */
    /****************************************************/

    const targetActor =  ShipFactory.CreateRedShip
    (
      this,
      "Red Ship"
    );
 
    // Add target to simulation manager.
 
    simManager.addActor(targetActor);

    // Create the target force controller.

    const targetFController = targetActor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    // Set target scale.

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.0
    );

    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      300
    );
    
    targetActor.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
     targetActor.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.75, height * 0.5)
     );

    /****************************************************/
    /* Blue Ship                                        */
    /****************************************************/

    ///////////////////////////////////
    // Create SpaceShip Actor
    
    const blueShip = ShipFactory.CreateBlueShip(this, "Blue Ship");
 
    // Add ship to simulation manager.
 
    simManager.addActor(blueShip);

    const blueFController = blueShip.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    const evadeForce = new EvadeForce();

    evadeForce.init
    (
      blueShip,
      targetActor,
      150
    );

    blueFController.addForce("evade", evadeForce);    

    ///////////////////////////////////
    // Red Ship Seek Blue ship

    const redSeek = new SeekForce();

    redSeek.init
    (
      targetActor.getWrappedInstance(),
      blueShip.getWrappedInstance(),
      150
    );

    targetFController.addForce("seek", redSeek);

     /****************************************************/
     /* Foreground Ambience                              */
     /****************************************************/

     const ambienceMng = master.getManager<AmbienceManager>
     (
       ST_MANAGER_ID.kAmbienceManager
     );

     ambienceMng.createStarDust(this);

    /****************************************************/
    /* Debug Manager                                    */
    /****************************************************/

    const debugManager = master.getManager<DebugManager>
    (
      ST_MANAGER_ID.kDebugManager
    );

    debugManager.prepareDebugManager(this);

    /****************************************************/
    /* UI                                               */
    /****************************************************/    
    
    // Get UI Manager
    
    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    // Create the Simulation Map Scene

    SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);

    // Set the active actor of the UI Manager.

    uiManager.setTarget(blueShip);

    ///////////////////////////////////
    // Set simulation to stop state
 
    this._m_master.stopSimulation();

    return;

  }

  update(_time : number, _delta : number)
   : void
   {
     
    // Update Master
 
     this._m_master.update(_time, _delta * 0.001);
 
     return;

   }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _m_master : Master;

}