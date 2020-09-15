/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceSeek.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";

/**
 * 
 */
export class SeekForce
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
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _target : Ty_Sprite,
    _force : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    this._m_target = _target;
    this._m_force = _force;

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

    let target : Ty_Sprite = this._m_target;
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    let v2_A = this._m_v2_A;

    // Current Force

    v2_A.setTo(direction.x * speed, direction.y * speed);

    // Desire Force    

    let forceMagnitude = this._m_force;

    let v2_B = this._m_v2_B;

    v2_B.set
    (
      target.x - self.x, 
      target.y - self.y
    );

    v2_B.normalize();
    v2_B.set(v2_B.x * forceMagnitude, v2_B.y * forceMagnitude);

    // Steer Force

    let steerForce = this._m_force_v2;
   
    steerForce.set
    (
      v2_B.x - v2_A.x, 
      v2_B.y - v2_A.y
    );    

    // Truncate force    

    if(steerForce.length() > forceMagnitude)
    {
      steerForce.normalize();
      steerForce.set
      (
        steerForce.x * forceMagnitude, 
        steerForce.y * forceMagnitude
      );
    }

    // Add force to the controller.

    controller.addSteerForce(steerForce.x, steerForce.y);

    return;
  }

  /**
   * Called when the debugging feature had been enable.
   */
  onDebugEnable()
  : void 
  {
    // TODO
    return;
  }

  /**
   * Called when the debugging feature had been disable.
   */
  onDebugDisable()
  : void 
  {
    // TODO
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
}