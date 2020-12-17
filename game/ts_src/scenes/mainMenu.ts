 /**
  * Universidad de Artes Digitales, Guadalajara - 2020
  *
  * @summary 
  *
  * @file mainMenu.ts
  * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
  * @since August-30-2020
  */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { Ty_Image } from "../commons/stTypes";
import { MapScene } from "../gameScene/mapScene";
import { AmbienceManager } from "../managers/ambienceManager/ambienceManager";
import { UIGroup } from "../managers/uiManager/uiGroup";
import { UIMenuButton } from "../managers/uiManager/uiMenuButton";
import { UIObject } from "../managers/uiManager/uiObject";
import { Master } from "../master/master";

 
export class MainMenu 
extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {    

    // Get Ambience Manager

    this._m_ambienceManager = Master.GetInstance().getManager<AmbienceManager>
    (
      ST_MANAGER_ID.kAmbienceManager
    );

    // Camera fade in

    this.cameras.main.fadeIn(500, 0, 0, 0, );

    // Create assets from tiled map

    const mapScene : MapScene = MapScene.CreateFromTiledMap("main_menu", this);

    /****************************************************/
    /* Game Logo Animation                              */
    /****************************************************/

    const gameLogo: Ty_Image = mapScene.getObject<Ty_Image>("game_logo");

    this.tweens.add
    (
      {
        targets: gameLogo,
        y: {from: -gameLogo.height * 0.5, to: gameLogo.y},
        ease: "Cubic.easeOut",
        duration: 2500
      }
    );

    /****************************************************/
    /* Scene Particles                                  */
    /****************************************************/

    const particles = this.add.particles("menu_art"); 

    particles.createEmitter
    (
      {
        frame: ["particle.png", "particle2.png", "particle3.png"],
        y: 830,
        x: { min: 0, max: 250 },
        rotate: { min: -20, max: 20},
        lifespan: 4000,
        speedY: -15,
        scale: { start: 0.5, end: 2.0},
        alpha: { start: 1.0, end: 0},
        frequency: 1200,
        blendMode: "ADD"
      }
    );

    particles.createEmitter
    (
      {
        frame: ["particle.png", "particle2.png", "particle3.png"],
        y: 830,
        x: { min: 774, max: 1024 },
        rotate: { min: -20, max: 20},
        lifespan: 4000,
        speedY: -15,
        scale: { start: 0.5, end: 2.0},
        alpha: { start: 1.0, end: 0},
        frequency: 1200,
        blendMode: "ADD"
      }
    );

    /****************************************************/
    /* Main Page                                        */
    /****************************************************/

    const mainPage = new UIGroup();

    this._m_mainPage = mainPage;

    ///////////////////////////////////
    // Manual

    const manual = mapScene.getObject<UIMenuButton>
    (
      "btn_manual"
    );

    manual.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('tutorial');

        return;

      },
      this
    );

    mainPage.add(manual);

    ///////////////////////////////////
    // Select Mission

    const btnSelectMission = mapScene.getObject<UIMenuButton>
    (
      "btn_select_mission"
    );

    btnSelectMission.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._m_mainPage.disable();        
        this._m_missionPage.enable();

        return;

      },
      this
    );

    mainPage.add(btnSelectMission);

    ///////////////////////////////////
    // Credits

    const credits = mapScene.getObject<UIMenuButton>
    (
      "btn_credits"
    );

    credits.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._m_mainPage.disable();        
        
        this._m_creditsPage.enable();
        this._m_creditsPagePhaser.setActive(true);
        this._m_creditsPagePhaser.setVisible(true);
      
        return;

      },
      this
    );

    mainPage.add(credits);

    /****************************************************/
    /* Mission Page                                     */
    /****************************************************/

    const missionPage = new UIGroup();
    
    this._m_missionPage = missionPage;

    ///////////////////////////////////
    // Seek

    const seek = mapScene.getObject<UIMenuButton>
    (
      "btn_seek"
    );

    seek.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneSeek');

        return;

      },
      this
    );

    missionPage.add(seek);

    ///////////////////////////////////
    // Flee

    const flee = mapScene.getObject<UIMenuButton>
    (
      "btn_flee"
    );

    flee.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneFlee');

        return;

      },
      this
    );

    missionPage.add(flee);

    ///////////////////////////////////
    // Arrival

    const arrival = mapScene.getObject<UIMenuButton>
    (
      "btn_arrive"
    );

    arrival.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneArrival');

        return;

      },
      this
    );

    missionPage.add(arrival);

    ///////////////////////////////////
    // Pursuit

    const pursuit = mapScene.getObject<UIMenuButton>
    (
      "btn_pursuit"
    );

    pursuit.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('scenePursuit');

        return;

      },
      this
    );

    missionPage.add(pursuit);

    ///////////////////////////////////
    // Evade

    const evade = mapScene.getObject<UIMenuButton>
    (
      "btn_evade"
    );

    evade.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneEvade');

        return;

      },
      this
    );

    missionPage.add(evade);

    ///////////////////////////////////
    // Follow Path

    const followPath = mapScene.getObject<UIMenuButton>
    (
      "btn_follow_path"
    );

    followPath.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneFollowPath');

        return;

      },
      this
    );

    missionPage.add(followPath);

    ///////////////////////////////////
    // Wander

    const wander = mapScene.getObject<UIMenuButton>
    (
      "btn_wander"
    );

    wander.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneWander');

        return;

      },
      this
    );

    missionPage.add(wander);

    ///////////////////////////////////
    // Obstacle Avoidance

    const oAvoidance = mapScene.getObject<UIMenuButton>
    (
      "btn_obstacle_avoidance"
    );

    oAvoidance.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._startScene('sceneObstacleAvoidance');

        return;

      },
      this
    );

    missionPage.add(oAvoidance);

    ///////////////////////////////////
    // Back

    const missionBack = mapScene.getObject<UIMenuButton>
    (
      "btn_mission_back"
    );

    missionBack.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._m_mainPage.enable();        
        this._m_missionPage.disable();

        return;

      },
      this
    );

    missionPage.add(missionBack);

    /****************************************************/
    /* Credits                                          */
    /****************************************************/

    const creditsPage = new UIGroup();

    this._m_creditsPage = creditsPage;

    const creditsPagePhaser = this.add.group();

    this._m_creditsPagePhaser = creditsPagePhaser;

    ///////////////////////////////////
    // Credits Back

    const creditsBack = mapScene.getObject<UIMenuButton>
    (
      "btn_credits_back"
    );

    creditsBack.subscribe
    (
      "buttonReleased",
      "mainMenu",
      function(_btn : UIObject, _args: any)
      {

        this._m_mainPage.enable();

        this._m_creditsPage.disable();
        this._m_creditsPagePhaser.setActive(false);
        this._m_creditsPagePhaser.setVisible(false);

        return;

      },
      this
    );

    creditsPage.add(creditsBack);

    ///////////////////////////////////
    // Images

    creditsPagePhaser.add
    (
      mapScene.getObject<Ty_Image>("credit_progra")
    );

    creditsPagePhaser.add
    (
      mapScene.getObject<Ty_Image>("credit_humming")
    );

    creditsPagePhaser.add
    (
      mapScene.getObject<Ty_Image>("credit_design")
    );

    /****************************************************/
    /*                                                  */
    /****************************************************/

    missionPage.disable();

    creditsPage.disable();

    creditsPagePhaser.setActive(false);
    creditsPagePhaser.setVisible(false);

    this._m_closing = false;

    return;

  }

  update(_time : number, _delta : number)
  : void
  {   
    
   this._m_ambienceManager.update(_delta * 0.001);

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _startScene(_key: string)
  : void
  {

    if(!this._m_closing)
    {      

      this.cameras.main.fadeOut(500, 0, 0, 0);      

      this.cameras.main.once
      (
        "camerafadeoutcomplete", 
        function()
        {

          // Es necesario llamar el callback del Ambience Manager, pues los
          // motion images Se registran dentro del UI Ambience.

          this._m_ambienceManager.onSimulationSceneDestroy(this);

          this.scene.start(_key);

        },
        this
      );

      this._m_closing = true;

    }
    
    return;

  }
  
  /**
   * Main Page UI Elements.
   */
  private _m_mainPage: UIGroup;

  /**
   * Mission Page UI Elements.
   */
  private _m_missionPage: UIGroup;

  private _m_creditsPage: UIGroup;

  private _m_creditsPagePhaser: Phaser.GameObjects.Group;

  /**
   * Indicates if the scene is closing.
   */
  private _m_closing: boolean;

  private _m_ambienceManager: AmbienceManager;
}