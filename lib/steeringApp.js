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
define("scenes/boot", ["require", "exports"], function (require, exports) {
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
            this.add.image(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, 'space_ship');
            return;
        };
        MainMenu.prototype.update = function (_time, _delta) {
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
//# sourceMappingURL=steeringApp.js.map