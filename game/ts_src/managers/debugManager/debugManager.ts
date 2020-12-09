/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file debugManager.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since September-17-2020
 */

import { ST_MANAGER_ID } from "../../commons/stEnums";
import { Master } from "../../master/master";
import { IManager } from "../iManager";

export class DebugManager 
implements IManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static Create()
  : DebugManager
  {
    let manager = new DebugManager();
    return manager;
  }

  init()
  : void 
  {
    this._m_line = new Phaser.Geom.Line();    
    return;
  }

  update(_dt: number)
  : void 
  {
    if(this._m_graphic !== null)
    {
      this._m_graphic.clear();
    }
    return;
  }

  receive(_id: number, _msg: any)
  : void 
  {
    return;
  }

  /**
   * Draws a new line in the scene.
   * 
   * @param _x1 The x coordinate of the lines starting point.
   * @param _y1 The y coordinate of the lines starting point.
   * @param _x2 The x coordinate of the lines ending point.
   * @param _y2 The y coordinate of the lines ending point.
   * @param _lineWidth The stroke width. Default : 1.
   * @param _color The stroke color. Default : 0x000000.
   * @param _alpha The stroke alpha value. Default : 1.
   */
  drawLine
  (
    _x1 : number, 
    _y1 : number, 
    _x2 : number, 
    _y2 : number,
    _lineWidth : number = 1,
    _color : number = 0x000000,
    _alpha : number = 1
  )
  : void
  {
    // Line Style

    this._m_graphic.lineStyle(_lineWidth, _color, _alpha);

    this._m_line.setTo(_x1, _y1, _x2, _y2);

    // Draw Line.

    this._m_graphic.strokeLineShape(this._m_line);  
    
    return;
  }

  /**
   * Draws a circle in the scene.
   * 
   * @param _center_x The x coordinate of the center of the circle.
   * @param _center_y The y coordinate of the center of the circle.
   * @param _radius The radius of the circle.
   * @param _lineWidth The stroke width. Default : 1.
   * @param _color The stroke color. Default : 0x000000.
   * @param _alpha The stroke alpha value. Default : 1.
   */
  drawCircle
  (
    _center_x : number,
    _center_y : number,
    _radius : number,
    _lineWidth : number = 1,
    _color : number = 0x000000,
    _alpha : number = 1
  )
  : void
  {
    // Line Style

    this._m_graphic.lineStyle(_lineWidth, _color, _alpha);

    // Draw Circle.

    this._m_graphic.strokeCircle(_center_x, _center_y, _radius);
    
    return;
  }

  /**
   * Draws a rectangle in the scene.
   * 
   * @param _x The x coordinate of the top-left of the rectangle.
   * @param _y The y coordinate of the top-left of the rectangle.
   * @param _width The width of the rectangle.
   * @param _height The height of the rectangle.
   * @param _lineWidth The stroke width. Default : 1.
   * @param _color The stroke color. Default : 0x000000.
   * @param _alpha The stroke alpha value. Default : 1.
   */
  drawRectangle
  (
    _x : number,
    _y : number,
    _width : number,
    _height : number,
    _lineWidth : number = 1,
    _color : number = 0x000000,
    _alpha : number = 1
  )
  : void
  {
    // Line Style

    this._m_graphic.lineStyle(_lineWidth, _color, _alpha);

    // Draw Rectangle.

    this._m_graphic.strokeRect(_x, _y, _width, _height);

    return;
  }

  /**
   * Draws a triangle in the scene.
   * 
   * @param _x1 The x coordinate of the first point.
   * @param _y1 The y coordinate of the first point.
   * @param _x2 The x coordinate of the second point.
   * @param _y2 The y coordinate of the second point.
   * @param _x3 The x coordinate of the third point.
   * @param _y3 The y coordinate of the third point.
   * @param _lineWidth The stroke width. Default : 1.
   * @param _color The stroke color. Default : 0x000000.
   * @param _alpha The stroke alpha value. Default : 1.
   */
  drawTriangle
  (
    _x1 : number,
    _y1 : number,
    _x2 : number,
    _y2 : number,
    _x3 : number,
    _y3 : number,
    _lineWidth : number = 1,
    _color : number = 0x000000,
    _alpha : number = 1
  )
  : void
  {
    // Line Style

    this._m_graphic.lineStyle(_lineWidth, _color, _alpha);

    // Draw triangle.

    this._m_graphic.strokeTriangle(_x1, _y1, _x2, _y2, _x3, _y3);

    return;
  }

  setMasterManager(_master: Master)
  : void 
  {
    this._m_master = _master;
    return; 
  }

  getID()
  : number 
  {
    return ST_MANAGER_ID.kDebugManager;
  }

  onPrepare()
  : void 
  {
    return;
  }

  onSimulationSceneCreate(_scene: Phaser.Scene)
  : void 
  {
    // Save scene.

    this._m_scene = _scene;

    // Create Graphics

    this._m_graphic = _scene.add.graphics();

    this._m_graphic.setDepth(2);

    return;
  }  

  onSimulationSceneDestroy(_scene: Phaser.Scene)
  : void 
  {
    // Detach scene.

    this._m_scene = null;

    // Destroy graphic

    this._m_graphic.destroy();
    
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

  destroy()
  : void 
  {
    if(this._m_graphic != null)
    {
      this._m_graphic.destroy();
      this._m_graphic = null;
    }

    this._m_master = null;
    this._m_scene = null;
    this._m_line = null;
    return;
  }

  //********** Static ************/

  static FORCE_LINE_WIDTH : number = 3;

  static FORCE_CIRCLE_WIDTH : number = 2;
  
  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Private constructor.
   */
  private constructor()
  { }
  
  /**
   * Graphics object used for drawing.
   */
  private _m_graphic : Phaser.GameObjects.Graphics;

  /**
   * Master Manager.
   */
  private _m_master : Master;

  /**
   * Scene.
   */
  private _m_scene : Phaser.Scene;

  ///////////////////////////////////
  // Primitives

  private _m_line : Phaser.Geom.Line;
}