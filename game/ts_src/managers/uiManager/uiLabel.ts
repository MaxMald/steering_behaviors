import { ST_TEXT_TYPE } from "../../commons/stEnums";
import { UIObject } from "./uiObject";

export class UILabel
  extends UIObject
{

  constructor
  (
    _x : number, 
    _y: number, 
    _scene: Phaser.Scene, 
    _text: string,
    _type?: ST_TEXT_TYPE
  )
  {

    super();

    let font_key : string;

    let font_size : number;

    if(_type === undefined)
    {

      font_key = "supercomputer";

      font_size = 30;

    }

    const label = _scene.add.bitmapText
    (
      _x,
      _y,
      font_key,
      _text,
      font_size
    );

    return;

  }

  private _m_label: Phaser.GameObjects.BitmapText;

}