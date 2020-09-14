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
    exports.ST_MESSAGE_ID = exports.ST_COMPONENT_ID = exports.ST_MANAGER_ID = void 0;
    exports.ST_MANAGER_ID = Object.freeze({
        kUndefined: -1,
        kSimManager: 1,
        kUIManager: 2
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
});
define("managers/iManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("managers/nullManager", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullManager = void 0;
    var NullManager = (function () {
        function NullManager() {
        }
        NullManager.prototype.setMasterManager = function (_master) {
            throw new Error("Method not implemented.");
        };
        NullManager.prototype.getID = function () {
            throw new Error("Method not implemented.");
        };
        NullManager.prototype.onPrepare = function () {
            throw new Error("Method not implemented.");
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
        NullManager.prototype.onGameSceneCreate = function () {
            console.warn('Null Manager : onGameSceneCreate');
            return;
        };
        NullManager.prototype.onGameSceneDestroy = function () {
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
        NullManager.prototype.onSimulationShutdown = function () {
            console.warn('Null Manager : onSimulationShutdown');
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
define("master/master", ["require", "exports", "managers/nullManager"], function (require, exports, nullManager_1) {
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
            if (Master._INSTANCE === null) {
                Master._INSTANCE = new Master();
                Master._INSTANCE._onPrepare();
            }
            return;
        };
        Master.Shutdown = function () {
            if (Master._INSTANCE !== null) {
                Master._INSTANCE._onShutdown();
                Master._INSTANCE = null;
            }
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
        Master.prototype._onPrepare = function () {
            this._m_hManagers = new Map();
            var hManagers = this._m_hManagers;
            hManagers.forEach(function (_manager) {
                _manager.onPrepare();
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
            return;
        };
        BaseActor.prototype.onSimulationPause = function () {
            return;
        };
        BaseActor.prototype.onSimulationResume = function () {
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
        return BaseActor;
    }());
    exports.BaseActor = BaseActor;
});
define("commons/stTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("steeringBehavior/iForce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/cmpforceController", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_1) {
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
            return;
        }
        CmpForceController.prototype.init = function (_actor) {
            this.clear();
            this._m_actor = _actor;
            return;
        };
        CmpForceController.prototype.update = function (_actor) {
            var force = this._m_force;
            force.setTo(0.0, 0.0);
            this._m_hForce.forEach(this._updateForce, this);
            var dt = 0.001;
            var mass = this._m_mass;
            force.setTo(force.x / mass, force.y / mass);
            var v2_A = new Phaser.Math.Vector2(0.0, 0.0);
            var speed = this._m_speed;
            v2_A.setTo(this._m_direction.x * speed, this._m_direction.y * speed);
            force.add(v2_A);
            var maxSpeed = this._m_maxSpeed;
            if (force.length() > maxSpeed) {
                force.normalize();
                force.setTo(force.x * maxSpeed, force.y * maxSpeed);
            }
            this._m_speed = force.length();
            force.scale(dt);
            this._m_actor.sendMessage(stEnums_1.ST_MESSAGE_ID.kMove, force);
            force.normalize();
            this._m_direction.setTo(force.x, force.y);
            this._m_actor.sendMessage(stEnums_1.ST_MESSAGE_ID.kSetAngle, this._m_direction.angle());
            return;
        };
        CmpForceController.prototype.receive = function (_id, _obj) {
            switch (_id) {
                case stEnums_1.ST_MESSAGE_ID.kSetMass:
                    this._m_mass = _obj;
                    return;
                case stEnums_1.ST_MESSAGE_ID.kSetSpeed:
                    this._m_speed = _obj;
                    return;
                case stEnums_1.ST_MESSAGE_ID.kSetMaxSpeed:
                    this._m_maxSpeed = _obj;
                    return;
            }
            return;
        };
        CmpForceController.prototype.getID = function () {
            return stEnums_1.ST_COMPONENT_ID.kForceController;
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
            var deltaTime = 0.001;
            _force.update(deltaTime);
            return;
        };
        return CmpForceController;
    }());
    exports.CmpForceController = CmpForceController;
});
define("components/cmpSpriteController", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_2) {
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
                case stEnums_2.ST_MESSAGE_ID.kMove:
                    {
                        var v2 = _obj;
                        this.move(v2.x, v2.y);
                    }
                    return;
                case stEnums_2.ST_MESSAGE_ID.kSetPosition:
                    {
                        var v2 = _obj;
                        this.setPosition(v2.x, v2.y);
                    }
                    return;
                case stEnums_2.ST_MESSAGE_ID.kSetScale:
                    {
                        var v2 = _obj;
                        this.setScale(v2.x, v2.y);
                    }
                    return;
                case stEnums_2.ST_MESSAGE_ID.kSetAngle:
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
        CmpSpriteController.prototype.getID = function () {
            return stEnums_2.ST_COMPONENT_ID.kSpriteController;
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
            var maxSpeed = controller.getMaxSpeed();
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
        SeekForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_force_v2 = null;
            this._m_v2_A = null;
            this._m_v2_B = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return SeekForce;
    }());
    exports.SeekForce = SeekForce;
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
                desiredVelocity.set(desiredVelocity.x * forceMagnitude * arrivalMultiplier, desiredVelocity.y * forceMagnitude * arrivalMultiplier);
            }
            else {
                desiredVelocity.set(desiredVelocity.x * forceMagnitude, desiredVelocity.y * forceMagnitude);
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
        ArrivalForce.prototype.destroy = function () {
            this._m_controller = null;
            this._m_v2_forceMagnitude = null;
            this._m_slowingRadius = null;
            this._m_v2_actualVelocity = null;
            this._m_v2_desiredVelocity = null;
            this._m_target = null;
            this._m_self = null;
            return;
        };
        return ArrivalForce;
    }());
    exports.ArrivalForce = ArrivalForce;
});
define("scenes/mainMenu", ["require", "exports", "actors/baseActor", "commons/stEnums", "components/cmpforceController", "components/cmpSpriteController", "steeringBehavior/forceSeek", "steeringBehavior/forceArrival"], function (require, exports, baseActor_1, stEnums_3, cmpforceController_1, cmpSpriteController_1, forceSeek_1, forceArrival_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainMenu = void 0;
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            var shipSprite = this.add.sprite(0, 0, 'space_ship');
            var shipActor = baseActor_1.BaseActor.Create(shipSprite, 'SpaceShip');
            this._m_ship = shipActor;
            shipActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            shipActor.addComponent(new cmpforceController_1.CmpForceController());
            shipActor.init();
            shipActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetMaxSpeed, 1000);
            shipActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.2, 0.2));
            var canvas = this.game.canvas;
            var width = canvas.width;
            var height = canvas.height;
            shipActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.5));
            shipActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetMass, 100);
            this._m_target_center = new Phaser.Math.Vector2(width * 0.5, height * 0.25);
            this._m_target_position = new Phaser.Math.Vector2();
            var targetSprite = this.add.sprite(0, 0, 'space_ship');
            var targetActor = baseActor_1.BaseActor.Create(targetSprite, 'target');
            this._m_target = targetActor;
            targetActor.addComponent(new cmpSpriteController_1.CmpSpriteController());
            targetActor.init();
            targetActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetScale, new Phaser.Math.Vector2(0.1, 0.1));
            targetActor.sendMessage(stEnums_3.ST_MESSAGE_ID.kSetPosition, new Phaser.Math.Vector2(width * 0.5, height * 0.15));
            var seek = new forceSeek_1.SeekForce();
            var arrival = new forceArrival_1.ArrivalForce();
            seek.init(shipSprite, targetSprite, 1000);
            arrival.init(shipSprite, targetSprite, 200, 1000);
            var forceControl = shipActor.getComponent(stEnums_3.ST_COMPONENT_ID.kForceController);
            forceControl.addForce('seek_1', arrival);
            return;
        };
        MainMenu.prototype.update = function (_time, _delta) {
            this._m_ship.update();
            return;
        };
        return MainMenu;
    }(Phaser.Scene));
    exports.MainMenu = MainMenu;
});
define("game_init", ["require", "exports", "phaser3-nineslice", "scenes/preload", "scenes/boot", "scenes/mainMenu"], function (require, exports, phaser3_nineslice_1, preload_1, boot_1, mainMenu_1) {
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
            this.m_game.scene.start('boot');
            return;
        };
        return GameInit;
    }());
    return GameInit;
});
define("managers/simulationManager/simulationManager", ["require", "exports", "commons/stEnums"], function (require, exports, stEnums_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimulationManager = void 0;
    var SimulationManager = (function () {
        function SimulationManager() {
        }
        SimulationManager.prototype.init = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.update = function (_dt) {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.receive = function (_id, _msg) {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.setMasterManager = function (_master) {
            this._m_master = _master;
            return;
        };
        SimulationManager.prototype.getID = function () {
            return stEnums_4.ST_MANAGER_ID.kSimManager;
        };
        SimulationManager.prototype.onPrepare = function () {
            this._m_actors = new Map();
            return;
        };
        SimulationManager.prototype.onGameSceneCreate = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.onGameSceneDestroy = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.onSimulationStart = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.onSimulationPause = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.onSimulationResume = function () {
            throw new Error("Method not implemented.");
        };
        SimulationManager.prototype.onSimulationShutdown = function () {
            this._m_actors.forEach(function (_actor) {
            });
        };
        SimulationManager.prototype.destroy = function () {
            this._m_actors.forEach(function (_actor) {
                _actor.destroy();
                return;
            });
            this._m_actors.clear();
            this._m_actors = null;
            return;
        };
        return SimulationManager;
    }());
    exports.SimulationManager = SimulationManager;
});
//# sourceMappingURL=steeringApp.js.map