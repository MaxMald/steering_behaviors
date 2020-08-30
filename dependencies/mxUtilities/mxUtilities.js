var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("commons/mxUUID", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Object with a unique UUID. This UUID is generated with the Phaser Utilities.
     */
    var MxUUID = /** @class */ (function () {
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MxUUID() {
            this._m_id = "";
            return;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxUUID instance, with a unique UUID.
         */
        MxUUID.Create = function () {
            var id = new MxUUID();
            id._m_id = Phaser.Utils.String.UUID();
            return id;
        };
        /**
         * Creates a new MxUUID instante, with the same UUID of a given MxUUID.
         * @param _mxUUID
         */
        MxUUID.Clone = function (_mxUUID) {
            var id = new MxUUID();
            id._m_id = _mxUUID._m_id;
            return id;
        };
        /**
         * Get the UUID string.
         */
        MxUUID.prototype.getUUIDString = function () {
            return this._m_id;
        };
        /**
         * Compare the value of this MxUUID with other MxUUID.
         *
         * @param _id MxUUID that you want to check.
         *
         * @returns true if the MxUUID has the same value.
         */
        MxUUID.prototype.compare = function (_id) {
            return this._m_id == _id._m_id;
        };
        return MxUUID;
    }());
    exports.MxUUID = MxUUID;
});
define("gameObjects/mxUObject", ["require", "exports", "commons/mxUUID"], function (require, exports, mxUUID_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An MxUObject is a object that has a MxUUID to be identified. Other classes can
     * be extended from this one to have the UUID methods, that help to identify
     * objects.
     */
    var MxUObject = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxUObject() {
            this._m_uuid = mxUUID_1.MxUUID.Create();
            return;
        }
        /**
         * Gets this object's unique identifier object.
         */
        MxUObject.prototype.getUUID = function () {
            return this._m_uuid;
        };
        /**
         * Gets this object's unique indentifier in the string format.
         */
        MxUObject.prototype.getUUIDString = function () {
            return this._m_uuid.getUUIDString();
        };
        /**
        * Safely destroys the object.
        */
        MxUObject.prototype.destroy = function () {
            this._m_uuid = null;
            return;
        };
        return MxUObject;
    }());
    exports.MxUObject = MxUObject;
});
/**
 * Custon assert functions.
 *
 * @packageDocumentation
 */
