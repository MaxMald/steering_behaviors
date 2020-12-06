define("commons/stTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("scenes/preload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Preload = void 0;
    class Preload extends Phaser.Scene {
        preload() {
            this.load.path = "./game/assets/";
            this.load.animation('afireBack', 'animations/backFireAnimation.json');
            this.load.animation("satellite_a", "animations/ambienceAnimations.json");
            this.load.image('button', 'images/button.png');
            this.load.atlas('game_art', "images/game_art/game_art.png", "images/game_art/game_art.js");
            this.load.bitmapFont('odin_rounded', 'images/odin_rounded_bitmapfont.png', 'images/odin_rounded_bitmapfont.xml');
            this.load.bitmapFont('supercomputer', 'images/supercomputer_bitmapfont.png', 'images/supercomputer_bitmapfont.xml');
            this.load.tilemapTiledJSON("ambience_01", "tiledMaps/ambience_01.json");
            this.load.tilemapTiledJSON("simulation_ui", "tiledMaps/simulation_ui.json");
            const hWidth = this.game.canvas.width * 0.5;
            const hHeight = this.game.canvas.height * 0.5;
            this.add.image(hWidth, hHeight, 'loading_bg');
            const spaceShip = this.add.image(hWidth, 300, "loading_ui", "loading_ship.png");
            this.add.tween({
                targets: spaceShip,
                y: 250,
                ease: "Quad.easeInOut",
                duration: 3000,
                yoyo: true,
                repeat: -1
            });
            const barBG = this.add.image(hWidth, hHeight + 100, "loading_ui", "loading_bar_bg.png");
            this.loadingBarBG = barBG;
            const bar = this.add.image(hWidth, hHeight + 100, "loading_ui", "loading_bar.png");
            bar.scaleX = 0.0;
            this.loadingBar = bar;
            const start = this.add.image(hWidth, hHeight + 100, "loading_ui", "start_button.png");
            start.setInteractive();
            start.on("pointerup", this.onClickStart, this);
            start.on("pointerover", this.onOverStart, this);
            start.on("pointerout", this.onOutStart, this);
            start.setVisible(false);
            start.setActive(false);
            this.startButton = start;
            this.load.on('progress', this.updateBar, this);
            this.load.on('complete', this.onComplete, this);
            return;
        }
        updateBar() {
            this.loadingBarBG.scaleX = this.load.progress;
            return;
        }
        onComplete() {
            this.loadingBar.setVisible(false);
            this.loadingBar.setActive(false);
            this.loadingBarBG.setVisible(false);
            this.loadingBarBG.setActive(false);
            this.startButton.setVisible(true);
            this.startButton.setActive(true);
            return;
        }
        onClickStart() {
            this.scene.start('main_menu');
            return;
        }
        onOverStart() {
            this.startButton.setScale(1.0, 1.0);
            return;
        }
        onOutStart() {
            this.startButton.setScale(0.8, 0.8);
            return;
        }
    }
    exports.Preload = Preload;
});
define("commons/stEnums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ST_SIM_SATE = exports.ST_STEER_FORCE = exports.ST_BUTTON = exports.ST_TEXT_TYPE = exports.ST_COLOR_ID = exports.ST_MESSAGE_ID = exports.ST_COMPONENT_ID = exports.ST_MANAGER_ID = void 0;
    exports.ST_MANAGER_ID = Object.freeze({
        kUndefined: -1,
        kSimManager: 1,
        kUIManager: 2,
        kDebugManager: 3,
        kAmbienceManager: 4
    });
    exports.ST_COMPONENT_ID = Object.freeze({
        kUndefined: -1,
        kForceController: 1,
        kSpriteController: 2,
        kShipPropulsor: 3,
        kInteractiveActor: 4
    });
    exports.ST_MESSAGE_ID = Object.freeze({
        kMove: 1,
        kSetPosition: 2,
        kSetScale: 3,
        kSetAngle: 4,
        kSetSpeed: 5,
        kSetMass: 6,
        kSetMaxSpeed: 7,
        kSetAlpha: 8,
        kPlayAnimation: 9
    });
    exports.ST_COLOR_ID = Object.freeze({
        kBlack: 0x000000,
        kWhite: 0xFFFFFF,
        kRed: 0xFF0000,
        kGreen: 0x00FF00,
        kBlue: 0x0000FF,
        kYellow: 0xFFFF00,
        kOrange: 0xFFA500,
        kGray: 0x808080,
        kPurple: 0x800080,
        kBrown: 0xA52A2A,
        kSkyBlueNeon: 0xa7edeb,
        kGold: 0xffe033,
        kDarkGold: 0x94351e
    });
    exports.ST_TEXT_TYPE = Object.freeze({
        H1: 0,
        H2: 1,
        Normal: 2
    });
    exports.ST_BUTTON = Object.freeze({
        kAccept: 0,
        kCancel: 1,
        kYes: 2,
        kNo: 4
    });
    exports.ST_STEER_FORCE = Object.freeze({
        kSeek: 0,
        kFlee: 1,
        kArrive: 2,
        kWander: 3,
        kPursue: 4,
        kEvade: 5,
        kObstacleAvoidance: 6,
        kFollowPath: 7,
        kConstant: 8
    });
    exports.ST_SIM_SATE = Object.freeze({
        kStopped: 0,
        kRunning: 1,
        kPaused: 2
    });
});
define("managers/iManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("managers/debugManager/debugManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DebugManager = void 0;
    class DebugManager {
        constructor() { }
        static Create() {
            let manager = new DebugManager();
            return manager;
        }
        init() {
            this._m_line = new Phaser.Geom.Line();
            return;
        }
        update(_dt) {
            if (this._m_graphic !== null) {
                this._m_graphic.clear();
            }
            return;
        }
        receive(_id, _msg) {
            return;
        }
        drawLine(_x1, _y1, _x2, _y2, _lineWidth = 1, _color = 0x000000, _alpha = 1) {
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_line.setTo(_x1, _y1, _x2, _y2);
            this._m_graphic.strokeLineShape(this._m_line);
            return;
        }
        drawCircle(_center_x, _center_y, _radius, _lineWidth = 1, _color = 0x000000, _alpha = 1) {
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeCircle(_center_x, _center_y, _radius);
            return;
        }
        drawRectangle(_x, _y, _width, _height, _lineWidth = 1, _color = 0x000000, _alpha = 1) {
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeRect(_x, _y, _width, _height);
            return;
        }
        drawTriangle(_x1, _y1, _x2, _y2, _x3, _y3, _lineWidth = 1, _color = 0x000000, _alpha = 1) {
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeTriangle(_x1, _y1, _x2, _y2, _x3, _y3);
            return;
        }
        setMasterManager(_master) {
            this._m_master = _master;
            return;
        }
        getID() {
            return stEnums_1.ST_MANAGER_ID.kDebugManager;
        }
        onPrepare() {
            return;
        }
        onSimulationSceneCreate(_scene) {
            this._m_scene = _scene;
            this._m_graphic = _scene.add.graphics();
            this._m_graphic.setDepth(1000);
            return;
        }
        onSimulationSceneDestroy(_scene) {
            this._m_scene = null;
            this._m_graphic.destroy();
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        destroy() {
            if (this._m_graphic != null) {
                this._m_graphic.destroy();
                this._m_graphic = null;
            }
            this._m_master = null;
            this._m_scene = null;
            this._m_line = null;
            return;
        }
    }
    exports.DebugManager = DebugManager;
    DebugManager.FORCE_LINE_WIDTH = 3;
    DebugManager.FORCE_CIRCLE_WIDTH = 2;
});
define("managers/nullManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullManager = void 0;
    class NullManager {
        setMasterManager(_master) {
            console.warn('Null Manager : setMaster');
            return;
        }
        getID() {
            console.warn('Null Manager : getID');
            return stEnums_2.ST_MANAGER_ID.kUndefined;
        }
        onPrepare() {
            console.warn('Null Manager : onPrepare');
            return;
        }
        init() {
            console.warn('Null Manager : init');
            return;
        }
        update(_dt) {
            console.warn('Null Manager : update');
            return;
        }
        receive(_id, _msg) {
            console.warn('Null Manager : receive');
            return;
        }
        onSimulationSceneCreate(_scene) {
            console.warn('Null Manager : onGameSceneCreate');
            return;
        }
        onSimulationSceneDestroy(_scene) {
            console.warn('Null Manager : onGameSceneDestroy');
            return;
        }
        onSimulationStart() {
            console.warn('Null Manager : onSimulationStart');
            return;
        }
        onSimulationPause() {
            console.warn('Null Manager : onSimulationPause');
            return;
        }
        onSimulationResume() {
            console.warn('Null Manager : onSimulationResume');
            return;
        }
        onSimulationStop() {
            console.warn('Null Manager : onSimulationShutdown');
            return;
        }
        onDebugEnable() {
            console.warn('Null Manager : onDebugEnable');
            return;
        }
        onDebugDisable() {
            console.warn('Null Manager : onDebugDisable');
            return;
        }
        destroy() {
            console.warn('Null Manager : destroy');
            return;
        }
    }
    exports.NullManager = NullManager;
});
define("components/iBaseComponent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("actors/iActor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("actors/baseActor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseActor = void 0;
    class BaseActor {
        constructor() { }
        static Create(_instance, _name) {
            const actor = new BaseActor();
            actor._m_components = new Array();
            actor._m_instance = _instance;
            actor.m_name = _name;
            return actor;
        }
        init() {
            let index = 0;
            let components = this._m_components;
            let length = components.length;
            while (index < length) {
                components[index].init(this);
                ++index;
            }
            return;
        }
        update() {
            let components = this._m_components;
            components.forEach(this._updateComponent, this);
            return;
        }
        sendMessage(_id, _obj) {
            let index = 0;
            let aComponent = this._m_components;
            let size = aComponent.length;
            while (index < size) {
                if (aComponent[index] != null) {
                    aComponent[index].receive(_id, _obj);
                }
                ++index;
            }
            return;
        }
        getWrappedInstance() {
            return this._m_instance;
        }
        addComponent(_component) {
            if (this.hasComponent(_component.getID())) {
                this.removeComponent(_component.getID());
            }
            this._m_components.push(_component);
            return;
        }
        getComponent(_id) {
            let index = 0;
            let length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    return this._m_components[index];
                }
                ++index;
            }
            throw new Error("Component of index : " + _id.toString() + " not founded");
        }
        removeComponent(_id) {
            let index = 0;
            let length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    this._m_components.splice(index, 1);
                    return;
                }
                ++index;
            }
            return;
        }
        hasComponent(_id) {
            let index = 0;
            let length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    return true;
                }
                ++index;
            }
            return false;
        }
        onSimulationStart() {
            this._m_components.forEach(this._cmpSimulationStart, this);
            return;
        }
        onSimulationPause() {
            this._m_components.forEach(this._cmpSimulationPause, this);
            return;
        }
        onSimulationResume() {
            this._m_components.forEach(this._cmpSimulationResume, this);
            return;
        }
        onSimulationStop() {
            this._m_components.forEach(this._cmpSimulationStop, this);
            return;
        }
        onDebugEnable() {
            this._m_components.forEach(this._cmpDebugEnable, this);
            return;
        }
        onDebugDisable() {
            this._m_components.forEach(this._cmpDebugDisable, this);
            return;
        }
        getName() {
            return this.m_name;
        }
        getNext() {
            return this._m_next;
        }
        setNext(_actor) {
            this._m_next = _actor;
            return;
        }
        getPrevious() {
            return this._m_previous;
        }
        setPrevious(_actor) {
            this._m_previous = _actor;
            return;
        }
        destroy() {
            let component;
            while (this._m_components.length) {
                component = this._m_components.pop();
                component.destroy();
            }
            this._m_next = null;
            this._m_previous = null;
            return;
        }
        _updateComponent(_component) {
            _component.update(this);
            return;
        }
        _cmpDebugEnable(_component) {
            _component.onDebugEnable();
            return;
        }
        _cmpDebugDisable(_component) {
            _component.onDebugDisable();
            return;
        }
        _cmpSimulationStart(_component) {
            _component.onSimulationStart();
            return;
        }
        _cmpSimulationPause(_component) {
            _component.onSimulationPause();
            return;
        }
        _cmpSimulationResume(_component) {
            _component.onSimulationResume();
            return;
        }
        _cmpSimulationStop(_component) {
            _component.onSimulationStop();
            return;
        }
    }
    exports.BaseActor = BaseActor;
});
define("managers/simulationManager/simulationManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimulationManager = void 0;
    class SimulationManager {
        constructor() { }
        static Create() {
            let manager = new SimulationManager();
            return manager;
        }
        init() {
            return;
        }
        update(_dt) {
            this._m_actors.forEach(this._updateActor, this);
            return;
        }
        receive(_id, _msg) {
            return;
        }
        sendMessage(_id, _msg) {
            this._m_actors.forEach(function (_actor) {
                _actor.sendMessage(_id, _msg);
                return;
            }, this);
            return;
        }
        setMasterManager(_master) {
            this._m_master = _master;
            return;
        }
        getID() {
            return stEnums_3.ST_MANAGER_ID.kSimManager;
        }
        getBaseActor(_name) {
            if (this._m_actors.has(_name)) {
                let baseActor = this._m_actors.get(_name);
                if (baseActor !== null) {
                    return baseActor;
                }
                else {
                    console.error('Could not cast base actor');
                    return null;
                }
            }
            throw new Error("Could not find actor with name : " + _name);
        }
        addActor(_actor) {
            if (this._m_actors.has(_actor.getName())) {
                console.warn('An actor with name : '
                    + _actor.getName()
                    + ' had been replaced in the simulation manager.');
            }
            this._m_actors.set(_actor.getName(), _actor);
            return;
        }
        onPrepare() {
            this._m_actors = new Map();
            return;
        }
        onSimulationSceneCreate(_scene) {
            this._m_state = stEnums_3.ST_SIM_SATE.kStopped;
            return;
        }
        onSimulationSceneDestroy(_scene) {
            this._m_state = stEnums_3.ST_SIM_SATE.kStopped;
            this.clear();
            return;
        }
        onSimulationStart() {
            this._m_state = stEnums_3.ST_SIM_SATE.kRunning;
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationStart();
                return;
            });
            return;
        }
        onSimulationPause() {
            this._m_state = stEnums_3.ST_SIM_SATE.kPaused;
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationPause();
                return;
            });
            return;
        }
        onSimulationResume() {
            this._m_state = stEnums_3.ST_SIM_SATE.kRunning;
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationResume();
                return;
            });
            return;
        }
        onSimulationStop() {
            this._m_state = stEnums_3.ST_SIM_SATE.kStopped;
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationStop();
                return;
            });
            return;
        }
        onDebugEnable() {
            this._m_actors.forEach(this._actorDebugEnable, this);
            return;
        }
        onDebugDisable() {
            this._m_actors.forEach(this._actorDebugDisable, this);
            return;
        }
        clear() {
            this._m_actors.forEach(function (_actor) {
                _actor.destroy();
                return;
            });
            this._m_actors.clear();
            return;
        }
        getState() {
            return this._m_state;
        }
        destroy() {
            this.clear();
            this._m_actors = null;
            return;
        }
        _updateActor(_actor) {
            _actor.update();
            return;
        }
        _actorDebugEnable(_actor) {
            _actor.onDebugEnable();
            return;
        }
        _actorDebugDisable(_actor) {
            _actor.onDebugDisable();
            return;
        }
    }
    exports.SimulationManager = SimulationManager;
});
define("managers/uiManager/uiControllers/UIController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIController = void 0;
    class UIController {
        update() {
            return;
        }
        setTarget(_actor) {
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        setMasterManager(_masterManager) {
            this.m_master = _masterManager;
            return;
        }
        setUIManager(_uiManager) {
            this.m_uiManager = _uiManager;
            return;
        }
        destroy() {
            this.m_master = undefined;
            this.m_uiManager = undefined;
            return;
        }
    }
    exports.UIController = UIController;
});
define("managers/uiManager/uiManager", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_4, master_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIManager = void 0;
    class UIManager {
        constructor() {
            return;
        }
        static Create() {
            return new UIManager();
        }
        init() {
            this._m_aControllers = new Map();
            this.m_target = undefined;
            this.m_focusedActor = undefined;
            const master = master_1.Master.GetInstance();
            this._m_debugManager = master.getManager(stEnums_4.ST_MANAGER_ID.kDebugManager);
            return;
        }
        update(_dt) {
            this._m_aControllers.forEach(this._updateController);
            if (this.m_target !== undefined) {
                const sprite = this.m_target.getWrappedInstance();
                const w = sprite.displayWidth;
                const h = sprite.displayHeight;
                const size = (w > h ? w : h) * 0.6;
                this._m_debugManager.drawCircle(sprite.x, sprite.y, size, 3, stEnums_4.ST_COLOR_ID.kGreen);
                this._m_debugManager.drawCircle(sprite.x, sprite.y, size * 1.1, 1.5, stEnums_4.ST_COLOR_ID.kGreen, 0.4);
            }
            if (this.m_focusedActor !== undefined) {
                const sprite = this.m_focusedActor.getWrappedInstance();
                const w = sprite.displayWidth;
                const h = sprite.displayHeight;
                const size = (w > h ? w : h) * 0.6;
                this._m_debugManager.drawCircle(sprite.x, sprite.y, size, 3, stEnums_4.ST_COLOR_ID.kOrange);
                this._m_debugManager.drawCircle(sprite.x, sprite.y, size * 1.1, 1.5, stEnums_4.ST_COLOR_ID.kOrange, 0.4);
            }
            return;
        }
        receive(_id, _msg) {
            return;
        }
        setMasterManager(_master) {
            this._m_master = _master;
            return;
        }
        getID() {
            return stEnums_4.ST_MANAGER_ID.kUIManager;
        }
        onPrepare() {
            return;
        }
        onSimulationSceneCreate(_scene) {
            return;
        }
        onSimulationSceneDestroy(_scene) {
            this._m_aControllers.forEach(function (_controller) {
                _controller.destroy();
                return;
            });
            this._m_aControllers.clear();
            this.m_target = undefined;
            this.m_focusedActor = undefined;
            return;
        }
        onSimulationStart() {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationStart();
                return;
            });
            return;
        }
        onSimulationPause() {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationPause();
                return;
            });
            return;
        }
        onSimulationResume() {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationResume();
                return;
            });
            return;
        }
        onSimulationStop() {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationStop();
                return;
            });
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        setTarget(_target) {
            this.m_target = _target;
            this.clearFocusActor();
            this._m_aControllers.forEach(function (_controller) {
                _controller.setTarget(_target);
                return;
            });
            return;
        }
        focusActor(_actor) {
            if (_actor !== this.m_target) {
                this.m_focusedActor = _actor;
            }
            return;
        }
        clearFocusActor() {
            this.m_focusedActor = undefined;
            return;
        }
        getUIController(_name) {
            const aControllers = this._m_aControllers;
            if (aControllers.has(_name)) {
                return aControllers.get(_name);
            }
            else {
                return null;
            }
        }
        addUIController(_name, _uiController) {
            this._m_aControllers.set(_name, _uiController);
            _uiController.setMasterManager(this._m_master);
            _uiController.setUIManager(this);
            return;
        }
        destroy() {
            this._m_aControllers.forEach(function (_controller) {
                _controller.destroy();
                return;
            });
            this._m_aControllers.clear();
            this._m_aControllers = null;
            this.m_target = undefined;
            return;
        }
        _updateController(_controller) {
            _controller.update();
            return;
        }
    }
    exports.UIManager = UIManager;
});
define("master/master", ["require", "exports", "managers/debugManager/debugManager", "managers/nullManager", "managers/simulationManager/simulationManager", "managers/uiManager/uiManager"], function (require, exports, debugManager_1, nullManager_1, simulationManager_1, uiManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Master = void 0;
    class Master {
        constructor() { }
        static GetInstance() {
            return Master._INSTANCE;
        }
        static Prepare() {
            if (Master._INSTANCE == null) {
                Master._INSTANCE = new Master();
                Master._INSTANCE._onPrepare();
            }
            return;
        }
        static Shutdown() {
            if (Master._INSTANCE != null) {
                Master._INSTANCE._onShutdown();
                Master._INSTANCE = null;
            }
            return;
        }
        update(_time, _dt) {
            this._m_time = _time;
            this._m_deltaTime = _dt;
            this._m_hManagers.forEach(this._updateManager, this);
            return;
        }
        getManager(_id) {
            let hManager = this._m_hManagers;
            if (hManager.has(_id)) {
                return hManager.get(_id);
            }
            console.warn("Manager with ID: "
                + _id.toString()
                + " not exits in the Master Manager, a Null Service was returned.");
            return new nullManager_1.NullManager();
        }
        addManager(_manager) {
            this._m_hManagers.set(_manager.getID(), _manager);
            _manager.setMasterManager(this);
            return;
        }
        startSimulation() {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationStart, this);
            }
            else {
                console.error("Can't start simulation if the manager doesn't has a simulation scene.");
            }
            return;
        }
        pauseSimulation() {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationPause, this);
            }
            else {
                console.error("Can't pause simulation if the manager doesn't has a simulation scene.");
            }
            return;
        }
        resumeSimulation() {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationResume, this);
            }
            else {
                console.error("Can't resume simulation if the manager doesn't has a simulation scene.");
            }
            return;
        }
        stopSimulation() {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationStop, this);
            }
            else {
                console.error("Can't stop simulation if the manager doesn't has a simulation scene.");
            }
            return;
        }
        enableDebugging() {
            if (!this._m_bDebugEnable) {
                this._m_bDebugEnable = !this._m_bDebugEnable;
                this._m_hManagers.forEach(this._managerDebugEnable, this);
            }
            return;
        }
        disableDebugging() {
            if (this._m_bDebugEnable) {
                this._m_bDebugEnable = !this._m_bDebugEnable;
                this._m_hManagers.forEach(this._managerDebugDisable, this);
            }
            return;
        }
        onSimulationSceneCreate(_scene) {
            this._m_simulationScene = _scene;
            this._m_hManagers.forEach(function (_manager) {
                _manager.onSimulationSceneCreate(_scene);
                return;
            }, this);
            return;
        }
        onSimulationSceneDestroy(_scene) {
            this._m_hManagers.forEach(function (_manager) {
                _manager.onSimulationSceneDestroy(_scene);
                return;
            }, this);
            this._m_simulationScene = null;
            return;
        }
        getDeltaTime() {
            return this._m_deltaTime;
        }
        getGameTime() {
            return this._m_time;
        }
        getSimulationScene() {
            if (this._m_simulationScene === null) {
                throw new Error("Master doesn't has any simulation scene.");
            }
            return this._m_simulationScene;
        }
        hasSimulationScene() {
            return this._m_simulationScene !== null;
        }
        isDebugEnable() {
            return this._m_bDebugEnable;
        }
        _onPrepare() {
            this._m_hManagers = new Map();
            let hManagers = this._m_hManagers;
            this.addManager(debugManager_1.DebugManager.Create());
            this.addManager(simulationManager_1.SimulationManager.Create());
            this.addManager(uiManager_1.UIManager.Create());
            hManagers.forEach(function (_manager) {
                _manager.onPrepare();
                return;
            });
            hManagers.forEach(function (_manager) {
                _manager.init();
                return;
            });
            return;
        }
        _onShutdown() {
            let hManagers = this._m_hManagers;
            hManagers.forEach(function (_manager) {
                _manager.destroy();
                return;
            });
            hManagers.clear();
            hManagers = null;
            return;
        }
        _updateManager(_manager) {
            _manager.update(this._m_deltaTime);
            return;
        }
        _managerSimulationStart(_manager) {
            _manager.onSimulationStart();
            return;
        }
        _managerSimulationPause(_manager) {
            _manager.onSimulationPause();
            return;
        }
        _managerSimulationResume(_manager) {
            _manager.onSimulationResume();
            return;
        }
        _managerSimulationStop(_manager) {
            _manager.onSimulationStop();
            return;
        }
        _managerDebugEnable(_manager) {
            _manager.onDebugEnable();
            return;
        }
        _managerDebugDisable(_manager) {
            _manager.onDebugDisable();
            return;
        }
    }
    exports.Master = Master;
});
define("scenes/boot", ["require", "exports", "master/master"], function (require, exports, master_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Boot = void 0;
    class Boot extends Phaser.Scene {
        preload() {
            this.load.path = "./game/assets/";
            this.load.atlas('loading_ui', 'images/loading/loading_ui.png', 'images/loading/loading_ui.js');
            this.load.image('loading_bg', 'images/loading/loading_bg.jpg');
            return;
        }
        create() {
            master_2.Master.Prepare();
            this.scene.start('preload');
            return;
        }
    }
    exports.Boot = Boot;
});
define("managers/uiManager/uiObject", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager"], function (require, exports, mxListener_1, mxListenerManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIObject = void 0;
    class UIObject {
        constructor() {
            this._m_listenerManager = new mxListenerManager_1.MxListenerManager();
            return;
        }
        init() {
            return;
        }
        update(_dt) {
            return;
        }
        setMasterManager(_master) {
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        getWidth() {
            return 0;
        }
        getHeight() {
            return 0;
        }
        getX() {
            return 0;
        }
        getY() {
            return 0;
        }
        getZ() {
            return 0;
        }
        setZ(_z) {
            return;
        }
        move(_x, _y) {
            return;
        }
        setPosition(_x, _y) {
            return;
        }
        setAnchor(_x, _y) {
            return;
        }
        setScale(_x, _y) {
            return;
        }
        getAnchorX() {
            return 0.5;
        }
        getAnchorY() {
            return 0.5;
        }
        isEnable() {
            return true;
        }
        enable() {
            return;
        }
        disable() {
            return;
        }
        subscribe(_event, _username, _fn, _context) {
            this._m_listenerManager.suscribe(_event, _username, new mxListener_1.MxListener(_fn, _context));
            return;
        }
        unsubscribe(_event, _username) {
            this._m_listenerManager.unsuscribe(_event, _username);
            return;
        }
        destroy() {
            this._m_listenerManager.destroy();
            return;
        }
    }
    exports.UIObject = UIObject;
});
define("managers/uiManager/uiBox/states/uiBoxState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIBoxState = void 0;
    class UIBoxState {
        constructor(_uiBox) {
            this.m_uiBox = _uiBox;
            return;
        }
        update() {
            return;
        }
        setCenterAlignment() {
            return;
        }
        setLeftAlignment() {
            return;
        }
        setRightAlignment() {
            return;
        }
        setTopAlignment() {
            return;
        }
        setBottomAlignment() {
            return;
        }
        destroy() {
            this.m_uiBox = null;
            return;
        }
    }
    exports.UIBoxState = UIBoxState;
});
define("managers/uiManager/uiBox/states/uiHorizontalBox", ["require", "exports", "managers/uiManager/uiBox/states/uiBoxState"], function (require, exports, uiBoxState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIHorizontalBox = void 0;
    class UIHorizontalBox extends uiBoxState_1.UIBoxState {
        constructor(_uiBox) {
            super(_uiBox);
            this._m_vAlignFn = this._alignTop;
            return;
        }
        update() {
            const box = this.m_uiBox;
            const aObjects = box._m_aObjects;
            const size = aObjects.length;
            const boxSize = box._m_boxSize;
            boxSize.x = box._m_paddingLeft + box._m_paddingRight;
            boxSize.y = box._m_paddingTop + box._m_paddingBottom;
            const gap = box._m_gap;
            let elementH;
            let elementW;
            const contentBox = box._m_contentBox;
            contentBox.width = 0;
            contentBox.height = 0;
            let object;
            const lastIndex = size - 1;
            for (let i = 0; i < size; ++i) {
                object = aObjects[i];
                if (!object.isEnable()) {
                    continue;
                }
                elementH = object.getHeight();
                elementW = object.getWidth();
                if (i < lastIndex) {
                    elementW += gap;
                }
                contentBox.width += elementW;
                if (contentBox.height < elementH) {
                    contentBox.height = elementH;
                }
            }
            boxSize.x += contentBox.width;
            boxSize.y += contentBox.height;
            box.resizeBackground();
            const boxBG = box._m_bg;
            contentBox.x = boxBG.x - (boxBG.originX * boxBG.width) + box._m_paddingLeft;
            contentBox.y = boxBG.y - (boxBG.originY * boxBG.height) + box._m_paddingTop;
            let position = new Phaser.Geom.Point(contentBox.x, contentBox.y);
            for (let i = 0; i < size; ++i) {
                object = aObjects[i];
                if (!object.isEnable()) {
                    continue;
                }
                object.setPosition(position.x + (object.getWidth() * object.getAnchorX()), position.y);
                this._m_vAlignFn.call(this, contentBox, object);
                position.x += object.getWidth() + gap;
            }
            return;
        }
        setTopAlignment() {
            this._m_vAlignFn = this._alignTop;
            this.update();
            return;
        }
        setCenterAlignment() {
            this._m_vAlignFn = this._alignMiddle;
            this.update();
            return;
        }
        setBottomAlignment() {
            this._m_vAlignFn = this._alignBottom;
            this.update();
            return;
        }
        _verticalAlignToBox(_contentBox, _element, _t) {
            const y1 = _contentBox.y + (_t * _contentBox.height);
            _element.setPosition(_element.getX(), y1 + (_element.getHeight() * (_element.getAnchorY() - _t)));
            return;
        }
        _alignTop(_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 0.0);
            return;
        }
        _alignMiddle(_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 0.5);
            return;
        }
        _alignBottom(_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 1.0);
            return;
        }
    }
    exports.UIHorizontalBox = UIHorizontalBox;
});
define("managers/uiManager/uiBox/states/uiVerticalBox", ["require", "exports", "managers/uiManager/uiBox/states/uiBoxState"], function (require, exports, uiBoxState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIVerticalBox = void 0;
    class UIVerticalBox extends uiBoxState_2.UIBoxState {
        constructor(_uiBox) {
            super(_uiBox);
            this._m_hAlignFn = this._alignLeft;
            return;
        }
        update() {
            const box = this.m_uiBox;
            const aObjects = box._m_aObjects;
            const size = aObjects.length;
            const boxSize = box._m_boxSize;
            boxSize.x = box._m_paddingLeft + box._m_paddingRight;
            boxSize.y = box._m_paddingTop + box._m_paddingBottom;
            const gap = box._m_gap;
            let elementH;
            let elementW;
            const contentBox = box._m_contentBox;
            contentBox.width = 0;
            contentBox.height = 0;
            let object;
            const lastIndex = size - 1;
            for (let i = 0; i < size; ++i) {
                object = aObjects[i];
                if (!object.isEnable()) {
                    continue;
                }
                elementH = object.getHeight();
                if (i < lastIndex) {
                    elementH += gap;
                }
                elementW = object.getWidth();
                contentBox.height += elementH;
                if (contentBox.width < elementW) {
                    contentBox.width = elementW;
                }
            }
            boxSize.x += contentBox.width;
            boxSize.y += contentBox.height;
            box.resizeBackground();
            const boxBG = box._m_bg;
            contentBox.x = boxBG.x - (boxBG.originX * boxBG.width) + box._m_paddingLeft;
            contentBox.y = boxBG.y - (boxBG.originY * boxBG.height) + box._m_paddingTop;
            let position = new Phaser.Geom.Point(contentBox.x, contentBox.y);
            for (let i = 0; i < size; ++i) {
                object = aObjects[i];
                if (!object.isEnable()) {
                    continue;
                }
                object.setPosition(position.x, position.y + (object.getHeight() * object.getAnchorY()));
                this._m_hAlignFn.call(this, contentBox, object);
                position.y += object.getHeight() + gap;
            }
            return;
        }
        setCenterAlignment() {
            this._m_hAlignFn = this._alignCenter;
            this.update();
            return;
        }
        setLeftAlignment() {
            this._m_hAlignFn = this._alignLeft;
            this.update();
            return;
        }
        setRightAlignment() {
            this._m_hAlignFn = this._alignRight;
            this.update();
            return;
        }
        _horizontalAlignToBox(_contentBox, _element, _t) {
            const x1 = _contentBox.x + (_t * _contentBox.width);
            _element.setPosition(x1 + (_element.getWidth() * (_element.getAnchorX() - _t)), _element.getY());
            return;
        }
        _alignLeft(_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 0.0);
            return;
        }
        _alignCenter(_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 0.5);
            return;
        }
        _alignRight(_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 1.0);
            return;
        }
    }
    exports.UIVerticalBox = UIVerticalBox;
});
define("managers/uiManager/uiBox/uiBox", ["require", "exports", "managers/uiManager/uiObject", "managers/uiManager/uiBox/states/uiHorizontalBox", "managers/uiManager/uiBox/states/uiVerticalBox"], function (require, exports, uiObject_1, uiHorizontalBox_1, uiVerticalBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIBox = void 0;
    class UIBox extends uiObject_1.UIObject {
        constructor(_x, _y, _scene, _frame = "box_bg.png") {
            super();
            this._m_verticalState = new uiVerticalBox_1.UIVerticalBox(this);
            this._m_horizontalState = new uiHorizontalBox_1.UIHorizontalBox(this);
            const aObjects = new Array();
            this._m_aObjects = aObjects;
            const contentSize = new Phaser.Geom.Rectangle();
            this._m_contentBox = contentSize;
            this._m_boxSize = new Phaser.Geom.Point();
            const bg = _scene.add.nineslice(_x, _y, contentSize.x, contentSize.y, {
                key: "game_art",
                frame: _frame
            }, [30]);
            this._m_bg = bg;
            this._m_gap = 0;
            this._isEnable = true;
            this.setVerticalBox();
            this.setPadding(0);
            this.setLeftAlignment();
            return;
        }
        static CreateBorderBox(_x, _y, _scene) {
            const box = new UIBox(_x, _y, _scene, "box_bg.png");
            box.setPadding(20);
            box.setElementsGap(5);
            return box;
        }
        static CreateBorderBoxB(_x, _y, _scene) {
            const box = new UIBox(_x, _y, _scene, "box_bg_3.png");
            box.setPadding(20);
            box.setElementsGap(5);
            return box;
        }
        static CreateContentBox(_x, _y, _scene) {
            const box = new UIBox(_x, _y, _scene, "box_bg_2.png");
            box.setPadding(10);
            box.setElementsGap(5);
            return box;
        }
        static CreateForceBox(_x, _y, _scene) {
            const box = new UIBox(_x, _y, _scene, "box_bg_2.png");
            box.setPadding(10, 18);
            box.setElementsGap(7.5);
            return box;
        }
        static CreateContentBoxB(_x, _y, _scene) {
            const box = new UIBox(_x, _y, _scene, "box_bg_4.png");
            box.setPadding(10);
            box.setElementsGap(5);
            return box;
        }
        add(_object) {
            this._m_aObjects.push(_object);
            const depth = _object.getZ();
            if (depth <= this._m_bg.depth) {
                this._m_bg.setDepth(depth - 1);
            }
            this.updateBox();
            return;
        }
        remove(_object) {
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                this._m_aObjects[i] === _object;
                this._m_aObjects.splice(i, 1);
                return;
            }
            return;
        }
        getWidth() {
            return this._m_boxSize.x;
        }
        getHeight() {
            return this._m_boxSize.y;
        }
        getX() {
            return this._m_bg.x;
        }
        getY() {
            return this._m_bg.y;
        }
        getZ() {
            return this._m_bg.depth;
        }
        move(_x, _y) {
            const bg = this._m_bg;
            bg.x += _x;
            bg.y += _y;
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                aObjects[i].move(_x, _y);
            }
            return;
        }
        setPosition(_x, _y) {
            const bg = this._m_bg;
            const x = _x - bg.x;
            const y = _y - bg.y;
            this.move(x, y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this.updateBox();
            return;
        }
        getAnchorX() {
            return this._m_bg.originX;
        }
        getAnchorY() {
            return this._m_bg.originY;
        }
        enable() {
            this._m_aObjects.forEach(function (_object) {
                _object.enable();
                return;
            });
            this._m_bg.setActive(true);
            this._m_bg.setVisible(true);
            this._isEnable = true;
            return;
        }
        disable() {
            this._m_aObjects.forEach(function (_object) {
                _object.disable();
                return;
            });
            this._m_bg.setActive(false);
            this._m_bg.setVisible(false);
            this._isEnable = false;
            return;
        }
        setPadding(_left, _top, _right, _bottom) {
            if (_top === undefined) {
                this._m_paddingBottom = _left;
                this._m_paddingTop = _left;
                this._m_paddingLeft = _left;
                this._m_paddingRight = _left;
            }
            else if (_right === undefined) {
                this._m_paddingLeft = _left;
                this._m_paddingRight = _left;
                this._m_paddingTop = _top;
                this._m_paddingBottom = _top;
            }
            else if (_bottom === undefined) {
                this._m_paddingLeft = _left;
                this._m_paddingTop = _top;
                this._m_paddingBottom = _top;
                this._m_paddingRight = _right;
            }
            else {
                this._m_paddingLeft = _left;
                this._m_paddingTop = _top;
                this._m_paddingRight = _right;
                this._m_paddingBottom = _bottom;
            }
            this.updateBox();
            return;
        }
        updateBox() {
            this._m_activeState.update();
            return;
        }
        setElementsGap(_gap) {
            this._m_gap = _gap;
            this.updateBox();
            return;
        }
        isEnable() {
            return this._isEnable;
        }
        destroy() {
            const aObject = this._m_aObjects;
            while (aObject.length) {
                let object = aObject.pop();
                object.destroy();
                return;
            }
            this._m_aObjects = null;
            this._m_activeState = null;
            this._m_verticalState.destroy();
            this._m_verticalState = null;
            this._m_horizontalState.destroy();
            this._m_horizontalState = null;
            super.destroy();
            return;
        }
        setHorizontalBox() {
            this._m_activeState = this._m_horizontalState;
            return;
        }
        setVerticalBox() {
            this._m_activeState = this._m_verticalState;
            return;
        }
        setCenterAlignment() {
            this._m_activeState.setCenterAlignment();
            return;
        }
        setLeftAlignment() {
            this._m_activeState.setLeftAlignment();
            return;
        }
        setRightAlignment() {
            this._m_activeState.setRightAlignment();
            return;
        }
        setTopAlignment() {
            this._m_activeState.setTopAlignment();
            return;
        }
        setBottomAlignment() {
            this._m_activeState.setBottomAlignment();
            return;
        }
        resizeBackground() {
            const boxSize = this._m_boxSize;
            if (boxSize.x < UIBox.MIN_WIDTH) {
                boxSize.x = UIBox.MIN_WIDTH;
            }
            if (boxSize.y < UIBox.MIN_HEIGHT) {
                boxSize.y = UIBox.MIN_HEIGHT;
            }
            this._m_bg.resize(boxSize.x, boxSize.y);
            return;
        }
    }
    exports.UIBox = UIBox;
    UIBox.MIN_WIDTH = 65;
    UIBox.MIN_HEIGHT = 65;
});
define("managers/uiManager/uiLabel", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UILabel = void 0;
    class UILabel extends uiObject_2.UIObject {
        constructor(_x, _y, _scene, _text, _font_key, _font_size, _tint) {
            super();
            this._m_listenerManager.addEvent("textChanged");
            let font_key = "odin_rounded";
            if (_font_key !== undefined) {
                font_key = _font_key;
            }
            let font_size = 20;
            if (_font_size !== undefined) {
                font_size = _font_size;
            }
            let tint = 0x000000;
            if (_tint !== undefined) {
                tint = _tint;
            }
            const label = _scene.add.bitmapText(_x, _y, font_key, _text, font_size);
            this._m_label = label;
            label.setTint(tint);
            label.setOrigin(0.0, 0.5);
            label.setLeftAlign();
            return;
        }
        static CreateH1(_x, _y, _scene, _text) {
            const label = new UILabel(_x, _y, _scene, _text, 'supercomputer', 36);
            return label;
        }
        static CreateH2(_x, _y, _scene, _text) {
            const label = new UILabel(_x, _y, _scene, _text, "odin_rounded", 28);
            return label;
        }
        static CreateStyleA(_x, _y, _scene, _text, _fontSize) {
            const label = new UILabel(_x, _y, _scene, _text, "supercomputer", _fontSize);
            return label;
        }
        static CreateStyleB(_x, _y, _scene, _text, _fontSize) {
            const label = new UILabel(_x, _y, _scene, _text, "odin_rounded", _fontSize);
            return label;
        }
        getWidth() {
            return this._m_label.width;
        }
        getHeight() {
            return this._m_label.height;
        }
        getZ() {
            return this._m_label.depth;
        }
        move(_x, _y) {
            this._m_label.x += _x;
            this._m_label.y += _y;
            return;
        }
        setPosition(_x, _y) {
            this._m_label.setPosition(_x, _y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_label.setOrigin(_x, _y);
            return;
        }
        getAnchorX() {
            return this._m_label.originX;
        }
        getAnchorY() {
            return this._m_label.originY;
        }
        getX() {
            return this._m_label.x;
        }
        getY() {
            return this._m_label.y;
        }
        setText(_text) {
            this._m_label.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        }
        setScale(_x, _y) {
            this._m_label.setScale(_x, _y);
            return;
        }
        setTint(_tint) {
            this._m_label.setTint(_tint);
            return;
        }
        enable() {
            this._m_label.setActive(true);
            this._m_label.setVisible(true);
            return;
        }
        disable() {
            this._m_label.setActive(false);
            this._m_label.setVisible(false);
            return;
        }
        leftAlign() {
            this._m_label.setLeftAlign();
            return;
        }
        rightAlign() {
            this._m_label.setRightAlign();
            return;
        }
        centerAlign() {
            this._m_label.setCenterAlign();
            return;
        }
        destroy() {
            this._m_label.destroy();
            super.destroy();
            return;
        }
    }
    exports.UILabel = UILabel;
});
define("managers/uiManager/uiButton", ["require", "exports", "commons/stEnums", "managers/uiManager/uiLabel", "managers/uiManager/uiObject"], function (require, exports, stEnums_5, uiLabel_1, uiObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIButton = void 0;
    class UIButton extends uiObject_3.UIObject {
        constructor(_x, _y, _scene, _frame, _label, _buttonTint, _labelTint, _labelSize) {
            super();
            this._m_originScale = 1;
            this._m_hoverScale = 1.1;
            this._m_pressedScale = 0.9;
            this._m_listenerManager.addEvent("buttonPressed");
            this._m_listenerManager.addEvent("buttonReleased");
            this._m_listenerManager.addEvent("buttonOver");
            this._m_listenerManager.addEvent("buttonOverOut");
            const contentSize = new Phaser.Geom.Point();
            this._m_contentSize = contentSize;
            this._m_buttonSize = new Phaser.Geom.Point();
            const button = _scene.add.nineslice(_x, _y, contentSize.x, contentSize.y, {
                key: "game_art",
                frame: _frame
            }, [7]);
            this._m_buttonTint = stEnums_5.ST_COLOR_ID.kWhite;
            if (_buttonTint !== undefined) {
                this._m_buttonTint = _buttonTint;
            }
            button.setTint(this._m_buttonTint);
            button.setInteractive();
            const label = uiLabel_1.UILabel.CreateStyleB(_x, _y, _scene, _label, _labelSize);
            let labeltint = stEnums_5.ST_COLOR_ID.kWhite;
            if (_labelTint !== undefined) {
                labeltint = _labelTint;
            }
            label.setTint(labeltint);
            label.setAnchor(0.5, 0.8);
            this._m_buttonWidth = button.width;
            this._m_buttonHeight = button.height;
            button.on('pointerdown', this._onButtonPressed, this);
            button.on('pointerup', this._onButtonReleased, this);
            button.on('pointerover', this._onButtonOver, this);
            button.on('pointerout', this._onButtonOverOut, this);
            this._m_button = button;
            this._m_label = label;
            this.setPadding(0);
            this.setAnchor(0.5, 0.5);
            return;
        }
        static CreateThemeButton(_x, _y, _scene, _label) {
            const button = new UIButton(_x, _y, _scene, "themeButton_idle.png", _label);
            button.setPadding(10);
            return button;
        }
        static CreateColorButton(_x, _y, _scene, _label, _buttonTint) {
            const button = new UIButton(_x, _y, _scene, "colorButton_idle.png", _label, _buttonTint);
            button.setPadding(10);
            return button;
        }
        getWidth() {
            return this._m_button.width;
        }
        getHeight() {
            return this._m_button.height;
        }
        getX() {
            return this._m_button.x;
        }
        getY() {
            return this._m_button.y;
        }
        getZ() {
            return this._m_button.depth;
        }
        move(_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            this._m_label.move(_x, _y);
            return;
        }
        setPosition(_x, _y) {
            this._m_button.setPosition(_x, _y);
            this._m_label.setPosition(_x, _y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_button.setOrigin(_x, _y);
            this.updateButton();
            return;
        }
        getAnchorX() {
            return this._m_button.originX;
        }
        getAnchorY() {
            return this._m_button.originY;
        }
        enable() {
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            this._m_label.enable();
            return;
        }
        disable() {
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            this._m_label.disable();
            return;
        }
        setPadding(_left, _top, _right, _bottom) {
            if (_top === undefined) {
                this._m_paddingBottom = _left;
                this._m_paddingTop = _left;
                this._m_paddingLeft = _left;
                this._m_paddingRight = _left;
            }
            else if (_right === undefined) {
                this._m_paddingLeft = _left;
                this._m_paddingRight = _left;
                this._m_paddingTop = _top;
                this._m_paddingBottom = _top;
            }
            else if (_bottom === undefined) {
                this._m_paddingLeft = _left;
                this._m_paddingTop = _top;
                this._m_paddingBottom = _top;
                this._m_paddingRight = _right;
            }
            else {
                this._m_paddingLeft = _left;
                this._m_paddingTop = _top;
                this._m_paddingRight = _right;
                this._m_paddingBottom = _bottom;
            }
            this.updateButton();
            return;
        }
        updateButton() {
            this.updateButtonSize();
            this._resizeButton();
            return;
        }
        destroy() {
            this._m_button.destroy();
            this._m_label.destroy();
            super.destroy();
            return;
        }
        updateButtonSize() {
            const contentSize = this._m_contentSize;
            contentSize.setTo(0.0);
            const width = this._m_label.getWidth();
            const height = this._m_label.getHeight();
            contentSize.x = width;
            contentSize.y = height;
            const buttonSize = this._m_buttonSize;
            buttonSize.x = contentSize.x + this._m_paddingLeft + this._m_paddingRight;
            buttonSize.y = contentSize.y + this._m_paddingBottom + this._m_paddingTop;
            if (buttonSize.x < this._m_buttonWidth) {
                buttonSize.x = this._m_buttonWidth;
            }
            if (buttonSize.y < this._m_buttonHeight) {
                buttonSize.y = this._m_buttonHeight;
            }
            return;
        }
        _resizeButton() {
            const buttonSize = this._m_buttonSize;
            this._m_button.resize(buttonSize.x, buttonSize.y);
            return;
        }
        _onButtonPressed() {
            this._m_label.setScale(this._m_pressedScale);
            this.updateButton();
            this._m_listenerManager.call("buttonPressed", this, undefined);
            return;
        }
        _onButtonReleased() {
            this._m_label.setScale(this._m_originScale);
            this.updateButton();
            this._m_listenerManager.call("buttonReleased", this, undefined);
            return;
        }
        _onButtonOver() {
            this._m_label.setScale(this._m_hoverScale);
            this.updateButton();
            this._m_listenerManager.call("buttonOver", this, undefined);
            return;
        }
        _onButtonOverOut() {
            this._m_label.setScale(this._m_originScale);
            this.updateButton();
            this._m_listenerManager.call("buttonOverOut", this, undefined);
            return;
        }
    }
    exports.UIButton = UIButton;
});
define("scenes/mainMenu", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiButton"], function (require, exports, stEnums_6, uiBox_1, uiButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainMenu = void 0;
    class MainMenu extends Phaser.Scene {
        create() {
            const box = uiBox_1.UIBox.CreateBorderBox(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, this);
            box.setAnchor(0.5, 0.5);
            box.setCenterAlignment();
            const seek = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Seek", stEnums_6.ST_COLOR_ID.kWhite);
            seek.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneSeek');
                return;
            }, this);
            box.add(seek);
            const flee = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Flee", stEnums_6.ST_COLOR_ID.kWhite);
            flee.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneFlee');
                return;
            }, this);
            box.add(flee);
            const arrival = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Arrival", stEnums_6.ST_COLOR_ID.kWhite);
            arrival.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneArrival');
                return;
            }, this);
            box.add(arrival);
            const pursuit = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Pursuit", stEnums_6.ST_COLOR_ID.kWhite);
            pursuit.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('scenePursuit');
                return;
            }, this);
            box.add(pursuit);
            const evade = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Evade", stEnums_6.ST_COLOR_ID.kWhite);
            evade.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneEvade');
                return;
            }, this);
            box.add(evade);
            const wander = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Wander", stEnums_6.ST_COLOR_ID.kWhite);
            wander.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneWander');
                return;
            }, this);
            box.add(wander);
            const followPath = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Follow Path", stEnums_6.ST_COLOR_ID.kWhite);
            followPath.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneFollowPath');
                return;
            }, this);
            box.add(followPath);
            const oAvoidance = uiButton_1.UIButton.CreateColorButton(0, 0, this, "Obstacle Avoidance", stEnums_6.ST_COLOR_ID.kWhite);
            oAvoidance.subscribe("buttonReleased", "MainMenu", function (_sender, _args) {
                this.scene.start('sceneObstacleAvoidance');
                return;
            }, this);
            box.add(oAvoidance);
            return;
        }
        update(_time, _delta) {
            return;
        }
    }
    exports.MainMenu = MainMenu;
});
define("steeringBehavior/iForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/cmpforceController", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_7, master_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpForceController = void 0;
    class CmpForceController {
        constructor() {
            this._m_actor = null;
            this._m_hForce = new Map();
            this._m_actualVelocity = new Phaser.Math.Vector2();
            this._m_actualVelocityStepped = new Phaser.Math.Vector2();
            this._m_totalForce = new Phaser.Math.Vector2();
            this._m_totalForceStepped = new Phaser.Math.Vector2();
            this._m_direction = new Phaser.Math.Vector2(1.0, 0.0);
            this._m_speed = 0.0;
            this._m_mass = 1.0;
            this._m_bRunning = true;
            this._m_debug = false;
            this._m_maxSpeed = 1.0;
            return;
        }
        init(_actor) {
            this.clear();
            this._m_master = master_3.Master.GetInstance();
            if (this._m_master.isDebugEnable()) {
                this._m_debug = true;
            }
            this._m_debugManager = this._m_master.getManager(stEnums_7.ST_MANAGER_ID.kDebugManager);
            this._m_actor = _actor;
            const simulationManager = this._m_master.getManager(stEnums_7.ST_MANAGER_ID.kSimManager);
            if (simulationManager.getState() === stEnums_7.ST_SIM_SATE.kRunning) {
                this.onSimulationStart();
            }
            else {
                this.onSimulationStop();
            }
            return;
        }
        update(_actor) {
            let totalForce = this._m_totalForce;
            totalForce.reset();
            let totalForceStepped = this._m_totalForceStepped;
            totalForceStepped.reset();
            if (!this._m_bRunning) {
                if (this._m_debug) {
                    this._m_hForce.forEach(this._updateForceDebug, this);
                    this.updateDebug(0);
                }
                return;
            }
            this._m_hForce.forEach(this._updateForce, this);
            let dt = this._m_master.getDeltaTime();
            totalForce.scale(1.0 / this._m_mass);
            totalForceStepped.copy(totalForce);
            totalForceStepped.scale(dt);
            let actualVelocity = this._m_actualVelocity;
            let direction = this._m_direction;
            actualVelocity.copy(direction);
            actualVelocity.scale(this._m_speed);
            actualVelocity.add(totalForceStepped);
            actualVelocity.limit(this._m_maxSpeed);
            this._m_speed = actualVelocity.length();
            let actualVelocityStepped = this._m_actualVelocityStepped;
            actualVelocityStepped.copy(actualVelocity);
            actualVelocityStepped.scale(dt);
            this._m_actor.sendMessage(stEnums_7.ST_MESSAGE_ID.kMove, actualVelocityStepped);
            direction.copy(actualVelocity);
            direction.normalize();
            this._m_actor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetAngle, direction.angle());
            if (this._m_debug) {
                this.updateDebug(dt);
            }
            return;
        }
        updateDebug(_dt) {
            let debugManager = this._m_debugManager;
            let sprite = this._m_actor.getWrappedInstance();
            let actualVelocity = this._m_actualVelocity;
            debugManager.drawLine(sprite.x, sprite.y, sprite.x + actualVelocity.x, sprite.y + actualVelocity.y, 3, stEnums_7.ST_COLOR_ID.kGreen);
            return;
        }
        receive(_id, _obj) {
            switch (_id) {
                case stEnums_7.ST_MESSAGE_ID.kSetMass:
                    this.setMass(_obj);
                    return;
                case stEnums_7.ST_MESSAGE_ID.kSetSpeed:
                    this.setSpeed(_obj);
                    return;
                case stEnums_7.ST_MESSAGE_ID.kSetMaxSpeed:
                    this.setMaxSpeed(_obj);
                    return;
            }
            return;
        }
        onSimulationStart() {
            this._m_bRunning = true;
            return;
        }
        onSimulationPause() {
            this._m_bRunning = false;
            return;
        }
        onSimulationResume() {
            this._m_bRunning = true;
            return;
        }
        onSimulationStop() {
            this._m_bRunning = false;
            this._m_speed = 0.0;
            this._m_actualVelocity.reset();
            this._m_actualVelocityStepped.reset();
            this._m_totalForce.reset();
            this._m_totalForceStepped.reset();
            this._m_direction.set(0.0, -1.0);
            return;
        }
        onDebugEnable() {
            this._m_debug = true;
            this._m_hForce.forEach(this._forceDebugEnable, this);
            return;
        }
        onDebugDisable() {
            this._m_debug = false;
            this._m_hForce.forEach(this._forceDebugDisable, this);
            return;
        }
        getID() {
            return stEnums_7.ST_COMPONENT_ID.kForceController;
        }
        addForce(_str_id, _force) {
            if (this._m_hForce.size < CmpForceController.MAX_FORCE_NUM) {
                this._m_hForce.set(_str_id, _force);
                _force.setController(this);
            }
            else {
            }
            return;
        }
        getForce(_str_id) {
            let hForce = this._m_hForce;
            if (hForce.has(_str_id)) {
                return this._m_hForce.get(_str_id);
            }
            throw new Error('Force does not exists: ' + _str_id);
        }
        getForces() {
            return this._m_hForce;
        }
        addSteerForce(_x, _y) {
            this._m_totalForce.x += _x;
            this._m_totalForce.y += _y;
            return;
        }
        getDirection() {
            return this._m_direction;
        }
        getSpeed() {
            return this._m_speed;
        }
        getVelocity() {
            return this._m_actualVelocity;
        }
        setMaxSpeed(_maxSpeed) {
            if (Math.abs(_maxSpeed) < CmpForceController.MAX_SPEED_LIMIT) {
                this._m_maxSpeed = _maxSpeed;
            }
            else {
                this._m_maxSpeed = CmpForceController.MAX_SPEED_LIMIT;
                this._m_maxSpeed *= (_maxSpeed > 0 ? 1 : -1);
            }
            return;
        }
        getMaxSpeed() {
            return this._m_maxSpeed;
        }
        setSpeed(_speed) {
            this._m_speed = _speed;
            return;
        }
        getMass() {
            return this._m_mass;
        }
        setMass(_mass) {
            if (this._m_mass != 0) {
                this._m_mass = _mass;
            }
            else {
                this._m_mass = 0.001;
            }
            return;
        }
        getTotalActualForceMagnitude() {
            return this._m_totalForce.length();
        }
        getTotalMaxForceMagnitude() {
            let totalMaxForceMagnitude = 0;
            this._m_hForce.forEach(force => {
                totalMaxForceMagnitude += force.getMaxMagnitude();
            });
            return totalMaxForceMagnitude;
        }
        isRunning() {
            return this._m_bRunning;
        }
        clear() {
            this._m_hForce.forEach(function (_force) {
                _force.destroy();
                return;
            });
            this._m_hForce.clear();
            return;
        }
        destroy() {
            this._m_direction = null;
            this._m_totalForce = null;
            this._m_actualVelocity = null;
            this._m_actualVelocityStepped = null;
            this._m_totalForceStepped = null;
            this._m_master = null;
            this._m_actor = null;
            this.clear();
            this._m_hForce = null;
            return;
        }
        _updateForce(_force) {
            let deltaTime = this._m_master.getDeltaTime();
            _force.update(deltaTime);
            if (this._m_debug) {
                _force.updateDebug(deltaTime);
            }
            return;
        }
        _updateForceDebug(_force) {
            let deltaTime = this._m_master.getDeltaTime();
            if (this._m_debug) {
                _force.updateDebug(deltaTime);
            }
            return;
        }
        _forceDebugEnable(_force) {
            this._m_debug = true;
            _force.onDebugEnable();
            return;
        }
        _forceDebugDisable(_force) {
            this._m_debug = false;
            _force.onDebugDisable();
            return;
        }
    }
    exports.CmpForceController = CmpForceController;
    CmpForceController.MAX_SPEED_LIMIT = 2000;
    CmpForceController.MAX_FORCE_NUM = 10;
});
define("components/cmpInteractiveActor", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_8, master_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cmpInteractiveActor = void 0;
    class cmpInteractiveActor {
        constructor() {
            const master = master_4.Master.GetInstance();
            this._m_simulationManager = master.getManager(stEnums_8.ST_MANAGER_ID.kSimManager);
            this._m_uiManager = master.getManager(stEnums_8.ST_MANAGER_ID.kUIManager);
            return;
        }
        init(_actor) {
            this._m_self = _actor;
            this._m_moveVector = new Phaser.Math.Vector2();
            const sprite = _actor.getWrappedInstance();
            sprite.setInteractive({ draggable: true });
            sprite.on("pointerdown", this.selectActor, this);
            sprite.on("pointerover", this.focusActor, this);
            sprite.on("pointerout", this.clearFocus, this);
            sprite.on("drag", this.dragActor, this);
            sprite.on("dragstart", this.dragStart, this);
            sprite.on("dragend", this.dragEnd, this);
            return;
        }
        update(_actor) {
            return;
        }
        receive(_id, _obj) {
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getID() {
            return stEnums_8.ST_COMPONENT_ID.kInteractiveActor;
        }
        selectActor() {
            this._m_uiManager.setTarget(this._m_self);
            return;
        }
        focusActor() {
            this._m_uiManager.focusActor(this._m_self);
            return;
        }
        clearFocus() {
            this._m_uiManager.clearFocusActor();
            return;
        }
        dragStart() {
            this._m_uiManager.setTarget(this._m_self);
            this._m_self.sendMessage(stEnums_8.ST_MESSAGE_ID.kSetAlpha, 0.5);
            return;
        }
        dragEnd() {
            this._m_self.sendMessage(stEnums_8.ST_MESSAGE_ID.kSetAlpha, 1.0);
            return;
        }
        dragActor(_pointer, _dragX, _dragY) {
            if (this._m_simulationManager.getState() === stEnums_8.ST_SIM_SATE.kStopped) {
                this._m_self.sendMessage(stEnums_8.ST_MESSAGE_ID.kSetPosition, this._m_moveVector.set(_dragX, _dragY));
            }
            return;
        }
        destroy() {
            this._m_uiManager = null;
            this._m_simulationManager = null;
            this._m_self = null;
            this._m_moveVector = null;
            return;
        }
    }
    exports.cmpInteractiveActor = cmpInteractiveActor;
});
define("steeringBehavior/forceSeek", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_9, master_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SeekForce = void 0;
    class SeekForce {
        init(_self, _target, _force, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_seekMaxLength = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_seekForce = new Phaser.Math.Vector2();
            this._m_desireVelocity = new Phaser.Math.Vector2();
            let master = master_5.Master.GetInstance();
            this._m_debugManager = master.getManager(stEnums_9.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setTarget(_newTarget) {
            this._m_target = _newTarget;
        }
        setMaxMagnitude(_magnitude) {
            this._m_seekMaxLength = _magnitude;
            return;
        }
        getMaxMagnitude() {
            return this._m_seekMaxLength;
        }
        getActualForce() {
            return this._m_seekForce.length();
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            let target = this._m_target;
            if (target !== undefined) {
                let self = this._m_self;
                let forceController = this._m_controller;
                let actualVelocity = forceController.getVelocity();
                let desireVelocity = this._m_desireVelocity;
                desireVelocity.set(target.x - self.x, target.y - self.y);
                desireVelocity.setLength(this._m_seekMaxLength);
                let seekForce = this._m_seekForce;
                seekForce.copy(desireVelocity);
                seekForce.subtract(actualVelocity);
                seekForce.limit(this._m_seekMaxLength);
                forceController.addSteerForce(seekForce.x, seekForce.y);
            }
            return;
        }
        updateDebug(_dt) {
            const self = this._m_self;
            const desireVelocity = this._m_desireVelocity;
            let actualVelocity = this._m_controller.getVelocity();
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_9.ST_COLOR_ID.kRed);
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getType() {
            return stEnums_9.ST_STEER_FORCE.kSeek;
        }
        destroy() {
            this._m_controller = null;
            this._m_seekForce = null;
            this._m_desireVelocity = null;
            this._m_target = null;
            this._m_self = null;
            this._m_debugManager = null;
            return;
        }
    }
    exports.SeekForce = SeekForce;
});
define("components/cmpShipPropulsor", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_10, master_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpShipPropulsor = void 0;
    class CmpShipPropulsor {
        init(_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            const master = master_6.Master.GetInstance();
            const scene = master.getSimulationScene();
            this._m_fireBackAnim = scene.add.sprite(0, 0, "game_art", "blueBackFire_1.png");
            this._m_v2_spriteDirection = new Phaser.Math.Vector2();
            this._m_v2_spritePosition = new Phaser.Math.Vector2();
            return;
        }
        update(_actor) {
            const forceController = _actor.getComponent(stEnums_10.ST_COMPONENT_ID.kForceController);
            const direction = forceController.getDirection();
            this._m_v2_spriteDirection.set(direction.x, direction.y);
            this._m_fireBackAnim.setAngle(Phaser.Math.RadToDeg(this._m_v2_spriteDirection.angle()));
            this._m_v2_spriteDirection.scale(-1);
            this._m_v2_spritePosition.set(this._m_v2_spriteDirection.x * this._m_sprite.width * 0.4 + this._m_sprite.x, this._m_v2_spriteDirection.y * this._m_sprite.width * 0.4 + this._m_sprite.y);
            this._m_fireBackAnim.setPosition(this._m_v2_spritePosition.x, this._m_v2_spritePosition.y);
            const deltaSpeed = forceController.getTotalActualForceMagnitude() / forceController.getTotalMaxForceMagnitude();
            this._m_fireBackAnim.setScale(this._m_sprite.scaleX * deltaSpeed, this._m_sprite.scaleY);
            return;
        }
        receive(_id, _obj) {
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getID() {
            return stEnums_10.ST_COMPONENT_ID.kShipPropulsor;
        }
        destroy() {
            this._m_fireBackAnim.destroy();
            this._m_fireBackAnim = null;
            this._m_sprite = null;
            return;
        }
        setAnimation(_key) {
            this._m_fireBackAnim.play(_key);
            return;
        }
    }
    exports.CmpShipPropulsor = CmpShipPropulsor;
});
define("components/cmpSpriteController", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSpriteController = void 0;
    class CmpSpriteController {
        init(_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        }
        update(_actor) { }
        receive(_id, _obj) {
            switch (_id) {
                case stEnums_11.ST_MESSAGE_ID.kMove:
                    {
                        let v2 = _obj;
                        this.move(v2.x, v2.y);
                    }
                    return;
                case stEnums_11.ST_MESSAGE_ID.kSetPosition:
                    {
                        let v2 = _obj;
                        this.setPosition(v2.x, v2.y);
                    }
                    return;
                case stEnums_11.ST_MESSAGE_ID.kSetScale:
                    {
                        let v2 = _obj;
                        this.setScale(v2.x, v2.y);
                    }
                    return;
                case stEnums_11.ST_MESSAGE_ID.kSetAngle:
                    this._m_sprite.setAngle(Phaser.Math.RadToDeg(_obj));
                    return;
                case stEnums_11.ST_MESSAGE_ID.kSetAlpha:
                    this.setAlpha(_obj);
                    return;
                case stEnums_11.ST_MESSAGE_ID.kPlayAnimation:
                    this.playAnimation(_obj);
                    return;
            }
            return;
        }
        move(_x, _y) {
            let sprite = this._m_sprite;
            sprite.setPosition(sprite.x + _x, sprite.y + _y);
            return;
        }
        playAnimation(_key) {
            this._m_sprite.play(_key);
            return;
        }
        setPosition(_x, _y) {
            let go = this._m_sprite;
            go.setPosition(_x, _y);
            return;
        }
        setScale(_x, _y) {
            let go = this._m_sprite;
            go.setScale(_x, _y);
            return;
        }
        setAlpha(_alpha) {
            this._m_sprite.setAlpha(_alpha);
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getID() {
            return stEnums_11.ST_COMPONENT_ID.kSpriteController;
        }
        destroy() {
            this._m_sprite.destroy();
            this._m_sprite = null;
            return;
        }
    }
    exports.CmpSpriteController = CmpSpriteController;
});
define("factories/shipFactory", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpInteractiveActor", "components/cmpShipPropulsor", "components/cmpSpriteController"], function (require, exports, baseActor_1, stEnums_12, cmpforceController_1, cmpInteractiveActor_1, cmpShipPropulsor_1, cmpSpriteController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShipFactory = void 0;
    class ShipFactory {
        static CreateBlueShip(_scene, _UniqueName) {
            let shipSprite = _scene.add.sprite(0, 0, 'game_art', 'blueShip.png');
            let shipActor = baseActor_1.BaseActor.Create(shipSprite, _UniqueName);
            let shipPropulsor = new cmpShipPropulsor_1.CmpShipPropulsor();
            shipActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_1.CmpForceController());
            shipActor.addComponent(new cmpInteractiveActor_1.cmpInteractiveActor());
            shipActor.addComponent(shipPropulsor);
            shipActor.init();
            shipPropulsor.setAnimation("blueBackFire");
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMaxSpeed, 500);
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.5, 0.5));
            let canvas = _scene.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMass, 1);
            return shipActor;
        }
        static CreateRedShip(_scene, _UniqueName) {
            let shipSprite = _scene.add.sprite(0, 0, 'game_art', 'redShip.png');
            let shipActor = baseActor_1.BaseActor.Create(shipSprite, _UniqueName);
            let shipPropulsor = new cmpShipPropulsor_1.CmpShipPropulsor();
            shipActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_1.CmpForceController());
            shipActor.addComponent(new cmpInteractiveActor_1.cmpInteractiveActor());
            shipActor.addComponent(shipPropulsor);
            shipActor.init();
            shipPropulsor.setAnimation("redBackFire");
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMaxSpeed, 500);
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.5, 0.5));
            let canvas = _scene.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMass, 1);
            return shipActor;
        }
    }
    exports.ShipFactory = ShipFactory;
});
define("managers/uiManager/uiButtonImg", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIButtonImg = void 0;
    class UIButtonImg extends uiObject_4.UIObject {
        constructor(_x, _y, _scene, _idleFrame, _hoverFrame, _pressedFrame, _texture) {
            super();
            this._m_originScale = 1;
            this._m_hoverScale = 1.1;
            this._m_pressedScale = 0.9;
            this._m_listenerManager.addEvent("buttonPressed");
            this._m_listenerManager.addEvent("buttonReleased");
            this._m_listenerManager.addEvent("buttonOver");
            this._m_listenerManager.addEvent("buttonOverOut");
            this._m_idleFrame = "niceButton.png";
            this._m_hoverFrame = this._m_idleFrame;
            this._m_pressedFrame = this._m_idleFrame;
            if (_idleFrame !== undefined) {
                this._m_idleFrame = _idleFrame;
            }
            if (_hoverFrame !== undefined) {
                this._m_hoverFrame = _hoverFrame;
            }
            if (_pressedFrame !== undefined) {
                this._m_pressedFrame = _pressedFrame;
            }
            let texture = "game_art";
            if (_texture !== undefined) {
                texture = _texture;
            }
            const button = _scene.add.image(_x, _y, texture, this._m_idleFrame);
            button.setInteractive();
            button.on('pointerdown', this._onButtonPressed, this);
            button.on('pointerup', this._onButtonReleased, this);
            button.on('pointerover', this._onButtonOver, this);
            button.on('pointerout', this._onButtonOverOut, this);
            this._m_button = button;
            this.setAnchor(0.5, 0.5);
            return;
        }
        static CreateButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene);
            return button;
        }
        static CreatePlayButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "play_but_normal.png", "play_but_hover.png", "play_but_press.png");
            return button;
        }
        static CreatePauseButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "pause_but_normal.png", "pause_but_hover.png", "pause_but_press.png");
            return button;
        }
        static CreateStopButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "stop_but_normal.png", "stop_but_hover.png", "stop_but_press.png");
            return button;
        }
        static CreateComboButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "combo_but_normal.png", "combo_but_hover.png", "combo_but_press.png");
            return button;
        }
        static CreateDebugButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "debug_idle.png", "debug_hover.png", "debug_press.png");
            return button;
        }
        static CreateHomeButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "home_idle.png", "home_hover.png", "home_press.png");
            return button;
        }
        static CreateInfoButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "info_idle.png", "info_hover.png", "info_press.png");
            return button;
        }
        static CreateYesButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "yes_idle.png", "yes_hover.png", "yes_press.png");
            return button;
        }
        static CreateNoButtonImg(_x, _y, _scene) {
            const button = new UIButtonImg(_x, _y, _scene, "no_idle.png", "no_hover.png", "no_press.png");
            return button;
        }
        getWidth() {
            return this._m_button.width;
        }
        getHeight() {
            return this._m_button.height;
        }
        getX() {
            return this._m_button.x;
        }
        getY() {
            return this._m_button.y;
        }
        getZ() {
            return this._m_button.z;
        }
        move(_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            return;
        }
        setPosition(_x, _y) {
            this._m_button.setPosition(_x, _y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_button.setOrigin(_x, _y);
            return;
        }
        getAnchorX() {
            return this._m_button.originX;
        }
        getAnchorY() {
            return this._m_button.originY;
        }
        enable() {
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            return;
        }
        disable() {
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            return;
        }
        setImage(_texture, _frame) {
            this._m_button.setTexture(_texture, _frame);
            return;
        }
        destroy() {
            this._m_button.destroy();
            super.destroy();
        }
        _onButtonPressed() {
            this._m_button.setScale(this._m_pressedScale);
            this._m_button.setFrame(this._m_pressedFrame);
            this._m_listenerManager.call("buttonPressed", this, undefined);
            return;
        }
        _onButtonReleased() {
            this._m_button.setScale(this._m_originScale);
            this._m_button.setFrame(this._m_idleFrame);
            this._m_listenerManager.call("buttonReleased", this, undefined);
            return;
        }
        _onButtonOver() {
            this._m_button.setScale(this._m_hoverScale);
            this._m_button.setFrame(this._m_hoverFrame);
            this._m_listenerManager.call("buttonOver", this, undefined);
            return;
        }
        _onButtonOverOut() {
            this._m_button.setScale(this._m_originScale);
            this._m_button.setFrame(this._m_idleFrame);
            this._m_listenerManager.call("buttonOverOut", this, undefined);
            return;
        }
    }
    exports.UIButtonImg = UIButtonImg;
});
define("managers/uiManager/uiLabelBox", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UILabelBox = void 0;
    class UILabelBox extends uiObject_5.UIObject {
        constructor(_x, _y, _scene, _text, _tint, _boxTint) {
            super();
            const listenerManager = this._m_listenerManager;
            listenerManager.addEvent("textChanged");
            listenerManager.addEvent("pointerdown");
            listenerManager.addEvent("pointerup");
            listenerManager.addEvent("pointerout");
            listenerManager.addEvent("pointerover");
            this._m_paddingLeft = 10;
            const bg = _scene.add.image(_x, _y, "game_art", "text_box.png");
            this._m_bg = bg;
            if (_boxTint !== undefined) {
                bg.setTint(_boxTint);
            }
            bg.setOrigin(0.0, 0.5);
            const label = _scene.add.bitmapText(0, 0, "odin_rounded", _text, 20);
            label.setOrigin(0.0, 0.70);
            if (_tint !== undefined) {
                label.setTint(_tint);
            }
            else {
                label.setTint(0x000000);
            }
            this._m_label = label;
            this._updateLabel();
            this._m_isInteractive = false;
            return;
        }
        getWidth() {
            return this._m_bg.width;
        }
        getHeight() {
            return this._m_bg.height;
        }
        getX() {
            return this._m_bg.x;
        }
        getY() {
            return this._m_bg.y;
        }
        getZ() {
            return this._m_bg.depth;
        }
        setZ(_z) {
            this._m_bg.depth = _z;
            this._m_label.depth = _z;
            return;
        }
        move(_x, _y) {
            this._m_bg.x += _x;
            this._m_bg.y += _y;
            this._updateLabel();
            return;
        }
        setPosition(_x, _y) {
            this._m_bg.setPosition(_x, _y);
            this._updateLabel();
            return;
        }
        setAnchor(_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this._updateLabel();
            return;
        }
        getAnchorX() {
            return this._m_bg.originX;
        }
        getAnchorY() {
            return this._m_bg.originY;
        }
        enable() {
            this._m_bg.setActive(true);
            this._m_bg.setVisible(true);
            this._m_label.setActive(true);
            this._m_label.setVisible(true);
            return;
        }
        disable() {
            this._m_bg.setActive(false);
            this._m_bg.setVisible(false);
            this._m_label.setActive(false);
            this._m_label.setVisible(false);
            return;
        }
        setTextTint(_tint) {
            this._m_label.setTint(_tint);
            return;
        }
        setBoxTint(_tint) {
            this._m_bg.setTint(_tint);
            return;
        }
        setText(_text) {
            this._m_label.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        }
        getText() {
            return this._m_label.text;
        }
        setPaddingLeft(_padding) {
            this._m_paddingLeft = _padding;
            this._updateLabel();
            return;
        }
        setInteractive() {
            if (!this._m_isInteractive) {
                this._m_isInteractive = true;
                const bg = this._m_bg;
                bg.setInteractive();
                bg.on("pointerdown", function () {
                    this._m_listenerManager.call("pointerdown", this, undefined);
                    return;
                }, this);
                bg.on("pointerup", function () {
                    this._m_listenerManager.call("pointerup", this, undefined);
                    return;
                }, this);
                bg.on("pointerover", function () {
                    this._m_listenerManager.call("pointerover", this, undefined);
                    return;
                }, this);
                bg.on("pointerout", function () {
                    this._m_listenerManager.call("pointerout", this, undefined);
                    return;
                }, this);
            }
            return;
        }
        destroy() {
            this._m_label.destroy();
            this._m_label = null;
            this._m_bg.destroy();
            this._m_bg = null;
            super.destroy();
            return;
        }
        _updateLabel() {
            const bg = this._m_bg;
            const x = bg.x - (bg.width * bg.originX) + this._m_paddingLeft;
            const y = bg.y - (bg.height * bg.originY) + (bg.height * 0.5);
            this._m_label.setPosition(x, y);
            return;
        }
    }
    exports.UILabelBox = UILabelBox;
});
define("managers/uiManager/uiComboBox", ["require", "exports", "commons/stEnums", "managers/uiManager/uiLabelBox", "managers/uiManager/uiObject"], function (require, exports, stEnums_13, uiLabelBox_1, uiObject_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIComboBox = void 0;
    class UIComboBox extends uiObject_6.UIObject {
        constructor(_x, _y, _scene) {
            super();
            this._m_scene = _scene;
            this._m_isOpen = false;
            this._m_listenerManager.addEvent("selectionChanged");
            this._m_listenerManager.addEvent("optionsChanged");
            const button = _scene.add.image(0, 0, "game_art", "combo_but_normal.png");
            this._m_button = button;
            button.setOrigin(0.0, 0.0);
            button.setInteractive();
            button.on("pointerdown", function () {
                button.setFrame("combo_but_press.png");
                return;
            }, this);
            button.on("pointerup", this._onButtonRelease, this);
            button.on("pointerover", function () {
                button.setFrame("combo_but_hover.png");
                return;
            });
            button.on("pointerout", function () {
                button.setFrame("combo_but_normal.png");
                return;
            });
            this._m_aOptions = new Array();
            const selectedLabel = new uiLabelBox_1.UILabelBox(_x, _y, _scene, "");
            selectedLabel.setBoxTint(0xbefbff);
            this._m_selectedLabel = selectedLabel;
            this.updateCombo(undefined);
            return;
        }
        getWidth() {
            return this._m_selectedLabel.getWidth() + this._m_button.width;
        }
        getHeight() {
            return this._m_selectedLabel.getHeight();
        }
        getX() {
            return this._m_selectedLabel.getX();
        }
        getY() {
            return this._m_selectedLabel.getY();
        }
        getZ() {
            return this._m_selectedLabel.getZ();
        }
        move(_x, _y) {
            this._m_selectedLabel.move(_x, _y);
            this._updatePosition();
            return;
        }
        setPosition(_x, _y) {
            this._m_selectedLabel.setPosition(_x, _y);
            this._updatePosition();
            return;
        }
        setAnchor(_x, _y) {
            this._m_selectedLabel.setAnchor(_x, _y);
            this._updatePosition();
            return;
        }
        getAnchorX() {
            return this._m_selectedLabel.getAnchorX();
        }
        getAnchorY() {
            return this._m_selectedLabel.getAnchorY();
        }
        enable() {
            this._m_selectedLabel.enable();
            if (this._m_isOpen) {
                const aOptionLabels = this._m_aOptions;
                const size = aOptionLabels.length;
                for (let i = 0; i < size; ++i) {
                    aOptionLabels[i].enable();
                }
            }
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            return;
        }
        disable() {
            this.closeCombo();
            this._m_selectedLabel.disable();
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            return;
        }
        setSelection(_option) {
            this._m_selectedLabel.setText(_option);
            this._m_listenerManager.call("selectionChanged", this, _option);
            return;
        }
        selectFirstOption() {
            if (this._m_aOptionsStr !== undefined) {
                if (this._m_aOptionsStr.length > 0) {
                    this.setSelection(this._m_aOptionsStr[0]);
                }
            }
            return;
        }
        updateCombo(_options) {
            this._m_aOptionsStr = _options;
            this._updateLabels();
            this._updatePosition();
            this.setSelection("");
            this.closeCombo();
            this._m_listenerManager.call("optionsChanged", this, _options);
            return;
        }
        openCombo() {
            if (!this._m_isOpen) {
                const aOptionsStr = this._m_aOptionsStr;
                if (aOptionsStr === undefined) {
                    return;
                }
                if (aOptionsStr.length <= 0) {
                    return;
                }
                this._m_isOpen = true;
                const aOptions = this._m_aOptions;
                const size = aOptionsStr.length;
                const selectedLabel = this._m_selectedLabel;
                for (let i = 0; i < size; ++i) {
                    aOptions[i].enable();
                }
            }
            return;
        }
        closeCombo() {
            if (this._m_isOpen) {
                const aOptions = this._m_aOptions;
                const size = aOptions.length;
                for (let i = 0; i < size; ++i) {
                    aOptions[i].disable();
                }
                this._m_isOpen = false;
            }
            return;
        }
        destroy() {
            this._m_selectedLabel.destroy();
            this._m_aOptions.forEach(function (_value) {
                _value.destroy();
            });
            this._m_aOptions = null;
            this._m_aOptionsStr = null;
            super.destroy();
            return;
        }
        _onButtonRelease() {
            if (this._m_isOpen) {
                this.closeCombo();
            }
            else {
                this.openCombo();
            }
            this._m_button.setFrame("combo_but_normal.png");
            return;
        }
        _updateLabels() {
            const aOptionsStr = this._m_aOptionsStr;
            if (aOptionsStr === undefined) {
                return;
            }
            const size = aOptionsStr.length;
            const aOptionLabels = this._m_aOptions;
            for (let i = 0; i < size; ++i) {
                if (aOptionLabels.length <= size) {
                    const optionLabel = new uiLabelBox_1.UILabelBox(0, 0, this._m_scene, aOptionsStr[i]);
                    optionLabel.setBoxTint(0xaffaff);
                    optionLabel.setZ(10);
                    optionLabel.setAnchor(0.0, 0.0);
                    optionLabel.setInteractive();
                    optionLabel.subscribe("pointerdown", "comboBox", this._onOptionDown, this);
                    optionLabel.subscribe("pointerup", "comboBox", this._onOptionUp, this);
                    optionLabel.subscribe("pointerover", "comboBox", this._onOptionOver, this);
                    optionLabel.subscribe("pointerout", "comboBox", this._onOptionOut, this);
                    optionLabel.disable();
                    aOptionLabels.push(optionLabel);
                }
                else {
                    aOptionLabels[i].setText(aOptionsStr[i]);
                }
            }
            return;
        }
        _updatePosition() {
            const selectedLabel = this._m_selectedLabel;
            const x = selectedLabel.getX()
                - (selectedLabel.getWidth() * selectedLabel.getAnchorX());
            let y = selectedLabel.getY()
                - (selectedLabel.getHeight() * selectedLabel.getAnchorY());
            this._m_button.setPosition(x + selectedLabel.getWidth(), y);
            y += selectedLabel.getHeight();
            const aOptions = this._m_aOptions;
            const size = aOptions.length;
            let optionLabel;
            for (let i = 0; i < size; ++i) {
                optionLabel = aOptions[i];
                optionLabel.setPosition(x, y);
                y += optionLabel.getHeight();
            }
            return;
        }
        _onOptionDown(_uiLabel, _args) {
            const labelBox = _uiLabel;
            labelBox.setBoxTint(stEnums_13.ST_COLOR_ID.kBlack);
            labelBox.setTextTint(stEnums_13.ST_COLOR_ID.kWhite);
            return;
        }
        _onOptionUp(_uiLabel, _args) {
            const labelBox = _uiLabel;
            this.setSelection(labelBox.getText());
            labelBox.setBoxTint(stEnums_13.ST_COLOR_ID.kSkyBlueNeon);
            labelBox.setTextTint(stEnums_13.ST_COLOR_ID.kBlack);
            this.closeCombo();
            return;
        }
        _onOptionOver(_uiLabel, _args) {
            const labelBox = _uiLabel;
            labelBox.setBoxTint(0x5dc7ce);
            labelBox.setTextTint(stEnums_13.ST_COLOR_ID.kBlack);
            return;
        }
        _onOptionOut(_uiLabel, _args) {
            const labelBox = _uiLabel;
            labelBox.setBoxTint(stEnums_13.ST_COLOR_ID.kSkyBlueNeon);
            labelBox.setTextTint(stEnums_13.ST_COLOR_ID.kBlack);
            return;
        }
    }
    exports.UIComboBox = UIComboBox;
});
define("managers/uiManager/uiSlider", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISlider = void 0;
    class UISlider extends uiObject_7.UIObject {
        constructor(_x, _y, _scene, _min, _max) {
            super();
            this._m_listenerManager.addEvent("valueChanged");
            const group = _scene.add.group();
            this._m_bg = _scene.add.image(_x, _y, "game_art", "slider_bg.png");
            this._m_bar = _scene.add.image(_x, _y, "game_art", "slider_bar.png");
            const button = _scene.add.image(_x, _y, "game_art", "slider_button.png");
            button.setInteractive();
            _scene.input.setDraggable(button);
            button.on("drag", this._onButtonDrag, this);
            this._m_button = button;
            group.add(this._m_bg);
            group.add(this._m_bar);
            group.add(this._m_button);
            this._m_group = group;
            this._m_min = _min;
            this._m_max = _max;
            this._m_value = _min;
            this._updateData();
            this.updateValue();
            return;
        }
        setValue(_value) {
            if (_value < this._m_min) {
                _value = this._m_min;
            }
            else if (_value > this._m_max) {
                _value = this._m_max;
            }
            this._m_value = _value;
            this.updateButton();
            return;
        }
        getValue() {
            return this._m_value;
        }
        updateValue() {
            const dt = this._m_maxButtonX - this._m_minButtonX;
            const value = (this._m_button.x - this._m_minButtonX) / dt;
            const minX = this._m_min;
            this._m_value = minX + ((this._m_max - minX) * value);
            this._m_listenerManager.call("valueChanged", this, undefined);
            this._cropBar(value);
            return;
        }
        updateButton() {
            const dt = this._m_max - this._m_min;
            const value = (this._m_value - this._m_min) / dt;
            const minX = this._m_minButtonX;
            const x = minX + ((this._m_maxButtonX - minX) * value);
            this._m_button.setX(x);
            this._cropBar(value);
            this._m_listenerManager.call("valueChanged", this, undefined);
            return;
        }
        getWidth() {
            return this._m_bg.width;
        }
        getHeight() {
            return this._m_bg.height;
        }
        getX() {
            return this._m_bg.x;
        }
        getY() {
            return this._m_bg.y;
        }
        getZ() {
            return this._m_bg.depth;
        }
        move(_x, _y) {
            this._m_group.incXY(_x, _y);
            this._updateData();
            return;
        }
        setPosition(_x, _y) {
            const bg = this._m_bg;
            const x = _x - bg.x;
            const y = _y - bg.y;
            this._m_group.incXY(x, y);
            const bar = this._m_bar;
            const bgWidth = bg.frame.width;
            const bgHeight = bg.frame.height;
            bar.x = bg.x - (bgWidth * bg.originX) + (bgWidth * 0.5);
            bar.y = bg.y - (bgHeight * bg.originY) + (bgHeight * 0.5);
            this._updateData();
            this.updateButton();
            return;
        }
        setAnchor(_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this._updateData();
            return;
        }
        getAnchorX() {
            return this._m_bg.originX;
        }
        getAnchorY() {
            return this._m_bg.originY;
        }
        enable() {
            this._m_group.setVisible(true);
            this._m_group.setActive(true);
            return;
        }
        disable() {
            this._m_group.setVisible(false);
            this._m_group.setActive(false);
            return;
        }
        _cropBar(_value) {
            const bar = this._m_bar;
            bar.setCrop(bar.frame.x, bar.frame.y, bar.frame.width * _value, bar.frame.height);
            return;
        }
        _onButtonDrag(_pointer, _dragX, _dragY) {
            this._setButtonX(_pointer.x);
            this.updateValue();
            return;
        }
        _setButtonX(_x) {
            if (_x < this._m_minButtonX) {
                _x = this._m_minButtonX;
            }
            else if (_x > this._m_maxButtonX) {
                _x = this._m_maxButtonX;
            }
            this._m_button.setX(_x);
            return;
        }
        _updateData() {
            const bg = this._m_bg;
            const x = bg.x - (bg.frame.width * bg.originX);
            const bar = this._m_bar;
            this._m_minButtonX = x;
            this._m_maxButtonX = x + bar.frame.width;
            return;
        }
    }
    exports.UISlider = UISlider;
});
define("factories/tiledMapFactory", ["require", "exports", "managers/uiManager/uiButtonImg", "managers/uiManager/uiComboBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider"], function (require, exports, uiButtonImg_1, uiComboBox_1, uiLabel_2, uiSlider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TiledMapFactory = void 0;
    class TiledMapFactory {
        static CreateBitmapText(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const bitmapText = _scene.add.bitmapText(_object.x, _object.y, hProperties.get("font_key").value, _object.text.text, hProperties.get("font_size").value);
            bitmapText.setOrigin(0, 0);
            let colorString = hProperties.get("font_color").value;
            colorString = colorString.substring(3, colorString.length);
            const color = parseInt(colorString, 16);
            bitmapText.setTint(color);
            if (_object.text.wrap) {
                bitmapText.maxWidth = _object.width;
            }
            return bitmapText;
        }
        static CreateImage(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const texture = hProperties.get("texture").value;
            let frame;
            if (hProperties.get("frame").value !== "") {
                frame = hProperties.get("frame").value;
            }
            else {
                frame = hProperties.get("frame_idx").value;
            }
            const image = _scene.add.image(0, 0, texture, frame);
            TiledMapFactory.setGameObjectProperties(_object, image);
            return image;
        }
        static CreateSprite(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const texture = hProperties.get("texture").value;
            let frame;
            if (hProperties.get("frame").value !== "") {
                frame = hProperties.get("frame").value;
            }
            else {
                frame = hProperties.get("frame_idx").value;
            }
            const sprite = _scene.add.sprite(0, 0, texture, frame);
            TiledMapFactory.setGameObjectProperties(_object, sprite);
            const animation = hProperties.get("animation").value;
            if (animation !== "") {
                sprite.play(animation);
            }
            return sprite;
        }
        static CreateUIComboBox(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const comboBox = new uiComboBox_1.UIComboBox(_object.x, _object.y - _object.height * 0.5, _scene);
            comboBox.setSelection(hProperties.get("init_value").value);
            return comboBox;
        }
        static CreateUISlider(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const slider = new uiSlider_1.UISlider(_object.x + _object.width * 0.5, _object.y - _object.height * 0.5, _scene, hProperties.get("min_value").value, hProperties.get("max_value").value);
            return slider;
        }
        static CreateUILabel(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            let colorString = hProperties.get("font_color").value;
            colorString = colorString.substring(3, colorString.length);
            const color = parseInt(colorString, 16);
            const uiLabel = new uiLabel_2.UILabel(_object.x, _object.y, _scene, _object.text.text, hProperties.get("font_key").value, hProperties.get("font_size").value, color);
            uiLabel.setAnchor(0, 0);
            return uiLabel;
        }
        static CreateUIButtonImage(_object, _scene) {
            const hProperties = TiledMapFactory.CreatePropertiesMap(_object.properties);
            const texture = hProperties.get("texture").value;
            const frame = hProperties.get("frame").value;
            const frameHover = hProperties.get("frame_hover").value;
            const framePress = hProperties.get("frame_press").value;
            const button = new uiButtonImg_1.UIButtonImg(0, 0, _scene, frame, frameHover, framePress, texture);
            TiledMapFactory.setUIProperties(_object, button);
            return button;
        }
        static setGameObjectProperties(_tiledObject, _phaserObject) {
            const rotation = _tiledObject.rotation * Phaser.Math.DEG_TO_RAD;
            const bAngle = Math.atan(_tiledObject.height / _tiledObject.width);
            const vHDiagonal = new Phaser.Math.Vector2(Math.sqrt(Math.pow(_tiledObject.width * 0.5, 2) + Math.pow(_tiledObject.height * 0.5, 2)), 0);
            vHDiagonal.rotate(-bAngle);
            vHDiagonal.rotate(rotation);
            const pivotX = vHDiagonal.x + _tiledObject.x;
            const pivotY = vHDiagonal.y + _tiledObject.y;
            vHDiagonal.scale(-1);
            vHDiagonal.rotate(-rotation);
            const objX = pivotX + vHDiagonal.x;
            const objY = pivotY + vHDiagonal.y;
            _phaserObject.setOrigin(0.5, 0.5);
            _phaserObject.setPosition(objX + _tiledObject.width * 0.5, objY - _tiledObject.height * 0.5);
            _phaserObject.setScale(_tiledObject.width / _phaserObject.width, _tiledObject.height / _phaserObject.height);
            _phaserObject.setAngle(_tiledObject.rotation);
            _phaserObject.setFlipX(_tiledObject.flippedHorizontal);
            _phaserObject.setFlipY(_tiledObject.flippedVertical);
            _phaserObject.setVisible(_tiledObject.visible);
            return;
        }
        static setUIProperties(_tiledObject, _uiObject) {
            const rotation = _tiledObject.rotation * Phaser.Math.DEG_TO_RAD;
            const bAngle = Math.atan(_tiledObject.height / _tiledObject.width);
            const vHDiagonal = new Phaser.Math.Vector2(Math.sqrt(Math.pow(_tiledObject.width * 0.5, 2) + Math.pow(_tiledObject.height * 0.5, 2)), 0);
            vHDiagonal.rotate(-bAngle);
            vHDiagonal.rotate(rotation);
            const pivotX = vHDiagonal.x + _tiledObject.x;
            const pivotY = vHDiagonal.y + _tiledObject.y;
            vHDiagonal.scale(-1);
            vHDiagonal.rotate(-rotation);
            const objX = pivotX + vHDiagonal.x;
            const objY = pivotY + vHDiagonal.y;
            _uiObject.setPosition(objX + _tiledObject.width * _uiObject.getAnchorX(), objY - _tiledObject.height * _uiObject.getAnchorY());
            _uiObject.setScale(_tiledObject.width / _uiObject.getWidth(), _tiledObject.height / _uiObject.getHeight());
            if (!_tiledObject.visible) {
                _uiObject.disable();
            }
            return;
        }
        static CreatePropertiesMap(_aProperties) {
            const map = new Map();
            const size = _aProperties.length;
            for (let i = 0; i < size; ++i) {
                map.set(_aProperties[i].name, _aProperties[i]);
            }
            return map;
        }
    }
    exports.TiledMapFactory = TiledMapFactory;
});
define("gameScene/mapScene", ["require", "exports", "factories/tiledMapFactory"], function (require, exports, tiledMapFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapScene = void 0;
    class MapScene {
        constructor() {
            this._m_hObjects = new Map();
            this._m_unnamedObjects = new Array();
            return;
        }
        static CreateFromTiledMap(_key, _scene) {
            const hFactories = new Map();
            hFactories.set("image", tiledMapFactory_1.TiledMapFactory.CreateImage);
            hFactories.set("sprite", tiledMapFactory_1.TiledMapFactory.CreateSprite);
            hFactories.set("uiImageButton", tiledMapFactory_1.TiledMapFactory.CreateUIButtonImage);
            hFactories.set("bitmapText", tiledMapFactory_1.TiledMapFactory.CreateBitmapText);
            hFactories.set("uiLabel", tiledMapFactory_1.TiledMapFactory.CreateUILabel);
            hFactories.set("uiSlider", tiledMapFactory_1.TiledMapFactory.CreateUISlider);
            hFactories.set("uiComboBox", tiledMapFactory_1.TiledMapFactory.CreateUIComboBox);
            const scene = new MapScene();
            scene.name = _key;
            const tiledMap = _scene.make.tilemap({ key: _key });
            const aObjectLayerName = tiledMap.getObjectLayerNames();
            const objectLayersSize = aObjectLayerName.length;
            for (let i = 0; i < objectLayersSize; ++i) {
                const objectLayer = tiledMap.getObjectLayer(aObjectLayerName[i]);
                const objectsSize = objectLayer.objects.length;
                let tiledObject;
                for (let j = 0; j < objectsSize; ++j) {
                    tiledObject = objectLayer.objects[j];
                    if (tiledObject.type !== "") {
                        if (hFactories.has(tiledObject.type)) {
                            const factoryFn = hFactories.get(tiledObject.type);
                            if (tiledObject.name !== "") {
                                scene._m_hObjects.set(tiledObject.name, factoryFn.call(this, tiledObject, _scene));
                            }
                            else {
                                scene._m_unnamedObjects.push(factoryFn.call(this, tiledObject, _scene));
                            }
                        }
                        else {
                            console.error("Scene: " + tiledObject.type + " factory not implemented.");
                        }
                    }
                }
            }
            return scene;
        }
        getObject(_name) {
            if (this._m_hObjects.has(_name)) {
                return this._m_hObjects.get(_name);
            }
            else {
                return null;
            }
        }
        getUnnamedObjects() {
            return this._m_unnamedObjects;
        }
        clear() {
            const unnamedObjects = this._m_unnamedObjects;
            while (unnamedObjects.length) {
                unnamedObjects.pop();
            }
            this._m_hObjects.clear();
            return;
        }
        destroy() {
            const unnamedObjects = this._m_unnamedObjects;
            let object;
            while (unnamedObjects.length) {
                object = unnamedObjects.pop();
                object.destroy();
            }
            this._m_unnamedObjects = null;
            this._m_hObjects.forEach(function (_value) {
                _value.destroy();
                return;
            });
            this._m_hObjects.clear();
            this._m_hObjects = null;
            return;
        }
    }
    exports.MapScene = MapScene;
});
define("managers/uiManager/uiImage", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIImage = void 0;
    class UIImage extends uiObject_8.UIObject {
        constructor(_x, _y, _scene, _texture, _frame) {
            super();
            this._m_image = _scene.add.image(_x, _y, _texture, _frame);
            return;
        }
        getWidth() {
            return this._m_image.width;
        }
        getHeight() {
            return this._m_image.height;
        }
        getX() {
            return this._m_image.x;
        }
        getY() {
            return this._m_image.y;
        }
        getZ() {
            return this._m_image.z;
        }
        move(_x, _y) {
            this._m_image.x += _x;
            this._m_image.y += _y;
            return;
        }
        setPosition(_x, _y) {
            this._m_image.x = _x;
            this._m_image.y = _y;
            return;
        }
        setAnchor(_x, _y) {
            this._m_image.setOrigin(_x, _y);
            return;
        }
        getAnchorX() {
            return this._m_image.originX;
        }
        getAnchorY() {
            return this._m_image.originY;
        }
        enable() {
            this._m_image.setActive(true);
            this._m_image.setVisible(true);
            return;
        }
        disable() {
            this._m_image.setActive(false);
            this._m_image.setVisible(false);
            return;
        }
        setImage(_texture, _frame) {
            this._m_image.setTexture(_texture, _frame);
            return;
        }
    }
    exports.UIImage = UIImage;
});
define("managers/uiManager/uiSpeedometer", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISpeedometer = void 0;
    class UISpeedometer extends uiObject_9.UIObject {
        constructor(_x, _y, _scene) {
            super();
            this._m_bg = _scene.add.image(0, 0, "game_art", "velocimetro_bg.png");
            const pointer = _scene.add.image(0, 0, "game_art", "velocimetro_pointer.png");
            pointer.setOrigin(0.07, 0.5);
            this._m_pointer = pointer;
            this._updatePointer();
            this._m_fg = _scene.add.image(36, 0, "game_art", "velocimetro_fg.png");
            this.setPosition(_x, _y);
            return;
        }
        getWidth() {
            return this._m_bg.width;
        }
        getHeight() {
            return this._m_bg.height;
        }
        getX() {
            return this._m_bg.x;
        }
        getY() {
            return this._m_bg.y;
        }
        getZ() {
            return this._m_bg.depth;
        }
        setZ(_z) {
            this._m_bg.setDepth(_z);
            return;
        }
        move(_x, _y) {
            this._m_bg.x += _x;
            this._m_bg.y += _y;
            this._m_fg.x += _x;
            this._m_fg.y += _y;
            this._updatePointer();
            return;
        }
        setPosition(_x, _y) {
            const x = _x - this._m_bg.x;
            const y = _y - this._m_bg.y;
            this.move(x, y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this._updatePointer();
            return;
        }
        getAnchorX() {
            return this._m_bg.originX;
        }
        getAnchorY() {
            return this._m_bg.originY;
        }
        enable() {
            this._m_bg.setActive(true);
            this._m_bg.setVisible(true);
            this._m_pointer.setActive(true);
            this._m_pointer.setVisible(true);
            return;
        }
        disable() {
            this._m_bg.setActive(false);
            this._m_bg.setVisible(false);
            this._m_pointer.setActive(false);
            this._m_pointer.setVisible(false);
            return;
        }
        updatePointerAngle(_angle) {
            this._m_pointer.setAngle(_angle);
            return;
        }
        destroy() {
            this._m_bg.destroy();
            this._m_pointer.destroy();
            super.destroy();
            return;
        }
        _updatePointer() {
            const bg = this._m_bg;
            const x = bg.x - (bg.width * bg.originX) + (bg.width * 0.5);
            const y = bg.y - (bg.height * bg.originY) + (bg.height * 0.79);
            this._m_pointer.setPosition(x, y);
            return;
        }
    }
    exports.UISpeedometer = UISpeedometer;
});
define("managers/uiManager/uiControllers/UIForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForce = void 0;
    class UIForce {
        update() {
            return;
        }
        setTarget(_force) {
            return;
        }
        destroy() {
            return;
        }
        getBox() {
            return null;
        }
    }
    exports.UIForce = UIForce;
});
define("steeringBehavior/forceArrival", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_7, stEnums_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrivalForce = void 0;
    class ArrivalForce {
        init(_self, _target, _slowingRadius, _force, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_slowingRadius = _slowingRadius;
            this._m_forceMagnitude = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_arrivalForce = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_debugManager = master_7.Master.GetInstance().getManager(stEnums_14.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            const target = this._m_target;
            const self = this._m_self;
            const controller = this._m_controller;
            const actualVelocity = controller.getVelocity();
            const forceMagnitude = this._m_forceMagnitude;
            const desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(target.x - self.x, target.y - self.y);
            this._m_distance = desiredVelocity.length();
            let slowingRadius = this._m_slowingRadius;
            let arrivalMultiplier = this._m_distance / slowingRadius;
            if (this._m_distance < slowingRadius) {
                desiredVelocity.setLength(forceMagnitude * arrivalMultiplier);
            }
            else {
                desiredVelocity.setLength(forceMagnitude);
            }
            let steerForce = this._m_v2_arrivalForce;
            steerForce.copy(desiredVelocity).subtract(actualVelocity);
            steerForce.limit(forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        }
        updateDebug(_dt) {
            let debugManager = this._m_debugManager;
            let sprite = this._m_self;
            let target = this._m_target;
            debugManager.drawLine(this._m_controller.getVelocity().x + sprite.x, this._m_controller.getVelocity().y + sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_14.ST_COLOR_ID.kRed);
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_14.ST_COLOR_ID.kBlack);
            debugManager.drawCircle(target.x, target.y, this._m_slowingRadius, 2, stEnums_14.ST_COLOR_ID.kPurple);
            if (this._m_distance < this._m_slowingRadius) {
                sprite.setTint(0x3D85C6);
            }
            else {
                sprite.clearTint();
            }
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            this._m_self.clearTint();
            return;
        }
        getType() {
            return stEnums_14.ST_STEER_FORCE.kArrive;
        }
        getMaxMagnitude() {
            return this._m_forceMagnitude;
        }
        setMaxMagnitude(_magnitude) {
            this._m_forceMagnitude = _magnitude;
            return;
        }
        getActualForce() {
            return this._m_v2_arrivalForce.length();
        }
        destroy() {
            this._m_controller = null;
            this._m_v2_arrivalForce = null;
            this._m_v2_desiredVelocity = null;
            this._m_debugManager = null;
            this._m_target = null;
            this._m_self = null;
            return;
        }
    }
    exports.ArrivalForce = ArrivalForce;
});
define("managers/uiManager/uiControllers/UIForceArrival", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_15, uiBox_2, uiLabel_3, uiSlider_2, UIForce_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceArrival = void 0;
    class UIForceArrival extends UIForce_1.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_2.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_3.UILabel.CreateStyleA(0, 0, _scene, "Arrive Force", 25);
            title.setTint(stEnums_15.ST_COLOR_ID.kGold);
            box.add(title);
            this._m_labelForce = uiLabel_3.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_3.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_2.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_arrival !== undefined) {
                    this._m_arrival.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_arrival !== undefined) {
                this.setForceLabel(this._m_arrival.getActualForce());
                return;
            }
            return;
        }
        setTarget(_force) {
            const arrivalForce = _force;
            this._m_arrival = arrivalForce;
            if (arrivalForce !== undefined) {
                if (_force.getType() !== stEnums_15.ST_STEER_FORCE.kArrive) {
                    throw new Error("UI Arrive Force: Incorrect force.");
                }
                this.setForceLabel(arrivalForce.getActualForce());
                this._m_forceSlider.setValue(arrivalForce.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_arrival = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceArrival = UIForceArrival;
});
define("steeringBehavior/forceEvade", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_16, master_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EvadeForce = void 0;
    class EvadeForce {
        init(_self, _target, _maxForceMagnitude) {
            this._m_self = _self.getWrappedInstance();
            this._m_target = _target.getWrappedInstance();
            this._m_controller = _self.getComponent(stEnums_16.ST_COMPONENT_ID.kForceController);
            this._m_targetController = _target.getComponent(stEnums_16.ST_COMPONENT_ID.kForceController);
            this._m_maxForceMagnitude = _maxForceMagnitude;
            this._m_desireVelocity = new Phaser.Math.Vector2();
            this._m_targetPosition = new Phaser.Math.Vector2();
            this._m_selfPosition = new Phaser.Math.Vector2();
            this._m_vDistance = new Phaser.Math.Vector2();
            this._m_targetVelocity = new Phaser.Math.Vector2();
            this._m_steerForce = new Phaser.Math.Vector2();
            this._m_debugManager = master_8.Master.GetInstance().getManager(stEnums_16.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            const target = this._m_target;
            const self = this._m_self;
            const selfController = this._m_controller;
            const targetController = this._m_targetController;
            const selfPos = this._m_selfPosition;
            selfPos.set(self.x, self.y);
            const targetPos = this._m_targetPosition;
            targetPos.set(target.x, target.y);
            const vDistance = this._m_vDistance;
            vDistance.copy(targetPos);
            vDistance.subtract(selfPos);
            const distance = vDistance.length();
            const steps = distance / selfController.getMaxSpeed();
            const targetVelocity = this._m_targetVelocity;
            targetVelocity.copy(targetController.getVelocity());
            targetVelocity.scale(steps);
            targetPos.add(targetVelocity);
            const actualVelocity = selfController.getVelocity();
            const desireVelocity = this._m_desireVelocity;
            desireVelocity.set(self.x - targetPos.x, self.y - targetPos.y);
            desireVelocity.setLength(this._m_maxForceMagnitude);
            const seekForce = this._m_steerForce;
            seekForce.copy(desireVelocity);
            seekForce.subtract(actualVelocity);
            seekForce.limit(this._m_maxForceMagnitude);
            selfController.addSteerForce(seekForce.x, seekForce.y);
            return;
        }
        updateDebug(_dt) {
            let self = this._m_self;
            let desireVelocity = this._m_desireVelocity;
            this._m_debugManager.drawLine(self.x, self.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_16.ST_COLOR_ID.kBlack);
            let actualVelocity = this._m_controller.getVelocity();
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_16.ST_COLOR_ID.kRed);
            this._m_debugManager.drawCircle(this._m_targetPosition.x, this._m_targetPosition.y, 5, 5, stEnums_16.ST_COLOR_ID.kOrange);
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getType() {
            return stEnums_16.ST_STEER_FORCE.kEvade;
        }
        getMaxMagnitude() {
            return this._m_maxForceMagnitude;
        }
        setMaxMagnitude(_maxMagnitude) {
            this._m_maxForceMagnitude = _maxMagnitude;
            return;
        }
        getActualForce() {
            return this._m_steerForce.length();
        }
        destroy() {
            this._m_controller = null;
            this._m_targetController = null;
            this._m_debugManager = null;
            this._m_desireVelocity = null;
            this._m_targetPosition = null;
            this._m_selfPosition = null;
            this._m_vDistance = null;
            this._m_targetVelocity = null;
            this._m_steerForce = null;
            this._m_target = null;
            this._m_self = null;
            return;
        }
    }
    exports.EvadeForce = EvadeForce;
});
define("steeringBehavior/forcePursue", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_17, master_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PursueForce = void 0;
    class PursueForce {
        init(_self, _target, _maxForceMagnitude) {
            this._m_self = _self.getWrappedInstance();
            this._m_target = _target.getWrappedInstance();
            this._m_controller = _self.getComponent(stEnums_17.ST_COMPONENT_ID.kForceController);
            this._m_targetController = _target.getComponent(stEnums_17.ST_COMPONENT_ID.kForceController);
            this._m_maxForceMagnitude = _maxForceMagnitude;
            this._m_desireVelocity = new Phaser.Math.Vector2();
            this._m_targetPosition = new Phaser.Math.Vector2();
            this._m_selfPosition = new Phaser.Math.Vector2();
            this._m_vDistance = new Phaser.Math.Vector2();
            this._m_targetVelocity = new Phaser.Math.Vector2();
            this._m_steerForce = new Phaser.Math.Vector2();
            this._m_debugManager = master_9.Master.GetInstance().getManager(stEnums_17.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            const target = this._m_target;
            const self = this._m_self;
            const selfController = this._m_controller;
            const targetController = this._m_targetController;
            const selfPos = this._m_selfPosition;
            selfPos.set(self.x, self.y);
            const targetPos = this._m_targetPosition;
            targetPos.set(target.x, target.y);
            const vDistance = this._m_vDistance;
            vDistance.copy(targetPos);
            vDistance.subtract(selfPos);
            const distance = vDistance.length();
            const steps = distance / selfController.getMaxSpeed();
            const targetVelocity = this._m_targetVelocity;
            targetVelocity.copy(targetController.getVelocity());
            targetVelocity.scale(steps);
            targetPos.add(targetVelocity);
            const actualVelocity = selfController.getVelocity();
            const desireVelocity = this._m_desireVelocity;
            desireVelocity.set(targetPos.x - self.x, targetPos.y - self.y);
            desireVelocity.setLength(this._m_maxForceMagnitude);
            const seekForce = this._m_steerForce;
            seekForce.copy(desireVelocity);
            seekForce.subtract(actualVelocity);
            seekForce.limit(this._m_maxForceMagnitude);
            selfController.addSteerForce(seekForce.x, seekForce.y);
            return;
        }
        updateDebug(_dt) {
            let self = this._m_self;
            let desireVelocity = this._m_desireVelocity;
            this._m_debugManager.drawLine(self.x, self.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_17.ST_COLOR_ID.kBlack);
            let actualVelocity = this._m_controller.getVelocity();
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_17.ST_COLOR_ID.kRed);
            this._m_debugManager.drawCircle(this._m_targetPosition.x, this._m_targetPosition.y, 5, 5, stEnums_17.ST_COLOR_ID.kOrange);
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getType() {
            return stEnums_17.ST_STEER_FORCE.kPursue;
        }
        getMaxMagnitude() {
            return this._m_maxForceMagnitude;
        }
        setMaxMagnitude(_maxMagnitude) {
            this._m_maxForceMagnitude = _maxMagnitude;
            return;
        }
        getActualForce() {
            return this._m_steerForce.length();
        }
        destroy() {
            this._m_controller = null;
            this._m_targetController = null;
            this._m_debugManager = null;
            this._m_desireVelocity = null;
            this._m_targetPosition = null;
            this._m_selfPosition = null;
            this._m_vDistance = null;
            this._m_targetVelocity = null;
            this._m_steerForce = null;
            this._m_target = null;
            this._m_self = null;
            return;
        }
    }
    exports.PursueForce = PursueForce;
});
define("managers/uiManager/uiControllers/UIForceEvade", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_18, uiBox_3, uiLabel_4, uiSlider_3, UIForce_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceEvade = void 0;
    class UIForceEvade extends UIForce_2.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_3.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_4.UILabel.CreateStyleA(0, 0, _scene, "Evade Force", 25);
            title.setTint(stEnums_18.ST_COLOR_ID.kGold);
            box.add(title);
            this._m_labelForce = uiLabel_4.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_4.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_3.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_evadeForce !== undefined) {
                    this._m_evadeForce.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_evadeForce !== undefined) {
                this.setForceLabel(this._m_evadeForce.getActualForce());
                return;
            }
            return;
        }
        setTarget(_force) {
            const evadeForce = _force;
            this._m_evadeForce = evadeForce;
            if (evadeForce !== undefined) {
                if (_force.getType() !== stEnums_18.ST_STEER_FORCE.kEvade) {
                    throw new Error("UI Evade Force: Incorrect force.");
                }
                this.setForceLabel(evadeForce.getActualForce());
                this._m_forceSlider.setValue(evadeForce.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_evadeForce = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceEvade = UIForceEvade;
});
define("managers/uiManager/uiControllers/UIForcePursuit", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_19, uiBox_4, uiLabel_5, uiSlider_4, UIForce_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForcePursuit = void 0;
    class UIForcePursuit extends UIForce_3.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_4.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_5.UILabel.CreateStyleA(0, 0, _scene, "Pursuit Force", 25);
            title.setTint(stEnums_19.ST_COLOR_ID.kGold);
            box.add(title);
            this._m_labelForce = uiLabel_5.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_5.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_4.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_pursuitForce !== undefined) {
                    this._m_pursuitForce.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_pursuitForce !== undefined) {
                this.setForceLabel(this._m_pursuitForce.getActualForce());
                return;
            }
            return;
        }
        setTarget(_force) {
            const pursuitForce = _force;
            this._m_pursuitForce = pursuitForce;
            if (pursuitForce !== undefined) {
                if (_force.getType() !== stEnums_19.ST_STEER_FORCE.kPursue) {
                    throw new Error("UI Pursuit Force: Incorrect force.");
                }
                this.setForceLabel(pursuitForce.getActualForce());
                this._m_forceSlider.setValue(pursuitForce.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_pursuitForce = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForcePursuit = UIForcePursuit;
});
define("steeringBehavior/forceObstacleAvoidance", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_10, stEnums_20) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObstacleAvoidanceForce = void 0;
    class ObstacleAvoidanceForce {
        init(_self, _avoidanceRadius, _obstaclesArray, _force, _controller) {
            this._m_self = _self;
            this._m_avoidanceRadius = _avoidanceRadius;
            this._m_obstaclesArray = _obstaclesArray;
            this._m_forceMagnitude = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_distanceToObstacle = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_obstacleAvoidanceForce = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_debugManager = master_10.Master.GetInstance().getManager(stEnums_20.ST_MANAGER_ID.kDebugManager);
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            let self = this._m_self;
            let obstaclesArray = this._m_obstaclesArray;
            let controller = this._m_controller;
            let actualVelocity = controller.getVelocity();
            let distanceToObstacle = this._m_v2_distanceToObstacle;
            let avoidanceRadius = this._m_avoidanceRadius;
            let forceMagnitude = this._m_forceMagnitude;
            let steerForce = this._m_v2_obstacleAvoidanceForce;
            steerForce.set(0, 0);
            obstaclesArray.forEach(obstacle => {
                this._m_distance = distanceToObstacle.set(self.x - obstacle.x, self.y - obstacle.y).length();
                if (this._m_distance < avoidanceRadius) {
                    steerForce.add(distanceToObstacle.setLength(forceMagnitude));
                }
            });
            steerForce.subtract(actualVelocity);
            steerForce.limit(this._m_forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
        }
        updateDebug(_dt) {
            let debugManager = this._m_debugManager;
            let sprite = this._m_self;
            debugManager.drawCircle(sprite.x, sprite.y, this._m_avoidanceRadius, 2, stEnums_20.ST_COLOR_ID.kPurple);
        }
        onDebugEnable() {
        }
        onDebugDisable() {
        }
        getType() {
            return stEnums_20.ST_STEER_FORCE.kObstacleAvoidance;
        }
        getMaxMagnitude() {
            return this._m_forceMagnitude;
        }
        getActualForce() {
            return this._m_v2_obstacleAvoidanceForce.length();
        }
        destroy() {
            this._m_controller = null;
            this._m_v2_obstacleAvoidanceForce = null;
            this._m_v2_distanceToObstacle = null;
            this._m_debugManager = null;
            this._m_self = null;
            this._m_obstaclesArray.forEach(obstacle => {
                obstacle = null;
            });
            this._m_obstaclesArray = null;
        }
    }
    exports.ObstacleAvoidanceForce = ObstacleAvoidanceForce;
});
define("managers/uiManager/uiControllers/UIForceObstacleAvoidance", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_21, uiBox_5, uiLabel_6, uiSlider_5, UIForce_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceObstacleAvoidance = void 0;
    class UIForceObstacleAvoidance extends UIForce_4.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_5.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_6.UILabel.CreateStyleA(0, 0, _scene, "Obstacle Avoidance Force", 20);
            title.setTint(stEnums_21.ST_COLOR_ID.kGold);
            box.add(title);
            this._m_labelForce = uiLabel_6.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_6.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_5.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_arrival !== undefined) {
                    this._m_arrival.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_obstacleAvoidance !== undefined) {
                this.setForceLabel(this._m_obstacleAvoidance.getActualForce());
                return;
            }
            return;
        }
        setTarget(_force) {
            const arrivalForce = _force;
            this._m_obstacleAvoidance = arrivalForce;
            if (arrivalForce !== undefined) {
                if (_force.getType() !== stEnums_21.ST_STEER_FORCE.kObstacleAvoidance) {
                    throw new Error("UI Obstacle Avoidance Force: Incorrect force.");
                }
                this.setForceLabel(arrivalForce.getActualForce());
                this._m_forceSlider.setValue(arrivalForce.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_obstacleAvoidance = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceObstacleAvoidance = UIForceObstacleAvoidance;
});
define("managers/uiManager/uiControllers/UIForceSeek", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_22, uiBox_6, uiLabel_7, uiSlider_6, UIForce_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceSeek = void 0;
    class UIForceSeek extends UIForce_5.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_6.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_7.UILabel.CreateStyleA(0, 0, _scene, "Seek Force", 25);
            title.setTint(stEnums_22.ST_COLOR_ID.kGold);
            this._m_title = title;
            box.add(title);
            this._m_labelForce = uiLabel_7.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_7.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_6.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_seek !== undefined) {
                    this._m_seek.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_seek !== undefined) {
                this.setForceLabel(this._m_seek.getActualForce());
            }
            return;
        }
        setTarget(_force) {
            this._m_seek = _force;
            if (this._m_seek !== undefined) {
                if (_force.getType() !== stEnums_22.ST_STEER_FORCE.kSeek) {
                    throw new Error("UI Seek Force: Incorrect force.");
                }
                this.setForceLabel(this._m_seek.getActualForce());
                this._m_forceSlider.setValue(this._m_seek.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_seek = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceSeek = UIForceSeek;
});
define("steeringBehavior/forceWander", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_11, stEnums_23) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WanderForce = void 0;
    class WanderForce {
        init(_self, _targetDistance, _circleRadius, _displacementAngle, _angleChange, _force, _controller) {
            this._m_self = _self;
            this._m_targetDistance = _targetDistance;
            this._m_circleRadius = _circleRadius;
            this._m_displacementAngle = _displacementAngle;
            this._m_angleChange = _angleChange;
            this._m_forceMagnitude = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_wanderForce = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_displacement = new Phaser.Math.Vector2(0.0, -1.0);
            this._m_v2p_circleCenter = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_debugManager = master_11.Master.GetInstance().getManager(stEnums_23.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            let self = this._m_self;
            let controller = this._m_controller;
            let direction = controller.getDirection();
            let actualVelocity = controller.getVelocity();
            let circleCenter = this._m_v2p_circleCenter;
            circleCenter.copy(direction).scale(this._m_targetDistance);
            circleCenter.set(circleCenter.x + self.x, circleCenter.y + self.y);
            let displacement = this._m_v2_displacement;
            let circleRadius = this._m_circleRadius;
            displacement.setLength(circleRadius);
            let displacementAngle = this._m_displacementAngle;
            displacement.setAngle(displacementAngle * Phaser.Math.DEG_TO_RAD);
            let changeAngle = this._m_angleChange;
            this._m_displacementAngle += Math.random() * changeAngle - changeAngle * .5;
            let forceMagnitude = this._m_forceMagnitude;
            let desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(circleCenter.x + displacement.x - self.x, circleCenter.y + displacement.y - self.y);
            desiredVelocity.setLength(forceMagnitude);
            let steerForce = this._m_v2_wanderForce;
            steerForce.copy(desiredVelocity).subtract(actualVelocity);
            steerForce.limit(forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        }
        updateDebug(_dt) {
            let debugManager = this._m_debugManager;
            let sprite = this._m_self;
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, 3, stEnums_23.ST_COLOR_ID.kPurple);
            debugManager.drawLine(this._m_controller.getVelocity().x + sprite.x, this._m_controller.getVelocity().y + sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_23.ST_COLOR_ID.kRed);
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_23.ST_COLOR_ID.kBlack);
            debugManager.drawCircle(this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, this._m_circleRadius, 2, stEnums_23.ST_COLOR_ID.kBlack);
            let displacementVector = this._m_v2_displacement;
            debugManager.drawLine(this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, this._m_v2p_circleCenter.x + displacementVector.x, this._m_v2p_circleCenter.y + displacementVector.y, 3, stEnums_23.ST_COLOR_ID.kRed);
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getType() {
            return stEnums_23.ST_STEER_FORCE.kWander;
        }
        getMaxMagnitude() {
            return this._m_forceMagnitude;
        }
        getActualForce() {
            return this._m_v2_wanderForce.length();
        }
        destroy() {
            this._m_controller = null;
            this._m_v2_wanderForce = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_v2_displacement = null;
            this._m_v2p_circleCenter = null;
            this._m_debugManager = null;
            this._m_self = null;
            return;
        }
    }
    exports.WanderForce = WanderForce;
});
define("managers/uiManager/uiControllers/UIForceWander", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_24, uiBox_7, uiLabel_8, uiSlider_7, UIForce_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceWander = void 0;
    class UIForceWander extends UIForce_6.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_7.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_8.UILabel.CreateStyleA(0, 0, _scene, "Wander Force", 25);
            title.setTint(stEnums_24.ST_COLOR_ID.kGold);
            box.add(title);
            this._m_labelForce = uiLabel_8.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_8.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_7.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_arrival !== undefined) {
                    this._m_arrival.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_wander !== undefined) {
                this.setForceLabel(this._m_wander.getActualForce());
                return;
            }
            return;
        }
        setTarget(_force) {
            const arrivalForce = _force;
            this._m_wander = arrivalForce;
            if (arrivalForce !== undefined) {
                if (_force.getType() !== stEnums_24.ST_STEER_FORCE.kWander) {
                    throw new Error("UI Wander Force: Incorrect force.");
                }
                this.setForceLabel(arrivalForce.getActualForce());
                this._m_forceSlider.setValue(arrivalForce.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_wander = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceWander = UIForceWander;
});
define("steeringBehavior/forceFollowPath", ["require", "exports", "commons/stEnums", "steeringBehavior/forceSeek", "master/master"], function (require, exports, stEnums_25, forceSeek_1, master_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FollowPathForce = void 0;
    class FollowPathForce {
        init(_self, _force, _radius, _looping) {
            this._m_self = _self;
            this._m_radius = _radius;
            this._m_v2_distance = new Phaser.Math.Vector2();
            this._m_forceToPath = new Phaser.Math.Vector2();
            this._m_prevPointPos = new Phaser.Math.Vector2();
            this._m_vToSelf = new Phaser.Math.Vector2();
            this._m_vPath = new Phaser.Math.Vector2();
            this._m_forceToPathScale = 1.0;
            const master = master_12.Master.GetInstance();
            this._m_debugManager = master.getManager(stEnums_25.ST_MANAGER_ID.kDebugManager);
            if (_looping !== undefined) {
                this._m_looping = _looping;
            }
            else {
                this._m_looping = false;
            }
            const seek = new forceSeek_1.SeekForce();
            this._m_seek = seek;
            seek.init(_self.getWrappedInstance(), undefined, _force);
            this.setStartNode(undefined);
            return;
        }
        update(_dt) {
            let activeNode = this._m_activeNode;
            if (activeNode !== undefined) {
                const self = this._m_self.getWrappedInstance();
                const target = activeNode.getWrappedInstance();
                const vDistance = this._m_v2_distance;
                vDistance.set(target.x - self.x, target.y - self.y);
                const distance = vDistance.length();
                if (distance <= this._m_radius) {
                    const nextNode = activeNode.getNext();
                    if (nextNode === undefined) {
                        if (this._m_looping) {
                            this._setActiveNode(this._m_startNode);
                            activeNode = this._m_startNode;
                        }
                        else {
                            this._setActiveNode(undefined);
                            activeNode = undefined;
                        }
                    }
                    else {
                        this._setActiveNode(nextNode);
                        activeNode = nextNode;
                    }
                }
                if (activeNode !== undefined) {
                    this._m_seek.update(_dt);
                    const vPath = this._m_vPath;
                    const prevNodePos = this._m_prevPointPos;
                    const nodeSprite = activeNode.getWrappedInstance();
                    vPath.set(nodeSprite.x - prevNodePos.x, nodeSprite.y - prevNodePos.y);
                    const toSelf = this._m_vToSelf;
                    toSelf.set(self.x - prevNodePos.x, self.y - prevNodePos.y);
                    const projMagnitude = toSelf.dot(vPath) / vPath.length();
                    const forceToPath = this._m_forceToPath;
                    forceToPath.copy(vPath);
                    forceToPath.setLength(projMagnitude);
                    forceToPath.subtract(toSelf);
                    forceToPath.scale(this._m_forceToPathScale);
                    this._m_controller.addSteerForce(forceToPath.x, forceToPath.y);
                }
            }
            return;
        }
        updateDebug(_dt) {
            this._m_seek.updateDebug(_dt);
            const self = this._m_self.getWrappedInstance();
            const actualVelocity = this._m_controller.getVelocity();
            const forceToPath = this._m_forceToPath;
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + actualVelocity.x + forceToPath.x, self.y + actualVelocity.y + forceToPath.y, 2, stEnums_25.ST_COLOR_ID.kYellow);
            this._m_debugManager.drawCircle(self.x, self.y, this._m_radius, 1, stEnums_25.ST_COLOR_ID.kWhite);
            return;
        }
        setController(_controller) {
            this._m_controller = _controller;
            this._m_seek.setController(_controller);
            return;
        }
        onDebugEnable() {
            this._m_seek.onDebugEnable();
            return;
        }
        onDebugDisable() {
            this._m_seek.onDebugDisable();
            return;
        }
        getType() {
            return stEnums_25.ST_STEER_FORCE.kFollowPath;
        }
        setMaxMagnitude(_magnitude) {
            this._m_seek.setMaxMagnitude(_magnitude);
            return;
        }
        getMaxMagnitude() {
            const seekMag = this._m_seek.getMaxMagnitude();
            const pathMag = this._m_forceToPath.length();
            return (seekMag > pathMag ? seekMag : pathMag);
        }
        setForceToPathScale(_scale) {
            this._m_forceToPathScale = _scale;
            return;
        }
        getForceToPathScale() {
            return this._m_forceToPathScale;
        }
        getActualForce() {
            return this._m_seek.getActualForce();
        }
        setStartNode(_startNode) {
            this._m_startNode = _startNode;
            this._setActiveNode(_startNode);
            return;
        }
        setVisionRadius(_radius) {
            this._m_radius = _radius;
            return;
        }
        getVisionRadius() {
            return this._m_radius;
        }
        reset() {
            this._setActiveNode(this._m_startNode);
            return;
        }
        destroy() {
            this._m_self = null;
            this._m_startNode = null;
            this._m_debugManager = null;
            this._m_seek.destroy();
            this._m_v2_distance = null;
            this._m_prevPointPos = null;
            this._m_vToSelf = null;
            this._m_vPath = null;
            this._m_forceToPath = null;
            return;
        }
        _setActiveNode(_node) {
            if (_node !== undefined) {
                const nodeSprite = _node.getWrappedInstance();
                if (this._m_activeNode === undefined) {
                    this._m_prevPointPos.set(nodeSprite.x, nodeSprite.y);
                }
                else {
                    const activeNodeSprite = this._m_activeNode.getWrappedInstance();
                    this._m_prevPointPos.set(activeNodeSprite.x, activeNodeSprite.y);
                }
                this._m_activeNode = _node;
                this._m_seek.setTarget(_node.getWrappedInstance());
            }
            else {
                this._m_prevPointPos.set(0.0, 0.0);
                this._m_activeNode = undefined;
                this._m_seek.setTarget(undefined);
            }
            return;
        }
    }
    exports.FollowPathForce = FollowPathForce;
});
define("managers/uiManager/uiControllers/UIForceFollowPath", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_26, uiBox_8, uiLabel_9, uiSlider_8, UIForce_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceFollowPath = void 0;
    class UIForceFollowPath extends UIForce_7.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_8.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_9.UILabel.CreateStyleA(0, 0, _scene, "Follow Path", 25);
            title.setTint(stEnums_26.ST_COLOR_ID.kGold);
            this._m_title = title;
            box.add(title);
            this._m_labelForce = uiLabel_9.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_9.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_8.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceFollowPath", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_followPath !== undefined) {
                    this._m_followPath.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            const visionLabel = uiLabel_9.UILabel.CreateStyleB(0, 0, _scene, "#");
            this._m_visionLabel = visionLabel;
            box.add(visionLabel);
            this._m_visionSlider = new uiSlider_8.UISlider(0, 0, _scene, 10, 50);
            this._m_visionSlider.subscribe("valueChanged", "UIForceFollowPath", function (_sender, _args) {
                const slider = _sender;
                const vision = slider.getValue();
                this.setVisionRadiusLabel(vision);
                if (this._m_followPath !== undefined) {
                    this._m_followPath.setVisionRadius(vision);
                }
                return;
            }, this);
            box.add(this._m_visionSlider);
            const forcePathLabel = uiLabel_9.UILabel.CreateStyleB(0, 0, _scene, "Force to Path Scale");
            this._m_forceToPathLabel = forcePathLabel;
            box.add(forcePathLabel);
            this._m_forceToPathSlider = new uiSlider_8.UISlider(0, 0, _scene, 1, 10);
            this._m_forceToPathSlider.subscribe("valueChanged", "UIForceFollowPath", function (_sender, _args) {
                const slider = _sender;
                const scale = slider.getValue();
                this.setForceToPathScaleLabel(scale);
                if (this._m_followPath !== undefined) {
                    this._m_followPath.setForceToPathScale(scale);
                }
                return;
            }, this);
            box.add(this._m_forceToPathSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_followPath !== undefined) {
                this.setForceLabel(this._m_followPath.getActualForce());
            }
            return;
        }
        setTarget(_force) {
            this._m_followPath = _force;
            if (this._m_followPath !== undefined) {
                if (_force.getType() !== stEnums_26.ST_STEER_FORCE.kFollowPath) {
                    throw new Error("UI Follow Path Force: Incorrect force.");
                }
                this.setForceLabel(this._m_followPath.getActualForce());
                this._m_forceSlider.setValue(this._m_followPath.getMaxMagnitude());
                this._m_forceToPathSlider.setValue(this._m_followPath.getForceToPathScale());
                this._m_visionSlider.setValue(this._m_followPath.getVisionRadius());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceToPathScaleLabel(_scale) {
            this._m_forceToPathLabel.setText("Force to Path Scale: " + _scale.toFixed(2) + " units.");
            return;
        }
        setVisionRadiusLabel(_vision) {
            this._m_visionLabel.setText("Radius of Vision: " + _vision.toFixed(2) + " km. ");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_followPath = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceFollowPath = UIForceFollowPath;
});
define("steeringBehavior/forceConstant", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_27, master_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForceConstant = void 0;
    class ForceConstant {
        init(_self, _forceDirection, _forceMagnitude, _isRelative, _controller) {
            this._m_self = _self;
            if (_controller !== undefined) {
                this._m_controller = _controller;
            }
            if (_isRelative !== undefined) {
                this._m_isRelative = _isRelative;
            }
            else {
                this._m_isRelative = false;
            }
            this._m_forceDirection = _forceDirection.normalize();
            this._m_desireVelocity = new Phaser.Math.Vector2();
            this._m_steerForce = new Phaser.Math.Vector2();
            this._m_forceMaxMagnitude = _forceMagnitude;
            const master = master_13.Master.GetInstance();
            this._m_debugManager = master.getManager(stEnums_27.ST_MANAGER_ID.kDebugManager);
            return;
        }
        setMaxMagnitude(_magnitude) {
            this._m_forceMaxMagnitude = _magnitude;
            return;
        }
        getMaxMagnitude() {
            return this._m_forceMaxMagnitude;
        }
        getActualForce() {
            return this._m_steerForce.length();
        }
        setController(_controller) {
            this._m_controller = _controller;
            return;
        }
        update(_dt) {
            const self = this._m_self;
            const forceController = this._m_controller;
            const actualDirection = forceController.getDirection();
            const forceDirection = this._m_forceDirection;
            const desireVelocity = this._m_desireVelocity;
            if (this._m_isRelative) {
                const angle = forceDirection.angle();
                desireVelocity.copy(actualDirection);
                desireVelocity.rotate(angle);
            }
            else {
                desireVelocity.copy(forceDirection);
            }
            desireVelocity.setLength(this._m_forceMaxMagnitude);
            const steerForce = this._m_steerForce;
            steerForce.copy(desireVelocity);
            const actualVelocity = forceController.getVelocity();
            steerForce.subtract(actualVelocity);
            steerForce.limit(this._m_forceMaxMagnitude);
            forceController.addSteerForce(steerForce.x, steerForce.y);
            return;
        }
        updateDebug(_dt) {
            let self = this._m_self;
            let desireVelocity = this._m_desireVelocity;
            this._m_debugManager.drawLine(self.x, self.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_27.ST_COLOR_ID.kBlack);
            let actualVelocity = this._m_controller.getVelocity();
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_27.ST_COLOR_ID.kRed);
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        getType() {
            return stEnums_27.ST_STEER_FORCE.kConstant;
        }
        setRelative() {
            this._m_isRelative = true;
            return;
        }
        setAbsolute() {
            this._m_isRelative = false;
            return;
        }
        isRelative() {
            return this._m_isRelative;
        }
        destroy() {
            this._m_controller = null;
            this._m_desireVelocity = null;
            this._m_forceDirection = null;
            this._m_self = null;
            this._m_debugManager = null;
            return;
        }
    }
    exports.ForceConstant = ForceConstant;
});
define("managers/uiManager/uiControllers/UIForceConstant", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, stEnums_28, uiBox_9, uiLabel_10, uiSlider_9, UIForce_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceConstant = void 0;
    class UIForceConstant extends UIForce_8.UIForce {
        constructor(_scene) {
            super();
            const box = uiBox_9.UIBox.CreateForceBox(0, 0, _scene);
            this._m_box = box;
            const title = uiLabel_10.UILabel.CreateStyleA(0, 0, _scene, "Constant Force", 25);
            title.setTint(stEnums_28.ST_COLOR_ID.kGold);
            this._m_title = title;
            box.add(title);
            this._m_labelForce = uiLabel_10.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_labelForce);
            this._m_maxMagnitude = uiLabel_10.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(this._m_maxMagnitude);
            this._m_forceSlider = new uiSlider_9.UISlider(0, 0, _scene, 1, 300);
            this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                const slider = _sender;
                const maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_force !== undefined) {
                    this._m_force.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, this);
            box.add(this._m_forceSlider);
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_force !== undefined) {
                this.setForceLabel(this._m_force.getActualForce());
            }
            return;
        }
        setTarget(_force) {
            this._m_force = _force;
            if (this._m_force !== undefined) {
                if (_force.getType() !== stEnums_28.ST_STEER_FORCE.kConstant) {
                    throw new Error("UI Constant Force: Incorrect force.");
                }
                this.setForceLabel(this._m_force.getActualForce());
                this._m_forceSlider.setValue(this._m_force.getMaxMagnitude());
            }
            return;
        }
        setMaximumMagnitudeLabel(_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        }
        setForceLabel(_force) {
            this._m_labelForce.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        }
        getBox() {
            return this._m_box;
        }
        destroy() {
            this._m_box.destroy();
            this._m_force = undefined;
            super.destroy();
            return;
        }
    }
    exports.UIForceConstant = UIForceConstant;
});
define("managers/uiManager/uiControllers/UIForceController", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiComboBox", "managers/uiManager/uiImage", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiSpeedometer", "managers/uiManager/uiControllers/UIController", "managers/uiManager/uiControllers/UIForceArrival", "managers/uiManager/uiControllers/UIForceEvade", "managers/uiManager/uiControllers/UIForcePursuit", "managers/uiManager/uiControllers/UIForceObstacleAvoidance", "managers/uiManager/uiControllers/UIForceSeek", "managers/uiManager/uiControllers/UIForceWander", "managers/uiManager/uiControllers/UIForceFollowPath", "managers/uiManager/uiControllers/UIForceConstant"], function (require, exports, stEnums_29, uiBox_10, uiComboBox_2, uiImage_1, uiLabel_11, uiSlider_10, uiSpeedometer_1, UIController_1, UIForceArrival_1, UIForceEvade_1, UIForcePursuit_1, UIForceObstacleAvoidance_1, UIForceSeek_1, UIForceWander_1, UIForceFollowPath_1, UIForceConstant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceController = void 0;
    class UIForceController extends UIController_1.UIController {
        constructor(_x, _y, _scene, _target) {
            super();
            const box = uiBox_10.UIBox.CreateBorderBox(_x, _y, _scene);
            this._ui_box = box;
            box.setElementsGap(7.5);
            const actorName = uiLabel_11.UILabel.CreateStyleA(0, 0, _scene, "", 32);
            this._ui_actorName = actorName;
            actorName.setTint(stEnums_29.ST_COLOR_ID.kGold);
            box.add(actorName);
            box.add(new uiImage_1.UIImage(0, 0, _scene, "game_art", "separator_a.png"));
            const speedometer = new uiSpeedometer_1.UISpeedometer(0, 0, _scene);
            this._ui_speedometer = speedometer;
            box.add(speedometer);
            this._ui_actualSpeed = uiLabel_11.UILabel.CreateStyleB(0, 0, _scene, "#");
            this._ui_actualSpeed.setTint(stEnums_29.ST_COLOR_ID.kSkyBlueNeon);
            box.add(this._ui_actualSpeed);
            this._ui_maxSpeed = uiLabel_11.UILabel.CreateStyleB(0, 0, _scene, "#");
            this._ui_maxSpeed.setTint(stEnums_29.ST_COLOR_ID.kSkyBlueNeon);
            box.add(this._ui_maxSpeed);
            this._ui_maxSpeedSlider = new uiSlider_10.UISlider(0, 0, _scene, 1, 300);
            box.add(this._ui_maxSpeedSlider);
            this._ui_maxSpeedSlider.subscribe("valueChanged", "label", function (_sender, _args) {
                const slider = _sender;
                const maxSpeed = slider.getValue();
                this.setMaxSpeed(maxSpeed);
                if (this._m_forceController !== undefined) {
                    this._m_forceController.setMaxSpeed(maxSpeed);
                }
                return;
            }, this);
            this._ui_mass = uiLabel_11.UILabel.CreateStyleB(0, 0, _scene, "#");
            this._ui_mass.setTint(stEnums_29.ST_COLOR_ID.kSkyBlueNeon);
            box.add(this._ui_mass);
            this._ui_massSlider = new uiSlider_10.UISlider(0, 0, _scene, 1, 10);
            box.add(this._ui_massSlider);
            this._ui_massSlider.subscribe("valueChanged", "label", function (_sender, _args) {
                const slider = _sender;
                const mass = slider.getValue();
                this.setMass(mass);
                if (this._m_forceController !== undefined) {
                    this._m_forceController.setMass(mass);
                }
                return;
            }, this);
            const steerTitle = uiLabel_11.UILabel.CreateStyleB(0, 0, _scene, "Steer Force", 25);
            box.add(steerTitle);
            box.add(new uiImage_1.UIImage(0, 0, _scene, "game_art", "separator_a.png"));
            steerTitle.setTint(stEnums_29.ST_COLOR_ID.kGold);
            const selectForce = uiLabel_11.UILabel.CreateStyleB(0, 0, _scene, "Select Steer Force");
            selectForce.setTint(stEnums_29.ST_COLOR_ID.kSkyBlueNeon);
            box.add(selectForce);
            const comboBox = new uiComboBox_2.UIComboBox(0, 0, _scene);
            this._ui_forceComboBox = comboBox;
            comboBox.updateCombo(undefined);
            box.add(comboBox);
            comboBox.subscribe("selectionChanged", "UIController", this._onForceComboBoxChanged, this);
            box.setLeftAlignment();
            const hUIForce = new Map();
            this._m_aUIForce = hUIForce;
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kSeek, new UIForceSeek_1.UIForceSeek(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kArrive, new UIForceArrival_1.UIForceArrival(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kPursue, new UIForcePursuit_1.UIForcePursuit(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kEvade, new UIForceEvade_1.UIForceEvade(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kWander, new UIForceWander_1.UIForceWander(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kObstacleAvoidance, new UIForceObstacleAvoidance_1.UIForceObstacleAvoidance(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kFollowPath, new UIForceFollowPath_1.UIForceFollowPath(_scene));
            this._addUIForce(stEnums_29.ST_STEER_FORCE.kConstant, new UIForceConstant_1.UIForceConstant(_scene));
            this.setTarget(undefined);
            return;
        }
        update() {
            if (this._m_forceController !== undefined) {
                this.setActualSpeed(this._m_forceController.getSpeed());
                const activeUIForce = this._m_activeUIForce;
                if (activeUIForce !== undefined) {
                    activeUIForce.update();
                }
            }
            this._updateSpeedometer();
            return;
        }
        setTarget(_actor) {
            if (_actor === undefined) {
                this._m_target = undefined;
                this._m_forceController = undefined;
                this.disableUI();
                this.setActiveForce(undefined);
                return;
            }
            this._m_target = _actor;
            const forceController = _actor.getComponent(stEnums_29.ST_COMPONENT_ID.kForceController);
            this._m_forceController = forceController;
            this.setActorName(_actor.getName());
            this._ui_massSlider.setValue(forceController.getMass());
            this._ui_maxSpeedSlider.setValue(forceController.getMaxSpeed());
            this._updateForceComboBox(forceController);
            this._ui_box.updateBox();
            return;
        }
        disableUI() {
            this.setActorName("");
            this.setActualSpeed(0);
            this.setMaxSpeed(0);
            this.setMass(0);
            this._ui_forceComboBox.updateCombo(undefined);
            return;
        }
        setActorName(_name) {
            this._ui_actorName.setText(_name);
            return;
        }
        setActualSpeed(_speed) {
            this._ui_actualSpeed.setText("Speed: " + _speed.toPrecision(3) + " km/secs. ");
            return;
        }
        setMaxSpeed(_speed) {
            this._ui_maxSpeed.setText("Max. Speed: " + _speed.toPrecision(3) + " km/secs. ");
            return;
        }
        setMass(_mass) {
            this._ui_mass.setText("Mass: " + _mass.toPrecision(3) + " tg.");
            return;
        }
        setActiveForce(_force) {
            let activeForce = this._m_activeUIForce;
            if (activeForce !== undefined) {
                activeForce.getBox().disable();
                this._m_activeUIForce = undefined;
            }
            if (_force !== undefined) {
                activeForce = this._m_aUIForce.get(_force.getType());
                if (activeForce === undefined) {
                    console.error("UI Force does not exists.");
                    this._m_activeUIForce = undefined;
                    return;
                }
                activeForce.getBox().enable();
                activeForce.setTarget(_force);
                this._m_activeUIForce = activeForce;
            }
            ;
            this._ui_box.updateBox();
            return;
        }
        destroy() {
            this._m_target = undefined;
            this._m_forceController = undefined;
            this._ui_box.destroy();
            super.destroy();
            return;
        }
        _updateForceComboBox(_forceController) {
            const hForces = _forceController.getForces();
            const aForceName = new Array();
            hForces.forEach(function (_value, _name) {
                aForceName.push(_name);
            });
            this._ui_forceComboBox.updateCombo(aForceName);
            this._ui_forceComboBox.selectFirstOption();
            return;
        }
        _addUIForce(_type, _uiForce) {
            const box = _uiForce.getBox();
            this._ui_box.add(box);
            box.disable();
            this._m_aUIForce.set(_type, _uiForce);
            return;
        }
        _onForceComboBoxChanged(_object, _option) {
            if (_option !== undefined) {
                const forceName = _option;
                if (forceName !== "") {
                    const forceController = this._m_forceController;
                    if (forceController !== undefined) {
                        this.setActiveForce(forceController.getForce(forceName));
                        return;
                    }
                }
            }
            this.setActiveForce(undefined);
            return;
        }
        _updateSpeedometer() {
            const forceController = this._m_forceController;
            if (forceController !== undefined) {
                const t = forceController.getSpeed() / forceController.getMaxSpeed();
                this._ui_speedometer.updatePointerAngle(-180.0 * (1 - t));
            }
            else {
                this._ui_speedometer.updatePointerAngle(180.0);
            }
            return;
        }
    }
    exports.UIForceController = UIForceController;
});
define("managers/uiManager/uiGroup", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIGroup = void 0;
    class UIGroup extends uiObject_10.UIObject {
        constructor() {
            super();
            this._isEnable = true;
            this._m_aObjects = new Array();
            return;
        }
        add(_object) {
            this._m_aObjects.push(_object);
            return;
        }
        remove(_object) {
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                this._m_aObjects[i] === _object;
                this._m_aObjects.splice(i, 1);
                return;
            }
            return;
        }
        getWidth() {
            return 0;
        }
        getHeight() {
            return 0;
        }
        getX() {
            return 0;
        }
        getY() {
            return 0;
        }
        getZ() {
            return 0;
        }
        move(_x, _y) {
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                aObjects[i].move(_x, _y);
            }
            return;
        }
        setPosition(_x, _y) {
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                aObjects[i].setPosition(_x, _y);
            }
            return;
        }
        setAnchor(_x, _y) {
            const aObjects = this._m_aObjects;
            const size = aObjects.length;
            for (let i = 0; i < size; ++i) {
                aObjects[i].setAnchor(_x, _y);
            }
            return;
        }
        getAnchorX() {
            return 0;
        }
        getAnchorY() {
            return 0;
        }
        enable() {
            this._m_aObjects.forEach(function (_object) {
                _object.enable();
                return;
            });
            this._isEnable = true;
            return;
        }
        disable() {
            this._m_aObjects.forEach(function (_object) {
                _object.disable();
                return;
            });
            this._isEnable = false;
            return;
        }
        isEnable() {
            return this._isEnable;
        }
        destroy() {
            const aObject = this._m_aObjects;
            while (aObject.length) {
                let object = aObject.pop();
                object.destroy();
                return;
            }
            this._m_aObjects = null;
            super.destroy();
            return;
        }
    }
    exports.UIGroup = UIGroup;
});
define("managers/uiManager/uiControllers/UISimulationController", ["require", "exports", "commons/stEnums", "master/master", "managers/uiManager/uiGroup", "managers/uiManager/uiControllers/UIController"], function (require, exports, stEnums_30, master_14, uiGroup_1, UIController_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISimulationController = void 0;
    class UISimulationController extends UIController_2.UIController {
        constructor() {
            super();
            this._m_group = new uiGroup_1.UIGroup();
            return;
        }
        static CreateSimControlBox(_mapScene) {
            const simControlBox = new UISimulationController();
            simControlBox.m_master = master_14.Master.GetInstance();
            simControlBox._m_simulationManager
                = simControlBox.m_master.getManager(stEnums_30.ST_MANAGER_ID.kSimManager);
            const uiGroup = simControlBox._m_group;
            const stopButton = _mapScene.getObject("simStop");
            uiGroup.add(stopButton);
            stopButton.subscribe("buttonReleased", "UISimController", simControlBox._onSimulationStop, simControlBox);
            const playButton = _mapScene.getObject("simPlay");
            uiGroup.add(playButton);
            playButton.subscribe("buttonReleased", "UISimController", simControlBox._onSimulationPlay, simControlBox);
            const pauseButton = _mapScene.getObject("simPause");
            uiGroup.add(pauseButton);
            pauseButton.subscribe("buttonReleased", "UISimController", simControlBox._onSimulationPause, simControlBox);
            const debugButton = _mapScene.getObject("simDebug");
            uiGroup.add(debugButton);
            debugButton.subscribe("buttonReleased", "UISimController", simControlBox._onDebug, simControlBox);
            return simControlBox;
        }
        destroy() {
            this._m_simulationManager = null;
            this._m_group.destroy();
            this._m_group = null;
            super.destroy();
            return;
        }
        _onSimulationPause() {
            if (this._m_simulationManager.getState() === stEnums_30.ST_SIM_SATE.kRunning) {
                this.m_master.pauseSimulation();
            }
            return;
        }
        _onSimulationPlay() {
            const state = this._m_simulationManager.getState();
            if (state === stEnums_30.ST_SIM_SATE.kStopped) {
                this.m_master.startSimulation();
            }
            else if (state === stEnums_30.ST_SIM_SATE.kPaused) {
                this.m_master.resumeSimulation();
            }
            return;
        }
        _onSimulationStop() {
            if (this._m_simulationManager.getState() !== stEnums_30.ST_SIM_SATE.kStopped) {
                this.m_master.stopSimulation();
            }
            return;
        }
        _onDebug() {
            if (this.m_master.isDebugEnable()) {
                this.m_master.disableDebugging();
            }
            else {
                this.m_master.enableDebugging();
            }
            return;
        }
    }
    exports.UISimulationController = UISimulationController;
});
define("factories/uiSceneFactory", ["require", "exports", "gameScene/mapScene", "managers/uiManager/uiControllers/UIForceController", "managers/uiManager/uiControllers/UISimulationController", "master/master"], function (require, exports, mapScene_1, UIForceController_1, UISimulationController_1, master_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SceneUIFactory = void 0;
    class SceneUIFactory {
        static CreateSimulationUIScene(_uiSceneKey, _scene, _uiManager) {
            const uiMap = mapScene_1.MapScene.CreateFromTiledMap(_uiSceneKey, _scene);
            const uiForceController = new UIForceController_1.UIForceController(20, 20, _scene);
            _uiManager.addUIController("forceUI", uiForceController);
            const uiSimController = UISimulationController_1.UISimulationController.CreateSimControlBox(uiMap);
            _uiManager.addUIController("mediaSimUI", uiSimController);
            const mainMenuButton = uiMap.getObject("menuButton");
            mainMenuButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                const master = master_15.Master.GetInstance();
                const scene = master.getSimulationScene();
                master.onSimulationSceneDestroy(scene);
                scene.scene.start('main_menu');
                return;
            }, uiMap);
            return uiMap;
        }
    }
    exports.SceneUIFactory = SceneUIFactory;
});
define("managers/uiManager/uiText", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIText = void 0;
    class UIText extends uiObject_11.UIObject {
        constructor(_x, _y, _scene, _text, _fontKey, _fontSize, _maxWidth) {
            super();
            this._m_listenerManager.addEvent("textChanged");
            const text = _scene.add.bitmapText(_x, _y, _fontKey, _text, _fontSize);
            this._m_text = text;
            text.setMaxWidth(_maxWidth);
            return;
        }
        static CreateStyleA(_x, _y, _scene, _text, _fontSize, _maxWidth) {
            let fontSize = 20;
            if (_fontSize !== undefined) {
                fontSize = _fontSize;
            }
            let maxWidth = 250;
            if (_maxWidth !== undefined) {
                maxWidth = _maxWidth;
            }
            const text = new UIText(_x, _y, _scene, _text, "supercomputer", fontSize, maxWidth);
            return text;
        }
        static CreateStyleB(_x, _y, _scene, _text, _fontSize, _maxWidth) {
            let fontSize = 20;
            if (_fontSize !== undefined) {
                fontSize = _fontSize;
            }
            let maxWidth = 250;
            if (_maxWidth !== undefined) {
                maxWidth = _maxWidth;
            }
            const text = new UIText(_x, _y, _scene, _text, "odin_rounded", fontSize, maxWidth);
            return text;
        }
        getWidth() {
            return this._m_text.width;
        }
        getHeight() {
            return this._m_text.height;
        }
        getX() {
            return this._m_text.x;
        }
        getY() {
            return this._m_text.y;
        }
        getZ() {
            return this._m_text.depth;
        }
        move(_x, _y) {
            this._m_text.x += _x;
            this._m_text.y += _y;
            return;
        }
        setPosition(_x, _y) {
            this._m_text.setPosition(_x, _y);
            return;
        }
        setAnchor(_x, _y) {
            this._m_text.setOrigin(_x, _y);
            return;
        }
        getAnchorX() {
            return this._m_text.originX;
        }
        getAnchorY() {
            return this._m_text.originY;
        }
        enable() {
            this._m_text.setVisible(true);
            this._m_text.setActive(true);
            return;
        }
        disable() {
            this._m_text.setVisible(false);
            this._m_text.setActive(false);
            return;
        }
        setMaxWidth(_width) {
            this._m_text.setMaxWidth(_width);
            return;
        }
        setText(_text) {
            this._m_text.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        }
        setTint(_color) {
            this._m_text.setTint(_color);
            return;
        }
        leftAlign() {
            this._m_text.setLeftAlign();
            return;
        }
        rightAlign() {
            this._m_text.setRightAlign();
            return;
        }
        centerAlign() {
            this._m_text.setCenterAlign();
            return;
        }
        destroy() {
            this._m_text.destroy();
            super.destroy();
            return;
        }
    }
    exports.UIText = UIText;
});
define("managers/uiManager/uiControllers/UIDialogBox", ["require", "exports", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiControllers/UIController"], function (require, exports, uiBox_11, uiLabel_12, UIController_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIDialogBox = void 0;
    class UIDialogBox extends UIController_3.UIController {
        constructor(_x, _y, _scene, _title) {
            super();
            const box = uiBox_11.UIBox.CreateBorderBoxB(_x, _y, _scene);
            this._m_box = box;
            const title = uiLabel_12.UILabel.CreateH1(0, 0, _scene, _title);
            this._m_title = title;
            box.add(title);
            box.setCenterAlignment();
            return;
        }
        setTitle(_title) {
            this._m_title.setText(_title);
            this._m_box.updateBox();
            return;
        }
        open() {
            this._m_box.enable();
            return;
        }
        close() {
            this._m_box.disable();
            return;
        }
        destroy() {
            this._m_box.destroy();
            this._m_box = null;
            this._m_title = null;
            super.destroy();
            return;
        }
    }
    exports.UIDialogBox = UIDialogBox;
});
define("managers/uiManager/uiControllers/UIMessageBox", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiButton", "managers/uiManager/uiButtonImg", "managers/uiManager/uiText", "managers/uiManager/uiControllers/UIDialogBox"], function (require, exports, stEnums_31, uiBox_12, uiButton_2, uiButtonImg_2, uiText_1, UIDialogBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIMessageBox = void 0;
    class UIMessageBox extends UIDialogBox_1.UIDialogBox {
        constructor(_x, _y, _scene, _title, _message) {
            super(_x, _y, _scene, _title);
            const message = uiText_1.UIText.CreateStyleB(0, 0, _scene, _message);
            this._m_message = message;
            this._m_box.add(message);
            return;
        }
        static CreateAccept(_x, _y, _scene, _title, _message, _callback, _context) {
            const messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);
            const buttonsBox = uiBox_12.UIBox.CreateContentBoxB(0, 0, _scene);
            buttonsBox.setElementsGap(0);
            const accept = uiButton_2.UIButton.CreateThemeButton(_x, _y, _scene, "Accept");
            accept.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_31.ST_BUTTON.kAccept);
                return;
            }, messageBox);
            buttonsBox.add(accept);
            messageBox._m_box.add(buttonsBox);
            messageBox._m_fn = _callback;
            messageBox._m_context = _context;
            return messageBox;
        }
        static CreateYesNo(_x, _y, _scene, _title, _message, _callback, _context) {
            const messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);
            const buttonsBox = uiBox_12.UIBox.CreateContentBoxB(0, 0, _scene);
            buttonsBox.setHorizontalBox();
            const butYes = uiButtonImg_2.UIButtonImg.CreateYesButtonImg(_x, _y, _scene);
            butYes.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_31.ST_BUTTON.kYes);
                return;
            }, messageBox);
            buttonsBox.add(butYes);
            const butNo = uiButtonImg_2.UIButtonImg.CreateNoButtonImg(_x, _y, _scene);
            butNo.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_31.ST_BUTTON.kNo);
                return;
            }, messageBox);
            buttonsBox.add(butNo);
            messageBox._m_box.add(buttonsBox);
            messageBox._m_fn = _callback;
            messageBox._m_context = _context;
            return messageBox;
        }
        setMessage(_msg) {
            this._m_message.setText(_msg);
            this._m_box.updateBox();
            return;
        }
        destroy() {
            this._m_message.destroy();
            this._m_message = null;
            super.destroy();
            return;
        }
    }
    exports.UIMessageBox = UIMessageBox;
});
define("scenes/sims/sceneSeek", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "gameScene/mapScene", "master/master", "steeringBehavior/forceConstant", "steeringBehavior/forceSeek"], function (require, exports, stEnums_32, shipFactory_1, uiSceneFactory_1, mapScene_2, master_16, forceConstant_1, forceSeek_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnSeek = void 0;
    class ScnSeek extends Phaser.Scene {
        create() {
            this._m_master = master_16.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            const ambienceMap = mapScene_2.MapScene.CreateFromTiledMap("ambience_01", this);
            ambienceMap.clear();
            ambienceMap.destroy();
            let simManager = master.getManager(stEnums_32.ST_MANAGER_ID.kSimManager);
            const blueShip = shipFactory_1.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(blueShip);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            const targetActor = shipFactory_1.ShipFactory.CreateRedShip(this, "Red Ship");
            simManager.addActor(targetActor);
            const targetFController = targetActor.getComponent(stEnums_32.ST_COMPONENT_ID.kForceController);
            const constantForce = new forceConstant_1.ForceConstant();
            constantForce.init(targetActor.getWrappedInstance(), new Phaser.Math.Vector2(0.4, 0.85), 300, true);
            targetFController.addForce("constant", constantForce);
            targetActor.sendMessage(stEnums_32.ST_MESSAGE_ID.kSetMass, 3.0);
            targetActor.sendMessage(stEnums_32.ST_MESSAGE_ID.kSetMaxSpeed, 300);
            targetActor.sendMessage(stEnums_32.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.5, 0.5));
            targetActor.sendMessage(stEnums_32.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            let seek = new forceSeek_2.SeekForce();
            seek.init(blueShip.getWrappedInstance(), targetActor.getWrappedInstance(), 125);
            let forceControl = blueShip.getComponent(stEnums_32.ST_COMPONENT_ID.kForceController);
            forceControl.addForce('seek_1', seek);
            const uiManager = master.getManager(stEnums_32.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_1.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(blueShip);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScnSeek = ScnSeek;
});
define("scenes/sims/sceneArrival", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceArrival"], function (require, exports, stEnums_33, shipFactory_2, uiSceneFactory_2, master_17, forceArrival_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnArrival = void 0;
    class ScnArrival extends Phaser.Scene {
        create() {
            this._m_master = master_17.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_33.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            let shipActor = shipFactory_2.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(shipActor);
            shipActor.sendMessage(stEnums_33.ST_MESSAGE_ID.kSetSpeed, 75);
            shipActor.sendMessage(stEnums_33.ST_MESSAGE_ID.kSetMaxSpeed, 75);
            shipActor.sendMessage(stEnums_33.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            let targetActor = shipFactory_2.ShipFactory.CreateRedShip(this, "Red Ship");
            simManager.addActor(targetActor);
            targetActor.sendMessage(stEnums_33.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            targetActor.sendMessage(stEnums_33.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            let arrival = new forceArrival_1.ArrivalForce();
            arrival.init(shipActor.getWrappedInstance(), targetActor.getWrappedInstance(), 100, 100);
            let shipController = shipActor.getComponent(stEnums_33.ST_COMPONENT_ID.kForceController);
            shipController.addForce('arrival_1', arrival);
            const uiManager = master.getManager(stEnums_33.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_2.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(shipActor);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScnArrival = ScnArrival;
});
define("scenes/sims/sceneWander", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceWander"], function (require, exports, stEnums_34, shipFactory_3, uiSceneFactory_3, master_18, forceWander_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnWander = void 0;
    class ScnWander extends Phaser.Scene {
        create() {
            this._m_master = master_18.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_34.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            let shipActor = shipFactory_3.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(shipActor);
            shipActor.sendMessage(stEnums_34.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            let wander = new forceWander_1.WanderForce();
            wander.init(shipActor.getWrappedInstance(), 75, 25, 5, 45, 100);
            let shipController = shipActor.getComponent(stEnums_34.ST_COMPONENT_ID.kForceController);
            shipController.addForce('wander_1', wander);
            const uiManager = master.getManager(stEnums_34.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_3.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(shipActor);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScnWander = ScnWander;
});
define("scenes/sims/sceneEvade", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceEvade", "steeringBehavior/forceSeek"], function (require, exports, stEnums_35, shipFactory_4, uiSceneFactory_4, master_19, forceEvade_1, forceSeek_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SceneEvade = void 0;
    class SceneEvade extends Phaser.Scene {
        create() {
            this._m_master = master_19.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_35.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            const targetActor = shipFactory_4.ShipFactory.CreateRedShip(this, "Red Ship");
            simManager.addActor(targetActor);
            const targetFController = targetActor.getComponent(stEnums_35.ST_COMPONENT_ID.kForceController);
            targetActor.sendMessage(stEnums_35.ST_MESSAGE_ID.kSetMass, 3.0);
            targetActor.sendMessage(stEnums_35.ST_MESSAGE_ID.kSetMaxSpeed, 300);
            targetActor.sendMessage(stEnums_35.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.5, 0.5));
            targetActor.sendMessage(stEnums_35.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.75, height * 0.5));
            const blueShip = shipFactory_4.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(blueShip);
            const blueFController = blueShip.getComponent(stEnums_35.ST_COMPONENT_ID.kForceController);
            const evadeForce = new forceEvade_1.EvadeForce();
            evadeForce.init(blueShip, targetActor, 150);
            blueFController.addForce("evade", evadeForce);
            const redSeek = new forceSeek_3.SeekForce();
            redSeek.init(targetActor.getWrappedInstance(), blueShip.getWrappedInstance(), 150);
            targetFController.addForce("seek", redSeek);
            const uiManager = master.getManager(stEnums_35.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_4.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(blueShip);
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.SceneEvade = SceneEvade;
});
define("scenes/sims/sceneObstacleAvoidance", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceObstacleAvoidance", "steeringBehavior/forceWander"], function (require, exports, stEnums_36, shipFactory_5, uiSceneFactory_5, master_20, forceObstacleAvoidance_1, forceWander_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnObstacleAvoidance = void 0;
    class ScnObstacleAvoidance extends Phaser.Scene {
        create() {
            this._m_master = master_20.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_36.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            let shipActor = shipFactory_5.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(shipActor);
            shipActor.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            let obstacleActor0 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle0');
            let obstacleActor1 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle1');
            let obstacleActor2 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle2');
            let obstacleActor3 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle3');
            let obstacleActor4 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle4');
            let obstacleActor5 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle5');
            let obstacleActor6 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle6');
            let obstacleActor7 = shipFactory_5.ShipFactory.CreateRedShip(this, 'obstacle7');
            simManager.addActor(obstacleActor0);
            simManager.addActor(obstacleActor1);
            simManager.addActor(obstacleActor2);
            simManager.addActor(obstacleActor3);
            simManager.addActor(obstacleActor4);
            simManager.addActor(obstacleActor5);
            simManager.addActor(obstacleActor6);
            simManager.addActor(obstacleActor7);
            obstacleActor0.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor1.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor2.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor3.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor4.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor5.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor6.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor7.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor0.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.35));
            obstacleActor1.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.35));
            obstacleActor2.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.45));
            obstacleActor3.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.45));
            obstacleActor4.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.55));
            obstacleActor5.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.55));
            obstacleActor6.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.65));
            obstacleActor7.sendMessage(stEnums_36.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.65));
            let obstaclesArray = new Array(obstacleActor0.getWrappedInstance(), obstacleActor1.getWrappedInstance(), obstacleActor2.getWrappedInstance(), obstacleActor3.getWrappedInstance(), obstacleActor4.getWrappedInstance(), obstacleActor5.getWrappedInstance(), obstacleActor6.getWrappedInstance(), obstacleActor7.getWrappedInstance());
            let obstacleAvoidance = new forceObstacleAvoidance_1.ObstacleAvoidanceForce();
            let obstacleWander0 = new forceWander_2.WanderForce();
            let obstacleWander1 = new forceWander_2.WanderForce();
            let obstacleWander2 = new forceWander_2.WanderForce();
            let obstacleWander3 = new forceWander_2.WanderForce();
            let obstacleWander4 = new forceWander_2.WanderForce();
            let obstacleWander5 = new forceWander_2.WanderForce();
            let obstacleWander6 = new forceWander_2.WanderForce();
            let obstacleWander7 = new forceWander_2.WanderForce();
            obstacleAvoidance.init(shipActor.getWrappedInstance(), 100, obstaclesArray, 100);
            obstacleWander0.init(obstacleActor0.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander1.init(obstacleActor1.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander2.init(obstacleActor2.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander3.init(obstacleActor3.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander4.init(obstacleActor4.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander5.init(obstacleActor5.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander6.init(obstacleActor6.getWrappedInstance(), 50, 25, 5, 45, 100);
            obstacleWander7.init(obstacleActor7.getWrappedInstance(), 50, 25, 5, 45, 100);
            let shipController = shipActor.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle0Controller = obstacleActor0.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle1Controller = obstacleActor1.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle2Controller = obstacleActor2.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle3Controller = obstacleActor3.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle4Controller = obstacleActor4.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle5Controller = obstacleActor5.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle6Controller = obstacleActor6.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            let obstacle7Controller = obstacleActor7.getComponent(stEnums_36.ST_COMPONENT_ID.kForceController);
            shipController.addForce('obstacleAvoidance_1', obstacleAvoidance);
            obstacle0Controller.addForce('obstacleWander_0', obstacleWander0);
            obstacle1Controller.addForce('obstacleWander_1', obstacleWander1);
            obstacle2Controller.addForce('obstacleWander_2', obstacleWander2);
            obstacle3Controller.addForce('obstacleWander_3', obstacleWander3);
            obstacle4Controller.addForce('obstacleWander_4', obstacleWander4);
            obstacle5Controller.addForce('obstacleWander_5', obstacleWander5);
            obstacle6Controller.addForce('obstacleWander_6', obstacleWander6);
            obstacle7Controller.addForce('obstacleWander_7', obstacleWander7);
            const uiManager = master.getManager(stEnums_36.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_5.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(shipActor);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScnObstacleAvoidance = ScnObstacleAvoidance;
});
define("steeringBehavior/forceFlee", ["require", "exports", "commons/stEnums", "steeringBehavior/forceSeek"], function (require, exports, stEnums_37, forceSeek_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FleeForce = void 0;
    class FleeForce extends forceSeek_4.SeekForce {
        update(_dt) {
            let target = this._m_target;
            let self = this._m_self;
            let forceController = this._m_controller;
            let actualVelocity = forceController.getVelocity();
            let desireVelocity = this._m_desireVelocity;
            desireVelocity.set(self.x - target.x, self.y - target.y);
            desireVelocity.setLength(this._m_seekMaxLength);
            let seekForce = this._m_seekForce;
            seekForce.copy(desireVelocity);
            seekForce.subtract(actualVelocity);
            seekForce.limit(this._m_seekMaxLength);
            forceController.addSteerForce(seekForce.x, seekForce.y);
            return;
        }
        getType() {
            return stEnums_37.ST_STEER_FORCE.kFlee;
        }
    }
    exports.FleeForce = FleeForce;
});
define("scenes/sims/sceneFlee", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceFlee"], function (require, exports, stEnums_38, shipFactory_6, uiSceneFactory_6, master_21, forceFlee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnFlee = void 0;
    class ScnFlee extends Phaser.Scene {
        create() {
            this._m_master = master_21.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_38.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            let shipActor = shipFactory_6.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(shipActor);
            shipActor.sendMessage(stEnums_38.ST_MESSAGE_ID.kSetSpeed, 75);
            shipActor.sendMessage(stEnums_38.ST_MESSAGE_ID.kSetMaxSpeed, 75);
            shipActor.sendMessage(stEnums_38.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            let targetActor = shipFactory_6.ShipFactory.CreateRedShip(this, "Red Ship");
            simManager.addActor(targetActor);
            targetActor.sendMessage(stEnums_38.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            targetActor.sendMessage(stEnums_38.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            let flee = new forceFlee_1.FleeForce();
            flee.init(shipActor.getWrappedInstance(), targetActor.getWrappedInstance(), 100);
            let shipController = shipActor.getComponent(stEnums_38.ST_COMPONENT_ID.kForceController);
            shipController.addForce('flee_1', flee);
            const uiManager = master.getManager(stEnums_38.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_6.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(shipActor);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScnFlee = ScnFlee;
});
define("scenes/sims/scenePursuit", ["require", "exports", "commons/stEnums", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceConstant", "steeringBehavior/forcePursue"], function (require, exports, stEnums_39, shipFactory_7, uiSceneFactory_7, master_22, forceConstant_2, forcePursue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScenePursuit = void 0;
    class ScenePursuit extends Phaser.Scene {
        create() {
            this._m_master = master_22.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            let simManager = master.getManager(stEnums_39.ST_MANAGER_ID.kSimManager);
            let canvas = this.game.canvas;
            let width = canvas.width;
            let height = canvas.height;
            const targetActor = shipFactory_7.ShipFactory.CreateRedShip(this, "Red Ship");
            simManager.addActor(targetActor);
            const targetFController = targetActor.getComponent(stEnums_39.ST_COMPONENT_ID.kForceController);
            const constantForce = new forceConstant_2.ForceConstant();
            constantForce.init(targetActor.getWrappedInstance(), new Phaser.Math.Vector2(0.4, 0.85), 300, true);
            targetFController.addForce("constant", constantForce);
            targetActor.sendMessage(stEnums_39.ST_MESSAGE_ID.kSetMass, 3.0);
            targetActor.sendMessage(stEnums_39.ST_MESSAGE_ID.kSetMaxSpeed, 300);
            targetActor.sendMessage(stEnums_39.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.5, 0.5));
            targetActor.sendMessage(stEnums_39.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            const blueShip = shipFactory_7.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(blueShip);
            const blueFController = blueShip.getComponent(stEnums_39.ST_COMPONENT_ID.kForceController);
            const pursuitForce = new forcePursue_1.PursueForce();
            pursuitForce.init(blueShip, targetActor, 300);
            blueFController.addForce("pursuit", pursuitForce);
            const uiManager = master.getManager(stEnums_39.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_7.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(blueShip);
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.ScenePursuit = ScenePursuit;
});
define("factories/ambienceFactory", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpInteractiveActor", "components/cmpSpriteController"], function (require, exports, baseActor_2, stEnums_40, cmpforceController_2, cmpInteractiveActor_2, cmpSpriteController_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AmbienceFactory = void 0;
    class AmbienceFactory {
        static CreateSatellite(_x, _y, _scene, _name) {
            let sprite = _scene.add.sprite(0, 0, 'game_art', 'Bomb_3_Idle_000.png');
            let actor = baseActor_2.BaseActor.Create(sprite, _name);
            actor.addComponent(new cmpSpriteController_2.CmpSpriteController());
            actor.addComponent(new cmpforceController_2.CmpForceController());
            actor.addComponent(new cmpInteractiveActor_2.cmpInteractiveActor());
            actor.init();
            actor.sendMessage(stEnums_40.ST_MESSAGE_ID.kPlayAnimation, "satellite_a");
            actor.sendMessage(stEnums_40.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(_x, _y));
            return actor;
        }
    }
    exports.AmbienceFactory = AmbienceFactory;
});
define("scenes/sims/sceneFollowPath", ["require", "exports", "commons/stEnums", "factories/ambienceFactory", "factories/shipFactory", "factories/uiSceneFactory", "master/master", "steeringBehavior/forceFollowPath"], function (require, exports, stEnums_41, ambienceFactory_1, shipFactory_8, uiSceneFactory_8, master_23, forceFollowPath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SceneFollowPath = void 0;
    class SceneFollowPath extends Phaser.Scene {
        create() {
            this._m_master = master_23.Master.GetInstance();
            let master = this._m_master;
            master.onSimulationSceneCreate(this);
            const simManager = master.getManager(stEnums_41.ST_MANAGER_ID.kSimManager);
            const blueShip = shipFactory_8.ShipFactory.CreateBlueShip(this, "Blue Ship");
            simManager.addActor(blueShip);
            const canvas = this.game.canvas;
            const hWidth = canvas.width * 0.5;
            const hHeight = canvas.height * 0.5;
            let startNode = undefined;
            let prevNode = undefined;
            const t = (Phaser.Math.PI2 / 10);
            for (let i = 0; i < 10; ++i) {
                const node = ambienceFactory_1.AmbienceFactory.CreateSatellite(hWidth + (Math.sin(t * i) * 200), hHeight + (Math.cos(t * i) * 200), this, "Satellite_" + i.toString());
                if (prevNode === undefined) {
                    startNode = node;
                    prevNode = node;
                }
                else {
                    prevNode.setNext(node);
                    node.setPrevious(prevNode);
                    prevNode = node;
                }
            }
            const followPath = new forceFollowPath_1.FollowPathForce();
            followPath.init(blueShip, 150, 15, true);
            followPath.setStartNode(startNode);
            const blueShipFController = blueShip.getComponent(stEnums_41.ST_COMPONENT_ID.kForceController);
            blueShipFController.addForce("Follow Path", followPath);
            const uiManager = master.getManager(stEnums_41.ST_MANAGER_ID.kUIManager);
            uiSceneFactory_8.SceneUIFactory.CreateSimulationUIScene("simulation_ui", this, uiManager);
            uiManager.setTarget(blueShip);
            this._m_master.enableDebugging();
            return;
        }
        update(_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        }
    }
    exports.SceneFollowPath = SceneFollowPath;
});
define("game_init", ["require", "exports", "phaser3-nineslice", "scenes/preload", "scenes/boot", "scenes/mainMenu", "scenes/sims/sceneSeek", "scenes/sims/sceneArrival", "scenes/sims/sceneWander", "scenes/sims/sceneEvade", "scenes/sims/sceneObstacleAvoidance", "scenes/sims/sceneFlee", "scenes/sims/scenePursuit", "scenes/sims/sceneFollowPath"], function (require, exports, phaser3_nineslice_1, preload_1, boot_1, mainMenu_1, sceneSeek_1, sceneArrival_1, sceneWander_1, sceneEvade_1, sceneObstacleAvoidance_1, sceneFlee_1, scenePursuit_1, sceneFollowPath_1) {
    "use strict";
    class GameInit {
        constructor() { }
        start() {
            var config = {
                type: Phaser.WEBGL,
                scale: {
                    parent: 'phaser-game',
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    mode: Phaser.Scale.FIT
                },
                width: 1024,
                height: 768,
                input: {
                    gamepad: true
                },
                plugins: {
                    global: [phaser3_nineslice_1.Plugin.DefaultCfg],
                },
                backgroundColor: 0x0b032b
            };
            this.m_game = new Phaser.Game(config);
            this.m_game.scene.add('boot', boot_1.Boot);
            this.m_game.scene.add('preload', preload_1.Preload);
            this.m_game.scene.add('main_menu', mainMenu_1.MainMenu);
            this.m_game.scene.add('sceneSeek', sceneSeek_1.ScnSeek);
            this.m_game.scene.add('sceneFlee', sceneFlee_1.ScnFlee);
            this.m_game.scene.add('sceneArrival', sceneArrival_1.ScnArrival);
            this.m_game.scene.add('scenePursuit', scenePursuit_1.ScenePursuit);
            this.m_game.scene.add('sceneEvade', sceneEvade_1.SceneEvade);
            this.m_game.scene.add('sceneWander', sceneWander_1.ScnWander);
            this.m_game.scene.add('sceneFollowPath', sceneFollowPath_1.SceneFollowPath);
            this.m_game.scene.add('sceneObstacleAvoidance', sceneObstacleAvoidance_1.ScnObstacleAvoidance);
            this.m_game.scene.start('boot');
            return;
        }
    }
    return GameInit;
});
define("managers/ambienceManager/ambienceManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_42) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AmbienceManager = void 0;
    class AmbienceManager {
        init() {
            return;
        }
        update(_dt) {
            return;
        }
        receive(_id, _msg) {
            return;
        }
        setMasterManager(_master) {
            this._m_master = _master;
            return;
        }
        getID() {
            return stEnums_42.ST_MANAGER_ID.kAmbienceManager;
        }
        onPrepare() {
            return;
        }
        onSimulationSceneCreate(_scene) {
            return;
        }
        onSimulationSceneDestroy(_scene) {
            return;
        }
        onSimulationStart() {
            return;
        }
        onSimulationPause() {
            return;
        }
        onSimulationResume() {
            return;
        }
        onSimulationStop() {
            return;
        }
        onDebugEnable() {
            return;
        }
        onDebugDisable() {
            return;
        }
        destroy() {
            this._m_master = null;
            return;
        }
    }
    exports.AmbienceManager = AmbienceManager;
});
define("managers/uiManager/uiSwitch", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISwitch = void 0;
    class UISwitch extends uiObject_12.UIObject {
        constructor(_x, _y, _scene, _isActive = true) {
            super();
            this._m_listenerManager.addEvent('toggleOn');
            this._m_listenerManager.addEvent('toggleOff');
            const button = _scene.add.image(_x, _y, "game_art", "toggle_off.png");
            button.setInteractive();
            button.on('pointerdown', this._onClick, this);
            this._m_button = button;
            if (_isActive) {
                this.setOn();
            }
            else {
                this.setOff();
            }
            return;
        }
        setOn() {
            this._m_button.setFrame("toggle_on.png");
            this._isActive = true;
            this._m_listenerManager.call('toggleOn', this, undefined);
            return;
        }
        setOff() {
            this._m_button.setFrame("toggle_off.png");
            this._isActive = false;
            this._m_listenerManager.call('toggleOff', this, undefined);
            return;
        }
        isActive() {
            return this._isActive;
        }
        getWidth() {
            return this._m_button.width;
        }
        getHeight() {
            return this._m_button.height;
        }
        getZ() {
            return this._m_button.depth;
        }
        move(_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            return;
        }
        setPosition(_x, _y) {
            this._m_button.setPosition(_x, _y);
            return;
        }
        destroy() {
            this._m_button.destroy();
            this.destroy();
            return;
        }
        _onClick() {
            if (this._isActive) {
                this.setOff();
            }
            else {
                this.setOn();
            }
            return;
        }
    }
    exports.UISwitch = UISwitch;
});
//# sourceMappingURL=steeringApp.js.map