import { Vector } from "matter";
/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceArrival.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since September-16-2020
 */

import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpForceController";
import { IForce } from "./iForce";

/**
 * 
 */
export class WanderForce
implements IForce
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Initialize the Arrival Force.
   * 
   * @param _self The sprite of the agent.
   * @param _force The magnitude of the force.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _targetDistance : number,
    _circleRadius : number,
    _displacementAngle : number,
    _angleChange : number,
    _force : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    
    this._m_targetDistance = _targetDistance;

    this._m_circleRadius = _circleRadius;

    this._m_displacementAngle = _displacementAngle;

    this._m_angleChange = _angleChange;
    
    this._m_forceMagnitude = _force;

    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

    this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);

    this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);

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
    
    let self : Ty_Sprite = this._m_self;
    
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    // Current Force
    
    let actualVelocity = this._m_v2_actualVelocity;

    actualVelocity.setTo(direction.x * speed, direction.y * speed);

    let targetDistance = direction;

    // Normalize

    targetDistance.normalize();

    // Get position of target before displacement

    targetDistance.scale(this._m_targetDistance);

    // Get displacement vector

    let displacement = new Phaser.Math.Vector2(0.0, -1.0);

    let circleRadius = this._m_circleRadius;

    displacement.scale(circleRadius);

    let displacementAngle = this._m_displacementAngle;

    this.setAngle(displacement, displacementAngle);

    let changeAngle = this._m_angleChange;

    this._m_displacementAngle += Math.random() * changeAngle - changeAngle * .5;

    // Desire Force    

    let forceMagnitude = this._m_forceMagnitude;

    let desiredVelocity = this._m_v2_desiredVelocity;

    targetDistance.add(displacement);

    desiredVelocity.set
    (
        targetDistance.x - self.x, 
        targetDistance.y - self.y
    );

    desiredVelocity.normalize();
    
    desiredVelocity.set(
        desiredVelocity.x * forceMagnitude, 
        desiredVelocity.y * forceMagnitude
    );

    // Steer Force

    let steerForce = this._m_v2_forceMagnitude;
   
    steerForce.set
    (
      desiredVelocity.x - actualVelocity.x, 
      desiredVelocity.y - actualVelocity.y
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
    this._m_v2_forceMagnitude = null;
    this._m_v2_actualVelocity = null;
    this._m_v2_desiredVelocity = null;

    this._m_self = null;
    return;
  }

  setAngle(_vector : V2, _value : number)
  : void {
      let distance = _vector.length();
      _vector.set(
          _vector.x = Math.cos(_value) * distance,
          _vector.y = Math.sin(_value) * distance
      )
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
  private _m_v2_forceMagnitude : V2;

  /**
   * The magnitude of the applied force.
   */
  private _m_forceMagnitude : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;

  /**
   * The target distance from the agent in relation of its actual velocity (direction).
   */
  private _m_targetDistance : number;

  /**
   * The radius for target displacement from the wander distance value.
   */
  private _m_circleRadius : number;

  /**
   * The angle of displacement for the displacement vector every frame.
   */
  private _m_displacementAngle : number;

  /**
   * The change factor for the displacement angle.
   */
  private _m_angleChange : number;

  /**
   * Vector 2 A.
   */
  private _m_v2_actualVelocity : V2;

  /**
   * Vector 2 B.
   */
  private _m_v2_desiredVelocity : V2;
}