define("commons/mxAssert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxAssert = /** @class */ (function () {
        function MxAssert() {
        }
        /**
         * Check if the giveb parameter is a string. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.String = function (_input) {
            if (typeof _input === 'string')
                return;
            else
                throw new Error('Input must be a string.');
        };
        /**
         * Checks if the given parameter is a function. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Function = function (_input) {
            if (typeof _input === 'function')
                return;
            else
                throw new Error('Input must be a function.');
        };
        /**
         * Checks if the given parameter is a number. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Number = function (_input) {
            if (typeof _input === 'number')
                return;
            else
                throw new Error('Input must be a number.');
        };
        /**
         * Checks if the given parameter is an object. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Object = function (_input) {
            if (typeof _input === 'object')
                return;
            else
                throw new Error('Input must be an object.');
        };
        /**
         * Checks if the given parameter is a boolean. Throws an error if not.
         *
         * @param _input
         */
        MxAssert.Boolean = function (_input) {
            if (typeof _input === 'boolean')
                return;
            else
                throw new Error('Input must be a boolean.');
        };
        /**
         * Checkes if the given number is larger than 0. Throws an error if not.
         *
         * @param _number value that must has to be larther than the minimum value.
         * @param _minimum minimum value that the number can be. Number must be larger than minimum.
         */
        MxAssert.LargerThan = function (_number, _minimum) {
            if (_number <= 0) {
                throw new Error('Number cant has a negative or zero value');
            }
            return;
        };
        return MxAssert;
    }());
    exports.MxAssert = MxAssert;
});
define("fs/mxCSVRow", ["require", "exports", "gameObjects/mxUObject", "fs/mxCSVFile", "commons/mxAssert"], function (require, exports, mxUObject_1, mxCSVFile_1, mxAssert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxCSVRow = /** @class */ (function (_super) {
        __extends(MxCSVRow, _super);
        function MxCSVRow(_csv_file) {
            var _this = _super.call(this) || this;
            _this._m_a_cells = new Array();
            _this._m_a_csv_file = _csv_file;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        MxCSVRow.GetNull = function () {
            return MxCSVRow._NULL_OBJ;
        };
        /**
         * Check if the given instance is the null object.
         * @param _row
         */
        MxCSVRow.IsNull = function (_row) {
            var null_id = MxCSVRow.GetNull().getUUID();
            var param_id = _row.getUUID();
            return param_id.compare(null_id);
        };
        /**
         * Creates the null object.
         */
        MxCSVRow.Prepare = function () {
            MxCSVRow._NULL_OBJ = new MxCSVRow(mxCSVFile_1.MxCSVFile.GetNull());
            return;
        };
        /**
         * Destroys the null object.
         */
        MxCSVRow.Shutdown = function () {
            mxCSVFile_1.MxCSVFile._NULL_OBJ.destroy();
            mxCSVFile_1.MxCSVFile._NULL_OBJ = null;
            return;
        };
        /**
         * Gets the value of one of this Row's cell.
         * Returns an empty string if it doesn't has the required cell.
         *
         * @param _index {string | number} Index can be the header's name or the cell's index.
         */
        MxCSVRow.prototype.getCell = function (_index) {
            if (_index === undefined || _index == null) {
                console.warn("MxCSVRow: null or undefined parameter.");
                return "";
            }
            if (typeof _index === 'number') {
                if (this._validate_idx(_index)) {
                    return this._m_a_cells[_index];
                }
            }
            else if (typeof _index === 'string') {
                var array_index = this._m_a_csv_file.getHeaderIdx(_index);
                if (this._validate_idx(array_index)) {
                    return this._m_a_cells[array_index];
                }
            }
            return "";
        };
        /**
         * Adds a new cell to this row.
         * @param _data {string} New cell's data.
         */
        MxCSVRow.prototype.addCell = function (_data) {
            this._m_a_cells.push(_data);
            return;
        };
        /**
         * Adds multiple cells from raw data.
         *
         * @param _data {string} cells raw data.
         * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         */
        MxCSVRow.prototype.addCellsFromRaw = function (_data, _delimiter) {
            if (_delimiter === void 0) { _delimiter = ','; }
            mxAssert_1.MxAssert.String(_data);
            mxAssert_1.MxAssert.String(_delimiter);
            var a_cells_data = _data.split(_delimiter);
            for (var index = 0; index < a_cells_data.length; ++index) {
                this._m_a_cells.push(a_cells_data[index]);
            }
            return;
        };
        /**
         * Gets the row size.
         */
        MxCSVRow.prototype.getRowSize = function () {
            return this._m_a_cells.length;
        };
        /**
        * Safely destroys the object.
        */
        MxCSVRow.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._m_a_cells = null;
            this._m_a_csv_file = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxCSVRow.prototype._validate_idx = function (_index) {
            return (0 <= _index && _index < this._m_a_cells.length);
        };
        return MxCSVRow;
    }(mxUObject_1.MxUObject));
    exports.MxCSVRow = MxCSVRow;
});
define("fs/mxCSVFile", ["require", "exports", "gameObjects/mxUObject", "fs/mxCSVRow", "commons/mxAssert"], function (require, exports, mxUObject_2, mxCSVRow_1, mxAssert_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class handle a CSVFile.
     */
    var MxCSVFile = /** @class */ (function (_super) {
        __extends(MxCSVFile, _super);
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        function MxCSVFile() {
            var _this = _super.call(this) || this;
            _this._m_a_headers = new Array();
            _this._m_a_rows = new Array();
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        MxCSVFile.GetNull = function () {
            return MxCSVFile._NULL_OBJ;
        };
        /**
         * Checks if the given object is the null object.
         * @param _csv_file
         */
        MxCSVFile.IsNull = function (_csv_file) {
            var null_id = this.GetNull().getUUID();
            var obj_id = _csv_file.getUUID();
            return obj_id.compare(null_id);
        };
        /**
         * Creates the null object.
         */
        MxCSVFile.Prepare = function () {
            MxCSVFile._NULL_OBJ = new MxCSVFile();
            return;
        };
        /**
         * Destroys the null object.
         */
        MxCSVFile.ShutDown = function () {
            MxCSVFile._NULL_OBJ.destroy();
            MxCSVFile._NULL_OBJ = null;
            return;
        };
        /**
         * Creates an useful MxCSVFile object to handle a raw csv data.
         *
         * @param _csv_data {string} Raw CSV data.
         * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
         * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
         */
        MxCSVFile.Create = function (_csv_data, _has_header_row, _cell_delimiter, _row_delimiter) {
            if (_has_header_row === void 0) { _has_header_row = true; }
            if (_cell_delimiter === void 0) { _cell_delimiter = ','; }
            if (_row_delimiter === void 0) { _row_delimiter = '\n'; }
            var csv_file = new MxCSVFile();
            mxAssert_2.MxAssert.String(_csv_data);
            mxAssert_2.MxAssert.String(_cell_delimiter);
            mxAssert_2.MxAssert.String(_row_delimiter);
            if (_csv_data == "") {
                return csv_file;
            }
            // Remove any Carriage Character
            _csv_data = _csv_data.replace('\r', '');
            var row;
            var a_row_raw_data = _csv_data.split(_row_delimiter);
            var rows_start_position = 0;
            // Get the headers from the csv file.
            if (_has_header_row) {
                if (a_row_raw_data.length > 0) {
                    var a_cell_data = a_row_raw_data[0].split(_cell_delimiter);
                    for (var index = 0; index < a_cell_data.length; ++index) {
                        csv_file._m_a_headers.push(a_cell_data[index]);
                    }
                    rows_start_position++;
                }
            }
            // Get rows data.
            for (var index = rows_start_position; index < a_row_raw_data.length; ++index) {
                row = new mxCSVRow_1.MxCSVRow(csv_file);
                csv_file._m_a_rows.push(row);
                row.addCellsFromRaw(a_row_raw_data[index], _cell_delimiter);
            }
            return csv_file;
        };
        /**
         * Gets a row from the MxCSVFile. If the row_index is out of range, it will returns
         * a Null Object.
         *
         * @param _row_index
         */
        MxCSVFile.prototype.getRow = function (_row_index) {
            if (0 <= _row_index && _row_index < this._m_a_rows.length) {
                return this._m_a_rows[_row_index];
            }
            console.warn("Can't get the row from the MxCSVFile: Index out of range.");
            return mxCSVRow_1.MxCSVRow.GetNull();
        };
        /**
         * Gets the first Row with given value in a specific header column. Return a
         * Null Object if doesn't found a row with the given specifications.
         *
         * @param _key_header {string} key header's name
         * @param _value {string} value.
         */
        MxCSVFile.prototype.getRowByKey = function (_key_header, _value) {
            mxAssert_2.MxAssert.String(_key_header);
            mxAssert_2.MxAssert.String(_value);
            var header_idx = this.getHeaderIdx(_key_header);
            if (header_idx < 0) {
                console.warn("Can't get the row from the MxCSVFile: Header doesn't exists: " + _key_header);
                return mxCSVRow_1.MxCSVRow.GetNull();
            }
            for (var index = 0; index < this._m_a_rows.length; ++index) {
                if (this._m_a_rows[index].getCell(header_idx) == _value) {
                    return this._m_a_rows[index];
                }
            }
            return mxCSVRow_1.MxCSVRow.GetNull();
        };
        /**
         * Returns the header column position (0 based). Returns -1 if the header
         * doesn't exists.
         *
         * @param _header
         */
        MxCSVFile.prototype.getHeaderIdx = function (_header_name) {
            var value;
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                value = this._m_a_headers[index];
                if (value === _header_name) {
                    return index;
                }
            }
            console.warn("Can't get the Header Index:"
                + _header_name
                + " Header doesn't exists in the MxCSVFile.");
            return -1;
        };
        /**
         * Check if the header exists in the MxCSVFile. Returns true if it does.
         *
         * @param _header_name
         */
        MxCSVFile.prototype.hasHeader = function (_header_name) {
            for (var index = 0; index < this._m_a_headers.length; ++index) {
                if (this._m_a_headers[index] == _header_name) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Gets the number of headers.
         */
        MxCSVFile.prototype.getNumberHeaders = function () {
            return this._m_a_headers.length;
        };
        /**
         * Gets the number of rows.
         */
        MxCSVFile.prototype.getNumberRows = function () {
            return this._m_a_rows.length;
        };
        /**
        * Safely destroys the object.
        */
        MxCSVFile.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return MxCSVFile;
    }(mxUObject_2.MxUObject));
    exports.MxCSVFile = MxCSVFile;
});
/**
 * Common Enumerators.
 * @packageDocumentation
 */
define("commons/mxEnums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     */
    exports.OPRESULT = Object.freeze({
        /** There isn't a desciption for this result. */
        kUndefined: -1,
        /** Failure. */
        kFail: 0,
        /** Success. */
        kOk: 1,
        /** The operation cannot find a necesary file. */
        kFile_not_found: 2,
        /** The operation cannot find a necesary instance. */
        kObject_not_found: 3,
        /** The given parameter has an incompatible format. */
        kIncompatible_format: 4,
        /** There was a conflict with a null object. */
        kNull_Object: 5,
        /** The given parameter has an invalid type. */
        kInvalid_type: 6,
        /** There was a redundance conflict with some instance. */
        kObject_already_exists: 7,
        /**
         * The operation is not implemented yet.
         */
        kUnimplemented_operation: 8,
        /** Number of posible results. */
        kCount: 9
    });
    exports.COMPONENT_ID = Object.freeze({
        /** SpriteComponent  */
        kSprite: 0,
        /** NineSliceComponent */
        kNineSlice: 1,
        /** TextComponent */
        kText: 2,
        /** BitmapTextComponent */
        kBitmapText: 3,
        /** GraphicsComponent */
        kGraphics: 4,
        /** ShaderComponent */
        kShader: 5,
        /** AudioClipManager */
        kAudioClipsManager: 6,
        /** CmpTransform component. */
        kTransform: 7,
        /** Number of default components that this version has. */
        kCount: 8
    });
    exports.MESSAGE_ID = Object.freeze({
        /** The agent has been activated. data : null */
        kOnAgentActive: 0,
        /** The agent has been desactivated. data : null*/
        kOnAgentDesactive: 1,
        /** */
        kPlaySound: 2,
        /** Number of default Messages. */
        kCount: 3
    });
    exports.OBJECT_POOL_TYPE = Object.freeze({
        /** Identifier of the static Object Pool. */
        kStatic: 0,
        /** Identifier of the dynamic Object Pool. */
        kDynamic: 1,
    });
});
define("behaviour/mxComponent", ["require", "exports", "gameObjects/mxUObject"], function (require, exports, mxUObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The MxComponent contains data or state of a MxActor.
     */
    var MxComponent = /** @class */ (function (_super) {
        __extends(MxComponent, _super);
        /**
         * Build a new MxComponent with an identifier.
         *
         * @param _id The idendtifier of this MxComponent.
         */
        function MxComponent(_id) {
            var _this = _super.call(this) || this;
            _this._m_id = _id;
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates the Null Object of the MxComponent class.
         */
        MxComponent.Prepare = function () {
            if (MxComponent._NULL_OBJECT == null
                || MxComponent._NULL_OBJECT == undefined) {
                this._NULL_OBJECT = new MxComponent(-1);
            }
            return;
        };
        /**
         * Destroys the Null Object of the MxComponent class.
         */
        MxComponent.Shutdown = function () {
            if (typeof MxComponent._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        /**
         * Chech if the given MxCompoennt is the MxCompoent's Null Object.
         */
        MxComponent.IsNull = function (_object) {
            var uuid = _object.getUUID();
            return uuid.compare(MxComponent._NULL_OBJECT.getUUID());
        };
        /**
         * Get the MxComponent Null Object.
         */
        MxComponent.GetNull = function () {
            return this._NULL_OBJECT;
        };
        /**
         * Can be overrided. This method is called when the MxActor have just been
         * initialized. Base method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belongs.
         */
        MxComponent.prototype.init = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called during the actor update. Base
         * method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belogns.
         */
        MxComponent.prototype.update = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when a
         * message is recived. Base method do nothing.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        MxComponent.prototype.receive = function (_id, _data) {
            return;
        };
        /**
         * Gets this MxComponent's identifier.
         */
        MxComponent.prototype.getID = function () {
            return this._m_id;
        };
        /**
         * Can be overided. This method is called by the MxComponentManager when the component
         * is attach to a MxActor. Base method do nothing.
         *
         * This method is useful if the MxActor had been initialized before, so the
         * MxComponent can intialized when is attached to the MxActor.
         *
         * @param _actor The MxActor to which this MxComponent belongs.
         */
        MxComponent.prototype.onAttach = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when the component
         * is dettach from the MxActor. Base method do nothing.
         *
         * @param _actor
         */
        MxComponent.prototype.onDettach = function (_actor) {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxComponentManager when the MxActor is
         * destroyed. Base method calls its super.destroy() method.
         */
        MxComponent.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return;
        };
        return MxComponent;
    }(mxUObject_3.MxUObject));
    exports.MxComponent = MxComponent;
});
define("behaviour/mxComponentManager", ["require", "exports", "commons/mxEnums", "behaviour/mxComponent"], function (require, exports, mxEnums_1, mxComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class is intended to manage the MxComponents attached to one MxActor.
     * It has basic operations with the MxComponent, and can be delegated the
     * initializtion, update and destructions of the attached MxComponents.
     */
    var MxComponentManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates an empty MxComponentManager. The actor reference is set to null.
         */
        function MxComponentManager() {
            this._m_component_map = new Map();
            this._m_actor = null;
            return;
        }
        /**
         * Sets the actor reference wich this MxComponentManager belons. This method
         * is called by the MxActor factories. Developers shouldn't use this one.
         *
         * @param _actor MxActor who this MxComponentManager belongs.
         */
        MxComponentManager.prototype.setActor = function (_actor) {
            this._m_actor = _actor;
            return;
        };
        /**
         * Calls the init() method of each component attached to this MxComponentManager.
         * This method is called by the init() method of the actor.
         */
        MxComponentManager.prototype.init = function () {
            this._m_component_map.forEach(function (_component) {
                _component.init(this._m_actor);
                return;
            }, this);
            return;
        };
        /**
         * Calls the update() method of each component attached to this MxComponentManager.
         * This method is called by the update() method of the actor.
         */
        MxComponentManager.prototype.update = function () {
            this._m_component_map.forEach(function (_component) {
                _component.update(this._m_actor);
                return;
            }, this);
            return;
        };
        /**
         * Sends a message to each component attached to this MxComponentManager.
         *
         * @param _id
         * @param _data
         */
        MxComponentManager.prototype.sendMessage = function (_id, _data) {
            this._m_component_map.forEach(function (_component) {
                _component.receive(_id, _data);
                return;
            }, this);
            return;
        };
        /**
         * Adds a MxComponent to this MxComponentManager.
         *
         * @param _component
         */
        MxComponentManager.prototype.addComponent = function (_component) {
            if (this._m_component_map.has(_component.getID())) {
                return mxEnums_1.OPRESULT.kObject_already_exists;
            }
            this._m_component_map.set(_component.getID(), _component);
            _component.onAttach(this._m_actor);
            return mxEnums_1.OPRESULT.kOk;
        };
        /**
         * Remove a MxComponent from this MxComponentManager by its identifier.
         *
         * @param _id
         */
        MxComponentManager.prototype.removeComponent = function (_id) {
            if (this.hasComponent(_id)) {
                var component = this._m_component_map.get(_id);
                component.onDettach(this._m_actor);
                this._m_component_map.delete(_id);
            }
            return;
        };
        /**
         * Check if this MxComponentManager has a MxComponent by its identifier.
         *
         * @param _id
         */
        MxComponentManager.prototype.hasComponent = function (_id) {
            return this._m_component_map.has(_id);
        };
        /**
         * Gets a MxComponent from this manager. This method allows to automaticlly cast
         * the MxComponent base class to a specific subclass. Be sure that the ID and the
         * subclass type are compatible.
         *
         * @param _id MxComponent's identifier.
         */
        MxComponentManager.prototype.getComponent = function (_id) {
            if (this._m_component_map.has(_id)) {
                return this._m_component_map.get(_id);
            }
            else {
                return mxComponent_1.MxComponent.GetNull();
            }
        };
        /**
         * Removes all the components attached to this MxManagerComponent.
         */
        MxComponentManager.prototype.clear = function () {
            this._m_component_map.clear();
            return;
        };
        /**
         * Calls the destroy method of each MxComponent attached to this MxComponentMannager.
         * It clears the component list.
         */
        MxComponentManager.prototype.destroy = function () {
            this._m_component_map.forEach(function (_component) {
                _component.destroy();
            });
            this._m_component_map.clear();
            this._m_component_map = null;
            this._m_actor = null;
            return;
        };
        return MxComponentManager;
    }());
    exports.MxComponentManager = MxComponentManager;
});
define("behaviour/mxActor", ["require", "exports", "gameObjects/mxUObject", "commons/mxEnums", "behaviour/mxComponentManager"], function (require, exports, mxUObject_4, mxEnums_2, mxComponentManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Architectural pattern wich follows the composition over inheritance principle
     * that allows greate flexibility in defining entities.
     *
     * Every MxActor consists of one or more MxComponent wich contains data or state.
     * The mix of MxComponents defines the behaviour of the MxActor. Therefore, the
     * behaviour of a MxActor can be changed during runtime by systems that add,
     * remove or mutate MxCompoents.
     */
    var MxActor = /** @class */ (function (_super) {
        __extends(MxActor, _super);
        /****************************************************/
        /* Protected                                        */
        /****************************************************/
        function MxActor() {
            var _this = _super.call(this) || this;
            _this._m_component_mg = new mxComponentManager_1.MxComponentManager();
            _this._m_children_map = new Map();
            _this._m_component_mg.setActor(_this);
            return _this;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates the Null Object of the MxActor class.
         */
        MxActor.Prepare = function () {
            if (MxActor._NULL_OBJECT === undefined
                || MxActor._NULL_OBJECT == null) {
                ///////////////////////////////////
                // Null Object
                MxActor._NULL_OBJECT = new MxActor();
                MxActor._NULL_OBJECT._m_id = "";
                MxActor._NULL_OBJECT._m_tag = -1;
                MxActor._NULL_OBJECT._m_parent = MxActor._NULL_OBJECT;
            }
            return;
        };
        /**
         * Destroys the Null Object of the MxActor class.
         */
        MxActor.Shutdown = function () {
            if (typeof MxActor._NULL_OBJECT == 'object') {
                this._NULL_OBJECT.destroy();
                this._NULL_OBJECT = null;
            }
            return;
        };
        /**
        * Check if the given actor is the Null Object.
        */
        MxActor.IsNull = function (_obj) {
            var _obj_uuid = _obj.getUUID();
            return this._NULL_OBJECT.getUUID().compare(_obj_uuid);
        };
        /**
         * Get Object Null.
         */
        MxActor.GetNull = function () {
            return this._NULL_OBJECT;
        };
        /**
         * MxActor default factory. It creates a new actor with default properties and
         * a transform component.It can be assigned as a child of another actor.
         *
         * @param _id MxActor identifier. Usually a name to indify it.
         * @param _m_parent MxActor's parent.
         */
        MxActor.Create = function (_id, _parent) {
            var actor = new MxActor();
            // Init properties.
            actor._m_id = _id;
            actor._m_tag = -1;
            actor._m_parent = MxActor.GetNull();
            // Set the actor's parent.
            if (typeof _parent == 'object') {
                if (_parent.addChild(actor) == mxEnums_2.OPRESULT.kOk) {
                    actor._m_parent = _parent;
                }
                else {
                    actor._m_parent = MxActor.GetNull();
                    console.error("Couldn't set actor's hierarchy.");
                }
            }
            else {
                actor._m_parent = MxActor.GetNull();
            }
            return actor;
        };
        /**
         * Creates a child of this MxActor. This method will returns
         * a Null Object if the parent already has a MxActor with the same
         * identifier.
         *
         * @param _id Actor identifier.
         */
        MxActor.prototype.create = function (_id) {
            if (this.hasChild(_id)) {
                return MxActor.GetNull();
            }
            var actor = MxActor.Create(_id, this);
            return actor;
        };
        /**
         * Intialize this actor's components and children.
         */
        MxActor.prototype.init = function () {
            this._m_component_mg.init();
            this._m_children_map.forEach(function (_actor) {
                _actor.init();
            });
            return;
        };
        /**
         * Update MxActor's components.
         */
        MxActor.prototype.update = function () {
            this._m_component_mg.update();
            this._m_children_map.forEach(this._update_child);
            return;
        };
        /**
         * Get the actor's MxComponentManager instance.
         */
        MxActor.prototype.getComponentManager = function () {
            return this._m_component_mg;
        };
        /**
         * Adds a ne component to this Actor. Returns a OPRESULT.
         * @param _component
         */
        MxActor.prototype.addComponent = function (_component) {
            return this._m_component_mg.addComponent(_component);
        };
        /**
         * Get this MxActor's MxComponent.
         * @param _id
         */
        MxActor.prototype.getComponent = function (_id) {
            return this._m_component_mg.getComponent(_id);
        };
        /**
         * Clears de MxComponentManager.
         */
        MxActor.prototype.clearComponentManager = function () {
            this._m_component_mg.clear();
            return;
        };
        /**
         * Sends a message to this MxActor's component.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         * @param _recursive Send the message to the the MxActor's children.
         */
        MxActor.prototype.sendMessage = function (_id, _data, _recursive) {
            if (_recursive === void 0) { _recursive = false; }
            this._m_component_mg.sendMessage(_id, _data);
            if (_recursive) {
                this.sendMessageToChildren(_id, _data);
            }
            return;
        };
        /**
         * Sends a message to this MxActor children.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        MxActor.prototype.sendMessageToChildren = function (_id, _data) {
            this._m_children_map.forEach(function (_child) {
                _child.sendMessage(_id, _data, true);
            });
            return;
        };
        /**
         * Adds a new child to this Actor. This method detach the child from his
         * previous parent (if it has one).
         *
         * @param _child
         */
        MxActor.prototype.addChild = function (_child) {
            if (this.hasChild(_child._m_id)) {
                return mxEnums_2.OPRESULT.kObject_already_exists;
            }
            _child.detachFromParent();
            this._m_children_map.set(_child._m_id, _child);
            _child._m_parent = this;
            return mxEnums_2.OPRESULT.kOk;
        };
        /**
         * Removes a child from this object. The parent reference of the child will be
         * set to Null Object. The parent reference of the child's transform will be
         * set to null.
         *
         * @param _child Child reference or child identifier.
         */
        MxActor.prototype.removeChild = function (_child) {
            if (typeof _child == 'object') {
                if (this._m_children_map.has(_child._m_id)) {
                    var child = this._m_children_map.get(_child._m_id);
                    if (!child._m_uuid.compare(_child._m_uuid)) {
                        return mxEnums_2.OPRESULT.kObject_not_found;
                    }
                    child._m_parent = MxActor.GetNull();
                    this._m_children_map.delete(_child._m_id);
                }
                else {
                    return mxEnums_2.OPRESULT.kObject_not_found;
                }
            }
            else if (typeof _child == 'string') {
                if (this._m_children_map.has(_child)) {
                    var child = this._m_children_map.get(_child);
                    child._m_parent = MxActor.GetNull();
                    this._m_children_map.delete(_child);
                }
                else {
                    return mxEnums_2.OPRESULT.kObject_not_found;
                }
            }
            else {
                return mxEnums_2.OPRESULT.kInvalid_type;
            }
            return mxEnums_2.OPRESULT.kOk;
        };
        /**
         * Gets a child by its identifier. If this actor doesn't has any child with
         * the id, the method will returns a Null Object.  This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        MxActor.prototype.getChild = function (_id) {
            if (this._m_children_map.has(_id)) {
                return this._m_children_map.get(_id);
            }
            else {
                return MxActor.GetNull();
            }
        };
        /**
         * Check if the actor has a child with the given identifier. This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        MxActor.prototype.hasChild = function (_id) {
            return this._m_children_map.has(_id);
        };
        /**
         * This method will detach the actor from his parent.
         */
        MxActor.prototype.detachFromParent = function () {
            if (!MxActor.IsNull(this._m_parent)) {
                return this._m_parent.removeChild(this);
            }
            return mxEnums_2.OPRESULT.kOk;
        };
        /**
         * Gets the actor's parent.
         */
        MxActor.prototype.getParent = function () {
            return this._m_parent;
        };
        /**
         * Gets this actor's identifier.
         */
        MxActor.prototype.getID = function () {
            return this._m_id;
        };
        /**
         * Gets the actor's tag.
         */
        MxActor.prototype.getTag = function () {
            return this._m_tag;
        };
        /**
         * Sends a mesasge 'kOnAgentActive' to all the components.
         */
        MxActor.prototype.mxActive = function () {
            this.sendMessage(mxEnums_2.MESSAGE_ID.kOnAgentActive, null, true);
            return;
        };
        /**
         * Send a message 'kOnAgentDesactive' to all the components.
         */
        MxActor.prototype.mxDesactive = function () {
            this.sendMessage(mxEnums_2.MESSAGE_ID.kOnAgentDesactive, null, true);
            return;
        };
        /**
         * Destroys this MxActor and his children.
         */
        MxActor.prototype.destroy = function () {
            this._m_children_map.forEach(function (_actor) {
                _actor.destroy();
                return;
            });
            this._m_children_map.clear();
            this._m_children_map = null;
            this._m_component_mg.destroy();
            _super.prototype.destroy.call(this);
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxActor.prototype._update_child = function (_actor) {
            _actor.update();
            return;
        };
        return MxActor;
    }(mxUObject_4.MxUObject));
    exports.MxActor = MxActor;
});
define("mxUtilities", ["require", "exports", "fs/mxCSVFile", "fs/mxCSVRow", "behaviour/mxActor", "behaviour/mxComponent"], function (require, exports, mxCSVFile_2, mxCSVRow_2, mxActor_1, mxComponent_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxUtilities = /** @class */ (function () {
        function MxUtilities() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Prepare all the utilities modules and null objects.
         */
        MxUtilities.Prepare = function () {
            mxActor_1.MxActor.Prepare();
            mxComponent_2.MxComponent.Prepare();
            mxCSVFile_2.MxCSVFile.Prepare();
            mxCSVRow_2.MxCSVRow.Prepare();
            return;
        };
        /**
         * Destroy all the utilities modules and null objects.
         */
        MxUtilities.Shutdown = function () {
            mxCSVRow_2.MxCSVRow.Shutdown();
            mxCSVFile_2.MxCSVFile.ShutDown();
            mxComponent_2.MxComponent.Shutdown();
            mxActor_1.MxActor.Shutdown();
            return;
        };
        return MxUtilities;
    }());
    exports.MxUtilities = MxUtilities;
});
define("behaviour/mxState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Logic unit used by the MxFSM to define an execution block. The class need to
     * define its controller type.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    var MxState = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxState without MxFSM and controller.
         */
        function MxState() {
            this._m_fsm = null;
            this._m_controller = null;
            return;
        }
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from desactive to active. Base method do nothing.
         */
        MxState.prototype.onEnter = function () {
            return;
        };
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from active to desactive. Base method do nothing.
         */
        MxState.prototype.onExit = function () {
            return;
        };
        /**
         * Can be overrided. This method is called by the MxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        MxState.prototype.update = function () {
            return 0;
        };
        /**
         * Can be overrided. This method is called by the mxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        MxState.prototype.draw = function () {
            return 0;
        };
        /**
         * Set the MxFSM where this MxState belongs. The parameter can be a null type
         * object. This method should be used only by the MxFSM.
         *
         * @param _fsm The MxFSM where this MxState belongs.
         */
        MxState.prototype.attachToFSM = function (_fsm) {
            this._m_fsm = _fsm;
            return;
        };
        /**
         * Set the controller object o this MxState. This parameter can be a null type
         * object. This method should be use only by the MxFSM.
         *
         * @param _controller The controller instance.
         */
        MxState.prototype.setController = function (_controller) {
            this._m_controller = _controller;
            return;
        };
        /**
         * Can be overrided. This method are called by the MxFSM when the MxState is
         * deleted or the MxFSM is destroyed. Base method do nothing.
         */
        MxState.prototype.destroy = function () {
            return;
        };
        return MxState;
    }());
    exports.MxState = MxState;
});
define("behaviour/mxFSM", ["require", "exports", "commons/mxEnums"], function (require, exports, mxEnums_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Model that can be used to simulate secuential logic, or in other words, to
     * represent and control execution flow. This class need to define the type of
     * its controller.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    var MxFSM = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Creates a new MxFSM with null values. Use the init() method after the MxFSM
         * is builded, so it can be used.
         */
        function MxFSM() {
            this._m_active_state = null;
            this._m_states_map = null;
            return;
        }
        /**
         * Intialize this MxFSM with a controller. This method creates a new
         * Map for the MxState. This method should be called once and before any
         * other method.
         *
         * @param _controller The controller object of this MxFSM.
         */
        MxFSM.prototype.init = function (_controller) {
            this._m_states_map = new Map();
            this._m_controller = _controller;
            return;
        };
        /**
         * Calls the update() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the update() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        MxFSM.prototype.update = function () {
            if (this._m_active_state != null) {
                return this._m_active_state.update();
            }
            return -1;
        };
        /**
         * Calls the draw() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the draw() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        MxFSM.prototype.draw = function () {
            if (this._m_active_state != null) {
                return this._m_active_state.draw();
            }
            return -1;
        };
        /**
         * Removes all the MxState of this MxFSM. This method will not destroy the
         * MxState. This method will not call the onExit() method of the active
         * MxState.
         */
        MxFSM.prototype.clear = function () {
            this._m_states_map.forEach(function (_state) {
                // detach from this MXFSM
                _state.attachToFSM(null);
                _state.setController(null);
            });
            this._m_states_map.clear();
            this._m_active_state = null;
            return;
        };
        /**
         * Set the active MxState by its identifier. This method calls the onExit()
         * callback of the previous MxState (if it exists), later calls the onEnter()
         * callback of the new active MxState.
         *
         * This method returns OPRESULT.KObject_doesnt_found if none of the MxState have
         * the given identifier.
         *
         * @param _idx The identifier of the MxState.
         *
         * @returns OPRESULT.kOk if the operation was successfull.
         */
        MxFSM.prototype.setActive = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                if (this._m_active_state != null) {
                    this._m_active_state.onExit();
                }
                this._m_active_state = this._m_states_map.get(_idx);
                this._m_active_state.onEnter();
            }
            else {
                return mxEnums_3.OPRESULT.kObject_not_found;
            }
            return mxEnums_3.OPRESULT.kOk;
        };
        /**
         * Adds a new state to this MxFSM. The new MxState needs a number to be identified.
         *
         * This method returns an OPRESULT.kObject_already_exists if there is a MxState
         * with the same identifier as the given, and the MxState will not be added
         * to the MxFSM.
         *
         * @param _idx The identifier of the given MxState.
         * @param _state The MxState that will be added to this MxFSM.
         *
         * @returns OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.addState = function (_idx, _state) {
            if (!this._m_states_map.has(_idx)) {
                this._m_states_map.set(_idx, _state);
                // attach the MxState to this MxFSM
                _state.attachToFSM(this);
                _state.setController(this._m_controller);
            }
            else {
                return mxEnums_3.OPRESULT.kObject_already_exists;
            }
            return mxEnums_3.OPRESULT.kOk;
        };
        /**
         * Removes a MxState by its identifier. If the MxState to be removed is the
         * active MxState, the onExit() method of the MxState will be called before
         * removing it.
         *
         * If you want to destroy the MxState, use the deleteState(number)
         * method instead.
         *
         * Returns OPRESULT:kObject_not_found if none of the MxState have the given
         * identifier.
         *
         * @param _idx The identifier of the MxState to be removed.
         *
         * @param OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.removeState = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                // destroy the MxState before be removed.
                var state = this._m_states_map.get(_idx);
                // Check if the MxState to be removed is the active MxState. If it is,
                // call the onExit() method, before removing it.
                if (state == this._m_active_state) {
                    this._m_active_state.onExit();
                    this._m_active_state = null;
                }
                // detach from this FSM.
                state.attachToFSM(null);
                state.setController(null);
                // remvoes the MxState from this MxFSM.
                this._m_states_map.delete(_idx);
            }
            else {
                return mxEnums_3.OPRESULT.kObject_not_found;
            }
            return mxEnums_3.OPRESULT.kOk;
        };
        /**
         * Destroys a MxState by its identifier. This method will call the destroy() method
         * of  the MxState. If the MxState to be deleted is the active MxState, the
         * onExit() method of the MxState will be called before removing it.
         *
         * If you only want to remove the MxState from this MxFSM, witout
         * destroying it, use removeState(number) method instead.
         *
         * Returns OPRESULT:kObject_not_found if none of the MxState have the given
         * identifier.
         *
         * @param _idx The identifier of the MxState to be deleted.
         *
         * @returns OPRESULT.kOk if the operation was succesfull.
         */
        MxFSM.prototype.deleteState = function (_idx) {
            if (this._m_states_map.has(_idx)) {
                // destroy the MxState before be removed.
                var state = this._m_states_map.get(_idx);
                // Check if the MxState to be removed is the active MxState. If it is,
                // call the onExit() method, before destroying it.
                if (state == this._m_active_state) {
                    this._m_active_state.onExit();
                    this._m_active_state = null;
                }
                // destroy the MxState.
                state.destroy();
                // remove the MxState from this MxFSM.
                this._m_states_map.delete(_idx);
            }
            else {
                return mxEnums_3.OPRESULT.kObject_not_found;
            }
            return mxEnums_3.OPRESULT.kOk;
        };
        /**
         * Call the destroy() method of each MxState in this MxFSM. Finally clears
         * the list of MxState. This method will not call the onExit() method of the
         * active MxState.
         */
        MxFSM.prototype.deleteAll = function () {
            this._m_states_map.forEach(function (_state) {
                _state.destroy();
                return;
            });
            this._m_states_map.clear();
            this._m_active_state = null;
        };
        return MxFSM;
    }());
    exports.MxFSM = MxFSM;
});
define("commons/mxDateTime", ["require", "exports", "commons/mxAssert"], function (require, exports, mxAssert_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxDateTime = /** @class */ (function () {
        function MxDateTime() {
        }
        /**
         * Generate a string with the time format HH : MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        MxDateTime.GetHHMMSS = function (_seconds) {
            mxAssert_3.MxAssert.Number(_seconds);
            _seconds = Math.floor(_seconds);
            var hours = Math.floor(_seconds / 3600);
            var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
            var seconds = _seconds - (hours * 3600) - (minutes * 60);
            var time = "";
            // Hours
            if (hours < 10) {
                time += "0" + hours;
            }
            else {
                time += hours;
            }
            time += ' : ';
            // Minutes
            if (minutes < 10) {
                time += "0" + minutes;
            }
            else {
                time += minutes;
            }
            time += ' : ';
            // Seconds
            if (seconds < 10) {
                time += "0" + seconds;
            }
            else {
                time += seconds;
            }
            return time;
        };
        /**
         * Generate a string with the time format MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        MxDateTime.GetMMSS = function (_seconds) {
            mxAssert_3.MxAssert.Number(_seconds);
            _seconds = Math.floor(_seconds);
            var hours = Math.floor(_seconds / 3600);
            var minutes = Math.floor((_seconds - (hours * 3600)) / 60);
            var seconds = _seconds - (hours * 3600) - (minutes * 60);
            var time = "";
            // Minutes
            if (minutes < 10) {
                time += "0" + minutes;
            }
            else {
                time += minutes;
            }
            time += ' : ';
            // Seconds
            if (seconds < 10) {
                time += "0" + seconds;
            }
            else {
                time += seconds;
            }
            return time;
        };
        return MxDateTime;
    }());
    exports.MxDateTime = MxDateTime;
});
define("commons/mxInterpolation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
      * Constructs new data from a range of discrete set of known
      * data points.
    */
    var MxInterpolation = /** @class */ (function () {
        function MxInterpolation() {
        }
        /****************************************************/
        /* Interpolations                                   */
        /****************************************************/
        /**
         * Constructs new data from a range of discrete set of known
         * data points.
         *
         * @param x1 Point 1: x value.
         * @param y1 Point 1: y value.
         * @param x2 Point 2: x value.
         * @param y2 Point 2: y value.
         * @param x  Interpolated Point: x value.
         *
         * @returns Interpolated Point: y value.
         */
        MxInterpolation.Linear = function (x1, y1, x2, y2, x) {
            return ((x - x1) * (y2 - y1) / (x2 - x1)) + y1;
        };
        /**
         * Performs the bilinear interpolation using the linear inteporlation in one
         * axis, and then again in the other.
         *
         * @param x1 Point 1 : x value.
         * @param y1 Point 1 : y value.
         * @param x2 Point 2 : x value.
         * @param y2 Point 2 : y value.
         * @param v1 Point 1 : point value.
         * @param v2 Point 2 : point value.
         * @param v3 Point 3 : point value.
         * @param v4 Point 4 : point value.
         * @param tx Interpolated Point : x value.
         * @param ty Interpolated Point : y value.
         *
         * @returns Interpolated Point: point value.
         */
        MxInterpolation.Bilinear = function (x1, y1, x2, y2, v1, v2, v3, v4, tx, ty) {
            //P1:{x1,y1,v1} - P2:{x2,y1,v2} - P3:{x1,y2,v3} - P4:{x2,y2,v4}
            //Target:{tx,ty}
            var area_v1 = Math.abs((tx - x1) * (ty - y1)) * v4;
            var area_v2 = Math.abs((tx - x2) * (ty - y1)) * v3;
            var area_v3 = Math.abs((tx - x1) * (ty - y2)) * v2;
            var area_v4 = Math.abs((tx - x2) * (ty - y2)) * v1;
            var area_total = (x2 - x1) * (y2 - y1);
            return (area_v1 + area_v2 + area_v3 + area_v4) / area_total;
        };
        return MxInterpolation;
    }());
    exports.MxInterpolation = MxInterpolation;
});
define("commons/mxMath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxMath = /** @class */ (function () {
        function MxMath() {
        }
        /**
         * If the given value is less than the minimum value, it will return the minimum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         */
        MxMath.TruncateMinimum = function (_value, _min) {
            if (_value < _min) {
                return _min;
            }
            return _value;
        };
        /**
         * If the given value is less than the maximum value, it will return the maximum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _max maximum value.
         */
        MxMath.TruncatetMaximum = function (_value, _max) {
            if (_value > _max) {
                return _max;
            }
            return _value;
        };
        /**
         * If the value is outside the range, the function will return the maximum or
         * minimum value depending on the value, otherwise it will return the given
         * value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         * @param _max maximum value.
         */
        MxMath.TruncateByRange = function (_value, _min, _max) {
            if (_value < _min) {
                _value = _min;
            }
            else if (_value > _max) {
                _value = _max;
            }
            return _value;
        };
        return MxMath;
    }());
    exports.MxMath = MxMath;
});
define("commons/mxMixin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxMixin = /** @class */ (function () {
        function MxMixin() {
        }
        MxMixin.applyMixins = function (derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
                });
            });
        };
        return MxMixin;
    }());
    exports.MxMixin = MxMixin;
});
define("commons/mxPerlinNoise", ["require", "exports", "commons/mxInterpolation"], function (require, exports, mxInterpolation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxPerlinNoise = /** @class */ (function () {
        function MxPerlinNoise() {
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         *
         * @param _length
         * @param _n_octaves
         */
        MxPerlinNoise.Noise1D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            /**
             * Wave values.
             */
            var wave = new Float32Array(_length);
            var frecuency = 0;
            var amplitude = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
                /**
                 * Octave Frecuency
                 */
                frecuency = Math.pow(_frecuency_power, oct_idx);
                /**
                 * Octave Amplitude
                 */
                amplitude = _length / Math.pow(_amplitude_power, oct_idx);
                if (frecuency > _length) {
                    break;
                }
                /**
                 * Apply Octave
                 */
                MxPerlinNoise.Octave(frecuency, amplitude, wave, _length);
            }
            if (_normalized) {
                /**
                * Normalize values
                */
                for (var index = 0; index < _length; ++index) {
                    wave[index] /= _length;
                }
            }
            return wave;
        };
        MxPerlinNoise.Noise2D = function (_length, _frecuency_power, _amplitude_power, _n_octaves, _normalized) {
            if (_frecuency_power === void 0) { _frecuency_power = 2; }
            if (_amplitude_power === void 0) { _amplitude_power = 2; }
            if (_n_octaves === void 0) { _n_octaves = 6; }
            if (_normalized === void 0) { _normalized = false; }
            var grid = new Array(_length);
            for (var index = 0; index < _length; ++index) {
                grid[index] = new Float32Array(_length);
            }
            var frecuency = 0;
            var amplitude = 0;
            var high_value = 0;
            for (var oct_idx = 1; oct_idx <= _n_octaves; ++oct_idx) {
                //frecuency = Math.pow(_frecuency_power, oct_idx);
                frecuency = _frecuency_power * oct_idx;
                //amplitude = _length / Math.pow(_amplitude_power, oct_idx);
                amplitude = _amplitude_power / oct_idx;
                high_value += amplitude;
                if (frecuency > _length) {
                    break;
                }
                MxPerlinNoise.Octave2D(frecuency, amplitude, grid, _length);
            }
            if (_normalized) {
                for (var row = 0; row < _length; ++row) {
                    for (var col = 0; col < _length; ++col) {
                        grid[row][col] /= high_value;
                    }
                }
            }
            return grid;
        };
        /**
         *
         * @param _frecuency
         * @param _amplitude
         * @param _length
         */
        MxPerlinNoise.Octave = function (_frecuency, _amplitude, _wave, _length) {
            var step = Math.floor(_length / _frecuency);
            /**
             *
             */
            var y1 = undefined;
            var y2 = undefined;
            var x1 = undefined;
            var x2 = undefined;
            for (var index = 0; index <= _length; index += step) {
                /**
                 * Generate a value randomly between [0 - amplitud].
                 */
                y2 = _amplitude - (Math.random() * _amplitude);
                /**
                 * adds this value to the wave
                 */
                _wave[index] += y2;
                /**
                 * Interpolate the inbetweens values form this node to the last node.
                 * Te substraction of the current index with the backstep determinate
                 * the first begining of the segment.
                 */
                if (y1 != undefined) {
                    x1 = index - (step - 1);
                    x2 = index;
                    for (var node = index - (step - 1); node < index; ++node) {
                        /**
                         * Get the linear interpolation at "node" position.
                         */
                        _wave[node] += mxInterpolation_1.MxInterpolation.Linear(x1, y1, x2, y2, node);
                    }
                }
                /**
                 * X1 es igual a x2
                 */
                y1 = y2;
            }
            return;
        };
        MxPerlinNoise.Octave2D = function (_frecuency, _amplitude, _wave, _length) {
            var grid = new Array(_frecuency);
            for (var index = 0; index <= _frecuency; ++index) {
                grid[index] = new Float32Array(_frecuency + 1);
            }
            var x1;
            var y1;
            var x2;
            var y2;
            var local_x1;
            var local_y1;
            var local_x2;
            var local_y2;
            var temp;
            // Interator over the grid.
            for (var row = 0; row <= _frecuency; ++row) {
                for (var col = 0; col <= _frecuency; ++col) {
                    grid[row][col] = _amplitude - (Math.random() * _amplitude);
                    // Check if node is not in first row or first column.
                    if (row > 0 && col > 0) {
                        x2 = col;
                        y2 = row;
                        x1 = x2 - 1;
                        y1 = y2 - 1;
                        local_x1 = (Math.floor((x1 / _frecuency) * _length));
                        local_x2 = (Math.floor((x2 / _frecuency) * _length));
                        local_y1 = (Math.floor((y1 / _frecuency) * _length));
                        local_y2 = (Math.floor((y2 / _frecuency) * _length));
                        for (var y = local_y1; y < local_y2; ++y) {
                            for (var x = local_x1; x < local_x2; ++x) {
                                temp =
                                    mxInterpolation_1.MxInterpolation.Bilinear(local_x1, local_y1, local_x2, local_y2, grid[y1][x1], grid[y1][x2], grid[y2][x1], grid[y2][x2], x, y);
                                _wave[y][x] += temp;
                            }
                        }
                    }
                }
            }
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxPerlinNoise.MAX_LENGHT = 256;
        return MxPerlinNoise;
    }());
    exports.MxPerlinNoise = MxPerlinNoise;
});
define("listeners/mxListener", ["require", "exports", "commons/mxAssert"], function (require, exports, mxAssert_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class contains a Function and may have an object as the Function's context.
     * The "S" type can be defined as the type of the sender object (who calls this Listener),
     * and the "A" type can be defined as the type of the object who has the arguments.
     */
    var MxListener = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * The MxListener needs a Function, and may have a context.
         *
         * @param _listener
         * @param _context
         */
        function MxListener(_listener, _context) {
            mxAssert_4.MxAssert.Function(_listener);
            mxAssert_4.MxAssert.Object(_context);
            this.m_listener = _listener;
            if (_context) {
                this.m_context = _context;
            }
            return;
        }
        /**
         * Calls the Function of this MxListener.
         *
         * @param _sender Sender object. The object who calls this listener.
         * @param _args Agument object.
         */
        MxListener.prototype.call = function (_sender, _args) {
            if (this.m_context) {
                this.m_listener.call(this.m_context, _sender, _args);
            }
            else {
                this.m_listener(_sender, _args);
            }
            return;
        };
        /**
         * Safely destroys this MxListener.
         */
        MxListener.prototype.destroy = function () {
            this.m_listener = null;
            this.m_context = null;
            return;
        };
        return MxListener;
    }());
    exports.MxListener = MxListener;
});
define("listeners/mxListenerGroup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class has a Map of MxListeners, identified by a string key, also called
     * the username. The username helps the MxListenerGroup to indentify and destroy
     * a MxListener with the unsuscribe(string) method.
     */
    var MxListenerGroup = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxListenerGroup() {
            this._m_listenersMap = new Map();
            return;
        }
        /*
         * Calls the call method of each MxListener of this MxListenerGroup.
         * */
        MxListenerGroup.prototype.call = function (_sender, _args) {
            this._m_listenersMap.forEach(function (_value) {
                _value.call(_sender, _args);
                return;
            }, this);
            return;
        };
        /**
         * Adds a new listener to this MxListenerGroup. If a MxListener already exists
         * with the given username, it will be overrided.
         *
         * @param _username an identifier of the given MxListener.
         * @param _listener the MxListener to be added.
         */
        MxListenerGroup.prototype.suscribe = function (_username, _listener) {
            this._m_listenersMap.set(_username, _listener);
            return;
        };
        /**
         * Destroys the MxListener with the given username, and removes it from this
         * MxListenerGroup.
         *
         * @param _username the identifier of the MxListener.
         */
        MxListenerGroup.prototype.unsuscribe = function (_username) {
            if (this._m_listenersMap.has(_username)) {
                // Get the MxListener and call its destroy method.
                var listener = this._m_listenersMap.get(_username);
                listener.destroy();
                // remove the MxListener from this MxListenerGroup.
                this._m_listenersMap.delete(_username);
            }
            return;
        };
        /**
         * Removes all the MxListeners attached to this MxListenerGroup. This methods
         * calls the destroy method of each MxListener before remove them.
         */
        MxListenerGroup.prototype.clear = function () {
            this._m_listenersMap.forEach(function (_value) {
                _value.destroy();
                return;
            }, this);
            this._m_listenersMap.clear();
            return;
        };
        /**
         * Calls the destroy method of each MxListener in this MxListenerGroup.
         */
        MxListenerGroup.prototype.destroy = function () {
            this.clear();
            this._m_listenersMap = null;
            return;
        };
        return MxListenerGroup;
    }());
    exports.MxListenerGroup = MxListenerGroup;
});
define("listeners/mxListenerManager", ["require", "exports", "listeners/mxListenerGroup"], function (require, exports, mxListenerGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class manage a group of MxListenerGroup, or "events". By this object
     * an MxListener can suscribe or unsuscribe to an event.
     */
    var MxListenerManager = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxListenerManager() {
            this._m_eventsMap = new Map();
            return;
        }
        /**
         * Adds a new event (MxListenerGroup) to this MxListnerManager. If an event
         * with the same key exists, it will be destroyed and replaced.
         *
         * @param _event the event key.
         */
        MxListenerManager.prototype.addEvent = function (_event) {
            if (this._m_eventsMap.has(_event)) {
                // destroys the previous event 
                var event_1 = this._m_eventsMap.get(_event);
                event_1.destroy();
            }
            this._m_eventsMap.set(_event, new mxListenerGroup_1.MxListenerGroup());
            return;
        };
        /**
         * Call the MxListener attached to an event.
         *
         * @param _event The key of the event to be called.
         * @param _sender The sender object of this event.
         * @param _args The arguments obejct of this event.
         */
        MxListenerManager.prototype.call = function (_event, _sender, _args) {
            if (this._m_eventsMap.has(_event)) {
                var event_2 = this._m_eventsMap.get(_event);
                event_2.call(_sender, _args);
            }
            return;
        };
        /**
         * Suscribe a new MxListener to the given event. This method also needs the
         * username to identify the MxListener. If a MxListener already exists in the
         * event, that MxListener will be replaced.
         *
         * @param _event The string key of the event to add the given MxListener.
         * @param _username the string key to the identify the given MxListener.
         * @param _listener the MxListener that will be added to the event.
         */
        MxListenerManager.prototype.suscribe = function (_event, _username, _listener) {
            if (this._m_eventsMap.has(_event)) {
                var event_3 = this._m_eventsMap.get(_event);
                event_3.suscribe(_username, _listener);
            }
            return;
        };
        /**
         * Destroys the MxListener with the given username and removes it from the
         * event.
         *
         * @param _event the string key of the event.
         * @param _username the string key of the MxListener that will be removed.
         */
        MxListenerManager.prototype.unsuscribe = function (_event, _username) {
            if (this._m_eventsMap.has(_event)) {
                var event_4 = this._m_eventsMap.get(_event);
                event_4.unsuscribe(_username);
            }
            return;
        };
        /**
         * Removes all the MxListeners from an event. This method call the clear method
         * of the MxListenerGroup indentified by the event name.
         *
         * @param _event The string identifier of the MxListenerGroup.
         */
        MxListenerManager.prototype.clearEvent = function (_event) {
            if (this._m_eventsMap.has(_event)) {
                var event_5 = this._m_eventsMap.get(_event);
                event_5.clear();
            }
            return;
        };
        /**
         * Calls the destroy method of each MxListenerGroup and removes them from this
         * MxListenerManager. This MxListenerManager will be empty.
         */
        MxListenerManager.prototype.clear = function () {
            this._m_eventsMap.forEach(function (_group) {
                _group.destroy();
                return;
            }, this);
            this._m_eventsMap.clear();
            return;
        };
        /**
        * Calls the destroy method of each MxListenerGroup and removes them from this
        * MxListenerManager.
        */
        MxListenerManager.prototype.destroy = function () {
            this.clear();
            this._m_eventsMap = null;
            return;
        };
        return MxListenerManager;
    }());
    exports.MxListenerManager = MxListenerManager;
});
define("optimization/mxPoolArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class contains the arguments delivered when an event of a MxObjecPool
     * is triggered.
     */
    var MxPoolArgs = /** @class */ (function () {
        function MxPoolArgs() {
        }
        return MxPoolArgs;
    }());
    exports.MxPoolArgs = MxPoolArgs;
});
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Creational design pattern that uses a set of initalized objects kept
 * ready to use rather than allocating and destroying them on demand.
 *
 * @file mxObjectPool.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-29-2020
 */
