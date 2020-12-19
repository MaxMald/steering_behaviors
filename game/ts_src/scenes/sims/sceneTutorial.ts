import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { MapScene } from "../../gameScene/mapScene";
import { AmbienceManager } from "../../managers/ambienceManager/ambienceManager";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIManager } from "../../managers/uiManager/uiManager";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant"; 
import { TutorialManager } from "../../tutorialManager/tutorialManager";
import { SttTutDebug } from "../../tutorialManager/tutState/sttTutDebug";
import { SttTutForceMng } from "../../tutorialManager/tutState/sttTutForceMng";
import { SttTutIntro } from "../../tutorialManager/tutState/sttTutIntro";
import { SttTutSelectDrag } from "../../tutorialManager/tutState/sttTutSelectDrag";
  
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
     /* ISS Nexus                                        */
     /****************************************************/

     const nexus =  ShipFactory.CreateBlueShip
     (
       this,
       "ISS Nexus"
     );
 
     // Add target to simulation manager.
 
     simManager.addActor(nexus);

     // Create the target force controller.

     const targetFController = nexus.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Constant force.

     const constantForce = new ForceConstant();

     constantForce.init
     (
      nexus.getWrappedInstance(),
       new Phaser.Math.Vector2(0.4, 0.85),
       300,
       true 
      );

      targetFController.addForce("constant", constantForce);

     // Set target scale.

     nexus.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.0
    );

    nexus.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      300
    );
    
    nexus.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
    nexus.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.5, height * 0.6)
     );     

     /****************************************************/
     /* Scarlet Mist                                     */
     /****************************************************/

     const scarletMist =  ShipFactory.CreateRedShip
     (
       this,
       "Scarlet Mist"
     );
 
     // Add target to simulation manager.
 
     simManager.addActor(scarletMist);

     // Create the target force controller.

     const scarletForceController = scarletMist.getComponent<CmpForceController>
     (
       ST_COMPONENT_ID.kForceController
     );

     // Create Constant force.

     const scarletConstantForce = new ForceConstant();

     scarletConstantForce.init
     (
       scarletMist.getWrappedInstance(),
       new Phaser.Math.Vector2(0.4, 0.85),
       300,
       true 
     );

      scarletForceController.addForce("constant", scarletConstantForce);

     // Set target scale.

     scarletMist.sendMessage
    (
      ST_MESSAGE_ID.kSetMass,
      3.0
    );

    scarletMist.sendMessage
    (
      ST_MESSAGE_ID.kSetMaxSpeed,
      300
    );
    
    scarletMist.sendMessage
    (
      ST_MESSAGE_ID.kSetScale,
      new Phaser.Math.Vector2(0.5, 0.5)
    );
 
    scarletMist.sendMessage
     (
       ST_MESSAGE_ID.kSetPosition,
       new Phaser.Math.Vector2(width * 0.7, height * 0.6)
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

     uiManager.setTarget(nexus);

     /****************************************************/
     /* Tutorial Manager                                 */
     /****************************************************/
     
     // Create Tutorial.

     const tutorialManager = new TutorialManager(master, this);

     this._m_tutorialManager = tutorialManager;

     // Add Tutorial States.

     tutorialManager.addState("intro", new SttTutIntro());
     tutorialManager.addState("debug", new SttTutDebug());
     tutorialManager.addState("forceMng", new SttTutForceMng());
     tutorialManager.addState("selectDrag", new SttTutSelectDrag());

     // Initialize tutorial manager.

     tutorialManager.init();

     // Set active state.

     tutorialManager.setActive("intro");

     // Open Tutorial Book.

     this._openSceneInfo();
 
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

    this._m_tutorialManager.openBook();

    return;

   }
 
   private _m_master : Master;

   private _m_tutorialManager: TutorialManager;
 }