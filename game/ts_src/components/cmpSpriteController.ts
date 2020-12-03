/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file cmpSpriteController.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-07-2020
 */

import { BaseActor } from "../actors/baseActor";
import { ST_COMPONENT_ID, ST_MESSAGE_ID } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { IBaseComponent } from "./iBaseComponent";

export class CmpSpriteController
implements IBaseComponent<Ty_Sprite>
{    
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  /**
   * Get the sprite from actor.
   * 
   * @param _actor actor. 
   */
  init(_actor: BaseActor<Ty_Sprite>)
  : void 
  {
    this._m_sprite = _actor.getWrappedInstance();
    
    return;
  }

  update(_actor: BaseActor<Ty_Sprite>)
  : void 
  { }

  receive(_id: number, _obj: any)
  : void 
  {

    switch(_id)
    {
      case ST_MESSAGE_ID.kMove:
      
      {
        let v2 : V2 = _obj as V2;
        this.move(v2.x, v2.y);
      }
      return;

      case ST_MESSAGE_ID.kSetPosition:

      {
        let v2 : V2 = _obj as V2;
        this.setPosition(v2.x, v2.y);
      }
      return;

      case ST_MESSAGE_ID.kSetScale:

      {
        let v2 : V2 = _obj as V2;
        this.setScale(v2.x, v2.y);
      }
      return;

      case ST_MESSAGE_ID.kSetAngle:

      this._m_sprite.setAngle(Phaser.Math.RadToDeg(_obj as number));

      return;

      case ST_MESSAGE_ID.kSetAlpha:

      this.setAlpha(_obj as number);

      return;
    }

    return;

  }

  /**
   * Move the game object.
   * 
   * @param _x x units. 
   * @param _y y units.
   */
  move(_x : number, _y : number)
  : void
  {

    let sprite = this._m_sprite;

    sprite.setPosition
    (
      sprite.x + _x,
      sprite.y + _y
    );

    return;

  }

  /**
   * Set the position of the game object.
   * 
   * @param _x x component. 
   * @param _y y component.
   */
  setPosition(_x : number, _y : number)
  : void
  {
    
    let go = this._m_sprite;

    go.setPosition
    (
      _x,
      _y
    );

    return;

  }

  /**
   * Set the gameobject scale.
   * 
   * @param _x x scale. 
   * @param _y y scale.
   */
  setScale(_x : number, _y : number)
  : void
  {

    let go = this._m_sprite;

    go.setScale(_x, _y);
    
    return;

  }

  setAlpha(_alpha: number)
  : void
  {

    this._m_sprite.setAlpha(_alpha);

    return;

  }

  onSimulationStart()
  : void 
  {
    return;
  }

  onSimulationPause()
  : void 
  {
    return;
  }

  onSimulationResume()
  : void 
  {
    return;
  }

  onSimulationStop()
  : void 
  {
    return;
  }

  onDebugEnable()
  : void 
  {
    return;
  }

  onDebugDisable()
  : void 
  {
    return;
  }

  getID()
  : number 
  {
    return ST_COMPONENT_ID.kSpriteController;
  }

  /**
   * Destroys and remove the gameobject from the phaser scene.
   */
  destroy()
  : void 
  {
    this._m_sprite.destroy();
    this._m_sprite = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Attached sprite.
   */
  private _m_sprite : Ty_Sprite;
}