define("optimization/mxObjectPool", ["require", "exports", "commons/mxEnums", "listeners/mxListenerManager", "listeners/mxListener", "optimization/mxPoolArgs"], function (require, exports, mxEnums_4, mxListenerManager_1, mxListener_1, mxPoolArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Creational design pattern that uses a set of initalized objects kept ready
     * to use rather than allocating and destroying them on demand.
     */
    var MxObjectPool = /** @class */ (function () {
        /**
         * Private constructor. Object Pool must be created with Factories.
         */
        function MxObjectPool() {
            return;
        }
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        /**
         * Create a new empty pool.
         */
        MxObjectPool.Create = function () {
            var pool = new MxObjectPool();
            pool._m_a_active = new Array();
            pool._m_a_desactive = new Array();
            pool._m_size = 0;
            pool._m_listenerManager
                = new mxListenerManager_1.MxListenerManager();
            pool._m_listenerManager.addEvent("elementActive");
            pool._m_listenerManager.addEvent("elementDesactive");
            return pool;
        };
        /**
         * Setup the elements of this pool.
         *
         * @param _a_element Array of elements.
         */
        MxObjectPool.prototype.init = function (_a_element) {
            this._m_a_desactive = _a_element;
            this._m_size = _a_element.length;
            return;
        };
        /**
         * Call a function once for each active and desactive elements in an array
         * order.
         *
         * @param _fn Function
         * @param _context Context.
         */
        MxObjectPool.prototype.forEach = function (_fn, _context) {
            this.forEachActive(_fn, _context);
            this.forEachDesactive(_fn, _context);
            return;
        };
        /**
         * Call a function once for each active element in an array order.
         *
         * @param _fn Function.
         * @param _context Context.
         */
        MxObjectPool.prototype.forEachActive = function (_fn, _context) {
            this._m_a_active.forEach(_fn, _context);
            return;
        };
        /**
         * Call a function once for each desactive element in an array order.
         *
         * @param _fn Function.
         * @param _context Context.
         */
        MxObjectPool.prototype.forEachDesactive = function (_fn, _context) {
            this._m_a_desactive.forEach(_fn, _context);
            return;
        };
        /**
         * Suscribe to one of this pool events. Events:
         *
         * I) elementActive : trigger when an element had just been actived.
         *
         * II) elementDesactive : trigger when an element had just been desactived.
         *
         * @param _event The name of the event.
         * @param _username An identifier for the suscriber.
         * @param _fn The callback.
         * @param _context The callback context.
         */
        MxObjectPool.prototype.suscribe = function (_event, _username, _fn, _context) {
            this._m_listenerManager.suscribe(_event, _username, new mxListener_1.MxListener(_fn, _context));
            return;
        };
        /**
         * Unsuscribe to one of this pool events. Envents:
         *
         * I) elementActive : trigger when an element had just been actived.
         *
         * II) elementDesactive : trigger when an element had just been desactived.
         *
         * @param _event The name of the event.
         * @param _username The identifier of the suscriber.
         */
        MxObjectPool.prototype.unsuscribe = function (_event, _username) {
            this._m_listenerManager.unsuscribe(_event, _username);
            return;
        };
        /**
         * Get an available element from this MxObjectPool. Be careful, if this
         * MxObjectPool doesn't has any availble element and is full, this method
         * will returns a null type object.
         *
         * @retuns An available element of this MxObjectPool. If the MxObjectPool
         * doesn't has any available element and is full, it will returns a null
         * type object.
         */
        MxObjectPool.prototype.get = function () {
            var element = null;
            if (this.hasDesactive()) {
                element = this._m_a_desactive[0];
                this._active(element);
                return element;
            }
            return element;
        };
        /**
         * Desactive the given element. The "elementDesactive" event will be
         * triggered.
         *
         * @param _element The element to desactive.
         *
         * @returns OPRESULT.kObject_not_found when the element doesn't was found in
         * this MxObjectPool, otherwise returns an OPRESULT.kOk.
         */
        MxObjectPool.prototype.desactive = function (_element) {
            var active_size = this._m_a_active.length;
            var index;
            for (index = 0; index < active_size; ++index) {
                if (this._m_a_active[index] == _element) {
                    this._m_a_active.splice(index, 1);
                    break;
                }
            }
            if (index >= active_size) {
                // TODO: error, this element doesn't exists in this MxObjectPool.
                return mxEnums_4.OPRESULT.kObject_not_found;
            }
            // Add the element to the desactive list.
            this._m_a_desactive.push(_element);
            // Prepare the arguments.
            var argument = new mxPoolArgs_1.MxPoolArgs();
            argument.element = _element;
            // Call the event.
            this._m_listenerManager.call('elementDesactive', this, argument);
            return mxEnums_4.OPRESULT.kOk;
        };
        /**
         * Check if this MxObjectPool has any element available.
         *
         * @returns True if there are at least one element available.
         */
        MxObjectPool.prototype.hasDesactive = function () {
            return this._m_a_desactive.length > 0;
        };
        /**
         * Get the number of elements of this MxObjectPool.
         *
         * @returns The number of elements in this MxObjectPool.
         */
        MxObjectPool.prototype.getSize = function () {
            return this._m_size;
        };
        /**
         * Get the number of active elements.
         *
         * @returns Number of active elements.
         */
        MxObjectPool.prototype.getActiveSize = function () {
            return this._m_a_active.length;
        };
        /**
         * Get the number of desactive elements.
         *
         * @returns Number of desactive elements.
         */
        MxObjectPool.prototype.getDesactiveSize = function () {
            return this._m_a_desactive.length;
        };
        /**
        * Remove the active and desactive elements of this pool.
        */
        MxObjectPool.prototype.clear = function () {
            var a_desactive = this._m_a_desactive;
            var a_active = this._m_a_active;
            while (a_active.length) {
                a_active.pop();
            }
            while (a_desactive.length) {
                a_desactive.pop();
            }
            return;
        };
        /**
        * Safely destroys the object.
        */
        MxObjectPool.prototype.destroy = function () {
            this.clear();
            this._m_listenerManager.destroy();
            this._m_listenerManager = null;
            this._m_a_active = null;
            this._m_a_desactive = null;
            return;
        };
        /****************************************************/
        /* Private                                          */
        /****************************************************/
        MxObjectPool.prototype._active = function (_element) {
            var a_desactive = this._m_a_desactive;
            var desactive_size = a_desactive.length;
            for (var index = 0; index < desactive_size; ++index) {
                if (a_desactive[index] == _element) {
                    a_desactive.splice(index, 1);
                    break;
                }
            }
            // Adds the element to the active element.
            this._m_a_active.push(_element);
            // Prepare the arguments.
            var argument = new mxPoolArgs_1.MxPoolArgs();
            argument.element = _element;
            // Call the event.
            this._m_listenerManager.call('elementActive', this, argument);
            return;
        };
        return MxObjectPool;
    }());
    exports.MxObjectPool = MxObjectPool;
});
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Implementation of the Halton Sequence, a low discrepancy and
 * deterministic algortihm that appears to be random.
 *
 * @file mxHalton.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-17-2020
 */
