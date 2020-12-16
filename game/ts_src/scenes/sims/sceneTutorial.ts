import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { MapScene } from "../../gameScene/mapScene";
import { AmbienceManager } from "../../managers/ambienceManager/ambienceManager";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIInfoBox } from "../../managers/uiManager/uiControllers/UIInfoBox";
import { UIManager } from "../../managers/uiManager/uiManager";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant";
import { SeekForce } from "../../steeringBehavior/forceSeek";
 
  
 export class ScnTutorial 
 extends Phaser.Scene
 {
   /****************************************************/
   /* Public                                           */
   /****************************************************/
   
   create()
   : void
   {    

    // Camera fade in

    this.cameras.main.fadeIn(500, 0, 0, 0, );
 
     ///////////////////////////////////
     // Master Manager
 
     this._m_master = Master.GetInstance();
 
     let master = this._m_master;
 
     // on simulation scene create.
 
     master.onSimulationSceneCreate(this);

     /****************************************************/
     /* Ambient                                          */
     /****************************************************/

    const ambienceMap = MapScene.CreateFromTiledMap("ambience_01", this);

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

     /****************************************************/
     /* Target                                           */
     /****************************************************/

     const targetActor =  ShipFactory.CreateBlueShip
     (
       this,
       "Blue Ship"
     );
 
     // Add target to simulation manager.
 
     simManager.addActor(targetActor);

     // Create the target force controller.

     const targetFController = targetActor.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Constant force.

     const constantForce = new ForceConstant();

     constantForce.init
     (
       targetActor.getWrappedInstance(),
       new Phaser.Math.Vector2(0.4, 0.85),
       300,
       true 
      );

      targetFController.addForce("constant", constantForce);

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
       new Phaser.Math.Vector2(width * 0.5, height * 0.5)
     );     

     /****************************************************/
     /* Foreground Ambience                              */
     /****************************************************/

      const ambienceMng = master.getManager<AmbienceManager>
      (
        ST_MANAGER_ID.kAmbienceManager
      );

      ambienceMng.createStarDust(this);

     /****************************************************/
     /* UI                                               */
     /****************************************************/    
    
     // Get UI Manager
    
     const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

     // Create the Simulation Map Scene

     const uiMapScene: MapScene = SceneUIFactory.CreateSimulationUIScene
     (
       "simulation_ui", 
       this, 
       uiManager,
       this._openSceneInfo,
       this
      );

     // Set the active actor of the UI Manager.

     uiManager.setTarget(targetActor);

     // Display Info

     this._openSceneInfo();

     ///////////////////////////////////
     // Stop Simulation
 
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

   /**
    * Open the scene information box.
    */
   private _openSceneInfo()
   : void
   {

    // Pause Simulation.

    const master = this._m_master;

    master.pauseSimulation();

    // Get the UI Manager.

    const uiManger = master.getManager<UIManager>
    (
      ST_MANAGER_ID.kUIManager
    );

    // Get the info box.

    const infoBox = uiManger.getUIController("infoBox") as UIInfoBox;

    // Set the book.

    infoBox.setBook("seek");

    // Open info box.

    infoBox.open();

    return;

   }
 
   private _m_master : Master;
 }