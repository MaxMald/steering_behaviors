/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file cmpShipPropulsor.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since November-26-2020
 */



import { BaseActor } from "../actors/baseActor";
import { ST_COMPONENT_ID } from "../commons/stEnums";
import { Ty_Sprite, V2 } from "../commons/stTypes";
import { Master } from "../master/master";
import { SeekForce } from "../steeringBehavior/forceSeek";
import { CmpForceController } from "./cmpforceController";
import { IBaseComponent } from "./iBaseComponent";


export class CmpShipPropulsor
implements IBaseComponent<Ty_Sprite>
{
  init(_actor: BaseActor<Phaser.GameObjects.Sprite>)
  : void {
    
    this._m_sprite = _actor.getWrappedInstance();

    const master = Master.GetInstance();

    const scene = master.getSimulationScene();

    this._m_fireBackAnim = scene.add.sprite
    (
      0,
      0,
      "game_art",
      "blueBackFire_1.png"
    );

    this._m_v2_spriteDirection = new Phaser.Math.Vector2();

    this._m_v2_spritePosition = new Phaser.Math.Vector2();
    
    return;
  }

  update(_actor: BaseActor<Phaser.GameObjects.Sprite>)
  : void {
    const forceController = _actor.getComponent<CmpForceController>
    (
      ST_COMPONENT_ID.kForceController
    );

    const direction = forceController.getDirection();

    this._m_v2_spriteDirection.set(direction.x, direction.y);

    this._m_fireBackAnim.setAngle(Phaser.Math.RadToDeg(this._m_v2_spriteDirection.angle()));

    this._m_v2_spriteDirection.scale(-1);

    this._m_v2_spritePosition.set(
      this._m_v2_spriteDirection.x * this._m_sprite.width * 0.4 + this._m_sprite.x,
      this._m_v2_spriteDirection.y * this._m_sprite.width * 0.4 +  this._m_sprite.y
    );

    this._m_fireBackAnim.setPosition(this._m_v2_spritePosition.x, this._m_v2_spritePosition.y);

    const deltaSpeed = forceController.getTotalActualForceMagnitude() / forceController.getTotalMaxForceMagnitude();

    this._m_fireBackAnim.setScale(this._m_sprite.scaleX * deltaSpeed, this._m_sprite.scaleY);

    return;

  }

  receive(_id: number, _obj: any): void {
    return;
  }
  onSimulationStart(): void {
    return;
  }
  onSimulationPause(): void {
    return;
  }
  onSimulationResume(): void {
    return;
  }
  onSimulationStop(): void {
    return;
  }
  onDebugEnable(): void {
    return;
  }
  onDebugDisable(): void {
    return;
  }
  getID(): number {
    return ST_COMPONENT_ID.kShipPropulsor;
  }
  destroy(): void {

    this._m_fireBackAnim.destroy();

    this._m_fireBackAnim = null;

    this._m_sprite = null;
    return;
  }

  setAnimation(_key : string)
  : void
  {
    this._m_fireBackAnim.play(_key);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  private _m_sprite : Ty_Sprite;

  private _m_fireBackAnim : Ty_Sprite;

  private _m_v2_spriteDirection : V2;

  private _m_v2_spritePosition : V2;
  
}