var MxTools;
(function (MxTools) {
    var PseudoRandom;
    (function (PseudoRandom) {
        /**
         * Implementation of the Halton Sequence, a low discrepancy and deterministic
         * algortihm that appear to be random.
         */
        var MxHalton = /** @class */ (function () {
            function MxHalton() {
            }
            /**
             * Generates a point set that appear to be random. They will be generated with
             * the Halton Sequence, wich is a low discrepancy algorithm.
             *
             * @param _size Number of points.
             * @param _baseX Base of the X axis.
             * @param _baseY Base of tye Y axis.
             *
             * @returns An array of generated points with the Halton Sequence.
             */
            MxHalton.GetPointSet = function (_size, _baseX, _baseY) {
                if (_baseX === undefined) {
                    _baseX = 2;
                }
                if (_baseY === undefined) {
                    _baseY = 3;
                }
                var pointSet = new Array();
                --_size;
                while (_size >= 0) {
                    pointSet.push(new Phaser.Geom.Point(MxHalton.Halton(_size, _baseX), MxHalton.Halton(_size, _baseY)));
                    --_size;
                }
                return pointSet;
            };
            /**
             * Halton sequence is a low discrepancy algorithm that appear to tbe random.
             *
             * @param _index index.
             * @param _base base.
             *
             * @returns result.
             */
            MxHalton.Halton = function (_index, _base) {
                var result = 0;
                var f = 1.0 / _base;
                var i = _index;
                while (i > 0) {
                    result += f * (i % _base);
                    i = Math.floor(i / _base);
                    f = f / _base;
                }
                return result;
            };
            return MxHalton;
        }());
        PseudoRandom.MxHalton = MxHalton;
    })(PseudoRandom = MxTools.PseudoRandom || (MxTools.PseudoRandom = {}));
})(MxTools || (MxTools = {}));
define("shaders/mxShader", ["require", "exports", "commons/mxAssert"], function (require, exports, mxAssert_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MxShader = /** @class */ (function () {
        /****************************************************/
        /* Public                                           */
        /****************************************************/
        function MxShader() {
        }
        MxShader.prototype.init = function (_shader) {
            this._m_shader = _shader;
            return;
        };
        MxShader.prototype.setUniform = function (_uniform, _value) {
            this._m_shader.setUniform(_uniform, _value);
            return;
        };
        MxShader.prototype.setMask = function (_mask) {
            this._m_shader.setMask(_mask);
            return;
        };
        MxShader.prototype.getShader = function () {
            return this._m_shader;
        };
        MxShader.prototype.initUniform = function (_key) {
            mxAssert_5.MxAssert.String(_key);
            mxAssert_5.MxAssert.Object(this._m_shader);
            var gl = this._m_shader.gl;
            var renderer = this._m_shader.renderer;
            var map = renderer.glFuncMap;
            var program = this._m_shader.program;
            var uniform = this._m_shader.getUniform(_key);
            if (uniform == null) {
                return;
            }
            var type = uniform.type;
            var data = map[type];
            uniform.uniformLocation = gl.getUniformLocation(program, _key);
            if (type !== 'sampler2D') {
                uniform.glMatrix = data.matrix;
                uniform.glValueLength = data.length;
                uniform.glFunc = data.func;
            }
            return;
        };
        MxShader.prototype.destroy = function () {
            this._m_shader.destroy();
            return;
        };
        return MxShader;
    }());
    exports.MxShader = MxShader;
});
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a class that immitates the Phaser CE's button.
 *
 * @file mxButton.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-27-2020
 */
