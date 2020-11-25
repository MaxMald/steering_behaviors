var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("commons/stTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("scenes/preload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Preload = void 0;
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preload.prototype.preload = function () {
            this.load.path = "./game/assets/";
            this.load.image('space_ship', 'images/space_ship.png');
            this.load.image('button', 'images/button.png');
            this.load.image('niceButton', 'images/niceButton.png');
            this.load.atlas('game_art', "images/game_art/game_art.png", "images/game_art/game_art.js");
            this.load.bitmapFont('odin_rounded', 'images/odin_rounded_bitmapfont.png', 'images/odin_rounded_bitmapfont.xml');
            this.load.bitmapFont('supercomputer', 'images/supercomputer_bitmapfont.png', 'images/supercomputer_bitmapfont.xml');
            var hWidth = this.game.canvas.width * 0.5;
            var hHeight = this.game.canvas.height * 0.5;
            this.add.image(hWidth, hHeight, 'loading_bg');
            var spaceShip = this.add.image(hWidth, 300, "loading_ui", "loading_ship.png");
            this.add.tween({
                targets: spaceShip,
                y: 250,
                ease: "Quad.easeInOut",
                duration: 3000,
                yoyo: true,
                repeat: -1
            });
            var barBG = this.add.image(hWidth, hHeight + 100, "loading_ui", "loading_bar_bg.png");
            this.loadingBarBG = barBG;
            var bar = this.add.image(hWidth, hHeight + 100, "loading_ui", "loading_bar.png");
            bar.scaleX = 0.0;
            this.loadingBar = bar;
            var start = this.add.image(hWidth, hHeight + 100, "loading_ui", "start_button.png");
            start.setInteractive();
            start.on("pointerdown", this.onClickStart, this);
            start.on("pointerover", this.onOverStart, this);
            start.on("pointerout", this.onOutStart, this);
            start.setVisible(false);
            start.setActive(false);
            this.startButton = start;
            this.load.on('progress', this.updateBar, this);
            this.load.on('complete', this.onComplete, this);
            return;
        };
        Preload.prototype.updateBar = function () {
            this.loadingBarBG.scaleX = this.load.progress;
            return;
        };
        Preload.prototype.onComplete = function () {
            this.loadingBar.setVisible(false);
            this.loadingBar.setActive(false);
            this.loadingBarBG.setVisible(false);
            this.loadingBarBG.setActive(false);
            this.startButton.setVisible(true);
            this.startButton.setActive(true);
            return;
        };
        Preload.prototype.onClickStart = function () {
            this.scene.start('main_menu');
            return;
        };
        Preload.prototype.onOverStart = function () {
            this.startButton.setScale(1.0, 1.0);
            return;
        };
        Preload.prototype.onOutStart = function () {
            this.startButton.setScale(0.8, 0.8);
            return;
        };
        return Preload;
    }(Phaser.Scene));
    exports.Preload = Preload;
});
define("commons/stEnums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ST_STEER_FORCE = exports.ST_BUTTON = exports.ST_TEXT_TYPE = exports.ST_COLOR_ID = exports.ST_MESSAGE_ID = exports.ST_COMPONENT_ID = exports.ST_MANAGER_ID = void 0;
    exports.ST_MANAGER_ID = Object.freeze({
        kUndefined: -1,
        kSimManager: 1,
        kUIManager: 2,
        kDebugManager: 3
    });
    exports.ST_COMPONENT_ID = Object.freeze({
        kUndefined: -1,
        kForceController: 1,
        kSpriteController: 2
    });
    exports.ST_MESSAGE_ID = Object.freeze({
        kMove: 1,
        kSetPosition: 2,
        kSetScale: 3,
        kSetAngle: 4,
        kSetSpeed: 5,
        kSetMass: 6,
        kSetMaxSpeed: 7
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
        kObstacleAvoidance: 5,
        kFollowPath: 6
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
    var DebugManager = (function () {
        function DebugManager() {
        }
        DebugManager.Create = function () {
            var manager = new DebugManager();
            return manager;
        };
        DebugManager.prototype.init = function () {
            this._m_line = new Phaser.Geom.Line();
            return;
        };
        DebugManager.prototype.update = function (_dt) {
            if (this._m_graphic !== null) {
                this._m_graphic.clear();
            }
            return;
        };
        DebugManager.prototype.receive = function (_id, _msg) {
            return;
        };
        DebugManager.prototype.drawLine = function (_x1, _y1, _x2, _y2, _lineWidth, _color, _alpha) {
            if (_lineWidth === void 0) { _lineWidth = 1; }
            if (_color === void 0) { _color = 0x000000; }
            if (_alpha === void 0) { _alpha = 1; }
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_line.setTo(_x1, _y1, _x2, _y2);
            this._m_graphic.strokeLineShape(this._m_line);
            return;
        };
        DebugManager.prototype.drawCircle = function (_center_x, _center_y, _radius, _lineWidth, _color, _alpha) {
            if (_lineWidth === void 0) { _lineWidth = 1; }
            if (_color === void 0) { _color = 0x000000; }
            if (_alpha === void 0) { _alpha = 1; }
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeCircle(_center_x, _center_y, _radius);
            return;
        };
        DebugManager.prototype.drawRectangle = function (_x, _y, _width, _height, _lineWidth, _color, _alpha) {
            if (_lineWidth === void 0) { _lineWidth = 1; }
            if (_color === void 0) { _color = 0x000000; }
            if (_alpha === void 0) { _alpha = 1; }
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeRect(_x, _y, _width, _height);
            return;
        };
        DebugManager.prototype.drawTriangle = function (_x1, _y1, _x2, _y2, _x3, _y3, _lineWidth, _color, _alpha) {
            if (_lineWidth === void 0) { _lineWidth = 1; }
            if (_color === void 0) { _color = 0x000000; }
            if (_alpha === void 0) { _alpha = 1; }
            this._m_graphic.lineStyle(_lineWidth, _color, _alpha);
            this._m_graphic.strokeTriangle(_x1, _y1, _x2, _y2, _x3, _y3);
            return;
        };
        DebugManager.prototype.setMasterManager = function (_master) {
            this._m_master = _master;
            return;
        };
        DebugManager.prototype.getID = function () {
            return stEnums_1.ST_MANAGER_ID.kDebugManager;
        };
        DebugManager.prototype.onPrepare = function () {
            return;
        };
        DebugManager.prototype.onSimulationSceneCreate = function (_scene) {
            this._m_scene = _scene;
            this._m_graphic = _scene.add.graphics();
            this._m_graphic.setDepth(1000);
            return;
        };
        DebugManager.prototype.onSimulationSceneDestroy = function (_scene) {
            this._m_scene = null;
            this._m_graphic.destroy();
            return;
        };
        DebugManager.prototype.onSimulationStart = function () {
            return;
        };
        DebugManager.prototype.onSimulationPause = function () {
            return;
        };
        DebugManager.prototype.onSimulationResume = function () {
            return;
        };
        DebugManager.prototype.onSimulationStop = function () {
            return;
        };
        DebugManager.prototype.onDebugEnable = function () {
            return;
        };
        DebugManager.prototype.onDebugDisable = function () {
            return;
        };
        DebugManager.prototype.destroy = function () {
            if (this._m_graphic != null) {
                this._m_graphic.destroy();
                this._m_graphic = null;
            }
            this._m_master = null;
            this._m_scene = null;
            this._m_line = null;
            return;
        };
        return DebugManager;
    }());
    exports.DebugManager = DebugManager;
});
define("managers/nullManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullManager = void 0;
    var NullManager = (function () {
        function NullManager() {
        }
        NullManager.prototype.setMasterManager = function (_master) {
            console.warn('Null Manager : setMaster');
            return;
        };
        NullManager.prototype.getID = function () {
            console.warn('Null Manager : getID');
            return stEnums_2.ST_MANAGER_ID.kUndefined;
        };
        NullManager.prototype.onPrepare = function () {
            console.warn('Null Manager : onPrepare');
            return;
        };
        NullManager.prototype.init = function () {
            console.warn('Null Manager : init');
            return;
        };
        NullManager.prototype.update = function (_dt) {
            console.warn('Null Manager : update');
            return;
        };
        NullManager.prototype.receive = function (_id, _msg) {
            console.warn('Null Manager : receive');
            return;
        };
        NullManager.prototype.onSimulationSceneCreate = function (_scene) {
            console.warn('Null Manager : onGameSceneCreate');
            return;
        };
        NullManager.prototype.onSimulationSceneDestroy = function (_scene) {
            console.warn('Null Manager : onGameSceneDestroy');
            return;
        };
        NullManager.prototype.onSimulationStart = function () {
            console.warn('Null Manager : onSimulationStart');
            return;
        };
        NullManager.prototype.onSimulationPause = function () {
            console.warn('Null Manager : onSimulationPause');
            return;
        };
        NullManager.prototype.onSimulationResume = function () {
            console.warn('Null Manager : onSimulationResume');
            return;
        };
        NullManager.prototype.onSimulationStop = function () {
            console.warn('Null Manager : onSimulationShutdown');
            return;
        };
        NullManager.prototype.onDebugEnable = function () {
            console.warn('Null Manager : onDebugEnable');
            return;
        };
        NullManager.prototype.onDebugDisable = function () {
            console.warn('Null Manager : onDebugDisable');
            return;
        };
        NullManager.prototype.destroy = function () {
            console.warn('Null Manager : destroy');
            return;
        };
        return NullManager;
    }());
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
    var BaseActor = (function () {
        function BaseActor() {
        }
        BaseActor.Create = function (_instance, _name) {
            var actor = new BaseActor();
            actor._m_components = new Array();
            actor._m_instance = _instance;
            actor.m_name = _name;
            return actor;
        };
        BaseActor.prototype.init = function () {
            var index = 0;
            var components = this._m_components;
            var length = components.length;
            while (index < length) {
                components[index].init(this);
                ++index;
            }
            return;
        };
        BaseActor.prototype.update = function () {
            var components = this._m_components;
            components.forEach(this._updateComponent, this);
            return;
        };
        BaseActor.prototype.sendMessage = function (_id, _obj) {
            var index = 0;
            var aComponent = this._m_components;
            var size = aComponent.length;
            while (index < size) {
                if (aComponent[index] != null) {
                    aComponent[index].receive(_id, _obj);
                }
                ++index;
            }
            return;
        };
        BaseActor.prototype.getWrappedInstance = function () {
            return this._m_instance;
        };
        BaseActor.prototype.addComponent = function (_component) {
            if (this.hasComponent(_component.getID())) {
                this.removeComponent(_component.getID());
            }
            this._m_components.push(_component);
            return;
        };
        BaseActor.prototype.getComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    return this._m_components[index];
                }
                ++index;
            }
            throw new Error("Component of index : " + _id.toString() + " not founded");
        };
        BaseActor.prototype.removeComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    this._m_components.splice(index, 1);
                    return;
                }
                ++index;
            }
            return;
        };
        BaseActor.prototype.hasComponent = function (_id) {
            var index = 0;
            var length = this._m_components.length;
            while (index < length) {
                if (this._m_components[index].getID() == _id) {
                    return true;
                }
                ++index;
            }
            return false;
        };
        BaseActor.prototype.onSimulationStart = function () {
            this._m_components.forEach(this._cmpSimulationStart, this);
            return;
        };
        BaseActor.prototype.onSimulationPause = function () {
            this._m_components.forEach(this._cmpSimulationPause, this);
            return;
        };
        BaseActor.prototype.onSimulationResume = function () {
            this._m_components.forEach(this._cmpSimulationResume, this);
            return;
        };
        BaseActor.prototype.onSimulationStop = function () {
            this._m_components.forEach(this._cmpSimulationStop, this);
            return;
        };
        BaseActor.prototype.onDebugEnable = function () {
            this._m_components.forEach(this._cmpDebugEnable, this);
            return;
        };
        BaseActor.prototype.onDebugDisable = function () {
            this._m_components.forEach(this._cmpDebugDisable, this);
            return;
        };
        BaseActor.prototype.getName = function () {
            return this.m_name;
        };
        BaseActor.prototype.destroy = function () {
            var component;
            while (this._m_components.length) {
                component = this._m_components.pop();
                component.destroy();
            }
            return;
        };
        BaseActor.prototype._updateComponent = function (_component) {
            _component.update(this);
            return;
        };
        BaseActor.prototype._cmpDebugEnable = function (_component) {
            _component.onDebugEnable();
            return;
        };
        BaseActor.prototype._cmpDebugDisable = function (_component) {
            _component.onDebugDisable();
            return;
        };
        BaseActor.prototype._cmpSimulationStart = function (_component) {
            _component.onSimulationStart();
            return;
        };
        BaseActor.prototype._cmpSimulationPause = function (_component) {
            _component.onSimulationPause();
            return;
        };
        BaseActor.prototype._cmpSimulationResume = function (_component) {
            _component.onSimulationResume();
            return;
        };
        BaseActor.prototype._cmpSimulationStop = function (_component) {
            _component.onSimulationStart();
            return;
        };
        return BaseActor;
    }());
    exports.BaseActor = BaseActor;
});
define("managers/simulationManager/simulationManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimulationManager = void 0;
    var SimulationManager = (function () {
        function SimulationManager() {
        }
        SimulationManager.Create = function () {
            var manager = new SimulationManager();
            return manager;
        };
        SimulationManager.prototype.init = function () {
            return;
        };
        SimulationManager.prototype.update = function (_dt) {
            this._m_actors.forEach(this._updateActor, this);
            return;
        };
        SimulationManager.prototype.receive = function (_id, _msg) {
            return;
        };
        SimulationManager.prototype.sendMessage = function (_id, _msg) {
            this._m_actors.forEach(function (_actor) {
                _actor.sendMessage(_id, _msg);
                return;
            }, this);
            return;
        };
        SimulationManager.prototype.setMasterManager = function (_master) {
            this._m_master = _master;
            return;
        };
        SimulationManager.prototype.getID = function () {
            return stEnums_3.ST_MANAGER_ID.kSimManager;
        };
        SimulationManager.prototype.getBaseActor = function (_name) {
            if (this._m_actors.has(_name)) {
                var baseActor = this._m_actors.get(_name);
                if (baseActor !== null) {
                    return baseActor;
                }
                else {
                    console.error('Could not cast base actor');
                    return null;
                }
            }
            throw new Error("Could not find actor with name : " + _name);
        };
        SimulationManager.prototype.addActor = function (_actor) {
            if (this._m_actors.has(_actor.getName())) {
                console.warn('An actor with name : '
                    + _actor.getName()
                    + ' had been replaced in the simulation manager.');
            }
            this._m_actors.set(_actor.getName(), _actor);
            return;
        };
        SimulationManager.prototype.onPrepare = function () {
            this._m_actors = new Map();
            return;
        };
        SimulationManager.prototype.onSimulationSceneCreate = function (_scene) {
            return;
        };
        SimulationManager.prototype.onSimulationSceneDestroy = function (_scene) {
            this.clear();
            return;
        };
        SimulationManager.prototype.onSimulationStart = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationStart();
                return;
            });
            return;
        };
        SimulationManager.prototype.onSimulationPause = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationPause();
                return;
            });
            return;
        };
        SimulationManager.prototype.onSimulationResume = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationResume();
                return;
            });
            return;
        };
        SimulationManager.prototype.onSimulationStop = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.onSimulationStop();
                return;
            });
            return;
        };
        SimulationManager.prototype.onDebugEnable = function () {
            this._m_actors.forEach(this._actorDebugEnable, this);
            return;
        };
        SimulationManager.prototype.onDebugDisable = function () {
            this._m_actors.forEach(this._actorDebugDisable, this);
            return;
        };
        SimulationManager.prototype.clear = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.destroy();
                return;
            });
            this._m_actors.clear();
            return;
        };
        SimulationManager.prototype.destroy = function () {
            this.clear();
            this._m_actors = null;
            return;
        };
        SimulationManager.prototype._updateActor = function (_actor) {
            _actor.update();
            return;
        };
        SimulationManager.prototype._actorDebugEnable = function (_actor) {
            _actor.onDebugEnable();
            return;
        };
        SimulationManager.prototype._actorDebugDisable = function (_actor) {
            _actor.onDebugDisable();
            return;
        };
        return SimulationManager;
    }());
    exports.SimulationManager = SimulationManager;
});
define("managers/uiManager/uiControllers/UIController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIController = void 0;
    var UIController = (function () {
        function UIController() {
        }
        UIController.prototype.update = function () {
            return;
        };
        UIController.prototype.setTarget = function (_actor) {
            return;
        };
        UIController.prototype.onSimulationStart = function () {
            return;
        };
        UIController.prototype.onSimulationPause = function () {
            return;
        };
        UIController.prototype.onSimulationResume = function () {
            return;
        };
        UIController.prototype.onSimulationStop = function () {
            return;
        };
        UIController.prototype.setMasterManager = function (_masterManager) {
            this.m_master = _masterManager;
            return;
        };
        UIController.prototype.setUIManager = function (_uiManager) {
            this.m_uiManager = _uiManager;
            return;
        };
        UIController.prototype.destroy = function () {
            this.m_master = undefined;
            this.m_uiManager = undefined;
            return;
        };
        return UIController;
    }());
    exports.UIController = UIController;
});
define("managers/uiManager/uiManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIManager = void 0;
    var UIManager = (function () {
        function UIManager() {
            return;
        }
        UIManager.Create = function () {
            return new UIManager();
        };
        UIManager.prototype.init = function () {
            this._m_aControllers = new Map();
            this.m_target = undefined;
            return;
        };
        UIManager.prototype.update = function (_dt) {
            this._m_aControllers.forEach(this._updateController);
            return;
        };
        UIManager.prototype.receive = function (_id, _msg) {
            return;
        };
        UIManager.prototype.setMasterManager = function (_master) {
            this._m_master = _master;
            return;
        };
        UIManager.prototype.getID = function () {
            return stEnums_4.ST_MANAGER_ID.kUIManager;
        };
        UIManager.prototype.onPrepare = function () {
            return;
        };
        UIManager.prototype.onSimulationSceneCreate = function (_scene) {
            return;
        };
        UIManager.prototype.onSimulationSceneDestroy = function (_scene) {
            this._m_aControllers.forEach(function (_controller) {
                _controller.destroy();
                return;
            });
            this._m_aControllers.clear();
            this.m_target = undefined;
            return;
        };
        UIManager.prototype.onSimulationStart = function () {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationStart();
                return;
            });
            return;
        };
        UIManager.prototype.onSimulationPause = function () {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationPause();
                return;
            });
            return;
        };
        UIManager.prototype.onSimulationResume = function () {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationResume();
                return;
            });
            return;
        };
        UIManager.prototype.onSimulationStop = function () {
            this._m_aControllers.forEach(function (_controller) {
                _controller.onSimulationStop();
                return;
            });
            return;
        };
        UIManager.prototype.onDebugEnable = function () {
            return;
        };
        UIManager.prototype.onDebugDisable = function () {
            return;
        };
        UIManager.prototype.setTarget = function (_target) {
            this.m_target = _target;
            this._m_aControllers.forEach(function (_controller) {
                _controller.setTarget(_target);
                return;
            });
            return;
        };
        UIManager.prototype.getUIController = function (_name) {
            var aControllers = this._m_aControllers;
            if (aControllers.has(_name)) {
                return aControllers.get(_name);
            }
            else {
                return null;
            }
        };
        UIManager.prototype.addUIController = function (_name, _uiController) {
            this._m_aControllers.set(_name, _uiController);
            _uiController.setMasterManager(this._m_master);
            _uiController.setUIManager(this);
            return;
        };
        UIManager.prototype.destroy = function () {
            this._m_aControllers.forEach(function (_controller) {
                _controller.destroy();
                return;
            });
            this._m_aControllers.clear();
            this._m_aControllers = null;
            this.m_target = undefined;
            return;
        };
        UIManager.prototype._updateController = function (_controller) {
            _controller.update();
            return;
        };
        return UIManager;
    }());
    exports.UIManager = UIManager;
});
define("master/master", ["require", "exports", "managers/debugManager/debugManager", "managers/nullManager", "managers/simulationManager/simulationManager", "managers/uiManager/uiManager"], function (require, exports, debugManager_1, nullManager_1, simulationManager_1, uiManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Master = void 0;
    var Master = (function () {
        function Master() {
        }
        Master.GetInstance = function () {
            return Master._INSTANCE;
        };
        Master.Prepare = function () {
            if (Master._INSTANCE == null) {
                Master._INSTANCE = new Master();
                Master._INSTANCE._onPrepare();
            }
            return;
        };
        Master.Shutdown = function () {
            if (Master._INSTANCE != null) {
                Master._INSTANCE._onShutdown();
                Master._INSTANCE = null;
            }
            return;
        };
        Master.prototype.update = function (_time, _dt) {
            this._m_time = _time;
            this._m_deltaTime = _dt;
            this._m_hManagers.forEach(this._updateManager, this);
            return;
        };
        Master.prototype.getManager = function (_id) {
            var hManager = this._m_hManagers;
            if (hManager.has(_id)) {
                return hManager.get(_id);
            }
            console.warn("Manager with ID: "
                + _id.toString()
                + " not exits in the Master Manager, a Null Service was returned.");
            return new nullManager_1.NullManager();
        };
        Master.prototype.addManager = function (_manager) {
            this._m_hManagers.set(_manager.getID(), _manager);
            _manager.setMasterManager(this);
            return;
        };
        Master.prototype.startSimulation = function () {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationStart, this);
            }
            else {
                console.error("Can't start simulation if the manager doesn't has a simulation scene.");
            }
            return;
        };
        Master.prototype.pauseSimulation = function () {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationPause, this);
            }
            else {
                console.error("Can't pause simulation if the manager doesn't has a simulation scene.");
            }
            return;
        };
        Master.prototype.resumeSimulation = function () {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationResume, this);
            }
            else {
                console.error("Can't resume simulation if the manager doesn't has a simulation scene.");
            }
            return;
        };
        Master.prototype.stopSimulation = function () {
            if (this.hasSimulationScene()) {
                this._m_hManagers.forEach(this._managerSimulationStop, this);
            }
            else {
                console.error("Can't stop simulation if the manager doesn't has a simulation scene.");
            }
            return;
        };
        Master.prototype.enableDebugging = function () {
            if (!this._m_bDebugEnable) {
                this._m_bDebugEnable = !this._m_bDebugEnable;
                this._m_hManagers.forEach(this._managerDebugEnable, this);
            }
            return;
        };
        Master.prototype.disableDebugging = function () {
            if (this._m_bDebugEnable) {
                this._m_bDebugEnable = !this._m_bDebugEnable;
                this._m_hManagers.forEach(this._managerDebugDisable, this);
            }
            return;
        };
        Master.prototype.onSimulationSceneCreate = function (_scene) {
            this._m_simulationScene = _scene;
            this._m_hManagers.forEach(function (_manager) {
                _manager.onSimulationSceneCreate(_scene);
                return;
            }, this);
            return;
        };
        Master.prototype.onSimulationSceneDestroy = function (_scene) {
            this._m_hManagers.forEach(function (_manager) {
                _manager.onSimulationSceneDestroy(_scene);
                return;
            }, this);
            this._m_simulationScene = null;
            return;
        };
        Master.prototype.getDeltaTime = function () {
            return this._m_deltaTime;
        };
        Master.prototype.getGameTime = function () {
            return this._m_time;
        };
        Master.prototype.getSimulationScene = function () {
            if (this._m_simulationScene === null) {
                throw new Error("Master doesn't has any simulation scene.");
            }
            return this._m_simulationScene;
        };
        Master.prototype.hasSimulationScene = function () {
            return this._m_simulationScene !== null;
        };
        Master.prototype.isDebugEnable = function () {
            return this._m_bDebugEnable;
        };
        Master.prototype._onPrepare = function () {
            this._m_hManagers = new Map();
            var hManagers = this._m_hManagers;
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
        };
        Master.prototype._onShutdown = function () {
            var hManagers = this._m_hManagers;
            hManagers.forEach(function (_manager) {
                _manager.destroy();
                return;
            });
            hManagers.clear();
            hManagers = null;
            return;
        };
        Master.prototype._updateManager = function (_manager) {
            _manager.update(this._m_deltaTime);
            return;
        };
        Master.prototype._managerSimulationStart = function (_manager) {
            _manager.onSimulationStart();
            return;
        };
        Master.prototype._managerSimulationPause = function (_manager) {
            _manager.onSimulationPause();
            return;
        };
        Master.prototype._managerSimulationResume = function (_manager) {
            _manager.onSimulationResume();
            return;
        };
        Master.prototype._managerSimulationStop = function (_manager) {
            _manager.onSimulationStop();
            return;
        };
        Master.prototype._managerDebugEnable = function (_manager) {
            _manager.onDebugEnable();
            return;
        };
        Master.prototype._managerDebugDisable = function (_manager) {
            _manager.onDebugDisable();
            return;
        };
        return Master;
    }());
    exports.Master = Master;
});
define("scenes/boot", ["require", "exports", "master/master"], function (require, exports, master_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Boot = void 0;
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.path = "./game/assets/";
            this.load.atlas('loading_ui', 'images/loading/loading_ui.png', 'images/loading/loading_ui.js');
            this.load.image('loading_bg', 'images/loading/loading_bg.jpg');
            return;
        };
        Boot.prototype.create = function () {
            master_1.Master.Prepare();
            this.scene.start('preload');
            return;
        };
        return Boot;
    }(Phaser.Scene));
    exports.Boot = Boot;
});
define("scenes/mainMenu", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainMenu = void 0;
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            var midWidth = this.game.canvas.width * 0.5;
            this._createButton(midWidth, 150, 'Max', this._onDevMax);
            this._createButton(midWidth - 300, 300, 'Arrival', this._onSceneArrival);
            this._createButton(midWidth, 300, 'Wander', this._onSceneWander);
            this._createButton(midWidth + 300, 300, 'Obstacle Avoidance', this._onSceneObstacleAvoidance);
            this._createButton(midWidth, 450, 'Suma', this._onDevSumano);
            return;
        };
        MainMenu.prototype.update = function (_time, _delta) {
            return;
        };
        MainMenu.prototype._createButton = function (_x, _y, _label, _callback) {
            var button = this.add.image(_x, _y, 'button');
            button.setScale(0.5, 0.5);
            button.setInteractive();
            var label = this.add.text(_x, _y, _label, {
                fontFamily: 'Arial',
                fontSize: 32
            });
            label.setOrigin(0.5, 0.5);
            button.on('pointerdown', _callback, this);
            return;
        };
        MainMenu.prototype._onDevAlex = function () {
            this.scene.start('devAlex');
            return;
        };
        MainMenu.prototype._onSceneArrival = function () {
            this.scene.start('sceneArrival');
            return;
        };
        MainMenu.prototype._onSceneWander = function () {
            this.scene.start('sceneWander');
            return;
        };
        MainMenu.prototype._onSceneObstacleAvoidance = function () {
            this.scene.start('sceneObstacleAvoidance');
            return;
        };
        MainMenu.prototype._onDevMax = function () {
            this.scene.start('devMax');
            return;
        };
        MainMenu.prototype._onDevSumano = function () {
            this.scene.start('devSumano');
            return;
        };
        return MainMenu;
    }(Phaser.Scene));
    exports.MainMenu = MainMenu;
});
define("steeringBehavior/iForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/cmpforceController", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_5, master_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpForceController = void 0;
    var CmpForceController = (function () {
        function CmpForceController() {
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
            return;
        }
        CmpForceController.prototype.init = function (_actor) {
            this.clear();
            this._m_master = master_2.Master.GetInstance();
            if (this._m_master.isDebugEnable()) {
                this._m_debug = true;
            }
            this._m_debugManager = this._m_master.getManager(stEnums_5.ST_MANAGER_ID.kDebugManager);
            this._m_actor = _actor;
            return;
        };
        CmpForceController.prototype.update = function (_actor) {
            var totalForce = this._m_totalForce;
            totalForce.reset();
            var totalForceStepped = this._m_totalForceStepped;
            totalForceStepped.reset();
            if (!this._m_bRunning) {
                return;
            }
            this._m_hForce.forEach(this._updateForce, this);
            var dt = this._m_master.getDeltaTime();
            totalForce.scale(1.0 / this._m_mass);
            totalForceStepped.copy(totalForce);
            totalForceStepped.scale(dt);
            var actualVelocity = this._m_actualVelocity;
            var direction = this._m_direction;
            actualVelocity.copy(direction);
            actualVelocity.scale(this._m_speed);
            actualVelocity.add(totalForceStepped);
            actualVelocity.limit(this._m_maxSpeed);
            this._m_speed = actualVelocity.length();
            var actualVelocityStepped = this._m_actualVelocityStepped;
            actualVelocityStepped.copy(actualVelocity);
            actualVelocityStepped.scale(dt);
            this._m_actor.sendMessage(stEnums_5.ST_MESSAGE_ID.kMove, actualVelocityStepped);
            direction.copy(actualVelocity);
            direction.normalize();
            this._m_actor.sendMessage(stEnums_5.ST_MESSAGE_ID.kSetAngle, direction.angle());
            if (this._m_debug) {
                this.updateDebug(dt);
            }
            return;
        };
        CmpForceController.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_actor.getWrappedInstance();
            var actualVelocity = this._m_actualVelocity;
            debugManager.drawLine(sprite.x, sprite.y, sprite.x + actualVelocity.x, sprite.y + actualVelocity.y, 3, stEnums_5.ST_COLOR_ID.kGreen);
            return;
        };
        CmpForceController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case stEnums_5.ST_MESSAGE_ID.kSetMass:
                    this.setMass(_obj);
                    return;
                case stEnums_5.ST_MESSAGE_ID.kSetSpeed:
                    this.setSpeed(_obj);
                    return;
                case stEnums_5.ST_MESSAGE_ID.kSetMaxSpeed:
                    this.setMaxSpeed(_obj);
                    return;
            }
            return;
        };
        CmpForceController.prototype.onSimulationStart = function () {
            this._m_bRunning = true;
            return;
        };
        CmpForceController.prototype.onSimulationPause = function () {
            this._m_bRunning = false;
            return;
        };
        CmpForceController.prototype.onSimulationResume = function () {
            this._m_bRunning = true;
            return;
        };
        CmpForceController.prototype.onSimulationStop = function () {
            this._m_bRunning = false;
            this._m_speed = 0.0;
            this._m_actualVelocity.reset();
            this._m_actualVelocityStepped.reset();
            this._m_totalForce.reset();
            this._m_totalForceStepped.reset();
            this._m_direction.set(0.0, -1.0);
            return;
        };
        CmpForceController.prototype.onDebugEnable = function () {
            this._m_debug = true;
            this._m_hForce.forEach(this._forceDebugEnable, this);
            return;
        };
        CmpForceController.prototype.onDebugDisable = function () {
            this._m_debug = false;
            this._m_hForce.forEach(this._forceDebugDisable, this);
            return;
        };
        CmpForceController.prototype.getID = function () {
            return stEnums_5.ST_COMPONENT_ID.kForceController;
        };
        CmpForceController.prototype.addForce = function (_str_id, _force) {
            if (this._m_hForce.size < CmpForceController.MAX_FORCE_NUM) {
                this._m_hForce.set(_str_id, _force);
                _force.setController(this);
            }
            else {
            }
            return;
        };
        CmpForceController.prototype.getForce = function (_str_id) {
            var hForce = this._m_hForce;
            if (hForce.has(_str_id)) {
                return this._m_hForce.get(_str_id);
            }
            throw new Error('Force does not exists: ' + _str_id);
        };
        CmpForceController.prototype.getForces = function () {
            return this._m_hForce;
        };
        CmpForceController.prototype.addSteerForce = function (_x, _y) {
            this._m_totalForce.x += _x;
            this._m_totalForce.y += _y;
            return;
        };
        CmpForceController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpForceController.prototype.getSpeed = function () {
            return this._m_speed;
        };
        CmpForceController.prototype.getVelocity = function () {
            return this._m_actualVelocity;
        };
        CmpForceController.prototype.setMaxSpeed = function (_maxSpeed) {
            if (Math.abs(_maxSpeed) < CmpForceController.MAX_SPEED_LIMIT) {
                this._m_maxSpeed = _maxSpeed;
            }
            else {
                this._m_maxSpeed = CmpForceController.MAX_SPEED_LIMIT;
                this._m_maxSpeed *= (_maxSpeed > 0 ? 1 : -1);
            }
            return;
        };
        CmpForceController.prototype.getMaxSpeed = function () {
            return this._m_maxSpeed;
        };
        CmpForceController.prototype.setSpeed = function (_speed) {
            this._m_speed = _speed;
            return;
        };
        CmpForceController.prototype.getMass = function () {
            return this._m_mass;
        };
        CmpForceController.prototype.setMass = function (_mass) {
            if (this._m_mass != 0) {
                this._m_mass = _mass;
            }
            else {
                this._m_mass = 0.001;
            }
            return;
        };
        CmpForceController.prototype.isRunning = function () {
            return this._m_bRunning;
        };
        CmpForceController.prototype.clear = function () {
            this._m_hForce.forEach(function (_force) {
                _force.destroy();
                return;
            });
            this._m_hForce.clear();
            return;
        };
        CmpForceController.prototype.destroy = function () {
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
        };
        CmpForceController.prototype._updateForce = function (_force) {
            var deltaTime = this._m_master.getDeltaTime();
            _force.update(deltaTime);
            if (this._m_debug) {
                _force.updateDebug(deltaTime);
            }
            return;
        };
        CmpForceController.prototype._forceDebugEnable = function (_force) {
            this._m_debug = true;
            _force.onDebugEnable();
            return;
        };
        CmpForceController.prototype._forceDebugDisable = function (_force) {
            this._m_debug = false;
            _force.onDebugDisable();
            return;
        };
        CmpForceController.MAX_SPEED_LIMIT = 2000;
        CmpForceController.MAX_FORCE_NUM = 10;
        return CmpForceController;
    }());
    exports.CmpForceController = CmpForceController;
});
define("components/cmpSpriteController", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpSpriteController = void 0;
    var CmpSpriteController = (function () {
        function CmpSpriteController() {
        }
        CmpSpriteController.prototype.init = function (_actor) {
            this._m_sprite = _actor.getWrappedInstance();
            return;
        };
        CmpSpriteController.prototype.update = function (_actor) { };
        CmpSpriteController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case stEnums_6.ST_MESSAGE_ID.kMove:
                    {
                        var v2 = _obj;
                        this.move(v2.x, v2.y);
                    }
                    return;
                case stEnums_6.ST_MESSAGE_ID.kSetPosition:
                    {
                        var v2 = _obj;
                        this.setPosition(v2.x, v2.y);
                    }
                    return;
                case stEnums_6.ST_MESSAGE_ID.kSetScale:
                    {
                        var v2 = _obj;
                        this.setScale(v2.x, v2.y);
                    }
                    return;
                case stEnums_6.ST_MESSAGE_ID.kSetAngle:
                    this._m_sprite.setAngle(Phaser.Math.RadToDeg(_obj));
                    return;
            }
            return;
        };
        CmpSpriteController.prototype.move = function (_x, _y) {
            var sprite = this._m_sprite;
            sprite.setPosition(sprite.x + _x, sprite.y + _y);
            return;
        };
        CmpSpriteController.prototype.setPosition = function (_x, _y) {
            var go = this._m_sprite;
            go.setPosition(_x, _y);
            return;
        };
        CmpSpriteController.prototype.setScale = function (_x, _y) {
            var go = this._m_sprite;
            go.setScale(_x, _y);
            return;
        };
        CmpSpriteController.prototype.onSimulationStart = function () {
            return;
        };
        CmpSpriteController.prototype.onSimulationPause = function () {
            return;
        };
        CmpSpriteController.prototype.onSimulationResume = function () {
            return;
        };
        CmpSpriteController.prototype.onSimulationStop = function () {
            return;
        };
        CmpSpriteController.prototype.onDebugEnable = function () {
            return;
        };
        CmpSpriteController.prototype.onDebugDisable = function () {
            return;
        };
        CmpSpriteController.prototype.getID = function () {
            return stEnums_6.ST_COMPONENT_ID.kSpriteController;
        };
        CmpSpriteController.prototype.destroy = function () {
            this._m_sprite.destroy();
            this._m_sprite = null;
            return;
        };
        return CmpSpriteController;
    }());
    exports.CmpSpriteController = CmpSpriteController;
});
define("managers/uiManager/uiObject", ["require", "exports", "listeners/mxListener", "listeners/mxListenerManager"], function (require, exports, mxListener_1, mxListenerManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIObject = void 0;
    var UIObject = (function () {
        function UIObject() {
            this._m_listenerManager = new mxListenerManager_1.MxListenerManager();
            return;
        }
        UIObject.prototype.init = function () {
            return;
        };
        UIObject.prototype.update = function (_dt) {
            return;
        };
        UIObject.prototype.setMasterManager = function (_master) {
            return;
        };
        UIObject.prototype.onSimulationStart = function () {
            return;
        };
        UIObject.prototype.onSimulationPause = function () {
            return;
        };
        UIObject.prototype.onSimulationResume = function () {
            return;
        };
        UIObject.prototype.onSimulationStop = function () {
            return;
        };
        UIObject.prototype.getWidth = function () {
            return 0;
        };
        UIObject.prototype.getHeight = function () {
            return 0;
        };
        UIObject.prototype.getX = function () {
            return 0;
        };
        UIObject.prototype.getY = function () {
            return 0;
        };
        UIObject.prototype.getZ = function () {
            return 0;
        };
        UIObject.prototype.setZ = function (_z) {
            return;
        };
        UIObject.prototype.move = function (_x, _y) {
            return;
        };
        UIObject.prototype.setPosition = function (_x, _y) {
            return;
        };
        UIObject.prototype.setAnchor = function (_x, _y) {
            return;
        };
        UIObject.prototype.setScale = function (_x, _y) {
            return;
        };
        UIObject.prototype.getAnchorX = function () {
            return 0.5;
        };
        UIObject.prototype.getAnchorY = function () {
            return 0.5;
        };
        UIObject.prototype.enable = function () {
            return;
        };
        UIObject.prototype.disable = function () {
            return;
        };
        UIObject.prototype.subscribe = function (_event, _username, _fn, _context) {
            this._m_listenerManager.suscribe(_event, _username, new mxListener_1.MxListener(_fn, _context));
            return;
        };
        UIObject.prototype.unsubscribe = function (_event, _username) {
            this._m_listenerManager.unsuscribe(_event, _username);
            return;
        };
        UIObject.prototype.destroy = function () {
            this._m_listenerManager.destroy();
            return;
        };
        return UIObject;
    }());
    exports.UIObject = UIObject;
});
define("managers/uiManager/uiBox/states/uiBoxState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIBoxState = void 0;
    var UIBoxState = (function () {
        function UIBoxState(_uiBox) {
            this.m_uiBox = _uiBox;
            return;
        }
        UIBoxState.prototype.update = function () {
            return;
        };
        UIBoxState.prototype.setCenterAlignment = function () {
            return;
        };
        UIBoxState.prototype.setLeftAlignment = function () {
            return;
        };
        UIBoxState.prototype.setRightAlignment = function () {
            return;
        };
        UIBoxState.prototype.setTopAlignment = function () {
            return;
        };
        UIBoxState.prototype.setBottomAlignment = function () {
            return;
        };
        UIBoxState.prototype.destroy = function () {
            this.m_uiBox = null;
            return;
        };
        return UIBoxState;
    }());
    exports.UIBoxState = UIBoxState;
});
define("managers/uiManager/uiBox/states/uiHorizontalBox", ["require", "exports", "managers/uiManager/uiBox/states/uiBoxState"], function (require, exports, uiBoxState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIHorizontalBox = void 0;
    var UIHorizontalBox = (function (_super) {
        __extends(UIHorizontalBox, _super);
        function UIHorizontalBox(_uiBox) {
            var _this = _super.call(this, _uiBox) || this;
            _this._m_vAlignFn = _this._alignTop;
            return _this;
        }
        UIHorizontalBox.prototype.update = function () {
            var box = this.m_uiBox;
            var aObjects = box._m_aObjects;
            var size = aObjects.length;
            var boxSize = box._m_boxSize;
            boxSize.x = box._m_paddingLeft + box._m_paddingRight;
            boxSize.y = box._m_paddingTop + box._m_paddingBottom;
            var gap = box._m_gap;
            var elementH;
            var elementW;
            var contentBox = box._m_contentBox;
            contentBox.width = 0;
            contentBox.height = 0;
            var object;
            var lastIndex = size - 1;
            for (var i = 0; i < size; ++i) {
                object = aObjects[i];
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
            var boxBG = box._m_bg;
            contentBox.x = boxBG.x - (boxBG.originX * boxBG.width) + box._m_paddingLeft;
            contentBox.y = boxBG.y - (boxBG.originY * boxBG.height) + box._m_paddingTop;
            var position = new Phaser.Geom.Point(contentBox.x, contentBox.y);
            for (var i = 0; i < size; ++i) {
                object = aObjects[i];
                object.setPosition(position.x + (object.getWidth() * object.getAnchorX()), position.y);
                this._m_vAlignFn.call(this, contentBox, object);
                position.x += object.getWidth() + gap;
            }
            return;
        };
        UIHorizontalBox.prototype.setTopAlignment = function () {
            this._m_vAlignFn = this._alignTop;
            this.update();
            return;
        };
        UIHorizontalBox.prototype.setCenterAlignment = function () {
            this._m_vAlignFn = this._alignMiddle;
            this.update();
            return;
        };
        UIHorizontalBox.prototype.setBottomAlignment = function () {
            this._m_vAlignFn = this._alignBottom;
            this.update();
            return;
        };
        UIHorizontalBox.prototype._verticalAlignToBox = function (_contentBox, _element, _t) {
            var y1 = _contentBox.y + (_t * _contentBox.height);
            _element.setPosition(_element.getX(), y1 + (_element.getHeight() * (_element.getAnchorY() - _t)));
            return;
        };
        UIHorizontalBox.prototype._alignTop = function (_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 0.0);
            return;
        };
        UIHorizontalBox.prototype._alignMiddle = function (_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 0.5);
            return;
        };
        UIHorizontalBox.prototype._alignBottom = function (_contentBox, _element) {
            this._verticalAlignToBox(_contentBox, _element, 1.0);
            return;
        };
        return UIHorizontalBox;
    }(uiBoxState_1.UIBoxState));
    exports.UIHorizontalBox = UIHorizontalBox;
});
define("managers/uiManager/uiBox/states/uiVerticalBox", ["require", "exports", "managers/uiManager/uiBox/states/uiBoxState"], function (require, exports, uiBoxState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIVerticalBox = void 0;
    var UIVerticalBox = (function (_super) {
        __extends(UIVerticalBox, _super);
        function UIVerticalBox(_uiBox) {
            var _this = _super.call(this, _uiBox) || this;
            _this._m_hAlignFn = _this._alignLeft;
            return _this;
        }
        UIVerticalBox.prototype.update = function () {
            var box = this.m_uiBox;
            var aObjects = box._m_aObjects;
            var size = aObjects.length;
            var boxSize = box._m_boxSize;
            boxSize.x = box._m_paddingLeft + box._m_paddingRight;
            boxSize.y = box._m_paddingTop + box._m_paddingBottom;
            var gap = box._m_gap;
            var elementH;
            var elementW;
            var contentBox = box._m_contentBox;
            contentBox.width = 0;
            contentBox.height = 0;
            var object;
            var lastIndex = size - 1;
            for (var i = 0; i < size; ++i) {
                object = aObjects[i];
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
            var boxBG = box._m_bg;
            contentBox.x = boxBG.x - (boxBG.originX * boxBG.width) + box._m_paddingLeft;
            contentBox.y = boxBG.y - (boxBG.originY * boxBG.height) + box._m_paddingTop;
            var position = new Phaser.Geom.Point(contentBox.x, contentBox.y);
            for (var i = 0; i < size; ++i) {
                object = aObjects[i];
                object.setPosition(position.x, position.y + (object.getHeight() * object.getAnchorY()));
                this._m_hAlignFn.call(this, contentBox, object);
                position.y += object.getHeight() + gap;
            }
            return;
        };
        UIVerticalBox.prototype.setCenterAlignment = function () {
            this._m_hAlignFn = this._alignCenter;
            this.update();
            return;
        };
        UIVerticalBox.prototype.setLeftAlignment = function () {
            this._m_hAlignFn = this._alignLeft;
            this.update();
            return;
        };
        UIVerticalBox.prototype.setRightAlignment = function () {
            this._m_hAlignFn = this._alignRight;
            this.update();
            return;
        };
        UIVerticalBox.prototype._horizontalAlignToBox = function (_contentBox, _element, _t) {
            var x1 = _contentBox.x + (_t * _contentBox.width);
            _element.setPosition(x1 + (_element.getWidth() * (_element.getAnchorX() - _t)), _element.getY());
            return;
        };
        UIVerticalBox.prototype._alignLeft = function (_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 0.0);
            return;
        };
        UIVerticalBox.prototype._alignCenter = function (_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 0.5);
            return;
        };
        UIVerticalBox.prototype._alignRight = function (_contentBox, _element) {
            this._horizontalAlignToBox(_contentBox, _element, 1.0);
            return;
        };
        return UIVerticalBox;
    }(uiBoxState_2.UIBoxState));
    exports.UIVerticalBox = UIVerticalBox;
});
define("managers/uiManager/uiBox/uiBox", ["require", "exports", "managers/uiManager/uiObject", "managers/uiManager/uiBox/states/uiHorizontalBox", "managers/uiManager/uiBox/states/uiVerticalBox"], function (require, exports, uiObject_1, uiHorizontalBox_1, uiVerticalBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIBox = void 0;
    var UIBox = (function (_super) {
        __extends(UIBox, _super);
        function UIBox(_x, _y, _scene, _frame) {
            if (_frame === void 0) { _frame = "box_bg.png"; }
            var _this = _super.call(this) || this;
            _this._m_verticalState = new uiVerticalBox_1.UIVerticalBox(_this);
            _this._m_horizontalState = new uiHorizontalBox_1.UIHorizontalBox(_this);
            var aObjects = new Array();
            _this._m_aObjects = aObjects;
            var contentSize = new Phaser.Geom.Rectangle();
            _this._m_contentBox = contentSize;
            _this._m_boxSize = new Phaser.Geom.Point();
            var bg = _scene.add.nineslice(_x, _y, contentSize.x, contentSize.y, {
                key: "game_art",
                frame: _frame
            }, [30]);
            _this._m_bg = bg;
            _this._m_gap = 0;
            _this.setVerticalBox();
            _this.setPadding(0);
            _this.setLeftAlignment();
            return _this;
        }
        UIBox.CreateBorderBox = function (_x, _y, _scene) {
            var box = new UIBox(_x, _y, _scene, "box_bg.png");
            box.setPadding(20);
            box.setElementsGap(5);
            return box;
        };
        UIBox.CreateBorderBoxB = function (_x, _y, _scene) {
            var box = new UIBox(_x, _y, _scene, "box_bg_3.png");
            box.setPadding(20);
            box.setElementsGap(5);
            return box;
        };
        UIBox.CreateContentBox = function (_x, _y, _scene) {
            var box = new UIBox(_x, _y, _scene, "box_bg_2.png");
            box.setPadding(10);
            box.setElementsGap(5);
            return box;
        };
        UIBox.CreateContentBoxB = function (_x, _y, _scene) {
            var box = new UIBox(_x, _y, _scene, "box_bg_4.png");
            box.setPadding(10);
            box.setElementsGap(5);
            return box;
        };
        UIBox.prototype.add = function (_object) {
            this._m_aObjects.push(_object);
            var depth = _object.getZ();
            if (depth <= this._m_bg.depth) {
                this._m_bg.setDepth(depth - 1);
            }
            this.updateBox();
            return;
        };
        UIBox.prototype.remove = function (_object) {
            var aObjects = this._m_aObjects;
            var size = aObjects.length;
            for (var i = 0; i < size; ++i) {
                this._m_aObjects[i] === _object;
                this._m_aObjects.splice(i, 1);
                return;
            }
            return;
        };
        UIBox.prototype.getWidth = function () {
            return this._m_boxSize.x;
        };
        UIBox.prototype.getHeight = function () {
            return this._m_boxSize.y;
        };
        UIBox.prototype.getX = function () {
            return this._m_bg.x;
        };
        UIBox.prototype.getY = function () {
            return this._m_bg.y;
        };
        UIBox.prototype.getZ = function () {
            return this._m_bg.depth;
        };
        UIBox.prototype.move = function (_x, _y) {
            var bg = this._m_bg;
            bg.x += _x;
            bg.y += _y;
            var aObjects = this._m_aObjects;
            var size = aObjects.length;
            for (var i = 0; i < size; ++i) {
                aObjects[i].move(_x, _y);
            }
            return;
        };
        UIBox.prototype.setPosition = function (_x, _y) {
            var bg = this._m_bg;
            var x = _x - bg.x;
            var y = _y - bg.y;
            this.move(x, y);
            return;
        };
        UIBox.prototype.setAnchor = function (_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this.updateBox();
            return;
        };
        UIBox.prototype.getAnchorX = function () {
            return this._m_bg.originX;
        };
        UIBox.prototype.getAnchorY = function () {
            return this._m_bg.originY;
        };
        UIBox.prototype.enable = function () {
            this._m_aObjects.forEach(function (_object) {
                _object.enable();
                return;
            });
            this._m_bg.setActive(true);
            this._m_bg.setVisible(true);
            return;
        };
        UIBox.prototype.disable = function () {
            this._m_aObjects.forEach(function (_object) {
                _object.disable();
                return;
            });
            this._m_bg.setActive(false);
            this._m_bg.setVisible(false);
            return;
        };
        UIBox.prototype.setPadding = function (_left, _top, _right, _bottom) {
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
        };
        UIBox.prototype.updateBox = function () {
            this._m_activeState.update();
            return;
        };
        UIBox.prototype.setElementsGap = function (_gap) {
            this._m_gap = _gap;
            this.updateBox();
            return;
        };
        UIBox.prototype.destroy = function () {
            var aObject = this._m_aObjects;
            while (aObject.length) {
                var object = aObject.pop();
                object.destroy();
                return;
            }
            this._m_aObjects = null;
            this._m_activeState = null;
            this._m_verticalState.destroy();
            this._m_verticalState = null;
            this._m_horizontalState.destroy();
            this._m_horizontalState = null;
            _super.prototype.destroy.call(this);
            return;
        };
        UIBox.prototype.setHorizontalBox = function () {
            this._m_activeState = this._m_horizontalState;
            return;
        };
        UIBox.prototype.setVerticalBox = function () {
            this._m_activeState = this._m_verticalState;
            return;
        };
        UIBox.prototype.setCenterAlignment = function () {
            this._m_activeState.setCenterAlignment();
            return;
        };
        UIBox.prototype.setLeftAlignment = function () {
            this._m_activeState.setLeftAlignment();
            return;
        };
        UIBox.prototype.setRightAlignment = function () {
            this._m_activeState.setRightAlignment();
            return;
        };
        UIBox.prototype.setTopAlignment = function () {
            this._m_activeState.setTopAlignment();
            return;
        };
        UIBox.prototype.setBottomAlignment = function () {
            this._m_activeState.setBottomAlignment();
            return;
        };
        UIBox.prototype.resizeBackground = function () {
            var boxSize = this._m_boxSize;
            if (boxSize.x < UIBox.MIN_WIDTH) {
                boxSize.x = UIBox.MIN_WIDTH;
            }
            if (boxSize.y < UIBox.MIN_HEIGHT) {
                boxSize.y = UIBox.MIN_HEIGHT;
            }
            this._m_bg.resize(boxSize.x, boxSize.y);
            return;
        };
        UIBox.MIN_WIDTH = 65;
        UIBox.MIN_HEIGHT = 65;
        return UIBox;
    }(uiObject_1.UIObject));
    exports.UIBox = UIBox;
});
define("managers/uiManager/uiLabel", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UILabel = void 0;
    var UILabel = (function (_super) {
        __extends(UILabel, _super);
        function UILabel(_x, _y, _scene, _text, _font_key, _font_size, _tint) {
            var _this = _super.call(this) || this;
            _this._m_listenerManager.addEvent("textChanged");
            var font_key = "odin_rounded";
            if (_font_key !== undefined) {
                font_key = _font_key;
            }
            var font_size = 20;
            if (_font_size !== undefined) {
                font_size = _font_size;
            }
            var tint = 0x000000;
            if (_tint !== undefined) {
                tint = _tint;
            }
            var label = _scene.add.bitmapText(_x, _y, font_key, _text, font_size);
            _this._m_label = label;
            label.setTint(tint);
            label.setOrigin(0.0, 0.5);
            label.setLeftAlign();
            return _this;
        }
        UILabel.CreateH1 = function (_x, _y, _scene, _text) {
            var label = new UILabel(_x, _y, _scene, _text, 'supercomputer', 36);
            return label;
        };
        UILabel.CreateH2 = function (_x, _y, _scene, _text) {
            var label = new UILabel(_x, _y, _scene, _text, "odin_rounded", 28);
            return label;
        };
        UILabel.CreateStyleA = function (_x, _y, _scene, _text, _fontSize) {
            var label = new UILabel(_x, _y, _scene, _text, "supercomputer", _fontSize);
            return label;
        };
        UILabel.CreateStyleB = function (_x, _y, _scene, _text, _fontSize) {
            var label = new UILabel(_x, _y, _scene, _text, "odin_rounded", _fontSize);
            return label;
        };
        UILabel.prototype.getWidth = function () {
            return this._m_label.width;
        };
        UILabel.prototype.getHeight = function () {
            return this._m_label.height;
        };
        UILabel.prototype.getZ = function () {
            return this._m_label.depth;
        };
        UILabel.prototype.move = function (_x, _y) {
            this._m_label.x += _x;
            this._m_label.y += _y;
            return;
        };
        UILabel.prototype.setPosition = function (_x, _y) {
            this._m_label.setPosition(_x, _y);
            return;
        };
        UILabel.prototype.setAnchor = function (_x, _y) {
            this._m_label.setOrigin(_x, _y);
            return;
        };
        UILabel.prototype.getAnchorX = function () {
            return this._m_label.originX;
        };
        UILabel.prototype.getAnchorY = function () {
            return this._m_label.originY;
        };
        UILabel.prototype.getX = function () {
            return this._m_label.x;
        };
        UILabel.prototype.getY = function () {
            return this._m_label.y;
        };
        UILabel.prototype.setText = function (_text) {
            this._m_label.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        };
        UILabel.prototype.setScale = function (_x, _y) {
            this._m_label.setScale(_x, _y);
            return;
        };
        UILabel.prototype.setTint = function (_tint) {
            this._m_label.setTint(_tint);
            return;
        };
        UILabel.prototype.enable = function () {
            this._m_label.setActive(true);
            this._m_label.setVisible(true);
            return;
        };
        UILabel.prototype.disable = function () {
            this._m_label.setActive(false);
            this._m_label.setVisible(false);
            return;
        };
        UILabel.prototype.leftAlign = function () {
            this._m_label.setLeftAlign();
            return;
        };
        UILabel.prototype.rightAlign = function () {
            this._m_label.setRightAlign();
            return;
        };
        UILabel.prototype.centerAlign = function () {
            this._m_label.setCenterAlign();
            return;
        };
        UILabel.prototype.destroy = function () {
            this._m_label.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        return UILabel;
    }(uiObject_2.UIObject));
    exports.UILabel = UILabel;
});
define("managers/uiManager/uiControllers/UIDialogBox", ["require", "exports", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiControllers/UIController"], function (require, exports, uiBox_1, uiLabel_1, UIController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIDialogBox = void 0;
    var UIDialogBox = (function (_super) {
        __extends(UIDialogBox, _super);
        function UIDialogBox(_x, _y, _scene, _title) {
            var _this = _super.call(this) || this;
            var box = uiBox_1.UIBox.CreateBorderBoxB(_x, _y, _scene);
            _this._m_box = box;
            var title = uiLabel_1.UILabel.CreateH1(0, 0, _scene, _title);
            _this._m_title = title;
            box.add(title);
            box.setCenterAlignment();
            return _this;
        }
        UIDialogBox.prototype.setTitle = function (_title) {
            this._m_title.setText(_title);
            this._m_box.updateBox();
            return;
        };
        UIDialogBox.prototype.open = function () {
            this._m_box.enable();
            return;
        };
        UIDialogBox.prototype.close = function () {
            this._m_box.disable();
            return;
        };
        UIDialogBox.prototype.destroy = function () {
            this._m_box.destroy();
            this._m_box = null;
            this._m_title = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return UIDialogBox;
    }(UIController_1.UIController));
    exports.UIDialogBox = UIDialogBox;
});
define("managers/uiManager/uiButton", ["require", "exports", "managers/uiManager/uiLabel", "managers/uiManager/uiObject"], function (require, exports, uiLabel_2, uiObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIButton = void 0;
    var UIButton = (function (_super) {
        __extends(UIButton, _super);
        function UIButton(_x, _y, _scene, _frame, _label, _buttonTint, _labelTint, _labelSize) {
            var _this = _super.call(this) || this;
            _this._m_originScale = 1;
            _this._m_hoverScale = 1.1;
            _this._m_pressedScale = 0.9;
            _this._m_listenerManager.addEvent("buttonPressed");
            _this._m_listenerManager.addEvent("buttonReleased");
            _this._m_listenerManager.addEvent("buttonOver");
            _this._m_listenerManager.addEvent("buttonOverOut");
            var contentSize = new Phaser.Geom.Point();
            _this._m_contentSize = contentSize;
            _this._m_buttonSize = new Phaser.Geom.Point();
            var button = _scene.add.nineslice(_x, _y, contentSize.x, contentSize.y, {
                key: "game_art",
                frame: _frame
            }, [7]);
            _this._m_buttonTint = 0xffffff;
            if (_buttonTint !== undefined) {
                _this._m_buttonTint = _buttonTint;
            }
            button.setTint(_this._m_buttonTint);
            button.setInteractive();
            var label = uiLabel_2.UILabel.CreateStyleB(_x, _y, _scene, _label, _labelSize);
            var labeltint = 0xffffff;
            if (_labelTint !== undefined) {
                labeltint = _labelTint;
            }
            label.setTint(labeltint);
            label.setAnchor(0.5, 0.8);
            _this._m_buttonWidth = button.width;
            _this._m_buttonHeight = button.height;
            button.on('pointerdown', _this._onButtonPressed, _this);
            button.on('pointerup', _this._onButtonReleased, _this);
            button.on('pointerover', _this._onButtonOver, _this);
            button.on('pointerout', _this._onButtonOverOut, _this);
            _this._m_button = button;
            _this._m_label = label;
            _this.setPadding(0);
            _this.setAnchor(0.5, 0.5);
            return _this;
        }
        UIButton.CreateButton = function (_x, _y, _scene, _label) {
            var button = new UIButton(_x, _y, _scene, "niceButton.png", _label);
            button.setPadding(10);
            return button;
        };
        UIButton.CreateColorButton = function (_x, _y, _scene, _label, _buttonTint) {
            var button = new UIButton(_x, _y, _scene, "niceButton.png", _label, _buttonTint);
            button.setPadding(10);
            return button;
        };
        UIButton.prototype.getWidth = function () {
            return this._m_button.width;
        };
        UIButton.prototype.getHeight = function () {
            return this._m_button.height;
        };
        UIButton.prototype.getX = function () {
            return this._m_button.x;
        };
        UIButton.prototype.getY = function () {
            return this._m_button.y;
        };
        UIButton.prototype.getZ = function () {
            return this._m_button.depth;
        };
        UIButton.prototype.move = function (_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            this._m_label.move(_x, _y);
            return;
        };
        UIButton.prototype.setPosition = function (_x, _y) {
            this._m_button.setPosition(_x, _y);
            this._m_label.setPosition(_x, _y);
            return;
        };
        UIButton.prototype.setAnchor = function (_x, _y) {
            this._m_button.setOrigin(_x, _y);
            this.updateButton();
            return;
        };
        UIButton.prototype.getAnchorX = function () {
            return this._m_button.originX;
        };
        UIButton.prototype.getAnchorY = function () {
            return this._m_button.originY;
        };
        UIButton.prototype.enable = function () {
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            this._m_label.enable();
            return;
        };
        UIButton.prototype.disable = function () {
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            this._m_label.disable();
            return;
        };
        UIButton.prototype.setPadding = function (_left, _top, _right, _bottom) {
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
        };
        UIButton.prototype.updateButton = function () {
            this.updateButtonSize();
            this._resizeButton();
            return;
        };
        UIButton.prototype.destroy = function () {
            this._m_button.destroy();
            this._m_label.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        UIButton.prototype.updateButtonSize = function () {
            var contentSize = this._m_contentSize;
            contentSize.setTo(0.0);
            var width = this._m_label.getWidth();
            var height = this._m_label.getHeight();
            contentSize.x = width;
            contentSize.y = height;
            var buttonSize = this._m_buttonSize;
            buttonSize.x = contentSize.x + this._m_paddingLeft + this._m_paddingRight;
            buttonSize.y = contentSize.y + this._m_paddingBottom + this._m_paddingTop;
            if (buttonSize.x < this._m_buttonWidth) {
                buttonSize.x = this._m_buttonWidth;
            }
            if (buttonSize.y < this._m_buttonHeight) {
                buttonSize.y = this._m_buttonHeight;
            }
            return;
        };
        UIButton.prototype._resizeButton = function () {
            var buttonSize = this._m_buttonSize;
            this._m_button.resize(buttonSize.x, buttonSize.y);
            return;
        };
        UIButton.prototype._onButtonPressed = function () {
            this._m_label.setScale(this._m_pressedScale);
            this.updateButton();
            this._m_listenerManager.call("buttonPressed", this, undefined);
            return;
        };
        UIButton.prototype._onButtonReleased = function () {
            this._m_label.setScale(this._m_originScale);
            this.updateButton();
            this._m_listenerManager.call("buttonReleased", this, undefined);
            return;
        };
        UIButton.prototype._onButtonOver = function () {
            this._m_label.setScale(this._m_hoverScale);
            this.updateButton();
            this._m_listenerManager.call("buttonOver", this, undefined);
            return;
        };
        UIButton.prototype._onButtonOverOut = function () {
            this._m_label.setScale(this._m_originScale);
            this.updateButton();
            this._m_listenerManager.call("buttonOverOut", this, undefined);
            return;
        };
        return UIButton;
    }(uiObject_3.UIObject));
    exports.UIButton = UIButton;
});
define("managers/uiManager/uiButtonImg", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIButtonImg = void 0;
    var UIButtonImg = (function (_super) {
        __extends(UIButtonImg, _super);
        function UIButtonImg(_x, _y, _scene, _idleFrame, _hoverFrame, _pressedFrame) {
            var _this = _super.call(this) || this;
            _this._m_originScale = 1;
            _this._m_hoverScale = 1.1;
            _this._m_pressedScale = 0.9;
            _this._m_listenerManager.addEvent("buttonPressed");
            _this._m_listenerManager.addEvent("buttonReleased");
            _this._m_listenerManager.addEvent("buttonOver");
            _this._m_listenerManager.addEvent("buttonOverOut");
            _this._m_idleFrame = "niceButton.png";
            _this._m_hoverFrame = _this._m_idleFrame;
            _this._m_pressedFrame = _this._m_idleFrame;
            if (_idleFrame !== undefined) {
                _this._m_idleFrame = _idleFrame;
            }
            if (_hoverFrame !== undefined) {
                _this._m_hoverFrame = _hoverFrame;
            }
            if (_pressedFrame !== undefined) {
                _this._m_pressedFrame = _pressedFrame;
            }
            var button = _scene.add.image(_x, _y, "game_art", _this._m_idleFrame);
            button.setInteractive();
            button.on('pointerdown', _this._onButtonPressed, _this);
            button.on('pointerup', _this._onButtonReleased, _this);
            button.on('pointerover', _this._onButtonOver, _this);
            button.on('pointerout', _this._onButtonOverOut, _this);
            _this._m_button = button;
            _this.setAnchor(0.5, 0.5);
            return _this;
        }
        UIButtonImg.CreateButtonImg = function (_x, _y, _scene) {
            var button = new UIButtonImg(_x, _y, _scene);
            return button;
        };
        UIButtonImg.CreatePlayButtonImg = function (_x, _y, _scene) {
            var button = new UIButtonImg(_x, _y, _scene, "play_but_normal.png", "play_but_hover.png", "play_but_press.png");
            return button;
        };
        UIButtonImg.CreatePauseButtonImg = function (_x, _y, _scene) {
            var button = new UIButtonImg(_x, _y, _scene, "pause_but_normal.png", "pause_but_hover.png", "pause_but_press.png");
            return button;
        };
        UIButtonImg.CreateStopButtonImg = function (_x, _y, _scene) {
            var button = new UIButtonImg(_x, _y, _scene, "stop_but_normal.png", "stop_but_hover.png", "stop_but_press.png");
            return button;
        };
        UIButtonImg.prototype.getWidth = function () {
            return this._m_button.width;
        };
        UIButtonImg.prototype.getHeight = function () {
            return this._m_button.height;
        };
        UIButtonImg.prototype.getX = function () {
            return this._m_button.x;
        };
        UIButtonImg.prototype.getY = function () {
            return this._m_button.y;
        };
        UIButtonImg.prototype.getZ = function () {
            return this._m_button.z;
        };
        UIButtonImg.prototype.move = function (_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            return;
        };
        UIButtonImg.prototype.setPosition = function (_x, _y) {
            this._m_button.setPosition(_x, _y);
            return;
        };
        UIButtonImg.prototype.setAnchor = function (_x, _y) {
            this._m_button.setOrigin(_x, _y);
            return;
        };
        UIButtonImg.prototype.getAnchorX = function () {
            return this._m_button.originX;
        };
        UIButtonImg.prototype.getAnchorY = function () {
            return this._m_button.originY;
        };
        UIButtonImg.prototype.enable = function () {
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            return;
        };
        UIButtonImg.prototype.disable = function () {
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            return;
        };
        UIButtonImg.prototype.setImage = function (_texture, _frame) {
            this._m_button.setTexture(_texture, _frame);
            return;
        };
        UIButtonImg.prototype.destroy = function () {
            this._m_button.destroy();
            this.destroy();
        };
        UIButtonImg.prototype._onButtonPressed = function () {
            this._m_button.setScale(this._m_pressedScale);
            this._m_button.setFrame(this._m_pressedFrame);
            this._m_listenerManager.call("buttonPressed", this, undefined);
            return;
        };
        UIButtonImg.prototype._onButtonReleased = function () {
            this._m_button.setScale(this._m_originScale);
            this._m_button.setFrame(this._m_idleFrame);
            this._m_listenerManager.call("buttonReleased", this, undefined);
            return;
        };
        UIButtonImg.prototype._onButtonOver = function () {
            this._m_button.setScale(this._m_hoverScale);
            this._m_button.setFrame(this._m_hoverFrame);
            this._m_listenerManager.call("buttonOver", this, undefined);
            return;
        };
        UIButtonImg.prototype._onButtonOverOut = function () {
            this._m_button.setScale(this._m_originScale);
            this._m_button.setFrame(this._m_idleFrame);
            this._m_listenerManager.call("buttonOverOut", this, undefined);
            return;
        };
        return UIButtonImg;
    }(uiObject_4.UIObject));
    exports.UIButtonImg = UIButtonImg;
});
define("managers/uiManager/uiLabelBox", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UILabelBox = void 0;
    var UILabelBox = (function (_super) {
        __extends(UILabelBox, _super);
        function UILabelBox(_x, _y, _scene, _text, _tint, _boxTint) {
            var _this = _super.call(this) || this;
            var listenerManager = _this._m_listenerManager;
            listenerManager.addEvent("textChanged");
            listenerManager.addEvent("pointerdown");
            listenerManager.addEvent("pointerup");
            listenerManager.addEvent("pointerout");
            listenerManager.addEvent("pointerover");
            _this._m_paddingLeft = 10;
            var bg = _scene.add.image(_x, _y, "game_art", "text_box.png");
            _this._m_bg = bg;
            if (_boxTint !== undefined) {
                bg.setTint(_boxTint);
            }
            bg.setOrigin(0.0, 0.5);
            var label = _scene.add.bitmapText(0, 0, "odin_rounded", _text, 20);
            label.setOrigin(0.0, 0.70);
            if (_tint !== undefined) {
                label.setTint(_tint);
            }
            else {
                label.setTint(0x000000);
            }
            _this._m_label = label;
            _this._updateLabel();
            _this._m_isInteractive = false;
            return _this;
        }
        UILabelBox.prototype.getWidth = function () {
            return this._m_bg.width;
        };
        UILabelBox.prototype.getHeight = function () {
            return this._m_bg.height;
        };
        UILabelBox.prototype.getX = function () {
            return this._m_bg.x;
        };
        UILabelBox.prototype.getY = function () {
            return this._m_bg.y;
        };
        UILabelBox.prototype.getZ = function () {
            return this._m_bg.depth;
        };
        UILabelBox.prototype.setZ = function (_z) {
            this._m_bg.depth = _z;
            this._m_label.depth = _z;
            return;
        };
        UILabelBox.prototype.move = function (_x, _y) {
            this._m_bg.x += _x;
            this._m_bg.y += _y;
            this._updateLabel();
            return;
        };
        UILabelBox.prototype.setPosition = function (_x, _y) {
            this._m_bg.setPosition(_x, _y);
            this._updateLabel();
            return;
        };
        UILabelBox.prototype.setAnchor = function (_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this._updateLabel();
            return;
        };
        UILabelBox.prototype.getAnchorX = function () {
            return this._m_bg.originX;
        };
        UILabelBox.prototype.getAnchorY = function () {
            return this._m_bg.originY;
        };
        UILabelBox.prototype.enable = function () {
            this._m_bg.setActive(true);
            this._m_bg.setVisible(true);
            this._m_label.setActive(true);
            this._m_label.setVisible(true);
            return;
        };
        UILabelBox.prototype.disable = function () {
            this._m_bg.setActive(false);
            this._m_bg.setVisible(false);
            this._m_label.setActive(false);
            this._m_label.setVisible(false);
            return;
        };
        UILabelBox.prototype.setTextTint = function (_tint) {
            this._m_label.setTint(_tint);
            return;
        };
        UILabelBox.prototype.setBoxTint = function (_tint) {
            this._m_bg.setTint(_tint);
            return;
        };
        UILabelBox.prototype.setText = function (_text) {
            this._m_label.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        };
        UILabelBox.prototype.getText = function () {
            return this._m_label.text;
        };
        UILabelBox.prototype.setPaddingLeft = function (_padding) {
            this._m_paddingLeft = _padding;
            this._updateLabel();
            return;
        };
        UILabelBox.prototype.setInteractive = function () {
            if (!this._m_isInteractive) {
                this._m_isInteractive = true;
                var bg = this._m_bg;
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
        };
        UILabelBox.prototype.destroy = function () {
            this._m_label.destroy();
            this._m_label = null;
            this._m_bg.destroy();
            this._m_bg = null;
            _super.prototype.destroy.call(this);
            return;
        };
        UILabelBox.prototype._updateLabel = function () {
            var bg = this._m_bg;
            var x = bg.x - (bg.width * bg.originX) + this._m_paddingLeft;
            var y = bg.y - (bg.height * bg.originY) + (bg.height * 0.5);
            this._m_label.setPosition(x, y);
            return;
        };
        return UILabelBox;
    }(uiObject_5.UIObject));
    exports.UILabelBox = UILabelBox;
});
define("managers/uiManager/uiComboBox", ["require", "exports", "commons/stEnums", "managers/uiManager/uiLabelBox", "managers/uiManager/uiObject"], function (require, exports, stEnums_7, uiLabelBox_1, uiObject_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIComboBox = void 0;
    var UIComboBox = (function (_super) {
        __extends(UIComboBox, _super);
        function UIComboBox(_x, _y, _scene) {
            var _this = _super.call(this) || this;
            _this._m_scene = _scene;
            _this._m_isOpen = false;
            _this._m_listenerManager.addEvent("selectionChanged");
            _this._m_listenerManager.addEvent("optionsChanged");
            var button = _scene.add.image(0, 0, "game_art", "combo_but_normal.png");
            _this._m_button = button;
            button.setOrigin(0.0, 0.0);
            button.setInteractive();
            button.on("pointerdown", function () {
                button.setFrame("combo_but_press.png");
                return;
            }, _this);
            button.on("pointerup", _this._onButtonRelease, _this);
            button.on("pointerover", function () {
                button.setFrame("combo_but_hover.png");
                return;
            });
            button.on("pointerout", function () {
                button.setFrame("combo_but_normal.png");
                return;
            });
            _this._m_aOptions = new Array();
            var selectedLabel = new uiLabelBox_1.UILabelBox(_x, _y, _scene, "");
            _this._m_selectedLabel = selectedLabel;
            _this.updateCombo(undefined);
            return _this;
        }
        UIComboBox.prototype.getWidth = function () {
            return this._m_selectedLabel.getWidth() + this._m_button.width;
        };
        UIComboBox.prototype.getHeight = function () {
            return this._m_selectedLabel.getHeight();
        };
        UIComboBox.prototype.getX = function () {
            return this._m_selectedLabel.getX();
        };
        UIComboBox.prototype.getY = function () {
            return this._m_selectedLabel.getY();
        };
        UIComboBox.prototype.getZ = function () {
            return this._m_selectedLabel.getZ();
        };
        UIComboBox.prototype.move = function (_x, _y) {
            this._m_selectedLabel.move(_x, _y);
            this._updatePosition();
            return;
        };
        UIComboBox.prototype.setPosition = function (_x, _y) {
            this._m_selectedLabel.setPosition(_x, _y);
            this._updatePosition();
            return;
        };
        UIComboBox.prototype.setAnchor = function (_x, _y) {
            this._m_selectedLabel.setAnchor(_x, _y);
            this._updatePosition();
            return;
        };
        UIComboBox.prototype.getAnchorX = function () {
            return this._m_selectedLabel.getAnchorX();
        };
        UIComboBox.prototype.getAnchorY = function () {
            return this._m_selectedLabel.getAnchorY();
        };
        UIComboBox.prototype.enable = function () {
            this._m_selectedLabel.enable();
            if (this._m_isOpen) {
                var aOptionLabels = this._m_aOptions;
                var size = aOptionLabels.length;
                for (var i = 0; i < size; ++i) {
                    aOptionLabels[i].enable();
                }
            }
            this._m_button.setActive(true);
            this._m_button.setVisible(true);
            return;
        };
        UIComboBox.prototype.disable = function () {
            this.closeCombo();
            this._m_selectedLabel.disable();
            this._m_button.setActive(false);
            this._m_button.setVisible(false);
            return;
        };
        UIComboBox.prototype.setSelection = function (_option) {
            this._m_selectedLabel.setText(_option);
            this._m_listenerManager.call("selectionChanged", this, _option);
            return;
        };
        UIComboBox.prototype.updateCombo = function (_options) {
            this._m_aOptionsStr = _options;
            this._updateLabels();
            this._updatePosition();
            this.setSelection("");
            this.closeCombo();
            this._m_listenerManager.call("optionsChanged", this, _options);
            return;
        };
        UIComboBox.prototype.openCombo = function () {
            if (!this._m_isOpen) {
                var aOptionsStr = this._m_aOptionsStr;
                if (aOptionsStr === undefined) {
                    return;
                }
                if (aOptionsStr.length <= 0) {
                    return;
                }
                this._m_isOpen = true;
                var aOptions = this._m_aOptions;
                var size = aOptionsStr.length;
                var selectedLabel = this._m_selectedLabel;
                for (var i = 0; i < size; ++i) {
                    aOptions[i].enable();
                }
            }
            return;
        };
        UIComboBox.prototype.closeCombo = function () {
            if (this._m_isOpen) {
                var aOptions = this._m_aOptions;
                var size = aOptions.length;
                for (var i = 0; i < size; ++i) {
                    aOptions[i].disable();
                }
                this._m_isOpen = false;
            }
            return;
        };
        UIComboBox.prototype.destroy = function () {
            this._m_selectedLabel.destroy();
            this._m_aOptions.forEach(function (_value) {
                _value.destroy();
            });
            this._m_aOptions = null;
            this._m_aOptionsStr = null;
            _super.prototype.destroy.call(this);
            return;
        };
        UIComboBox.prototype._onButtonRelease = function () {
            if (this._m_isOpen) {
                this.closeCombo();
            }
            else {
                this.openCombo();
            }
            this._m_button.setFrame("combo_but_normal.png");
            return;
        };
        UIComboBox.prototype._updateLabels = function () {
            var aOptionsStr = this._m_aOptionsStr;
            if (aOptionsStr === undefined) {
                return;
            }
            var size = aOptionsStr.length;
            var aOptionLabels = this._m_aOptions;
            for (var i = 0; i < size; ++i) {
                if (aOptionLabels.length <= size) {
                    var optionLabel = new uiLabelBox_1.UILabelBox(0, 0, this._m_scene, aOptionsStr[i]);
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
        };
        UIComboBox.prototype._updatePosition = function () {
            var selectedLabel = this._m_selectedLabel;
            var x = selectedLabel.getX()
                - (selectedLabel.getWidth() * selectedLabel.getAnchorX());
            var y = selectedLabel.getY()
                - (selectedLabel.getHeight() * selectedLabel.getAnchorY());
            this._m_button.setPosition(x + selectedLabel.getWidth(), y);
            y += selectedLabel.getHeight();
            var aOptions = this._m_aOptions;
            var size = aOptions.length;
            var optionLabel;
            for (var i = 0; i < size; ++i) {
                optionLabel = aOptions[i];
                optionLabel.setPosition(x, y);
                y += optionLabel.getHeight();
            }
            return;
        };
        UIComboBox.prototype._onOptionDown = function (_uiLabel, _args) {
            var labelBox = _uiLabel;
            labelBox.setBoxTint(stEnums_7.ST_COLOR_ID.kBlack);
            labelBox.setTextTint(stEnums_7.ST_COLOR_ID.kWhite);
            return;
        };
        UIComboBox.prototype._onOptionUp = function (_uiLabel, _args) {
            var labelBox = _uiLabel;
            this.setSelection(labelBox.getText());
            labelBox.setBoxTint(stEnums_7.ST_COLOR_ID.kWhite);
            labelBox.setTextTint(stEnums_7.ST_COLOR_ID.kBlack);
            this.closeCombo();
            return;
        };
        UIComboBox.prototype._onOptionOver = function (_uiLabel, _args) {
            var labelBox = _uiLabel;
            labelBox.setBoxTint(stEnums_7.ST_COLOR_ID.kGray);
            labelBox.setTextTint(stEnums_7.ST_COLOR_ID.kBlack);
            return;
        };
        UIComboBox.prototype._onOptionOut = function (_uiLabel, _args) {
            var labelBox = _uiLabel;
            labelBox.setBoxTint(stEnums_7.ST_COLOR_ID.kWhite);
            labelBox.setTextTint(stEnums_7.ST_COLOR_ID.kBlack);
            return;
        };
        return UIComboBox;
    }(uiObject_6.UIObject));
    exports.UIComboBox = UIComboBox;
});
define("managers/uiManager/uiImage", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIImage = void 0;
    var UIImage = (function (_super) {
        __extends(UIImage, _super);
        function UIImage(_x, _y, _scene, _texture, _frame) {
            var _this = _super.call(this) || this;
            _this._m_image = _scene.add.image(_x, _y, _texture, _frame);
            return _this;
        }
        UIImage.prototype.getWidth = function () {
            return this._m_image.width;
        };
        UIImage.prototype.getHeight = function () {
            return this._m_image.height;
        };
        UIImage.prototype.getX = function () {
            return this._m_image.x;
        };
        UIImage.prototype.getY = function () {
            return this._m_image.y;
        };
        UIImage.prototype.getZ = function () {
            return this._m_image.z;
        };
        UIImage.prototype.move = function (_x, _y) {
            this._m_image.x += _x;
            this._m_image.y += _y;
            return;
        };
        UIImage.prototype.setPosition = function (_x, _y) {
            this._m_image.x = _x;
            this._m_image.y = _y;
            return;
        };
        UIImage.prototype.setAnchor = function (_x, _y) {
            this._m_image.setOrigin(_x, _y);
            return;
        };
        UIImage.prototype.getAnchorX = function () {
            return this._m_image.originX;
        };
        UIImage.prototype.getAnchorY = function () {
            return this._m_image.originY;
        };
        UIImage.prototype.enable = function () {
            this._m_image.setActive(true);
            this._m_image.setVisible(true);
            return;
        };
        UIImage.prototype.disable = function () {
            this._m_image.setActive(false);
            this._m_image.setVisible(false);
            return;
        };
        UIImage.prototype.setImage = function (_texture, _frame) {
            this._m_image.setTexture(_texture, _frame);
            return;
        };
        return UIImage;
    }(uiObject_7.UIObject));
    exports.UIImage = UIImage;
});
define("managers/uiManager/uiSlider", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISlider = void 0;
    var UISlider = (function (_super) {
        __extends(UISlider, _super);
        function UISlider(_x, _y, _scene, _min, _max) {
            var _this = _super.call(this) || this;
            _this._m_listenerManager.addEvent("valueChanged");
            var group = _scene.add.group();
            _this._m_bg = _scene.add.image(_x, _y, "game_art", "slider_bg.png");
            _this._m_bar = _scene.add.image(_x, _y, "game_art", "slider_bar.png");
            var button = _scene.add.image(_x, _y, "game_art", "slider_button.png");
            button.setInteractive();
            _scene.input.setDraggable(button);
            button.on("drag", _this._onButtonDrag, _this);
            _this._m_button = button;
            group.add(_this._m_bg);
            group.add(_this._m_bar);
            group.add(_this._m_button);
            _this._m_group = group;
            _this._m_min = _min;
            _this._m_max = _max;
            _this._m_value = _min;
            _this._updateData();
            _this.updateValue();
            return _this;
        }
        UISlider.prototype.setValue = function (_value) {
            if (_value < this._m_min) {
                _value = this._m_min;
            }
            else if (_value > this._m_max) {
                _value = this._m_max;
            }
            this._m_value = _value;
            this.updateButton();
            return;
        };
        UISlider.prototype.getValue = function () {
            return this._m_value;
        };
        UISlider.prototype.updateValue = function () {
            var dt = this._m_maxButtonX - this._m_minButtonX;
            var value = (this._m_button.x - this._m_minButtonX) / dt;
            var minX = this._m_min;
            this._m_value = minX + ((this._m_max - minX) * value);
            this._m_listenerManager.call("valueChanged", this, undefined);
            this._cropBar(value);
            return;
        };
        UISlider.prototype.updateButton = function () {
            var dt = this._m_max - this._m_min;
            var value = (this._m_value - this._m_min) / dt;
            var minX = this._m_minButtonX;
            var x = minX + ((this._m_maxButtonX - minX) * value);
            this._m_button.setX(x);
            this._cropBar(value);
            this._m_listenerManager.call("valueChanged", this, undefined);
            return;
        };
        UISlider.prototype.getWidth = function () {
            return this._m_bg.width;
        };
        UISlider.prototype.getHeight = function () {
            return this._m_bg.height;
        };
        UISlider.prototype.getX = function () {
            return this._m_bg.x;
        };
        UISlider.prototype.getY = function () {
            return this._m_bg.y;
        };
        UISlider.prototype.getZ = function () {
            return this._m_bg.depth;
        };
        UISlider.prototype.move = function (_x, _y) {
            this._m_group.incXY(_x, _y);
            this._updateData();
            return;
        };
        UISlider.prototype.setPosition = function (_x, _y) {
            var bg = this._m_bg;
            var x = _x - bg.x;
            var y = _y - bg.y;
            this._m_group.incXY(x, y);
            var bar = this._m_bar;
            var bgWidth = bg.frame.width;
            var bgHeight = bg.frame.height;
            bar.x = bg.x - (bgWidth * bg.originX) + (bgWidth * 0.5);
            bar.y = bg.y - (bgHeight * bg.originY) + (bgHeight * 0.5);
            this._updateData();
            this.updateButton();
            return;
        };
        UISlider.prototype.setAnchor = function (_x, _y) {
            this._m_bg.setOrigin(_x, _y);
            this._updateData();
            return;
        };
        UISlider.prototype.getAnchorX = function () {
            return this._m_bg.originX;
        };
        UISlider.prototype.getAnchorY = function () {
            return this._m_bg.originY;
        };
        UISlider.prototype.enable = function () {
            this._m_group.setVisible(true);
            this._m_group.setActive(true);
            return;
        };
        UISlider.prototype.disable = function () {
            this._m_group.setVisible(false);
            this._m_group.setActive(false);
            return;
        };
        UISlider.prototype._cropBar = function (_value) {
            var bar = this._m_bar;
            bar.setCrop(bar.frame.x, bar.frame.y, bar.frame.width * _value, bar.frame.height);
            return;
        };
        UISlider.prototype._onButtonDrag = function (_pointer, _dragX, _dragY) {
            this._setButtonX(_pointer.x);
            this.updateValue();
            return;
        };
        UISlider.prototype._setButtonX = function (_x) {
            if (_x < this._m_minButtonX) {
                _x = this._m_minButtonX;
            }
            else if (_x > this._m_maxButtonX) {
                _x = this._m_maxButtonX;
            }
            this._m_button.setX(_x);
            return;
        };
        UISlider.prototype._updateData = function () {
            var bg = this._m_bg;
            var x = bg.x - (bg.frame.width * bg.originX);
            var bar = this._m_bar;
            this._m_minButtonX = x;
            this._m_maxButtonX = x + bar.frame.width;
            return;
        };
        return UISlider;
    }(uiObject_8.UIObject));
    exports.UISlider = UISlider;
});
define("steeringBehavior/forceSeek", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_8, master_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SeekForce = void 0;
    var SeekForce = (function () {
        function SeekForce() {
        }
        SeekForce.prototype.init = function (_self, _target, _force, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_seekMaxLength = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_seekForce = new Phaser.Math.Vector2();
            this._m_desireVelocity = new Phaser.Math.Vector2();
            var master = master_3.Master.GetInstance();
            this._m_debugManager = master.getManager(stEnums_8.ST_MANAGER_ID.kDebugManager);
            return;
        };
        SeekForce.prototype.setTarget = function (_newTarget) {
            this._m_target = _newTarget;
        };
        SeekForce.prototype.setMaxMagnitude = function (_magnitude) {
            this._m_seekMaxLength = _magnitude;
            return;
        };
        SeekForce.prototype.getMaxMagnitude = function () {
            return this._m_seekMaxLength;
        };
        SeekForce.prototype.getActualForce = function () {
            return this._m_seekForce.length();
        };
        SeekForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        SeekForce.prototype.update = function (_dt) {
            var target = this._m_target;
            var self = this._m_self;
            var forceController = this._m_controller;
            var actualVelocity = forceController.getVelocity();
            var desireVelocity = this._m_desireVelocity;
            desireVelocity.set(target.x - self.x, target.y - self.y);
            desireVelocity.setLength(this._m_seekMaxLength);
            var seekForce = this._m_seekForce;
            seekForce.copy(desireVelocity);
            seekForce.subtract(actualVelocity);
            seekForce.limit(this._m_seekMaxLength);
            forceController.addSteerForce(seekForce.x, seekForce.y);
            return;
        };
        SeekForce.prototype.updateDebug = function (_dt) {
            var self = this._m_self;
            var desireVelocity = this._m_desireVelocity;
            this._m_debugManager.drawLine(self.x, self.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_8.ST_COLOR_ID.kBlack);
            var actualVelocity = this._m_controller.getVelocity();
            this._m_debugManager.drawLine(self.x + actualVelocity.x, self.y + actualVelocity.y, self.x + desireVelocity.x, self.y + desireVelocity.y, 1, stEnums_8.ST_COLOR_ID.kRed);
            return;
        };
        SeekForce.prototype.onDebugEnable = function () {
            return;
        };
        SeekForce.prototype.onDebugDisable = function () {
            return;
        };
        SeekForce.prototype.getType = function () {
            return stEnums_8.ST_STEER_FORCE.kSeek;
        };
        SeekForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_seekForce = null;
            this._m_desireVelocity = null;
            this._m_target = null;
            this._m_self = null;
            this._m_debugManager = null;
            return;
        };
        return SeekForce;
    }());
    exports.SeekForce = SeekForce;
});
define("managers/uiManager/uiControllers/UIForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForce = void 0;
    var UIForce = (function () {
        function UIForce() {
        }
        UIForce.prototype.update = function () {
            return;
        };
        UIForce.prototype.destroy = function () {
            return;
        };
        UIForce.prototype.getBox = function () {
            return null;
        };
        return UIForce;
    }());
    exports.UIForce = UIForce;
});
define("managers/uiManager/uiControllers/UIForceSeek", ["require", "exports", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIForce"], function (require, exports, uiBox_2, uiLabel_3, uiSlider_1, UIForce_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceSeek = void 0;
    var UIForceSeek = (function (_super) {
        __extends(UIForceSeek, _super);
        function UIForceSeek(_scene, _force) {
            var _this = _super.call(this) || this;
            var box = uiBox_2.UIBox.CreateContentBox(0, 0, _scene);
            _this._m_box = box;
            _this._m_title = uiLabel_3.UILabel.CreateH2(0, 0, _scene, "Seek Force");
            box.add(_this._m_title);
            _this._m_force = uiLabel_3.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(_this._m_force);
            _this._m_maxMagnitude = uiLabel_3.UILabel.CreateStyleB(0, 0, _scene, "#");
            box.add(_this._m_maxMagnitude);
            _this._m_forceSlider = new uiSlider_1.UISlider(0, 0, _scene, 1, 300);
            _this._m_forceSlider.subscribe("valueChanged", "UIForceSeek", function (_sender, _args) {
                var slider = _sender;
                var maxMagnitude = slider.getValue();
                this.setMaximumMagnitudeLabel(maxMagnitude);
                if (this._m_seek !== undefined) {
                    this._m_seek.setMaxMagnitude(maxMagnitude);
                }
                return;
            }, _this);
            box.add(_this._m_forceSlider);
            _this.setTarget(_force);
            return _this;
        }
        UIForceSeek.prototype.update = function () {
            if (this._m_seek !== undefined) {
                this.setForceLabel(this._m_seek.getActualForce());
            }
            return;
        };
        UIForceSeek.prototype.setTarget = function (_seekForce) {
            this._m_seek = _seekForce;
            if (_seekForce !== undefined) {
                this.setForceLabel(_seekForce.getActualForce());
                this._m_forceSlider.setValue(_seekForce.getMaxMagnitude());
            }
            return;
        };
        UIForceSeek.prototype.setMaximumMagnitudeLabel = function (_maxForce) {
            this._m_maxMagnitude.setText("Max. Magnitude: " + _maxForce.toPrecision(3) + " uN.");
            return;
        };
        UIForceSeek.prototype.setForceLabel = function (_force) {
            this._m_force.setText("Force Magnitude: " + _force.toPrecision(3) + " uN.");
            return;
        };
        UIForceSeek.prototype.getBox = function () {
            return this._m_box;
        };
        UIForceSeek.prototype.destroy = function () {
            this._m_box.destroy();
            this._m_seek = undefined;
            _super.prototype.destroy.call(this);
            return;
        };
        return UIForceSeek;
    }(UIForce_1.UIForce));
    exports.UIForceSeek = UIForceSeek;
});
define("managers/uiManager/uiControllers/UIForceFactory", ["require", "exports", "commons/stEnums", "managers/uiManager/uiControllers/UIForceSeek"], function (require, exports, stEnums_9, UIForceSeek_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceFactory = void 0;
    var UIForceFactory = (function () {
        function UIForceFactory() {
            var aFactories = new Map();
            this._hFactories = aFactories;
            aFactories.set(stEnums_9.ST_STEER_FORCE.kSeek, this.createUIForceSeek);
            return;
        }
        UIForceFactory.prototype.createUIForce = function (_scene, _force) {
            var type = _force.getType();
            var aFactories = this._hFactories;
            if (aFactories.has(type)) {
                var fnFactory = aFactories.get(type);
                return fnFactory.call(this, _scene, _force);
            }
            throw new Error("No Factory for : " + _force + " force.");
        };
        UIForceFactory.prototype.createUIForceSeek = function (_scene, _force) {
            var uiForce = new UIForceSeek_1.UIForceSeek(_scene, _force);
            return uiForce;
        };
        return UIForceFactory;
    }());
    exports.UIForceFactory = UIForceFactory;
});
define("managers/uiManager/uiControllers/UIForceController", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiComboBox", "managers/uiManager/uiImage", "managers/uiManager/uiLabel", "managers/uiManager/uiSlider", "managers/uiManager/uiControllers/UIController", "managers/uiManager/uiControllers/UIForceFactory"], function (require, exports, stEnums_10, uiBox_3, uiComboBox_1, uiImage_1, uiLabel_4, uiSlider_2, UIController_2, UIForceFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIForceController = void 0;
    var UIForceController = (function (_super) {
        __extends(UIForceController, _super);
        function UIForceController(_x, _y, _scene, _target) {
            var _this = _super.call(this) || this;
            var box = uiBox_3.UIBox.CreateBorderBox(_x, _y, _scene);
            _this._ui_box = box;
            box.setElementsGap(7.5);
            var actorName = uiLabel_4.UILabel.CreateStyleA(0, 0, _scene, "", 32);
            _this._ui_actorName = actorName;
            actorName.setTint(stEnums_10.ST_COLOR_ID.kGold);
            box.add(actorName);
            box.add(new uiImage_1.UIImage(0, 0, _scene, "game_art", "separator_a.png"));
            _this._ui_actualSpeed = uiLabel_4.UILabel.CreateStyleB(0, 0, _scene, "#");
            _this._ui_actualSpeed.setTint(stEnums_10.ST_COLOR_ID.kSkyBlueNeon);
            box.add(_this._ui_actualSpeed);
            _this._ui_maxSpeed = uiLabel_4.UILabel.CreateStyleB(0, 0, _scene, "#");
            _this._ui_maxSpeed.setTint(stEnums_10.ST_COLOR_ID.kSkyBlueNeon);
            box.add(_this._ui_maxSpeed);
            _this._ui_maxSpeedSlider = new uiSlider_2.UISlider(0, 0, _scene, 1, 300);
            box.add(_this._ui_maxSpeedSlider);
            _this._ui_maxSpeedSlider.subscribe("valueChanged", "label", function (_sender, _args) {
                var slider = _sender;
                var maxSpeed = slider.getValue();
                this.setMaxSpeed(maxSpeed);
                if (this._m_forceController !== undefined) {
                    this._m_forceController.setMaxSpeed(maxSpeed);
                }
                return;
            }, _this);
            _this._ui_mass = uiLabel_4.UILabel.CreateStyleB(0, 0, _scene, "#");
            _this._ui_mass.setTint(stEnums_10.ST_COLOR_ID.kSkyBlueNeon);
            box.add(_this._ui_mass);
            _this._ui_massSlider = new uiSlider_2.UISlider(0, 0, _scene, 1, 10);
            box.add(_this._ui_massSlider);
            _this._ui_massSlider.subscribe("valueChanged", "label", function (_sender, _args) {
                var slider = _sender;
                var mass = slider.getValue();
                this.setMass(mass);
                if (this._m_forceController !== undefined) {
                    this._m_forceController.setMass(mass);
                }
                return;
            }, _this);
            var comboBox = new uiComboBox_1.UIComboBox(0, 0, _scene);
            comboBox.updateCombo(["Option 1", "Option 2", "Option 3"]);
            box.add(comboBox);
            box.setLeftAlignment();
            _this.uiForceFactory = new UIForceFactory_1.UIForceFactory();
            _this._m_aUIForce = new Array();
            _this.setTarget(undefined);
            return _this;
        }
        UIForceController.prototype.update = function () {
            if (this._m_forceController !== undefined) {
                this.setActualSpeed(this._m_forceController.getSpeed());
                this._m_aUIForce.forEach(this._updateUIForce, this);
            }
            return;
        };
        UIForceController.prototype.setTarget = function (_actor) {
            if (_actor === undefined) {
                this._m_target = undefined;
                this._m_forceController = undefined;
                this.disableUI();
                return;
            }
            this._removeForces();
            this._m_target = _actor;
            var forceController = _actor.getComponent(stEnums_10.ST_COMPONENT_ID.kForceController);
            this._m_forceController = forceController;
            this.setActorName(_actor.getName());
            this._ui_massSlider.setValue(forceController.getMass());
            this._ui_maxSpeedSlider.setValue(forceController.getMaxSpeed());
            var aForces = forceController.getForces();
            var uiForceFactory = this.uiForceFactory;
            var scene = this.m_master.getSimulationScene();
            aForces.forEach(function (_force) {
                var force = uiForceFactory.createUIForce(scene, _force);
                this._addUIForce(force);
                return;
            }, this);
            this._ui_box.updateBox();
            return;
        };
        UIForceController.prototype.disableUI = function () {
            this.setActorName("");
            this.setActualSpeed(0);
            this.setMaxSpeed(0);
            this.setMass(0);
            return;
        };
        UIForceController.prototype.setActorName = function (_name) {
            this._ui_actorName.setText(_name);
            return;
        };
        UIForceController.prototype.setActualSpeed = function (_speed) {
            this._ui_actualSpeed.setText("Speed: " + _speed.toPrecision(3) + " km/secs. ");
            return;
        };
        UIForceController.prototype.setMaxSpeed = function (_speed) {
            this._ui_maxSpeed.setText("Max. Speed: " + _speed.toPrecision(3) + " km/secs. ");
            return;
        };
        UIForceController.prototype.setMass = function (_mass) {
            this._ui_mass.setText("Mass: " + _mass.toPrecision(3) + " tg.");
            return;
        };
        UIForceController.prototype.destroy = function () {
            this._m_target = undefined;
            this._m_forceController = undefined;
            this._removeForces();
            this._ui_box.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        UIForceController.prototype._updateUIForce = function (_uiForce) {
            _uiForce.update();
            return;
        };
        UIForceController.prototype._addUIForce = function (_uiForce) {
            this._m_aUIForce.push(_uiForce);
            var box = _uiForce.getBox();
            this._ui_box.add(box);
            return;
        };
        UIForceController.prototype._removeForces = function () {
            var box = this._ui_box;
            var aForces = this._m_aUIForce;
            var size = aForces.length;
            for (var i = 0; i < size; ++i) {
                box.remove(aForces[i].getBox());
                aForces[i].destroy();
            }
            aForces.splice(0, size);
            return;
        };
        return UIForceController;
    }(UIController_2.UIController));
    exports.UIForceController = UIForceController;
});
define("managers/uiManager/uiText", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIText = void 0;
    var UIText = (function (_super) {
        __extends(UIText, _super);
        function UIText(_x, _y, _scene, _text, _fontKey, _fontSize, _maxWidth) {
            var _this = _super.call(this) || this;
            _this._m_listenerManager.addEvent("textChanged");
            var text = _scene.add.bitmapText(_x, _y, _fontKey, _text, _fontSize);
            _this._m_text = text;
            text.setMaxWidth(_maxWidth);
            return _this;
        }
        UIText.CreateStyleA = function (_x, _y, _scene, _text, _fontSize, _maxWidth) {
            var fontSize = 20;
            if (_fontSize !== undefined) {
                fontSize = _fontSize;
            }
            var maxWidth = 250;
            if (_maxWidth !== undefined) {
                maxWidth = _maxWidth;
            }
            var text = new UIText(_x, _y, _scene, _text, "supercomputer", fontSize, maxWidth);
            return text;
        };
        UIText.CreateStyleB = function (_x, _y, _scene, _text, _fontSize, _maxWidth) {
            var fontSize = 20;
            if (_fontSize !== undefined) {
                fontSize = _fontSize;
            }
            var maxWidth = 250;
            if (_maxWidth !== undefined) {
                maxWidth = _maxWidth;
            }
            var text = new UIText(_x, _y, _scene, _text, "odin_rounded", fontSize, maxWidth);
            return text;
        };
        UIText.prototype.getWidth = function () {
            return this._m_text.width;
        };
        UIText.prototype.getHeight = function () {
            return this._m_text.height;
        };
        UIText.prototype.getX = function () {
            return this._m_text.x;
        };
        UIText.prototype.getY = function () {
            return this._m_text.y;
        };
        UIText.prototype.getZ = function () {
            return this._m_text.depth;
        };
        UIText.prototype.move = function (_x, _y) {
            this._m_text.x += _x;
            this._m_text.y += _y;
            return;
        };
        UIText.prototype.setPosition = function (_x, _y) {
            this._m_text.setPosition(_x, _y);
            return;
        };
        UIText.prototype.setAnchor = function (_x, _y) {
            this._m_text.setOrigin(_x, _y);
            return;
        };
        UIText.prototype.getAnchorX = function () {
            return this._m_text.originX;
        };
        UIText.prototype.getAnchorY = function () {
            return this._m_text.originY;
        };
        UIText.prototype.enable = function () {
            this._m_text.setVisible(true);
            this._m_text.setActive(true);
            return;
        };
        UIText.prototype.disable = function () {
            this._m_text.setVisible(false);
            this._m_text.setActive(false);
            return;
        };
        UIText.prototype.setMaxWidth = function (_width) {
            this._m_text.setMaxWidth(_width);
            return;
        };
        UIText.prototype.setText = function (_text) {
            this._m_text.setText(_text);
            this._m_listenerManager.call("textChanged", this, undefined);
            return;
        };
        UIText.prototype.setTint = function (_color) {
            this._m_text.setTint(_color);
            return;
        };
        UIText.prototype.leftAlign = function () {
            this._m_text.setLeftAlign();
            return;
        };
        UIText.prototype.rightAlign = function () {
            this._m_text.setRightAlign();
            return;
        };
        UIText.prototype.centerAlign = function () {
            this._m_text.setCenterAlign();
            return;
        };
        UIText.prototype.destroy = function () {
            this._m_text.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        return UIText;
    }(uiObject_9.UIObject));
    exports.UIText = UIText;
});
define("managers/uiManager/uiControllers/UIMessageBox", ["require", "exports", "commons/stEnums", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiButton", "managers/uiManager/uiText", "managers/uiManager/uiControllers/UIDialogBox"], function (require, exports, stEnums_11, uiBox_4, uiButton_1, uiText_1, UIDialogBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIMessageBox = void 0;
    var UIMessageBox = (function (_super) {
        __extends(UIMessageBox, _super);
        function UIMessageBox(_x, _y, _scene, _title, _message) {
            var _this = _super.call(this, _x, _y, _scene, _title) || this;
            var message = uiText_1.UIText.CreateStyleB(0, 0, _scene, _message);
            _this._m_message = message;
            _this._m_box.add(message);
            return _this;
        }
        UIMessageBox.CreateAccept = function (_x, _y, _scene, _title, _message, _callback, _context) {
            var messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);
            var buttonsBox = uiBox_4.UIBox.CreateContentBoxB(0, 0, _scene);
            buttonsBox.setElementsGap(0);
            var accept = uiButton_1.UIButton.CreateButton(_x, _y, _scene, "Accept");
            accept.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_11.ST_BUTTON.kAccept);
                return;
            }, messageBox);
            buttonsBox.add(accept);
            messageBox._m_box.add(buttonsBox);
            messageBox._m_fn = _callback;
            messageBox._m_context = _context;
            return messageBox;
        };
        UIMessageBox.CreateYesNo = function (_x, _y, _scene, _title, _message, _callback, _context) {
            var messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);
            var buttonsBox = uiBox_4.UIBox.CreateContentBoxB(0, 0, _scene);
            buttonsBox.setHorizontalBox();
            var butYes = uiButton_1.UIButton.CreateButton(_x, _y, _scene, "Yes");
            butYes.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_11.ST_BUTTON.kYes);
                return;
            }, messageBox);
            buttonsBox.add(butYes);
            var butNo = uiButton_1.UIButton.CreateButton(_x, _y, _scene, "No");
            butNo.subscribe("buttonReleased", "DialogBox", function (_sender, _args) {
                this.close();
                this._m_fn.call(this._m_context, stEnums_11.ST_BUTTON.kNo);
                return;
            }, messageBox);
            buttonsBox.add(butNo);
            messageBox._m_box.add(buttonsBox);
            messageBox._m_fn = _callback;
            messageBox._m_context = _context;
            return messageBox;
        };
        UIMessageBox.prototype.setMessage = function (_msg) {
            this._m_message.setText(_msg);
            this._m_box.updateBox();
            return;
        };
        UIMessageBox.prototype.destroy = function () {
            this._m_message.destroy();
            this._m_message = null;
            _super.prototype.destroy.call(this);
            return;
        };
        return UIMessageBox;
    }(UIDialogBox_1.UIDialogBox));
    exports.UIMessageBox = UIMessageBox;
});
define("managers/uiManager/uiControllers/UISimulationController", ["require", "exports", "managers/uiManager/uiBox/uiBox", "managers/uiManager/uiButtonImg", "managers/uiManager/uiLabel", "managers/uiManager/uiControllers/UIController"], function (require, exports, uiBox_5, uiButtonImg_1, uiLabel_5, UIController_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISimulationController = void 0;
    var UISimulationController = (function (_super) {
        __extends(UISimulationController, _super);
        function UISimulationController(_x, _y, _scene, _title, _target) {
            var _this = _super.call(this) || this;
            var box = uiBox_5.UIBox.CreateBorderBox(_x, _y, _scene);
            box.setAnchor(0.5, 0);
            _this._m_box = box;
            _this._ui_boxTitle = "Box title";
            if (_title !== undefined) {
                _this._ui_boxTitle = _title;
            }
            _this._m_boxTitle = uiLabel_5.UILabel.CreateH2(0, 0, _scene, _this._ui_boxTitle);
            box.add(_this._m_boxTitle);
            return _this;
        }
        UISimulationController.CreateSimControlBox = function (_x, _y, _scene) {
            var simControlBox = new UISimulationController(_x, _y, _scene, "Simulation controls");
            var buttonsBox = uiBox_5.UIBox.CreateContentBoxB(0, 0, _scene);
            buttonsBox.setAnchor(0.5, 0.5);
            buttonsBox.setHorizontalBox();
            buttonsBox.setCenterAlignment();
            buttonsBox.setElementsGap(50);
            var stopButton = uiButtonImg_1.UIButtonImg.CreateStopButtonImg(0, 0, _scene);
            buttonsBox.add(stopButton);
            var playButton = uiButtonImg_1.UIButtonImg.CreatePlayButtonImg(0, 0, _scene);
            buttonsBox.add(playButton);
            var pauseButton = uiButtonImg_1.UIButtonImg.CreatePauseButtonImg(0, 0, _scene);
            buttonsBox.add(pauseButton);
            simControlBox._m_box.add(buttonsBox);
            simControlBox._m_box.setCenterAlignment();
            return simControlBox;
        };
        return UISimulationController;
    }(UIController_3.UIController));
    exports.UISimulationController = UISimulationController;
});
define("scenes/sims/devMax", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "managers/uiManager/uiControllers/UIForceController", "managers/uiManager/uiControllers/UIMessageBox", "managers/uiManager/uiControllers/UISimulationController", "master/master", "steeringBehavior/forceSeek"], function (require, exports, baseActor_1, stEnums_12, cmpforceController_1, cmpSpriteController_1, UIForceController_1, UIMessageBox_1, UISimulationController_1, master_4, forceSeek_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevMax = void 0;
    var ScnDevMax = (function (_super) {
        __extends(ScnDevMax, _super);
        function ScnDevMax() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevMax.prototype.create = function () {
            this._m_master = master_4.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_12.ST_MANAGER_ID.kSimManager);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_1.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_1.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMaxSpeed, 500);
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetMass, 1);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_1.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            targetActor.init();
            targetActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var seek = new forceSeek_1.SeekForce();
            seek.init(shipSprite, targetSprite, 125);
            var forceControl = shipActor.getComponent(stEnums_12.ST_COMPONENT_ID.kForceController);
            forceControl.addForce('seek_1', seek);
            var uiForceController = new UIForceController_1.UIForceController(20, 20, this);
            var uiMessageBox = UIMessageBox_1.UIMessageBox.CreateYesNo(400, 200, this, "Hello World", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", function (_buttonKey) {
                return;
            }, this);
            var uiSimController = UISimulationController_1.UISimulationController.CreateSimControlBox(width * 0.5, 20, this);
            var uiManager = master.getManager(stEnums_12.ST_MANAGER_ID.kUIManager);
            uiManager.addUIController("forceUI", uiForceController);
            uiManager.addUIController("messageBox", uiMessageBox);
            uiManager.addUIController("mediaSimUI", uiSimController);
            uiManager.setTarget(shipActor);
            this._m_master.enableDebugging();
            return;
        };
        ScnDevMax.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            var x = 300 * Math.sin(_time * 0.001);
            var y = 300 * Math.cos(_time * 0.001);
            this._m_target_position.setTo(this._m_target_center.x + x, this._m_target_center.y + y);
            this._m_target.sendMessage(stEnums_12.ST_MESSAGE_ID.kSetPosition, this._m_target_position);
            return;
        };
        ScnDevMax.prototype._onToggleOn = function (_sender, _args) {
            console.log("switch on");
            return;
        };
        ScnDevMax.prototype._onToggleOff = function (_sender, _args) {
            console.log("switch off");
            return;
        };
        ScnDevMax.prototype._onSliderChanged = function (_sender, _args) {
            var slider = _sender;
            console.log(slider.getValue());
            return;
        };
        return ScnDevMax;
    }(Phaser.Scene));
    exports.ScnDevMax = ScnDevMax;
});
define("steeringBehavior/forceFollowPath", ["require", "exports", "commons/stEnums", "master/master", "steeringBehavior/forceSeek"], function (require, exports, stEnums_13, master_5, forceSeek_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FollowPathForce = void 0;
    var FollowPathForce = (function () {
        function FollowPathForce() {
        }
        FollowPathForce.prototype.init = function (_self, _path, _force, _radius, _controller, _targetIndex, _looping) {
            this._m_self = _self;
            this.m_path = _path;
            this._m_force = _force;
            this.m_radius = _radius;
            this.m_looping = _looping;
            this.m_pathSize = _path.length;
            this.m_targetIndex = 0;
            if (_targetIndex != null) {
                this.m_targetIndex = _targetIndex;
            }
            this.m_looping = false;
            if (_looping != null) {
                this.m_looping = _looping;
            }
            this._m_controller = _controller;
            this._m_debugManager = master_5.Master.GetInstance().getManager(stEnums_13.ST_MANAGER_ID.kDebugManager);
            this.m_seek = new forceSeek_2.SeekForce();
            this.m_seek.init(this._m_self, this.m_path[this.m_targetIndex], this._m_force);
            _controller.addForce('pathFollow' + this._m_self.name, this.m_seek);
            return;
        };
        FollowPathForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            this.m_seek.setController(_controller);
            return;
        };
        FollowPathForce.prototype.update = function (_dt) {
            var self = this._m_self;
            var path = this.m_path;
            var radius = this.m_radius;
            var size = path.length;
            var looping = this.m_looping;
            var seek = this.m_seek;
            var i = this.m_targetIndex;
            var sqDist = new Phaser.Math.Vector2(self.x - path[i].x, self.x - path[i].x).lengthSq();
            if (sqDist < radius * radius) {
                ++i;
                if (i >= size) {
                    if (looping) {
                        i = 0;
                    }
                    else {
                        i = size - 1;
                    }
                }
                seek.setTarget(path[i]);
                this.m_targetIndex = i;
            }
            return;
        };
        FollowPathForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var path = this.m_path;
            var size = path.length;
            var radius = this.m_radius;
            for (var i = 0; i < size; ++i) {
                debugManager.drawCircle(path[i].x, path[i].y, radius, 3, stEnums_13.ST_COLOR_ID.kPurple);
                if (i < size - 1) {
                    debugManager.drawLine(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y, 3, stEnums_13.ST_COLOR_ID.kPurple);
                }
                else {
                    debugManager.drawLine(path[i].x, path[i].y, path[0].x, path[0].y, 3, stEnums_13.ST_COLOR_ID.kPurple);
                }
            }
            return;
        };
        FollowPathForce.prototype.onDebugEnable = function () {
            return;
        };
        FollowPathForce.prototype.onDebugDisable = function () {
            return;
        };
        FollowPathForce.prototype.getType = function () {
            return stEnums_13.ST_STEER_FORCE.kFollowPath;
        };
        FollowPathForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_debugManager = null;
            this.m_seek = null;
            this.m_path = null;
            this._m_self = null;
            return;
        };
        return FollowPathForce;
    }());
    exports.FollowPathForce = FollowPathForce;
});
define("steeringBehavior/forcePursue", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_14, master_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PursueForce = void 0;
    var PursueForce = (function () {
        function PursueForce() {
        }
        PursueForce.prototype.init = function (_self, _target, _force, _predictionSteps, _targetForceCtrl, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_force = _force;
            this._m_targetForceCtrl = _targetForceCtrl;
            this._m_predictionSteps = _predictionSteps;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_force = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_targetDir = new Phaser.Math.Vector2(0, 0);
            this._m_debugManager = master_6.Master.GetInstance().getManager(stEnums_14.ST_MANAGER_ID.kDebugManager);
            return;
        };
        PursueForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        PursueForce.prototype.update = function (_dt) {
            var target = this._m_target;
            var self = this._m_self;
            var controller = this._m_controller;
            var direction = controller.getDirection();
            var speed = controller.getSpeed();
            var targetSpeed = this._m_targetForceCtrl.getSpeed();
            var maxSpeed = controller.getMaxSpeed();
            var actualVelocity = this._m_v2_actualVelocity;
            var forceMagnitude = this._m_force;
            actualVelocity.setTo(direction.x * speed, direction.y * speed);
            var targetDir = this._m_targetDir;
            targetDir.copy(this._m_targetForceCtrl.getDirection());
            var predictionSteps = this._m_predictionSteps;
            var desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(target.x - self.x, target.y - self.y);
            var ajustedPrediction = desiredVelocity.length() / maxSpeed;
            desiredVelocity.add(targetDir.scale(predictionSteps * ajustedPrediction));
            desiredVelocity.scale(targetSpeed / desiredVelocity.length());
            var steerForce = this._m_v2_forceMagnitude;
            steerForce.set(desiredVelocity.x - actualVelocity.x, desiredVelocity.y - actualVelocity.y);
            steerForce.limit(forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        };
        PursueForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var pos = this._m_self;
            debugManager.drawLine(this._m_targetDir.x + pos.x, this._m_targetDir.y + pos.y, this._m_v2_actualVelocity.x + pos.x, this._m_v2_actualVelocity.y + pos.y, 3, stEnums_14.ST_COLOR_ID.kRed);
            debugManager.drawLine(pos.x, pos.y, this._m_v2_forceMagnitude.x + pos.x, this._m_v2_forceMagnitude.y + pos.y, 3, stEnums_14.ST_COLOR_ID.kBlue);
            debugManager.drawLine(pos.x, pos.y, this._m_targetDir.x + pos.x, this._m_targetDir.y + pos.y, 3, stEnums_14.ST_COLOR_ID.kBlack);
            var target = this._m_target;
            debugManager.drawCircle(target.x + this._m_targetDir.x, target.y + this._m_targetDir.y, 5, 2, stEnums_14.ST_COLOR_ID.kYellow);
            return;
        };
        PursueForce.prototype.onDebugEnable = function () {
            return;
        };
        PursueForce.prototype.onDebugDisable = function () {
            return;
        };
        PursueForce.prototype.getType = function () {
            return stEnums_14.ST_STEER_FORCE.kPursue;
        };
        PursueForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_desiredVelocity = null;
            this._m_targetDir = null;
            this._m_v2_actualVelocity = null;
            this._m_targetDir = null;
            this._m_v2_forceMagnitude = null;
            this._m_v2_force = null;
            this._m_debugManager = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return PursueForce;
    }());
    exports.PursueForce = PursueForce;
});
define("steeringBehavior/forceWander", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_7, stEnums_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WanderForce = void 0;
    var WanderForce = (function () {
        function WanderForce() {
        }
        WanderForce.prototype.init = function (_self, _targetDistance, _circleRadius, _displacementAngle, _angleChange, _force, _controller) {
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
            this._m_debugManager = master_7.Master.GetInstance().getManager(stEnums_15.ST_MANAGER_ID.kDebugManager);
            return;
        };
        WanderForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        WanderForce.prototype.update = function (_dt) {
            var self = this._m_self;
            var controller = this._m_controller;
            var direction = controller.getDirection();
            var actualVelocity = controller.getVelocity();
            var circleCenter = this._m_v2p_circleCenter;
            circleCenter.copy(direction).scale(this._m_targetDistance);
            circleCenter.set(circleCenter.x + self.x, circleCenter.y + self.y);
            var displacement = this._m_v2_displacement;
            var circleRadius = this._m_circleRadius;
            displacement.setLength(circleRadius);
            var displacementAngle = this._m_displacementAngle;
            displacement.setAngle(displacementAngle * Phaser.Math.DEG_TO_RAD);
            var changeAngle = this._m_angleChange;
            this._m_displacementAngle += Math.random() * changeAngle - changeAngle * .5;
            var forceMagnitude = this._m_forceMagnitude;
            var desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(circleCenter.x + displacement.x - self.x, circleCenter.y + displacement.y - self.y);
            desiredVelocity.setLength(forceMagnitude);
            var steerForce = this._m_v2_wanderForce;
            steerForce.copy(desiredVelocity).subtract(actualVelocity);
            steerForce.limit(forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        };
        WanderForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_self;
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, 3, stEnums_15.ST_COLOR_ID.kPurple);
            debugManager.drawLine(this._m_controller.getVelocity().x + sprite.x, this._m_controller.getVelocity().y + sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_15.ST_COLOR_ID.kRed);
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_15.ST_COLOR_ID.kBlack);
            debugManager.drawCircle(this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, this._m_circleRadius, 2, stEnums_15.ST_COLOR_ID.kBlack);
            var displacementVector = this._m_v2_displacement;
            debugManager.drawLine(this._m_v2p_circleCenter.x, this._m_v2p_circleCenter.y, this._m_v2p_circleCenter.x + displacementVector.x, this._m_v2p_circleCenter.y + displacementVector.y, 3, stEnums_15.ST_COLOR_ID.kRed);
            return;
        };
        WanderForce.prototype.onDebugEnable = function () {
            return;
        };
        WanderForce.prototype.onDebugDisable = function () {
            return;
        };
        WanderForce.prototype.getType = function () {
            return stEnums_15.ST_STEER_FORCE.kWander;
        };
        WanderForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_wanderForce = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_v2_displacement = null;
            this._m_v2p_circleCenter = null;
            this._m_debugManager = null;
            this._m_self = null;
            return;
        };
        return WanderForce;
    }());
    exports.WanderForce = WanderForce;
});
define("scenes/sims/devSumano", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "master/master", "steeringBehavior/forceFollowPath"], function (require, exports, baseActor_2, stEnums_16, cmpforceController_2, cmpSpriteController_2, master_8, forceFollowPath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevSumano = void 0;
    var ScnDevSumano = (function (_super) {
        __extends(ScnDevSumano, _super);
        function ScnDevSumano() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevSumano.prototype.create = function () {
            this._m_master = master_8.Master.GetInstance();
            var master = this._m_master;
            master.enableDebugging();
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_16.ST_MANAGER_ID.kSimManager);
            var shipSprtP0 = this.add.sprite(0, 0, 'space_ship');
            var fleeSprt0 = this.add.sprite(0, 0, 'space_ship');
            var fleeActor0 = baseActor_2.BaseActor.Create(fleeSprt0, 'SpaceShip0');
            var pursueActor0 = baseActor_2.BaseActor.Create(shipSprtP0, 'SpaceShipP0');
            this._m_shipP0 = pursueActor0;
            this._m_ship1 = fleeActor0;
            simManager.addActor(pursueActor0);
            simManager.addActor(fleeActor0);
            pursueActor0.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pursueActor0.addComponent(new cmpforceController_2.CmpForceController());
            fleeActor0.addComponent(new cmpSpriteController_2.CmpSpriteController());
            fleeActor0.addComponent(new cmpforceController_2.CmpForceController());
            fleeActor0.init();
            pursueActor0.init();
            pursueActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetMaxSpeed, 100);
            fleeActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetMaxSpeed, 80);
            pursueActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.125, 0.125));
            fleeActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            pursueActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.45));
            fleeActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.55));
            fleeActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetMass, 75);
            pursueActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetMass, 75);
            var forceControlP = pursueActor0.getComponent(stEnums_16.ST_COMPONENT_ID.kForceController);
            var forceControlF = fleeActor0.getComponent(stEnums_16.ST_COMPONENT_ID.kForceController);
            var pathSprt0 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt1 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt2 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt3 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt4 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt5 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt6 = this.add.sprite(0, 0, 'space_ship');
            var pathSprt7 = this.add.sprite(0, 0, 'space_ship');
            var pathActor0 = baseActor_2.BaseActor.Create(pathSprt0, 'path0');
            var pathActor1 = baseActor_2.BaseActor.Create(pathSprt1, 'path1');
            var pathActor2 = baseActor_2.BaseActor.Create(pathSprt2, 'path2');
            var pathActor3 = baseActor_2.BaseActor.Create(pathSprt3, 'path3');
            var pathActor4 = baseActor_2.BaseActor.Create(pathSprt4, 'path4');
            var pathActor5 = baseActor_2.BaseActor.Create(pathSprt5, 'path5');
            var pathActor6 = baseActor_2.BaseActor.Create(pathSprt6, 'path6');
            var pathActor7 = baseActor_2.BaseActor.Create(pathSprt7, 'path7');
            pathActor0.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor1.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor2.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor3.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor4.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor5.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor6.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor7.addComponent(new cmpSpriteController_2.CmpSpriteController());
            pathActor0.init();
            pathActor1.init();
            pathActor2.init();
            pathActor3.init();
            pathActor4.init();
            pathActor5.init();
            pathActor6.init();
            pathActor7.init();
            pathActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor1.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor2.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor3.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor4.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor5.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor6.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor7.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.08, 0.08));
            pathActor0.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.1, height * 0.1));
            pathActor1.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.33, height * 0.5));
            pathActor2.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.1, height * 0.9));
            pathActor3.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.75, height * 0.5));
            pathActor4.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.8));
            pathActor5.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.9, height * 0.9));
            pathActor6.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.9, height * 0.1));
            pathActor7.sendMessage(stEnums_16.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.33));
            var pathArray = new Array(pathSprt0, pathSprt1, pathSprt2, pathSprt3, pathSprt4, pathSprt5, pathSprt7, pathSprt6);
            var followPath0 = new forceFollowPath_1.FollowPathForce();
            var followPath1 = new forceFollowPath_1.FollowPathForce();
            followPath0.init(shipSprtP0, pathArray, 200, 30, forceControlP, 0, true);
            followPath1.init(fleeSprt0, pathArray, 150, 15, forceControlF, 2);
            forceControlP.addForce('path_0', followPath0);
            forceControlF.addForce('path_1', followPath1);
            return;
        };
        ScnDevSumano.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        };
        return ScnDevSumano;
    }(Phaser.Scene));
    exports.ScnDevSumano = ScnDevSumano;
});
define("steeringBehavior/forceArrival", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_9, stEnums_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrivalForce = void 0;
    var ArrivalForce = (function () {
        function ArrivalForce() {
        }
        ArrivalForce.prototype.init = function (_self, _target, _slowingRadius, _force, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_slowingRadius = _slowingRadius;
            this._m_forceMagnitude = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_actualVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_desiredVelocity = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_arrivalForce = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_debugManager = master_9.Master.GetInstance().getManager(stEnums_17.ST_MANAGER_ID.kDebugManager);
            return;
        };
        ArrivalForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        ArrivalForce.prototype.update = function (_dt) {
            var target = this._m_target;
            var self = this._m_self;
            var controller = this._m_controller;
            var actualVelocity = controller.getVelocity();
            var forceMagnitude = this._m_forceMagnitude;
            var desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(target.x - self.x, target.y - self.y);
            this._m_distance = desiredVelocity.length();
            var slowingRadius = this._m_slowingRadius;
            var arrivalMultiplier = this._m_distance / slowingRadius;
            if (this._m_distance < slowingRadius) {
                desiredVelocity.setLength(forceMagnitude * arrivalMultiplier);
            }
            else {
                desiredVelocity.setLength(forceMagnitude);
            }
            var steerForce = this._m_v2_arrivalForce;
            steerForce.copy(desiredVelocity).subtract(actualVelocity);
            steerForce.limit(forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        };
        ArrivalForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_self;
            var target = this._m_target;
            debugManager.drawLine(this._m_controller.getVelocity().x + sprite.x, this._m_controller.getVelocity().y + sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_17.ST_COLOR_ID.kRed);
            debugManager.drawLine(sprite.x, sprite.y, this._m_v2_desiredVelocity.x + sprite.x, this._m_v2_desiredVelocity.y + sprite.y, 3, stEnums_17.ST_COLOR_ID.kBlack);
            debugManager.drawCircle(target.x, target.y, this._m_slowingRadius, 2, stEnums_17.ST_COLOR_ID.kPurple);
            if (this._m_distance < this._m_slowingRadius) {
                sprite.setTint(0x3D85C6);
            }
            else {
                sprite.clearTint();
            }
            return;
        };
        ArrivalForce.prototype.onDebugEnable = function () {
            return;
        };
        ArrivalForce.prototype.onDebugDisable = function () {
            this._m_self.clearTint();
            return;
        };
        ArrivalForce.prototype.getType = function () {
            return stEnums_17.ST_STEER_FORCE.kArrive;
        };
        ArrivalForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_arrivalForce = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_debugManager = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return ArrivalForce;
    }());
    exports.ArrivalForce = ArrivalForce;
});
define("scenes/sims/devAlex", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "master/master", "steeringBehavior/forceArrival", "steeringBehavior/forceWander"], function (require, exports, baseActor_3, stEnums_18, cmpforceController_3, cmpSpriteController_3, master_10, forceArrival_1, forceWander_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevAlex = void 0;
    var ScnDevAlex = (function (_super) {
        __extends(ScnDevAlex, _super);
        function ScnDevAlex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevAlex.prototype.create = function () {
            this._m_master = master_10.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_18.ST_MANAGER_ID.kSimManager);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_3.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_3.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_3.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetMaxSpeed, 75);
            shipActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetMass, 1);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_3.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_3.CmpSpriteController());
            targetActor.addComponent(new cmpforceController_3.CmpForceController());
            targetActor.init();
            targetActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            targetActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetMass, 1);
            targetActor.sendMessage(stEnums_18.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var arrival = new forceArrival_1.ArrivalForce();
            var wander = new forceWander_1.WanderForce();
            wander.init(shipSprite, 150, 100, 5, 90, 100);
            arrival.init(targetSprite, shipSprite, 100, 100);
            var shipControl = shipActor.getComponent(stEnums_18.ST_COMPONENT_ID.kForceController);
            var targetControl = targetActor.getComponent(stEnums_18.ST_COMPONENT_ID.kForceController);
            targetControl.addForce('arrival_1', arrival);
            shipControl.addForce('wander_1', wander);
            this._m_master.enableDebugging();
            return;
        };
        ScnDevAlex.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        };
        return ScnDevAlex;
    }(Phaser.Scene));
    exports.ScnDevAlex = ScnDevAlex;
});
define("scenes/sims/sceneArrival", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "managers/uiManager/uiButton", "master/master", "steeringBehavior/forceArrival"], function (require, exports, baseActor_4, stEnums_19, cmpforceController_4, cmpSpriteController_4, uiButton_2, master_11, forceArrival_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnArrival = void 0;
    var ScnArrival = (function (_super) {
        __extends(ScnArrival, _super);
        function ScnArrival() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnArrival.prototype.create = function () {
            this._m_master = master_11.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_19.ST_MANAGER_ID.kSimManager);
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            var mainMenuButton = uiButton_2.UIButton.CreateColorButton(width * 0.1, height * 0.9, this, 'Main menu', 0x2272F1);
            mainMenuButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                master.onSimulationSceneDestroy(this);
                this.scene.start('main_menu');
            }, this);
            var debugButton = uiButton_2.UIButton.CreateColorButton(width * 0.9, height * 0.9, this, 'Debug Gizmos big text', 0x9000ff);
            debugButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                if (master.isDebugEnable()) {
                    master.disableDebugging();
                }
                else {
                    master.enableDebugging();
                }
            }, this);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_4.BaseActor.Create(shipSprite, 'SpaceShip');
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_4.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_4.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetSpeed, 75);
            shipActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetMaxSpeed, 75);
            shipActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            shipActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetMass, 1);
            shipActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_4.BaseActor.Create(targetSprite, 'target');
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_4.CmpSpriteController());
            targetActor.addComponent(new cmpforceController_4.CmpForceController());
            targetActor.init();
            targetActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            targetActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetMass, 1);
            targetActor.sendMessage(stEnums_19.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            var arrival = new forceArrival_2.ArrivalForce();
            arrival.init(shipSprite, targetSprite, 100, 100);
            var shipController = shipActor.getComponent(stEnums_19.ST_COMPONENT_ID.kForceController);
            shipController.addForce('arrival_1', arrival);
            return;
        };
        ScnArrival.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        };
        return ScnArrival;
    }(Phaser.Scene));
    exports.ScnArrival = ScnArrival;
});
define("scenes/sims/sceneWander", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "managers/uiManager/uiButton", "master/master", "steeringBehavior/forceWander"], function (require, exports, baseActor_5, stEnums_20, cmpforceController_5, cmpSpriteController_5, uiButton_3, master_12, forceWander_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnWander = void 0;
    var ScnWander = (function (_super) {
        __extends(ScnWander, _super);
        function ScnWander() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnWander.prototype.create = function () {
            this._m_master = master_12.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_20.ST_MANAGER_ID.kSimManager);
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            var mainMenuButton = uiButton_3.UIButton.CreateColorButton(width * 0.1, height * 0.9, this, 'Main menu', 0x2272F1);
            mainMenuButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                master.onSimulationSceneDestroy(this);
                this.scene.start('main_menu');
            }, this);
            var debugButton = uiButton_3.UIButton.CreateColorButton(width * 0.9, height * 0.9, this, 'Debug', 0x9000ff);
            debugButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                if (master.isDebugEnable()) {
                    master.disableDebugging();
                }
                else {
                    master.enableDebugging();
                }
            }, this);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_5.BaseActor.Create(shipSprite, 'SpaceShip');
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_5.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_5.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_20.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            shipActor.sendMessage(stEnums_20.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            shipActor.sendMessage(stEnums_20.ST_MESSAGE_ID.kSetMass, 1);
            shipActor.sendMessage(stEnums_20.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            var wander = new forceWander_2.WanderForce();
            wander.init(shipSprite, 75, 25, 5, 45, 100);
            var shipController = shipActor.getComponent(stEnums_20.ST_COMPONENT_ID.kForceController);
            shipController.addForce('wander_1', wander);
            return;
        };
        ScnWander.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        };
        ScnWander.prototype._onDebug = function () {
            if (this._m_master.isDebugEnable()) {
                this._m_master.disableDebugging();
            }
            else {
                this._m_master.enableDebugging();
            }
            return;
        };
        ScnWander.prototype._onMainMenu = function () {
            this._m_master.onSimulationSceneDestroy(this);
            this.scene.start('main_menu');
            return;
        };
        return ScnWander;
    }(Phaser.Scene));
    exports.ScnWander = ScnWander;
});
define("steeringBehavior/forceObstacleAvoidance", ["require", "exports", "master/master", "commons/stEnums"], function (require, exports, master_13, stEnums_21) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObstacleAvoidanceForce = void 0;
    var ObstacleAvoidanceForce = (function () {
        function ObstacleAvoidanceForce() {
        }
        ObstacleAvoidanceForce.prototype.init = function (_self, _avoidanceRadius, _obstaclesArray, _force, _controller) {
            this._m_self = _self;
            this._m_avoidanceRadius = _avoidanceRadius;
            this._m_obstaclesArray = _obstaclesArray;
            this._m_forceMagnitude = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_distanceToObstacle = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_obstacleAvoidanceForce = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_debugManager = master_13.Master.GetInstance().getManager(stEnums_21.ST_MANAGER_ID.kDebugManager);
        };
        ObstacleAvoidanceForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        ObstacleAvoidanceForce.prototype.update = function (_dt) {
            var _this = this;
            var self = this._m_self;
            var obstaclesArray = this._m_obstaclesArray;
            var controller = this._m_controller;
            var actualVelocity = controller.getVelocity();
            var distanceToObstacle = this._m_v2_distanceToObstacle;
            var avoidanceRadius = this._m_avoidanceRadius;
            var forceMagnitude = this._m_forceMagnitude;
            var steerForce = this._m_v2_obstacleAvoidanceForce;
            steerForce.set(0, 0);
            obstaclesArray.forEach(function (obstacle) {
                _this._m_distance = distanceToObstacle.set(self.x - obstacle.x, self.y - obstacle.y).length();
                if (_this._m_distance < avoidanceRadius) {
                    steerForce.add(distanceToObstacle.setLength(forceMagnitude));
                }
            });
            steerForce.subtract(actualVelocity);
            steerForce.limit(this._m_forceMagnitude);
            controller.addSteerForce(steerForce.x, steerForce.y);
        };
        ObstacleAvoidanceForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_self;
            debugManager.drawCircle(sprite.x, sprite.y, this._m_avoidanceRadius, 2, stEnums_21.ST_COLOR_ID.kPurple);
        };
        ObstacleAvoidanceForce.prototype.onDebugEnable = function () {
        };
        ObstacleAvoidanceForce.prototype.onDebugDisable = function () {
        };
        ObstacleAvoidanceForce.prototype.getType = function () {
            return stEnums_21.ST_STEER_FORCE.kObstacleAvoidance;
        };
        ObstacleAvoidanceForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_obstacleAvoidanceForce = null;
            this._m_v2_distanceToObstacle = null;
            this._m_debugManager = null;
            this._m_self = null;
            this._m_obstaclesArray.forEach(function (obstacle) {
                obstacle = null;
            });
            this._m_obstaclesArray = null;
        };
        return ObstacleAvoidanceForce;
    }());
    exports.ObstacleAvoidanceForce = ObstacleAvoidanceForce;
});
define("scenes/sims/sceneObstacleAvoidance", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "managers/uiManager/uiButton", "master/master", "steeringBehavior/forceObstacleAvoidance", "steeringBehavior/forceWander"], function (require, exports, baseActor_6, stEnums_22, cmpforceController_6, cmpSpriteController_6, uiButton_4, master_14, forceObstacleAvoidance_1, forceWander_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnObstacleAvoidance = void 0;
    var ScnObstacleAvoidance = (function (_super) {
        __extends(ScnObstacleAvoidance, _super);
        function ScnObstacleAvoidance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnObstacleAvoidance.prototype.create = function () {
            this._m_master = master_14.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_22.ST_MANAGER_ID.kSimManager);
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            var mainMenuButton = uiButton_4.UIButton.CreateColorButton(width * 0.1, height * 0.9, this, 'Main menu', 0x2272F1);
            mainMenuButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                master.onSimulationSceneDestroy(this);
                this.scene.start('main_menu');
            }, this);
            var debugButton = uiButton_4.UIButton.CreateColorButton(width * 0.9, height * 0.9, this, 'Debug', 0x9000ff);
            debugButton.subscribe("buttonReleased", "button", function (_sender, _args) {
                var button = _sender;
                if (master.isDebugEnable()) {
                    master.disableDebugging();
                }
                else {
                    master.enableDebugging();
                }
            }, this);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_6.BaseActor.Create(shipSprite, 'SpaceShip');
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_6.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_6.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            shipActor.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            shipActor.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            shipActor.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            var obstacleSprite0 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite1 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite2 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite3 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite4 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite5 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite6 = this.add.sprite(0, 0, 'space_ship');
            var obstacleSprite7 = this.add.sprite(0, 0, 'space_ship');
            var obstacleActor0 = baseActor_6.BaseActor.Create(obstacleSprite0, 'obstacle0');
            var obstacleActor1 = baseActor_6.BaseActor.Create(obstacleSprite1, 'obstacle1');
            var obstacleActor2 = baseActor_6.BaseActor.Create(obstacleSprite2, 'obstacle2');
            var obstacleActor3 = baseActor_6.BaseActor.Create(obstacleSprite3, 'obstacle3');
            var obstacleActor4 = baseActor_6.BaseActor.Create(obstacleSprite4, 'obstacle4');
            var obstacleActor5 = baseActor_6.BaseActor.Create(obstacleSprite5, 'obstacle5');
            var obstacleActor6 = baseActor_6.BaseActor.Create(obstacleSprite6, 'obstacle6');
            var obstacleActor7 = baseActor_6.BaseActor.Create(obstacleSprite7, 'obstacle7');
            simManager.addActor(obstacleActor0);
            simManager.addActor(obstacleActor1);
            simManager.addActor(obstacleActor2);
            simManager.addActor(obstacleActor3);
            simManager.addActor(obstacleActor4);
            simManager.addActor(obstacleActor5);
            simManager.addActor(obstacleActor6);
            simManager.addActor(obstacleActor7);
            obstacleActor0.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor0.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor1.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor1.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor2.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor2.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor3.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor3.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor4.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor4.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor5.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor5.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor6.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor6.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor7.addComponent(new cmpSpriteController_6.CmpSpriteController);
            obstacleActor7.addComponent(new cmpforceController_6.CmpForceController);
            obstacleActor0.init();
            obstacleActor1.init();
            obstacleActor2.init();
            obstacleActor3.init();
            obstacleActor4.init();
            obstacleActor5.init();
            obstacleActor6.init();
            obstacleActor7.init();
            obstacleActor0.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor1.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor2.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor3.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor4.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor5.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor6.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor7.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMaxSpeed, 25);
            obstacleActor0.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor1.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor2.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor3.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor4.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor5.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor6.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor7.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            obstacleActor0.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor1.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor2.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor3.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor4.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor5.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor6.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor7.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetMass, 1);
            obstacleActor0.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.35));
            obstacleActor1.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.35));
            obstacleActor2.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.45));
            obstacleActor3.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.45));
            obstacleActor4.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.35, height * 0.55));
            obstacleActor5.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.60, height * 0.55));
            obstacleActor6.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.45, height * 0.65));
            obstacleActor7.sendMessage(stEnums_22.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.55, height * 0.65));
            var obstaclesArray = new Array(obstacleSprite0, obstacleSprite1, obstacleSprite2, obstacleSprite3, obstacleSprite4, obstacleSprite5, obstacleSprite6, obstacleSprite7);
            var obstacleAvoidance = new forceObstacleAvoidance_1.ObstacleAvoidanceForce();
            var obstacleWander0 = new forceWander_3.WanderForce();
            var obstacleWander1 = new forceWander_3.WanderForce();
            var obstacleWander2 = new forceWander_3.WanderForce();
            var obstacleWander3 = new forceWander_3.WanderForce();
            var obstacleWander4 = new forceWander_3.WanderForce();
            var obstacleWander5 = new forceWander_3.WanderForce();
            var obstacleWander6 = new forceWander_3.WanderForce();
            var obstacleWander7 = new forceWander_3.WanderForce();
            obstacleAvoidance.init(shipSprite, 100, obstaclesArray, 100);
            obstacleWander0.init(obstacleSprite0, 50, 25, 5, 45, 100);
            obstacleWander1.init(obstacleSprite1, 50, 25, 5, 45, 100);
            obstacleWander2.init(obstacleSprite2, 50, 25, 5, 45, 100);
            obstacleWander3.init(obstacleSprite3, 50, 25, 5, 45, 100);
            obstacleWander4.init(obstacleSprite4, 50, 25, 5, 45, 100);
            obstacleWander5.init(obstacleSprite5, 50, 25, 5, 45, 100);
            obstacleWander6.init(obstacleSprite6, 50, 25, 5, 45, 100);
            obstacleWander7.init(obstacleSprite7, 50, 25, 5, 45, 100);
            var shipController = shipActor.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle0Controller = obstacleActor0.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle1Controller = obstacleActor1.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle2Controller = obstacleActor2.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle3Controller = obstacleActor3.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle4Controller = obstacleActor4.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle5Controller = obstacleActor5.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle6Controller = obstacleActor6.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            var obstacle7Controller = obstacleActor7.getComponent(stEnums_22.ST_COMPONENT_ID.kForceController);
            shipController.addForce('obstacleAvoidance_1', obstacleAvoidance);
            obstacle0Controller.addForce('obstacleWander_0', obstacleWander0);
            obstacle1Controller.addForce('obstacleWander_1', obstacleWander1);
            obstacle2Controller.addForce('obstacleWander_2', obstacleWander2);
            obstacle3Controller.addForce('obstacleWander_3', obstacleWander3);
            obstacle4Controller.addForce('obstacleWander_4', obstacleWander4);
            obstacle5Controller.addForce('obstacleWander_5', obstacleWander5);
            obstacle6Controller.addForce('obstacleWander_6', obstacleWander6);
            obstacle7Controller.addForce('obstacleWander_7', obstacleWander7);
            return;
        };
        ScnObstacleAvoidance.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            return;
        };
        ScnObstacleAvoidance.prototype._onDebug = function () {
            if (this._m_master.isDebugEnable()) {
                this._m_master.disableDebugging();
            }
            else {
                this._m_master.enableDebugging();
            }
            return;
        };
        ScnObstacleAvoidance.prototype._onMainMenu = function () {
            this._m_master.onSimulationSceneDestroy(this);
            this.scene.start('main_menu');
            return;
        };
        return ScnObstacleAvoidance;
    }(Phaser.Scene));
    exports.ScnObstacleAvoidance = ScnObstacleAvoidance;
});
define("game_init", ["require", "exports", "phaser3-nineslice", "scenes/preload", "scenes/boot", "scenes/mainMenu", "scenes/sims/devMax", "scenes/sims/devSumano", "scenes/sims/devAlex", "scenes/sims/sceneArrival", "scenes/sims/sceneWander", "scenes/sims/sceneObstacleAvoidance"], function (require, exports, phaser3_nineslice_1, preload_1, boot_1, mainMenu_1, devMax_1, devSumano_1, devAlex_1, sceneArrival_1, sceneWander_1, sceneObstacleAvoidance_1) {
    "use strict";
    var GameInit = (function () {
        function GameInit() {
        }
        GameInit.prototype.start = function () {
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
                backgroundColor: 0x6ab4d4
            };
            this.m_game = new Phaser.Game(config);
            this.m_game.scene.add('boot', boot_1.Boot);
            this.m_game.scene.add('preload', preload_1.Preload);
            this.m_game.scene.add('main_menu', mainMenu_1.MainMenu);
            this.m_game.scene.add('devMax', devMax_1.ScnDevMax);
            this.m_game.scene.add('devSumano', devSumano_1.ScnDevSumano);
            this.m_game.scene.add('devAlex', devAlex_1.ScnDevAlex);
            this.m_game.scene.add('sceneArrival', sceneArrival_1.ScnArrival);
            this.m_game.scene.add('sceneWander', sceneWander_1.ScnWander);
            this.m_game.scene.add('sceneObstacleAvoidance', sceneObstacleAvoidance_1.ScnObstacleAvoidance);
            this.m_game.scene.start('boot');
            return;
        };
        return GameInit;
    }());
    return GameInit;
});
define("managers/uiManager/uiSwitch", ["require", "exports", "managers/uiManager/uiObject"], function (require, exports, uiObject_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UISwitch = void 0;
    var UISwitch = (function (_super) {
        __extends(UISwitch, _super);
        function UISwitch(_x, _y, _scene, _isActive) {
            if (_isActive === void 0) { _isActive = true; }
            var _this = _super.call(this) || this;
            _this._m_listenerManager.addEvent('toggleOn');
            _this._m_listenerManager.addEvent('toggleOff');
            var button = _scene.add.image(_x, _y, "game_art", "toggle_off.png");
            button.setInteractive();
            button.on('pointerdown', _this._onClick, _this);
            _this._m_button = button;
            if (_isActive) {
                _this.setOn();
            }
            else {
                _this.setOff();
            }
            return _this;
        }
        UISwitch.prototype.setOn = function () {
            this._m_button.setFrame("toggle_on.png");
            this._isActive = true;
            this._m_listenerManager.call('toggleOn', this, undefined);
            return;
        };
        UISwitch.prototype.setOff = function () {
            this._m_button.setFrame("toggle_off.png");
            this._isActive = false;
            this._m_listenerManager.call('toggleOff', this, undefined);
            return;
        };
        UISwitch.prototype.isActive = function () {
            return this._isActive;
        };
        UISwitch.prototype.getWidth = function () {
            return this._m_button.width;
        };
        UISwitch.prototype.getHeight = function () {
            return this._m_button.height;
        };
        UISwitch.prototype.getZ = function () {
            return this._m_button.depth;
        };
        UISwitch.prototype.move = function (_x, _y) {
            this._m_button.x += _x;
            this._m_button.y += _y;
            return;
        };
        UISwitch.prototype.setPosition = function (_x, _y) {
            this._m_button.setPosition(_x, _y);
            return;
        };
        UISwitch.prototype.destroy = function () {
            this._m_button.destroy();
            this.destroy();
            return;
        };
        UISwitch.prototype._onClick = function () {
            if (this._isActive) {
                this.setOff();
            }
            else {
                this.setOn();
            }
            return;
        };
        return UISwitch;
    }(uiObject_10.UIObject));
    exports.UISwitch = UISwitch;
});
//# sourceMappingURL=steeringApp.js.map