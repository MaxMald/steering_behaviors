/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceSeek.ts
 * @author Andrés Otoniel Sumano Hernández <andressumano@hotmail.com>
 * @since September-08-2020
 */

import { BaseActor } from "../actors/baseActor";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
import { IForce } from "./iForce";

/**
 * 
 */
export class PursueForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Seek Force.
   * 
   * @param _self The sprite of the agent.
   * @param _target The sprite of the target.
   * @param _force The magnitude of the force.
   * @param _predictionSteps How many step ahead to predict.
   * @param _targetForceCtrl The forceControler of the target.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _target : Ty_Sprite,
    _force : number,
    _predictionSteps : number,
    _targetForceCtrl : CmpForceController,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    this._m_target = _target;
    this._m_force = _force;

    this._m_targetForceCtrl = _targetForceCtrl;
    this._m_predictionSteps = _predictionSteps;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    this._m_v2_A = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_B = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_force_v2 = new Phaser.Math.Vector2(0.0, 0.0);

    return;
  }

  setController(_controller: CmpForceController)
  : void 
  {
    this._m_controller = _controller;
    return;
  }

  update(_dt: number)
  : void 
  {
    // Get points

    this._m_targetForce = this._m_targetForceCtrl.getDirection();

    let target : Ty_Sprite = this._m_target;
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let maxSpeed = controller.getMaxSpeed();

    let speed = controller.getSpeed();

    let v2_A = this._m_v2_A; 

    let forceMagnitude = this._m_force;

    // Current Force

    v2_A.setTo(direction.x * speed, direction.y * speed);

    // Desire Force    

    let v2_B = this._m_v2_B;
    v2_B.set
    (
      target.x - self.x, 
      target.y - self.y
    ); 

    let ajustedPrediction = v2_B.length() / forceMagnitude;
    this._m_targetForce.scale(ajustedPrediction * (this._m_predictionSteps + 1));
    v2_B.add(this._m_targetForce);
    v2_B.normalize();
    v2_B.scale(forceMagnitude);

    v2_A.setTo(direction.x * speed, direction.y * speed);

    controller.addSteerForce(v2_B.x, v2_B.y);

    return;
  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;
    this._m_force_v2 = null;
    this._m_targetForce = null;
    this._m_v2_A = null;
    this._m_v2_B = null;

    this._m_target = null;
    this._m_self = null;
    return;
  }
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The force in Vector2.
   */
  private _m_force_v2 : V2;

  /**
   * The magnitude of the applied force.
   */
  private _m_force : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target sprite.
   */
  private _m_target : Ty_Sprite;

  /**
   * Vector 2 A.
   */
  private _m_v2_A : V2;

  /**
   * Vector 2 B.
   */
  private _m_v2_B : V2;

  /**
   * ForceControler of the target
   */
  private _m_targetForceCtrl : CmpForceController;

  /**
   * Velocity of the target
   */
  private _m_targetForce : V2;

  /**
   * Velocity of the target
   */
  private _m_predictionSteps : number;


}