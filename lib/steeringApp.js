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
            return;
        };
        Preload.prototype.create = function () {
            this.scene.start('main_menu');
            return;
        };
        return Preload;
    }(Phaser.Scene));
    exports.Preload = Preload;
});
define("commons/stEnums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ST_COLOR_ID = exports.ST_MESSAGE_ID = exports.ST_COMPONENT_ID = exports.ST_MANAGER_ID = void 0;
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
        kBrown: 0xA52A2A
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
define("master/master", ["require", "exports", "managers/debugManager/debugManager", "managers/nullManager", "managers/simulationManager/simulationManager"], function (require, exports, debugManager_1, nullManager_1, simulationManager_1) {
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
            this._createButton(midWidth, 300, 'Alex', this._onDevAlex);
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
define("commons/stTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("steeringBehavior/iForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/cmpforceController", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_4, master_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CmpForceController = void 0;
    var CmpForceController = (function () {
        function CmpForceController() {
            this._m_actor = null;
            this._m_hForce = new Map();
            this._m_force = new Phaser.Math.Vector2(0.0, 0.0);
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
            this._m_debugManager = this._m_master.getManager(stEnums_4.ST_MANAGER_ID.kDebugManager);
            this._m_actor = _actor;
            return;
        };
        CmpForceController.prototype.update = function (_actor) {
            var force = this._m_force;
            force.setTo(0.0, 0.0);
            if (!this._m_bRunning) {
                return;
            }
            this._m_hForce.forEach(this._updateForce, this);
            var dt = this._m_master.getDeltaTime();
            var mass = this._m_mass;
            force.setTo(force.x / mass, force.y / mass);
            var v2_A = new Phaser.Math.Vector2(0.0, 0.0);
            var speed = this._m_speed;
            v2_A.setTo(this._m_direction.x * speed, this._m_direction.y * speed);
            v2_A.add(force);
            var maxSpeed = this._m_maxSpeed;
            if (v2_A.length() > maxSpeed) {
                v2_A.normalize();
                v2_A.setTo(v2_A.x * maxSpeed, v2_A.y * maxSpeed);
            }
            this._m_speed = v2_A.length();
            v2_A.scale(dt);
            this._m_actor.sendMessage(stEnums_4.ST_MESSAGE_ID.kMove, v2_A);
            v2_A.normalize();
            this._m_direction.setTo(v2_A.x, v2_A.y);
            this._m_actor.sendMessage(stEnums_4.ST_MESSAGE_ID.kSetAngle, this._m_direction.angle());
            if (this._m_debug) {
                this.updateDebug(dt);
            }
            return;
        };
        CmpForceController.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_actor.getWrappedInstance();
            var direction = this._m_direction;
            debugManager.drawLine(sprite.x, sprite.y, sprite.x + direction.x * 100, sprite.y + direction.y * 100, 3, stEnums_4.ST_COLOR_ID.kGreen);
            var steerForce = this._m_force;
            steerForce.scale(10);
            debugManager.drawLine(sprite.x, sprite.y, sprite.x + steerForce.x, sprite.y + steerForce.y, 3, stEnums_4.ST_COLOR_ID.kBlue);
            return;
        };
        CmpForceController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case stEnums_4.ST_MESSAGE_ID.kSetMass:
                    this.setMass(_obj);
                    return;
                case stEnums_4.ST_MESSAGE_ID.kSetSpeed:
                    this.setSpeed(_obj);
                    return;
                case stEnums_4.ST_MESSAGE_ID.kSetMaxSpeed:
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
            return stEnums_4.ST_COMPONENT_ID.kForceController;
        };
        CmpForceController.prototype.addForce = function (_str_id, _force) {
            this._m_hForce.set(_str_id, _force);
            _force.setController(this);
            return;
        };
        CmpForceController.prototype.getForce = function (_str_id) {
            var hForce = this._m_hForce;
            if (hForce.has(_str_id)) {
                return this._m_hForce.get(_str_id);
            }
            throw new Error('Force does not exists: ' + _str_id);
        };
        CmpForceController.prototype.addSteerForce = function (_x, _y) {
            this._m_force.x += _x;
            this._m_force.y += _y;
            return;
        };
        CmpForceController.prototype.getDirection = function () {
            return this._m_direction;
        };
        CmpForceController.prototype.getSpeed = function () {
            return this._m_speed;
        };
        CmpForceController.prototype.setMaxSpeed = function (_maxSpeed) {
            this._m_maxSpeed = _maxSpeed;
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
            this._m_mass = _mass;
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
        return CmpForceController;
    }());
    exports.CmpForceController = CmpForceController;
});
define("components/cmpSpriteController", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_5) {
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
                case stEnums_5.ST_MESSAGE_ID.kMove:
                    {
                        var v2 = _obj;
                        this.move(v2.x, v2.y);
                    }
                    return;
                case stEnums_5.ST_MESSAGE_ID.kSetPosition:
                    {
                        var v2 = _obj;
                        this.setPosition(v2.x, v2.y);
                    }
                    return;
                case stEnums_5.ST_MESSAGE_ID.kSetScale:
                    {
                        var v2 = _obj;
                        this.setScale(v2.x, v2.y);
                    }
                    return;
                case stEnums_5.ST_MESSAGE_ID.kSetAngle:
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
            return stEnums_5.ST_COMPONENT_ID.kSpriteController;
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
define("steeringBehavior/forceSeek", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SeekForce = void 0;
    var SeekForce = (function () {
        function SeekForce() {
        }
        SeekForce.prototype.init = function (_self, _target, _force, _controller) {
            this._m_self = _self;
            this._m_target = _target;
            this._m_force = _force;
            if (this._m_controller !== undefined) {
                this._m_controller = _controller;
            }
            this._m_v2_A = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_v2_B = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_force_v2 = new Phaser.Math.Vector2(0.0, 0.0);
            return;
        };
        SeekForce.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        SeekForce.prototype.update = function (_dt) {
            var target = this._m_target;
            var self = this._m_self;
            var controller = this._m_controller;
            var direction = controller.getDirection();
            var speed = controller.getSpeed();
            var v2_A = this._m_v2_A;
            v2_A.setTo(direction.x * speed, direction.y * speed);
            var forceMagnitude = this._m_force;
            var v2_B = this._m_v2_B;
            v2_B.set(target.x - self.x, target.y - self.y);
            v2_B.normalize();
            v2_B.set(v2_B.x * forceMagnitude, v2_B.y * forceMagnitude);
            var steerForce = this._m_force_v2;
            steerForce.set(v2_B.x - v2_A.x, v2_B.y - v2_A.y);
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        };
        SeekForce.prototype.updateDebug = function (_dt) {
            return;
        };
        SeekForce.prototype.onDebugEnable = function () {
            return;
        };
        SeekForce.prototype.onDebugDisable = function () {
            return;
        };
        SeekForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_force_v2 = null;
            this._m_v2_A = null;
            this._m_v2_B = null;
            this._m_force = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return SeekForce;
    }());
    exports.SeekForce = SeekForce;
});
define("scenes/sims/devMax", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "master/master", "steeringBehavior/forceSeek"], function (require, exports, baseActor_1, stEnums_6, cmpforceController_1, cmpSpriteController_1, master_3, forceSeek_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevMax = void 0;
    var ScnDevMax = (function (_super) {
        __extends(ScnDevMax, _super);
        function ScnDevMax() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevMax.prototype.create = function () {
            this._m_master = master_3.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_6.ST_MANAGER_ID.kSimManager);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_1.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_1.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetMaxSpeed, 500);
            shipActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetMass, 50);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_1.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            targetActor.init();
            targetActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var seek = new forceSeek_1.SeekForce();
            seek.init(shipSprite, targetSprite, 250);
            var forceControl = shipActor.getComponent(stEnums_6.ST_COMPONENT_ID.kForceController);
            forceControl.addForce('seek_1', seek);
            this._m_master.enableDebugging();
            return;
        };
        ScnDevMax.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            var x = 300 * Math.sin(_time * 0.001);
            this._m_target_position.setTo(this._m_target_center.x + x, this._m_target_center.y);
            this._m_target.sendMessage(stEnums_6.ST_MESSAGE_ID.kSetPosition, this._m_target_position);
            return;
        };
        return ScnDevMax;
    }(Phaser.Scene));
    exports.ScnDevMax = ScnDevMax;
});
define("scenes/sims/devSumano", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "master/master", "steeringBehavior/forceSeek"], function (require, exports, baseActor_2, stEnums_7, cmpforceController_2, cmpSpriteController_2, master_4, forceSeek_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevSumano = void 0;
    var ScnDevSumano = (function (_super) {
        __extends(ScnDevSumano, _super);
        function ScnDevSumano() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevSumano.prototype.create = function () {
            this._m_master = master_4.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_7.ST_MANAGER_ID.kSimManager);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_2.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_2.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_2.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetMaxSpeed, 500);
            shipActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetMass, 50);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_2.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_2.CmpSpriteController());
            targetActor.init();
            targetActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var seek = new forceSeek_2.SeekForce();
            seek.init(shipSprite, targetSprite, 250);
            var forceControl = shipActor.getComponent(stEnums_7.ST_COMPONENT_ID.kForceController);
            forceControl.addForce('seek_1', seek);
            this._m_master.enableDebugging();
            return;
        };
        ScnDevSumano.prototype.update = function (_time, _delta) {
            this._m_master.update(_time, _delta * 0.001);
            var x = 300 * Math.sin(_time * 0.001);
            this._m_target_position.setTo(this._m_target_center.x + x, this._m_target_center.y);
            this._m_target.sendMessage(stEnums_7.ST_MESSAGE_ID.kSetPosition, this._m_target_position);
            return;
        };
        return ScnDevSumano;
    }(Phaser.Scene));
    exports.ScnDevSumano = ScnDevSumano;
});
define("steeringBehavior/forceArrival", ["require", "exports"], function (require, exports) {
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
            this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);
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
            var direction = controller.getDirection();
            var speed = controller.getSpeed();
            var maxSpeed = controller.getMaxSpeed();
            var actualVelocity = this._m_v2_actualVelocity;
            actualVelocity.setTo(direction.x * speed, direction.y * speed);
            var forceMagnitude = this._m_forceMagnitude;
            var desiredVelocity = this._m_v2_desiredVelocity;
            desiredVelocity.set(target.x - self.x, target.y - self.y);
            var distance = desiredVelocity.length();
            desiredVelocity.normalize();
            var slowingRadius = this._m_slowingRadius;
            var arrivalMultiplier = distance / slowingRadius;
            if (distance < slowingRadius) {
                desiredVelocity.set(desiredVelocity.x * maxSpeed * arrivalMultiplier, desiredVelocity.y * maxSpeed * arrivalMultiplier);
            }
            else {
                desiredVelocity.set(desiredVelocity.x * maxSpeed, desiredVelocity.y * maxSpeed);
            }
            var steerForce = this._m_v2_forceMagnitude;
            steerForce.set(desiredVelocity.x - actualVelocity.x, desiredVelocity.y - actualVelocity.y);
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            controller.addSteerForce(steerForce.x, steerForce.y);
            return;
        };
        ArrivalForce.prototype.updateDebug = function (_dt) {
            return;
        };
        ArrivalForce.prototype.onDebugEnable = function () {
            return;
        };
        ArrivalForce.prototype.onDebugDisable = function () {
            return;
        };
        ArrivalForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_forceMagnitude = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_forceMagnitude = null;
            this._m_slowingRadius = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return ArrivalForce;
    }());
    exports.ArrivalForce = ArrivalForce;
});
define("steeringBehavior/forceWander", ["require", "exports", "commons/stEnums", "master/master"], function (require, exports, stEnums_8, master_5) {
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
            this._m_v2_forceMagnitude = new Phaser.Math.Vector2(0.0, 0.0);
            this._m_master = master_5.Master.GetInstance();
            if (this._m_master.isDebugEnable()) {
                this._m_debug = true;
            }
            this._m_debugManager = this._m_master.getManager(stEnums_8.ST_MANAGER_ID.kDebugManager);
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
            var speed = controller.getSpeed();
            var maxSpeed = controller.getMaxSpeed();
            var actualVelocity = this._m_v2_actualVelocity;
            actualVelocity.setTo(direction.x * speed, direction.y * speed);
            var targetDistance = direction;
            targetDistance.set(direction.x, direction.y);
            targetDistance.scale(this._m_targetDistance);
            var displacement = new Phaser.Math.Vector2(0.0, -1.0);
            var circleRadius = this._m_circleRadius;
            displacement.scale(circleRadius);
            var displacementAngle = this._m_displacementAngle;
            this.setAngle(displacement, displacementAngle);
            this._m_v2_displacement = displacement;
            var changeAngle = this._m_angleChange;
            this._m_displacementAngle += Math.random() * changeAngle - changeAngle * .5;
            var forceMagnitude = this._m_forceMagnitude;
            var desiredVelocity = this._m_v2_desiredVelocity;
            targetDistance.add(displacement);
            desiredVelocity.set(targetDistance.x - self.x, targetDistance.y - self.y);
            desiredVelocity.normalize();
            desiredVelocity.set(desiredVelocity.x * maxSpeed, desiredVelocity.y * maxSpeed);
            var steerForce = this._m_v2_forceMagnitude;
            steerForce.set(desiredVelocity.x - actualVelocity.x, desiredVelocity.y - actualVelocity.y);
            if (steerForce.length() > forceMagnitude) {
                steerForce.normalize();
                steerForce.set(steerForce.x * forceMagnitude, steerForce.y * forceMagnitude);
            }
            controller.addSteerForce(steerForce.x, steerForce.y);
            if (this._m_debug) {
                this.updateDebug(_dt);
            }
            return;
        };
        WanderForce.prototype.updateDebug = function (_dt) {
            var debugManager = this._m_debugManager;
            var sprite = this._m_self;
            var direction = this._m_controller.getDirection().normalize().scale(this._m_targetDistance);
            var targetDistanceVector = new Phaser.Math.Vector2(0.0, 0.0);
            targetDistanceVector.set(sprite.x + direction.x, sprite.y + direction.y);
            debugManager.drawLine(sprite.x, sprite.y, targetDistanceVector.x, targetDistanceVector.y, 3, stEnums_8.ST_COLOR_ID.kPurple);
            debugManager.drawCircle(targetDistanceVector.x, targetDistanceVector.y, this._m_circleRadius, 2, stEnums_8.ST_COLOR_ID.kBlack);
            var displacementVector = new Phaser.Math.Vector2(targetDistanceVector.x, targetDistanceVector.y);
            displacementVector.add(this._m_v2_displacement);
            debugManager.drawCircle(displacementVector.x, displacementVector.y, 1, 8, stEnums_8.ST_COLOR_ID.kRed);
            return;
        };
        WanderForce.prototype.onDebugEnable = function () {
            return;
        };
        WanderForce.prototype.onDebugDisable = function () {
            return;
        };
        WanderForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_forceMagnitude = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_forceMagnitude = null;
            this._m_targetDistance = null;
            this._m_circleRadius = null;
            this._m_displacementAngle = null;
            this._m_angleChange = null;
            this._m_self = null;
            return;
        };
        WanderForce.prototype.setAngle = function (_vector, _value) {
            var distance = _vector.length();
            _vector.set(_vector.x = Math.cos(_value) * distance, _vector.y = Math.sin(_value) * distance);
        };
        return WanderForce;
    }());
    exports.WanderForce = WanderForce;
});
define("scenes/sims/devAlex", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "master/master", "steeringBehavior/forceSeek", "steeringBehavior/forceArrival", "steeringBehavior/forceWander"], function (require, exports, baseActor_3, stEnums_9, cmpforceController_3, cmpSpriteController_3, master_6, forceSeek_3, forceArrival_1, forceWander_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScnDevAlex = void 0;
    var ScnDevAlex = (function (_super) {
        __extends(ScnDevAlex, _super);
        function ScnDevAlex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScnDevAlex.prototype.create = function () {
            this._m_master = master_6.Master.GetInstance();
            var master = this._m_master;
            master.onSimulationSceneCreate(this);
            var simManager = master.getManager(stEnums_9.ST_MANAGER_ID.kSimManager);
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_3.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            simManager.addActor(shipActor);
            shipActor.addComponent(new cmpSpriteController_3.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_3.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetMaxSpeed, 75);
            shipActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetMass, 10);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_3.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            simManager.addActor(targetActor);
            targetActor.addComponent(new cmpSpriteController_3.CmpSpriteController());
            targetActor.addComponent(new cmpforceController_3.CmpForceController());
            targetActor.init();
            targetActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetMaxSpeed, 50);
            targetActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetMass, 10);
            targetActor.sendMessage(stEnums_9.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.25));
            var seek = new forceSeek_3.SeekForce();
            var arrival = new forceArrival_1.ArrivalForce();
            var wander_1 = new forceWander_1.WanderForce();
            var wander_2 = new forceWander_1.WanderForce();
            seek.init(targetSprite, shipSprite, 100);
            wander_1.init(shipSprite, 250, 10, 5, 1, 100);
            wander_2.init(targetSprite, 250, 10, 5, 1, 1);
            arrival.init(targetSprite, shipSprite, 100, 100);
            var shipControl = shipActor.getComponent(stEnums_9.ST_COMPONENT_ID.kForceController);
            var targetControl = targetActor.getComponent(stEnums_9.ST_COMPONENT_ID.kForceController);
            targetControl.addForce('arrival_1', arrival);
            shipControl.addForce('wander_1', wander_1);
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
define("game_init", ["require", "exports", "phaser3-nineslice", "scenes/preload", "scenes/boot", "scenes/mainMenu", "scenes/sims/devMax", "scenes/sims/devSumano", "scenes/sims/devAlex"], function (require, exports, phaser3_nineslice_1, preload_1, boot_1, mainMenu_1, devMax_1, devSumano_1, devAlex_1) {
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
            this.m_game.scene.start('boot');
            return;
        };
        return GameInit;
    }());
    return GameInit;
});
//# sourceMappingURL=steeringApp.js.map