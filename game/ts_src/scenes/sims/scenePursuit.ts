/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file scenePursuit.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-29-2020
 */

import { ST_COMPONENT_ID, ST_MANAGER_ID, ST_MESSAGE_ID } from "../../commons/stEnums";
import { CmpForceController } from "../../components/cmpforceController";
import { ShipFactory } from "../../factories/shipFactory";
import { SceneUIFactory } from "../../factories/uiSceneFactory";
import { SimulationManager } from "../../managers/simulationManager/simulationManager";
import { UIManager } from "../../managers/uiManager/uiManager";
import { Master } from "../../master/master";
import { ForceConstant } from "../../steeringBehavior/forceConstant";
import { PursueForce } from "../../steeringBehavior/forcePursue";

export class ScenePursuit
  extends Phaser.Scene
{

  create()
  : void
  {

    ///////////////////////////////////
    // Master Manager
 
    this._m_master = Master.GetInstance();
 
    let master = this._m_master;
 
    // on simulation scene create.
 
    master.onSimulationSceneCreate(this);

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

    const pursuitForce = new PursueForce();

    pursuitForce.init
    (
      blueShip,
      targetActor,
      300
    );

    blueFController.addForce("pursuit", pursuitForce);    

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