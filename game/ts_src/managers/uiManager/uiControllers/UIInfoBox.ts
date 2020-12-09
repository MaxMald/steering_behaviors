/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIInfoBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-08-2020
 */

import { ST_MANAGER_ID } from "../../../commons/stEnums";
import { STPoint } from "../../../commons/stPoint";
import { InfoBook } from "../../../gameScene/infoBook";
import { InfoPage } from "../../../gameScene/infoPage";
import { MapScene } from "../../../gameScene/mapScene";
import { Master } from "../../../master/master";
import { UIButtonImg } from "../uiButtonImg";
import { UIGroup } from "../uiGroup";
import { UIImage } from "../uiImage";
import { UIManager } from "../uiManager";
import { UIObject } from "../uiObject";
import { UIText } from "../uiText";
import { UIController } from "./UIController";

export class UIInfoBox
extends UIController
{

  constructor(_scene: Phaser.Scene, _sceneMap: string)
  {

    super();

    // Create group

    const group = _scene.add.group();

    this._m_group = group;

    // Create a UI Content Group

    const uiGroup = new UIGroup();

    this._m_contentGroup = uiGroup;

    ///////////////////////////////////
    // Background

    const bg = _scene.add.image(0, 0, "game_art", "info_bg.png");

    // resize background to fill all the canvas.

    bg.setOrigin(0.0, 0.0);

    bg.setScale
    (
      (_scene.game.canvas.width / bg.width ),
      (_scene.game.canvas.height / bg.height)
    );

    bg.setInteractive();

    group.add(bg);    

    ///////////////////////////////////
    // Tiled Map

    const map = MapScene.CreateFromTiledMap(_sceneMap, _scene);

    // UI Image

    const imagePos: STPoint = map.getObject<STPoint>("imagePosition");

    const uiImage = new UIImage
    (
      imagePos.x, 
      imagePos.y, 
      _scene, 
      "game_art", 
      "blueShip.png"
    );

    this._m_image = uiImage;

    uiGroup.add(uiImage);

    // UI Text

    const textPos = map.getObject<STPoint>("textPosition");

    const uiText = UIText.CreateStyleB
    (
      textPos.x, 
      textPos.y, 
      _scene, 
      "Hola! Soy un robot!", 
      30, 
      500
    );

    this._m_text = uiText;

    uiText.setAnchor(0.5, 0.5);

    uiText.centerAlign();

    uiGroup.add(uiText);

    this._m_close = map.getObject<UIButtonImg>("close");

    this._m_close.subscribe
    (
      "buttonReleased",
      "infoBox",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.close();

        return;

      },
      this
    );

    uiGroup.add(this._m_close);

    this._m_back = map.getObject<UIButtonImg>("back");

    this._m_back.subscribe
    (
      "buttonReleased",
      "infoBox",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.backPage();

        return;

      },
      this
    );

    uiGroup.add(this._m_back);

    this._m_next = map.getObject<UIButtonImg>("next");

    this._m_next.subscribe
    (
      "buttonReleased",
      "infoBox",
      function(_sender: UIObject, _args: any)
      : void
      {

        this.nextPage();

        return;

      },
      this
    );

    uiGroup.add(this._m_next);

    const android = map.getObject<Phaser.GameObjects.Image>("android");

    group.add(android);

    // clear and destroy map.

    map.clear();

    map.destroy();

    // Over everything

    group.setDepth(3);

    uiGroup.setZ(3);

    this._m_image.setZ(3);

    this._m_text.setZ(3);

    return;

  }

  open()
  : void
  {

    this._m_group.setActive(true);
    this._m_group.setVisible(true);

    this._m_contentGroup.enable();

    this._displayPage();

    return;

  }

  close()
  : void
  {

    this._m_group.setActive(false);
    this._m_group.setVisible(false);

    this._m_contentGroup.disable();

    return;

  }

  setBook(_bookName: string)
  : void
  {

    const master = Master.GetInstance();

    const uiManager = master.getManager<UIManager>(ST_MANAGER_ID.kUIManager);

    this._m_book = uiManager.getBook(_bookName);

    this._m_book.reset();

    this._displayPage();

    return;

  }

  destroy()
  : void
  {

    this._m_group.destroy();
    this._m_group = null;

    this._m_image = null;
    this._m_text = null;

    this._m_contentGroup.destroy();
    this._m_contentGroup = null;

    return;

  }

  nextPage()
  : void
  {

    if(this._m_book !== undefined)
    {

      this._m_book.nextPage();

      this._displayPage();

    }    

    return;

  }

  backPage()
  : void
  {

    if(this._m_book !== undefined)
    {

      this._m_book.prevPage();

      this._displayPage();

    }    

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _displayPage()
  : void
  {

    const bookPage: InfoPage = this._m_book.getActivePage();

    this._m_text.setText(bookPage.text);

    if(bookPage.texture !== "")
    {

      this._m_image.enable();
      this._m_image.setImage(bookPage.texture, bookPage.frame);

    }
    else
    {

      this._m_image.disable();

    }

    return;

  }
  
  /**
   * Phaser gameObjects container.
   */
  private _m_group : Phaser.GameObjects.Group;

  /**
   * Content Group.
   */
  private _m_contentGroup: UIGroup;

  /**
   * Message image.
   */
  private _m_image: UIImage;

  /**
   * Message text.
   */
  private _m_text: UIText;

  private _m_close: UIButtonImg;

  private _m_back: UIButtonImg;

  private _m_next: UIButtonImg;

  private _m_book: InfoBook;

}