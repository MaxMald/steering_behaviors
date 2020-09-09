/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file forceWander.ts
 * @author Santiago Toll Leyva <santiago.toll97@gmail.com>
 * @since September-09-2020
 */

import { Ty_Sprite, V2 } from "../commons/stTypes";
import { CmpForceController } from "../components/cmpforceController";
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
   * @param _circleDistance The magnitude of the vector from self to circle origin.
   * @param _circleRadius The magnitude of the vector from self to circle origin.
   * @param _angleChange Scalar by which the wander angle is changed.
   * @param _controller [optional] The controller of this force.
   */
  init
  (
    _self : Ty_Sprite,
    _circleDistance : number,
    _circleRadius : number,
    _angleChange : number,
    _controller ?: CmpForceController
  )
  {
    this._m_self = _self;
    this._m_circleDistance = _circleDistance;
    this._m_circleRadius = _circleRadius;
    this._m_angleChange = _angleChange;
    this._m_wanderAngle = 0;
    if(this._m_controller !== undefined)
    {
      this._m_controller = _controller;
    }

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
    // Get controller information.

    let controller = this._m_controller;
    
    let direction = controller.getDirection();

    let speed = controller.getSpeed();

    // Get points
    
    let self : Ty_Sprite = this._m_self;

    let circleDistance : number = this._m_circleDistance;

    let circlePos : V2 = new Phaser.Math.Vector2(self.x, self.y).
                        add(direction.scale(circleDistance));

    circlePos.normalize();
    circlePos.scale(circleDistance);

    // Calculate displacement force.
    let displacement :V2 = new Phaser.Math.Vector2(0,-1);
    displacement.scale(this._m_circleRadius);

    // Randomly change direction
    this.setAngle(displacement,this._m_wanderAngle);
    
    // Slightly change the angle.
    this._m_wanderAngle += Phaser.Math.RND.integer() * this._m_angleChange -
                           this._m_angleChange * 0.5;

    // Calculate steer force.

    let steerForce : V2 = circlePos.add(displacement);

    if(steerForce.length() > speed)
    {
      steerForce.normalize();
      steerForce.set
      (
        steerForce.x * speed, 
        steerForce.y * speed
      );
    } 

    // Apply mass.

    let mass = controller.getMass();

    steerForce.set
    (
      steerForce.x / mass,
      steerForce.y / mass 
    );

    // Add force to the controller.

    controller.addSteerForce(steerForce.x, steerForce.y);

    return;
  }

  /**
   * Safely destroys this force.
   */
  destroy()
  : void 
  {

    this._m_controller = null;

    this._m_self = null;
    return;
  }
  
  /**
   * Change the angle
   * @param _vector The vector to be changed.
   * @param _value The angle by what _vector will change.
   */
  setAngle(_vector : V2, _value : number):
  void
  {
    let magnitude : number =_vector.length();
    _vector.x = Math.cos(_value) * magnitude;
    _vector.y = Math.sin(_value) * magnitude;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Reference to the force controller.
   */
  private _m_controller : CmpForceController;

  /**
   * The magnitude of the applied force.
   */
  private _m_circleDistance : number;
  
  /**
   * The magnitude of wander force.
   */
  private _m_circleRadius : number;

  /**
   * The agent sprite.
   */
  private _m_self : Ty_Sprite;


  /**
   * How many degrees to change the angle
   */
  private _m_angleChange : number;

  /**
   * How much displacement force to use.
   */
  private _m_wanderAngle : number;
}