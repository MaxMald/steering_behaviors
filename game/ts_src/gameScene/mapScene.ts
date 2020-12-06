/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file mapScene.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-05-2020
 */

import { Ty_Image, Ty_TiledObject } from "../commons/stTypes";
import { TiledMapFactory } from "../factories/tiledMapFactory";

 /**
  * Holds a group of objects created with a tiled map.
  */
export class MapScene
{

  /**
   * Create an empty scene.
   */
  constructor()
  {

    this._m_hObjects = new Map<string, any>();
    this._m_unnamedObjects = new Array<any>();

    return;

  }

  static CreateFromTiledMap(_key: string, _scene: Phaser.Scene)
  : MapScene
  {

    // Create the Map of factories.

    const hFactories 
    = new Map<string, (_obj : Ty_TiledObject, _scene : Phaser.Scene) => any>();

    hFactories.set("image", TiledMapFactory.CreateImage);
    hFactories.set("sprite", TiledMapFactory.CreateSprite);
    hFactories.set("uiImageButton", TiledMapFactory.createUIButtonImage);

    /****************************************************/
    /* Scene Instance                                   */
    /****************************************************/

    const scene = new MapScene();

    scene.name = _key;
    
    const tiledMap = _scene.make.tilemap({key: _key});

    // Create objects from each object layer

    const aObjectLayerName = tiledMap.getObjectLayerNames();

    const objectLayersSize = aObjectLayerName.length;

    for(let i = 0; i < objectLayersSize; ++i)
    {

      // Create the objects of this layer

      const objectLayer = tiledMap.getObjectLayer(aObjectLayerName[i]);

      const objectsSize =  objectLayer.objects.length;

      let tiledObject: Phaser.Types.Tilemaps.TiledObject;

      for(let j = 0; j < objectsSize; ++j)
      {

        tiledObject = objectLayer.objects[j];

        if(tiledObject.type !== "")
        {

          if(hFactories.has(tiledObject.type))
          {

            const factoryFn = hFactories.get(tiledObject.type);

            if(tiledObject.name !== "")
            {

              // Create.

              scene._m_hObjects.set
              (
                tiledObject.name,
                factoryFn.call(this, tiledObject, _scene)
              );
            
            }
            else
            {
              
              // Create and push to the unnamed object array.
            
              scene._m_unnamedObjects.push
              (
                factoryFn.call(this, tiledObject, _scene)
              );
            
            }

          }
          else
          {

            console.error
            (
              "Scene: " + tiledObject.type + " factory not implemented."
            );

          }

        }        

      }

    }

    return scene;

  }

  /**
   * Get an object by its name. 
   * 
   * @param _name object name. 
   */
  getObject<T>(_name: string)
  : T
  {

    if(this._m_hObjects.has(_name))
    {

      return this._m_hObjects.get(_name) as T;

    }
    else
    {

      return null;

    }

  }

  /**
   * Get the array of unnamed objects.
   */
  getUnnamedObjects()
  : Array<any>
  {

    return this._m_unnamedObjects;

  }

  clear()
  : void
  {

    const unnamedObjects = this._m_unnamedObjects;

    while(unnamedObjects.length)
    {

      unnamedObjects.pop();

    }

    this._m_hObjects.clear();

    return;

  }
  
  destroy()
  : void 
  {

    const unnamedObjects = this._m_unnamedObjects;

    let object : any;

    while(unnamedObjects.length)
    {

      object = unnamedObjects.pop();

      object.destroy();

    }
    this._m_unnamedObjects = null;

    this._m_hObjects.forEach
    (
      function(_value: any)
      : void
      {

        _value.destroy();

        return;

      }
    );

    this._m_hObjects.clear();
    this._m_hObjects = null;

    return;

  }

  /**
   * The name of this scene (read only).
   */
  public name: string;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Map of objects with its name as keys.
   */
  private _m_hObjects: Map<string, any>;

  /**
   * Array of unnamed objects.
   */
  private _m_unnamedObjects: Array<any>;

}