var MxTools;
(function (MxTools) {
    var UI;
    (function (UI) {
        /**
         * Provides a class that immitates the Phaser CE's button. The buttes is build
         * using a Phaser.Gameobject.Image.
         */
        var MxButton = /** @class */ (function () {
            function MxButton() {
            }
            /****************************************************/
            /* Public                                           */
            /****************************************************/
            /**
             * Creates a new interactive Phaser.GameObject.Image.
             *
             * @param _scene The scene to create the Phaser image.
             * @param _x Position in the x axis.
             * @param _y Position in the y axis.
             * @param _texture Name of the button texture.
             * @param _frame Texture's frame used to draw the button. Default is 0.
             * @param _callback Button's callback function.
             * @param _callbackContext Buttons's callback context.
             * @param _over_key Texture's frame when the pointer is over the button.
             * Default is frame value.
             * @param _out_key Texture's frame whe the pointer is out the button.
             * Default is the frame value.
             * @param _down_key Texture's frame when the pointer is down the button.
             * Default is the frame value.
             * @param _up_key Texture's frame when the pointer is up the button.
             * Default is the frame value.
             */
            MxButton.Create = function (_scene, _x, _y, _texture, _frame, _callback, _callbackContext, _over_key, _out_key, _down_key, _up_key) {
                var frame = 0;
                if (frame !== undefined) {
                    frame = _frame;
                }
                var button = new MxButton();
                button._m_image = _scene.add.image(_x, _y, _texture, _frame);
                button._m_image.setInteractive();
                if (_over_key !== undefined) {
                    button._m_over_key = _over_key;
                }
                else {
                    button._m_over_key = frame;
                }
                if (_down_key !== undefined) {
                    button._m_down_key = _down_key;
                }
                else {
                    button._m_down_key = frame;
                }
                if (_out_key !== undefined) {
                    button._m_out_key = _out_key;
                }
                else {
                    button._m_out_key = frame;
                }
                if (_up_key !== undefined) {
                    button._m_up_key = _up_key;
                }
                else {
                    button._m_up_key = frame;
                }
                // Callbacks
                if (_callback !== undefined) {
                    button._m_image.on('pointerdown', _callback, _callbackContext);
                }
                button._m_image.on('pointerover', button._onOver, button);
                button._m_image.on('pointerout', button._onOut, button);
                button._m_image.on('pointerdown', button._onDown, button);
                button._m_image.on('pointerup', button._onUp, button);
                button._m_image.setFrame(button._m_out_key);
                return button;
            };
            /**
             * Get the Phaser GameObject image.
             */
            MxButton.prototype.getImage = function () {
                return this._m_image;
            };
            /**
             * Destroys this Game Object removing it from the Display List and Update
             * List and severing all ties to parent resources.
             */
            MxButton.prototype.destroy = function () {
                this._m_image.destroy();
                this._m_image = null;
                return;
            };
            /****************************************************/
            /* Protected                                        */
            /****************************************************/
            /**
             * Called when a pointer is over the image.
             */
            MxButton.prototype._onOver = function () {
                this._m_image.setFrame(this._m_over_key);
                return;
            };
            /**
             * Called when a pointer is out of the image.
             */
            MxButton.prototype._onOut = function () {
                this._m_image.setFrame(this._m_out_key);
                return;
            };
            /**
             * Called when a pointer is been pressed over the image.
             */
            MxButton.prototype._onDown = function () {
                this._m_image.setFrame(this._m_down_key);
                return;
            };
            /**
             * Called when a pointer had been released over the image.
             */
            MxButton.prototype._onUp = function () {
                this._m_image.setFrame(this._m_up_key);
                return;
            };
            return MxButton;
        }());
        UI.MxButton = MxButton;
    })(UI = MxTools.UI || (MxTools.UI = {}));
})(MxTools || (MxTools = {}));
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a class that immitates the Phaser CE's button. This button
 * tint the texture's frame instead of change the frame index when the pointer
 * is over, out, down or up.
 *
 * @file mxButtonTinted.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-27-2020
 */
var MxTools;
(function (MxTools) {
    var UI;
    (function (UI) {
        /**
        * Provides a class that immitates the Phaser CE's button. This button tint the
        * texture's frame instead of change the frame index when the pointer is over,
        * out, down or up.
        */
        var MxButtonTinted = /** @class */ (function () {
            /****************************************************/
            /* Protected                                        */
            /****************************************************/
            function MxButtonTinted() {
            }
            /****************************************************/
            /* Public                                           */
            /****************************************************/
            /**
             * Creates a new interactive Phaser.GameObject.Image.
             *
             * @param _scene The scene to create the Phaser image.
             * @param _x Position in the x axis.
             * @param _y Position in the y axis.
             * @param _texture Name of the button texture.
             * @param _frame Texture's frame used to draw the button. Default is 0.
             * @param _callback Button's callback function.
             * @param _callbackContext Buttons's callback context.
             * @param _over_key Texture's frame when the pointer is over the button.
             * Default is frame value.
             * @param _out_color Texture's frame whe the pointer is out the button.
             * Default is the frame value.
             * @param _down_key Texture's frame when the pointer is down the button.
             * Default is the frame value.
             * @param _up_color Texture's frame when the pointer is up the button.
             * Default is the frame value.
             */
            MxButtonTinted.Create = function (_scene, _x, _y, _texture, _frame, _callback, _callbackContext, _over_color, _out_color, _down_color, _up_color) {
                var frame = 0;
                if (frame !== undefined) {
                    frame = _frame;
                }
                var button = new MxButtonTinted();
                button._m_image = _scene.add.image(_x, _y, _texture, frame);
                button._m_image.setInteractive();
                if (_over_color !== undefined) {
                    button._m_over_color = _over_color;
                }
                else {
                    button._m_over_color = 0xffffff;
                }
                if (_down_color !== undefined) {
                    button._m_down_color = _down_color;
                }
                else {
                    button._m_down_color = 0xffffff;
                }
                if (_out_color !== undefined) {
                    button._m_out_color = _out_color;
                }
                else {
                    button._m_out_color = 0xffffff;
                }
                if (_up_color !== undefined) {
                    button._m_up_color = _up_color;
                }
                else {
                    button._m_up_color = 0xffffff;
                }
                // Callbacks
                if (_callback !== undefined) {
                    button._m_image.on('pointerdown', _callback, _callbackContext);
                }
                button._m_image.on('pointerover', button._onOver, button);
                button._m_image.on('pointerout', button._onOut, button);
                button._m_image.on('pointerdown', button._onDown, button);
                button._m_image.on('pointerup', button._onUp, button);
                button._m_image.setTint(button._m_out_color);
                return button;
            };
            /**
             * Get the Phaser GameObject image.
             */
            MxButtonTinted.prototype.getImage = function () {
                return this._m_image;
            };
            /**
             * Destroys this Game Object removing it from the Display List and Update List
             * and severing all ties to parent resources.
             */
            MxButtonTinted.prototype.destroy = function () {
                this._m_image.destroy();
                this._m_image = null;
                return;
            };
            /**
             * Called when a pointer is over the image.
             */
            MxButtonTinted.prototype._onOver = function () {
                this._m_image.setTint(this._m_over_color);
                return;
            };
            /**
             * Called when a pointer is out of the image.
             */
            MxButtonTinted.prototype._onOut = function () {
                this._m_image.setTint(this._m_out_color);
                return;
            };
            /**
             * Called when a pointer is been pressed over the image.
             */
            MxButtonTinted.prototype._onDown = function () {
                this._m_image.setTint(this._m_down_color);
                return;
            };
            /**
             * Called when a pointer had been released over the image.
             */
            MxButtonTinted.prototype._onUp = function () {
                this._m_image.setTint(this._m_up_color);
                return;
            };
            return MxButtonTinted;
        }());
        UI.MxButtonTinted = MxButtonTinted;
    })(UI = MxTools.UI || (MxTools.UI = {}));
})(MxTools || (MxTools = {}));
//# sourceMappingURL=mxUtilities.js.map