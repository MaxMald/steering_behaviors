declare module "commons/mxUUID" {
    /**
     * Object with a unique UUID. This UUID is generated with the Phaser Utilities.
     */
    export class MxUUID {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxUUID instance, with a unique UUID.
         */
        static Create(): MxUUID;
        /**
         * Creates a new MxUUID instante, with the same UUID of a given MxUUID.
         * @param _mxUUID
         */
        static Clone(_mxUUID: MxUUID): MxUUID;
        /**
         * Get the UUID string.
         */
        getUUIDString(): string;
        /**
         * Compare the value of this MxUUID with other MxUUID.
         *
         * @param _id MxUUID that you want to check.
         *
         * @returns true if the MxUUID has the same value.
         */
        compare(_id: MxUUID): boolean;
        /****************************************************/
        /****************************************************/
        protected constructor();
        /**
         * UUID string, generated with the Phaser Utilities.
         */
        _m_id: string;
    }
}
declare module "gameObjects/mxUObject" {
    import { MxUUID } from "commons/mxUUID";
    /**
     * An MxUObject is a object that has a MxUUID to be identified. Other classes can
     * be extended from this one to have the UUID methods, that help to identify
     * objects.
     */
    export class MxUObject {
        /****************************************************/
        /****************************************************/
        constructor();
        /**
         * Gets this object's unique identifier object.
         */
        getUUID(): MxUUID;
        /**
         * Gets this object's unique indentifier in the string format.
         */
        getUUIDString(): string;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Object's unique identifier object.
         */
        protected _m_uuid: MxUUID;
    }
}
declare module "commons/mxAssert" {
    /**
     * Custon assert functions.
     *
     * @packageDocumentation
     */
    export class MxAssert {
        /**
         * Check if the giveb parameter is a string. Throws an error if not.
         *
         * @param _input
         */
        static String(_input: any): void;
        /**
         * Checks if the given parameter is a function. Throws an error if not.
         *
         * @param _input
         */
        static Function(_input: any): void;
        /**
         * Checks if the given parameter is a number. Throws an error if not.
         *
         * @param _input
         */
        static Number(_input: any): void;
        /**
         * Checks if the given parameter is an object. Throws an error if not.
         *
         * @param _input
         */
        static Object(_input: any): void;
        /**
         * Checks if the given parameter is a boolean. Throws an error if not.
         *
         * @param _input
         */
        static Boolean(_input: any): void;
        /**
         * Checkes if the given number is larger than 0. Throws an error if not.
         *
         * @param _number value that must has to be larther than the minimum value.
         * @param _minimum minimum value that the number can be. Number must be larger than minimum.
         */
        static LargerThan(_number: number, _minimum: number): void;
    }
}
declare module "fs/mxCSVRow" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxCSVFile } from "fs/mxCSVFile";
    export class MxCSVRow extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        static GetNull(): MxCSVRow;
        /**
         * Check if the given instance is the null object.
         * @param _row
         */
        static IsNull(_row: MxCSVRow): boolean;
        /**
         * Creates the null object.
         */
        static Prepare(): void;
        /**
         * Destroys the null object.
         */
        static Shutdown(): void;
        constructor(_csv_file: MxCSVFile);
        /**
         * Gets the value of one of this Row's cell.
         * Returns an empty string if it doesn't has the required cell.
         *
         * @param _index {string | number} Index can be the header's name or the cell's index.
         */
        getCell(_index: string | number): string;
        /**
         * Adds a new cell to this row.
         * @param _data {string} New cell's data.
         */
        addCell(_data: string): void;
        /**
         * Adds multiple cells from raw data.
         *
         * @param _data {string} cells raw data.
         * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         */
        addCellsFromRaw(_data: string, _delimiter?: string): void;
        /**
         * Gets the row size.
         */
        getRowSize(): number;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private _validate_idx;
        /**
         * Class Null Object.
         */
        private static _NULL_OBJ;
        /**
         * Array of cell data.
         */
        private _m_a_cells;
        /**
         * Reference to its MxCSVFile Object.
         */
        private _m_a_csv_file;
    }
}
declare module "fs/mxCSVFile" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxCSVRow } from "fs/mxCSVRow";
    /**
     * This class handle a CSVFile.
     */
    export class MxCSVFile extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Gets the null object of this instance.
         */
        static GetNull(): MxCSVFile;
        /**
         * Checks if the given object is the null object.
         * @param _csv_file
         */
        static IsNull(_csv_file: MxCSVFile): boolean;
        /**
         * Creates the null object.
         */
        static Prepare(): void;
        /**
         * Destroys the null object.
         */
        static ShutDown(): void;
        /**
         * Creates an useful MxCSVFile object to handle a raw csv data.
         *
         * @param _csv_data {string} Raw CSV data.
         * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
         * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
         * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
         */
        static Create(_csv_data: string, _has_header_row?: boolean, _cell_delimiter?: string, _row_delimiter?: string): MxCSVFile;
        /**
         * Gets a row from the MxCSVFile. If the row_index is out of range, it will returns
         * a Null Object.
         *
         * @param _row_index
         */
        getRow(_row_index: number): MxCSVRow;
        /**
         * Gets the first Row with given value in a specific header column. Return a
         * Null Object if doesn't found a row with the given specifications.
         *
         * @param _key_header {string} key header's name
         * @param _value {string} value.
         */
        getRowByKey(_key_header: string, _value: string): MxCSVRow;
        /**
         * Returns the header column position (0 based). Returns -1 if the header
         * doesn't exists.
         *
         * @param _header
         */
        getHeaderIdx(_header_name: string): number;
        /**
         * Check if the header exists in the MxCSVFile. Returns true if it does.
         *
         * @param _header_name
         */
        hasHeader(_header_name: string): boolean;
        /**
         * Gets the number of headers.
         */
        getNumberHeaders(): number;
        /**
         * Gets the number of rows.
         */
        getNumberRows(): number;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private constructor();
        /**
         * Instance of the null object.
         */
        static _NULL_OBJ: MxCSVFile;
        /**
         * Map of file headers.
         */
        private _m_a_headers;
        /**
         * Array of Rows
         */
        private _m_a_rows;
    }
}
declare module "commons/mxEnums" {
    /**
     * Common Enumerators.
     * @packageDocumentation
     */
    /**
     *
     */
    type EnumLiteralsOf<T extends object> = T[keyof T];
    /**
     *
     */
    export type OPRESULT = EnumLiteralsOf<typeof OPRESULT>;
    /**
     *
     */
    export const OPRESULT: Readonly<{
        /** There isn't a desciption for this result. */
        kUndefined: -1;
        /** Failure. */
        kFail: 0;
        /** Success. */
        kOk: 1;
        /** The operation cannot find a necesary file. */
        kFile_not_found: 2;
        /** The operation cannot find a necesary instance. */
        kObject_not_found: 3;
        /** The given parameter has an incompatible format. */
        kIncompatible_format: 4;
        /** There was a conflict with a null object. */
        kNull_Object: 5;
        /** The given parameter has an invalid type. */
        kInvalid_type: 6;
        /** There was a redundance conflict with some instance. */
        kObject_already_exists: 7;
        /**
         * The operation is not implemented yet.
         */
        kUnimplemented_operation: 8;
        /** Number of posible results. */
        kCount: 9;
    }>;
    export type COMPONENT_ID = EnumLiteralsOf<typeof COMPONENT_ID>;
    export const COMPONENT_ID: Readonly<{
        /** SpriteComponent  */
        kSprite: 0;
        /** NineSliceComponent */
        kNineSlice: 1;
        /** TextComponent */
        kText: 2;
        /** BitmapTextComponent */
        kBitmapText: 3;
        /** GraphicsComponent */
        kGraphics: 4;
        /** ShaderComponent */
        kShader: 5;
        /** AudioClipManager */
        kAudioClipsManager: 6;
        /** CmpTransform component. */
        kTransform: 7;
        /** Number of default components that this version has. */
        kCount: 8;
    }>;
    export type MESSAGE_ID = EnumLiteralsOf<typeof MESSAGE_ID>;
    export const MESSAGE_ID: Readonly<{
        /** The agent has been activated. data : null */
        kOnAgentActive: 0;
        /** The agent has been desactivated. data : null*/
        kOnAgentDesactive: 1;
        /** */
        kPlaySound: 2;
        /** Number of default Messages. */
        kCount: 3;
    }>;
    export type OBJECT_POOL_TYPE = EnumLiteralsOf<typeof OBJECT_POOL_TYPE>;
    export const OBJECT_POOL_TYPE: Readonly<{
        /** Identifier of the static Object Pool. */
        kStatic: 0;
        /** Identifier of the dynamic Object Pool. */
        kDynamic: 1;
    }>;
}
declare module "behaviour/mxComponent" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { MxActor } from "behaviour/mxActor";
    /**
     * The MxComponent contains data or state of a MxActor.
     */
    export class MxComponent extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Creates the Null Object of the MxComponent class.
         */
        static Prepare(): void;
        /**
         * Destroys the Null Object of the MxComponent class.
         */
        static Shutdown(): void;
        /**
         * Chech if the given MxCompoennt is the MxCompoent's Null Object.
         */
        static IsNull(_object: MxComponent): boolean;
        /**
         * Get the MxComponent Null Object.
         */
        static GetNull(): MxComponent;
        /**
         * Build a new MxComponent with an identifier.
         *
         * @param _id The idendtifier of this MxComponent.
         */
        constructor(_id: number);
        /**
         * Can be overrided. This method is called when the MxActor have just been
         * initialized. Base method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belongs.
         */
        init(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called during the actor update. Base
         * method do nothing.
         *
         * @param _actor The MxActor to wich this MxComponent belogns.
         */
        update(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when a
         * message is recived. Base method do nothing.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        receive(_id: number, _data: unknown): void;
        /**
         * Gets this MxComponent's identifier.
         */
        getID(): number;
        /**
         * Can be overided. This method is called by the MxComponentManager when the component
         * is attach to a MxActor. Base method do nothing.
         *
         * This method is useful if the MxActor had been initialized before, so the
         * MxComponent can intialized when is attached to the MxActor.
         *
         * @param _actor The MxActor to which this MxComponent belongs.
         */
        onAttach(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when the component
         * is dettach from the MxActor. Base method do nothing.
         *
         * @param _actor
         */
        onDettach(_actor: MxActor): void;
        /**
         * Can be overrided. This method is called by the MxComponentManager when the MxActor is
         * destroyed. Base method calls its super.destroy() method.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The component's identifier.
         */
        protected _m_id: number;
        /****************************************************/
        /****************************************************/
        /**
         * The Component's Null Object.
         */
        private static _NULL_OBJECT;
    }
}
declare module "behaviour/mxComponentManager" {
    import { OPRESULT } from "commons/mxEnums";
    import { MxActor } from "behaviour/mxActor";
    import { MxComponent } from "behaviour/mxComponent";
    /**
     * This class is intended to manage the MxComponents attached to one MxActor.
     * It has basic operations with the MxComponent, and can be delegated the
     * initializtion, update and destructions of the attached MxComponents.
     */
    export class MxComponentManager {
        /****************************************************/
        /****************************************************/
        /**
         * Creates an empty MxComponentManager. The actor reference is set to null.
         */
        constructor();
        /**
         * Sets the actor reference wich this MxComponentManager belons. This method
         * is called by the MxActor factories. Developers shouldn't use this one.
         *
         * @param _actor MxActor who this MxComponentManager belongs.
         */
        setActor(_actor: MxActor): void;
        /**
         * Calls the init() method of each component attached to this MxComponentManager.
         * This method is called by the init() method of the actor.
         */
        init(): void;
        /**
         * Calls the update() method of each component attached to this MxComponentManager.
         * This method is called by the update() method of the actor.
         */
        update(): void;
        /**
         * Sends a message to each component attached to this MxComponentManager.
         *
         * @param _id
         * @param _data
         */
        sendMessage(_id: number, _data: unknown): void;
        /**
         * Adds a MxComponent to this MxComponentManager.
         *
         * @param _component
         */
        addComponent(_component: MxComponent): OPRESULT;
        /**
         * Remove a MxComponent from this MxComponentManager by its identifier.
         *
         * @param _id
         */
        removeComponent(_id: number): void;
        /**
         * Check if this MxComponentManager has a MxComponent by its identifier.
         *
         * @param _id
         */
        hasComponent(_id: number): boolean;
        /**
         * Gets a MxComponent from this manager. This method allows to automaticlly cast
         * the MxComponent base class to a specific subclass. Be sure that the ID and the
         * subclass type are compatible.
         *
         * @param _id MxComponent's identifier.
         */
        getComponent<T extends MxComponent>(_id: number): T;
        /**
         * Removes all the components attached to this MxManagerComponent.
         */
        clear(): void;
        /**
         * Calls the destroy method of each MxComponent attached to this MxComponentMannager.
         * It clears the component list.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * A refernce to the MxActor of this MxComponentManager.
         */
        private _m_actor;
        /**
         * Map of components attached to this manager.
         */
        private _m_component_map;
    }
}
declare module "behaviour/mxActor" {
    import { MxUObject } from "gameObjects/mxUObject";
    import { OPRESULT } from "commons/mxEnums";
    import { MxComponent } from "behaviour/mxComponent";
    import { MxComponentManager } from "behaviour/mxComponentManager";
    /**
     * Architectural pattern wich follows the composition over inheritance principle
     * that allows greate flexibility in defining entities.
     *
     * Every MxActor consists of one or more MxComponent wich contains data or state.
     * The mix of MxComponents defines the behaviour of the MxActor. Therefore, the
     * behaviour of a MxActor can be changed during runtime by systems that add,
     * remove or mutate MxCompoents.
     */
    export class MxActor extends MxUObject {
        /****************************************************/
        /****************************************************/
        /**
         * Creates the Null Object of the MxActor class.
         */
        static Prepare(): void;
        /**
         * Destroys the Null Object of the MxActor class.
         */
        static Shutdown(): void;
        /**
        * Check if the given actor is the Null Object.
        */
        static IsNull(_obj: MxActor): boolean;
        /**
         * Get Object Null.
         */
        static GetNull(): MxActor;
        /**
         * MxActor default factory. It creates a new actor with default properties and
         * a transform component.It can be assigned as a child of another actor.
         *
         * @param _id MxActor identifier. Usually a name to indify it.
         * @param _m_parent MxActor's parent.
         */
        static Create(_id: string, _parent?: MxActor): MxActor;
        /**
         * Creates a child of this MxActor. This method will returns
         * a Null Object if the parent already has a MxActor with the same
         * identifier.
         *
         * @param _id Actor identifier.
         */
        create(_id: string): MxActor;
        /**
         * Intialize this actor's components and children.
         */
        init(): void;
        /**
         * Update MxActor's components.
         */
        update(): void;
        /**
         * Get the actor's MxComponentManager instance.
         */
        getComponentManager(): MxComponentManager;
        /**
         * Adds a ne component to this Actor. Returns a OPRESULT.
         * @param _component
         */
        addComponent(_component: MxComponent): OPRESULT;
        /**
         * Get this MxActor's MxComponent.
         * @param _id
         */
        getComponent<T extends MxComponent>(_id: number): T;
        /**
         * Clears de MxComponentManager.
         */
        clearComponentManager(): void;
        /**
         * Sends a message to this MxActor's component.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         * @param _recursive Send the message to the the MxActor's children.
         */
        sendMessage(_id: number, _data: unknown, _recursive?: boolean): void;
        /**
         * Sends a message to this MxActor children.
         *
         * @param _id Message identifier.
         * @param _data Message data.
         */
        sendMessageToChildren(_id: number, _data: unknown): void;
        /**
         * Adds a new child to this Actor. This method detach the child from his
         * previous parent (if it has one).
         *
         * @param _child
         */
        addChild(_child: MxActor): OPRESULT;
        /**
         * Removes a child from this object. The parent reference of the child will be
         * set to Null Object. The parent reference of the child's transform will be
         * set to null.
         *
         * @param _child Child reference or child identifier.
         */
        removeChild(_child: MxActor | string): OPRESULT;
        /**
         * Gets a child by its identifier. If this actor doesn't has any child with
         * the id, the method will returns a Null Object.  This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        getChild(_id: string): MxActor;
        /**
         * Check if the actor has a child with the given identifier. This method isn't
         * recursive, so it will not check the children of children.
         *
         * @param _id Child's identifier.
         */
        hasChild(_id: string): boolean;
        /**
         * This method will detach the actor from his parent.
         */
        detachFromParent(): OPRESULT;
        /**
         * Gets the actor's parent.
         */
        getParent(): MxActor;
        /**
         * Gets this actor's identifier.
         */
        getID(): string;
        /**
         * Gets the actor's tag.
         */
        getTag(): number;
        /**
         * Sends a mesasge 'kOnAgentActive' to all the components.
         */
        mxActive(): void;
        /**
         * Send a message 'kOnAgentDesactive' to all the components.
         */
        mxDesactive(): void;
        /**
         * Destroys this MxActor and his children.
         */
        destroy(): void;
        /**
         *
         */
        m_mx_active: boolean;
        /****************************************************/
        /****************************************************/
        protected constructor();
        /****************************************************/
        /****************************************************/
        private _update_child;
        private readonly _m_component_mg;
        /**
         * Actor's identifier. Usually a name to identify it.
         */
        private _m_id;
        /**
         * MxManager Tag.
         */
        private _m_tag;
        /**
         * Reference to the parent.
         */
        private _m_parent;
        /**
         * The actor's children.
         */
        private _m_children_map;
        /**
         * Instance of the null object.
         */
        private static _NULL_OBJECT;
    }
}
declare module "mxUtilities" {
    export class MxUtilities {
        /****************************************************/
        /****************************************************/
        /**
         * Prepare all the utilities modules and null objects.
         */
        static Prepare(): void;
        /**
         * Destroy all the utilities modules and null objects.
         */
        static Shutdown(): void;
    }
}
declare module "behaviour/mxState" {
    import { MxFSM } from "behaviour/mxFSM";
    /**
     * Logic unit used by the MxFSM to define an execution block. The class need to
     * define its controller type.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    export class MxState<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxState without MxFSM and controller.
         */
        constructor();
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from desactive to active. Base method do nothing.
         */
        onEnter(): void;
        /**
         * Can be overrided. This method is called by the mxFSM just after this MxState change
         * its status from active to desactive. Base method do nothing.
         */
        onExit(): void;
        /**
         * Can be overrided. This method is called by the MxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        update(): number;
        /**
         * Can be overrided. This method is called by the mxFSM if this MxState is
         * currently active. Base method do nothing.
         *
         * @returns number without a specific use.
         */
        draw(): number;
        /**
         * Set the MxFSM where this MxState belongs. The parameter can be a null type
         * object. This method should be used only by the MxFSM.
         *
         * @param _fsm The MxFSM where this MxState belongs.
         */
        attachToFSM(_fsm: MxFSM<T>): void;
        /**
         * Set the controller object o this MxState. This parameter can be a null type
         * object. This method should be use only by the MxFSM.
         *
         * @param _controller The controller instance.
         */
        setController(_controller: T): void;
        /**
         * Can be overrided. This method are called by the MxFSM when the MxState is
         * deleted or the MxFSM is destroyed. Base method do nothing.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The MxFSM to wich this MxState belongs.
         */
        protected _m_fsm: MxFSM<T>;
        /**
         * The controller instance. This propertie can be used to store a common
         * object that every MxState from the same MxFSM share, for example an
         * MxActor.
         */
        protected _m_controller: T;
    }
}
declare module "behaviour/mxFSM" {
    import { MxState } from "behaviour/mxState";
    import { OPRESULT } from "commons/mxEnums";
    /**
     * Model that can be used to simulate secuential logic, or in other words, to
     * represent and control execution flow. This class need to define the type of
     * its controller.
     *
     * The controller can be used to store a common
     * object that every MxState from the same MxFSM share, for example an
     * MxActor.
     */
    export class MxFSM<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Creates a new MxFSM with null values. Use the init() method after the MxFSM
         * is builded, so it can be used.
         */
        constructor();
        /**
         * Intialize this MxFSM with a controller. This method creates a new
         * Map for the MxState. This method should be called once and before any
         * other method.
         *
         * @param _controller The controller object of this MxFSM.
         */
        init(_controller: T): void;
        /**
         * Calls the update() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the update() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        update(): number;
        /**
         * Calls the draw() method of the active MxState. Take care that if there
         * isn't an active MxState this method will returns -1.
         *
         * @returns Result of the draw() method of the active MxState. This value allways
         * will be -1 if ther isn't any active MxState.
         */
        draw(): number;
        /**
         * Removes all the MxState of this MxFSM. This method will not destroy the
         * MxState. This method will not call the onExit() method of the active
         * MxState.
         */
        clear(): void;
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
        setActive(_idx: number): OPRESULT;
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
        addState(_idx: number, _state: MxState<T>): OPRESULT;
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
        removeState(_idx: number): OPRESULT;
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
        deleteState(_idx: number): OPRESULT;
        /**
         * Call the destroy() method of each MxState in this MxFSM. Finally clears
         * the list of MxState. This method will not call the onExit() method of the
         * active MxState.
         */
        deleteAll(): void;
        /****************************************************/
        /****************************************************/
        /**
         * List of MxState attached to this MxFSM.
         */
        protected _m_states_map: Map<number, MxState<T>>;
        /**
         * The active MxState of this MxFSM.
         */
        protected _m_active_state: MxState<T>;
        /**
         * The controller of this MxFSM.
         */
        protected _m_controller: T;
    }
}
declare module "commons/mxDateTime" {
    export class MxDateTime {
        /**
         * Generate a string with the time format HH : MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        static GetHHMMSS(_seconds: number): string;
        /**
         * Generate a string with the time format MM : SS, based on the given
         * seconds.
         * @param _seconds number on seconds.
         */
        static GetMMSS(_seconds: number): string;
    }
}
declare module "commons/mxInterpolation" {
    /**
      * Constructs new data from a range of discrete set of known
      * data points.
    */
    export class MxInterpolation {
        /****************************************************/
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
        static Linear(x1: number, y1: number, x2: number, y2: number, x: number): number;
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
        static Bilinear(x1: number, y1: number, x2: number, y2: number, v1: number, v2: number, v3: number, v4: number, tx: number, ty: number): number;
    }
}
declare module "commons/mxMath" {
    export class MxMath {
        /**
         * If the given value is less than the minimum value, it will return the minimum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         */
        static TruncateMinimum(_value: number, _min: number): number;
        /**
         * If the given value is less than the maximum value, it will return the maximum value,
         * otherwise it will return the given value.
         *
         * @param _value value to check.
         * @param _max maximum value.
         */
        static TruncatetMaximum(_value: number, _max: number): number;
        /**
         * If the value is outside the range, the function will return the maximum or
         * minimum value depending on the value, otherwise it will return the given
         * value.
         *
         * @param _value value to check.
         * @param _min minimum value.
         * @param _max maximum value.
         */
        static TruncateByRange(_value: number, _min: number, _max: number): number;
    }
}
declare module "commons/mxMixin" {
    export class MxMixin {
        static applyMixins(derivedCtor: any, baseCtors: any[]): void;
    }
}
declare module "commons/mxPerlinNoise" {
    export class MxPerlinNoise {
        /****************************************************/
        /****************************************************/
        /**
         *
         * @param _length
         * @param _n_octaves
         */
        static Noise1D(_length: number, _frecuency_power?: number, _amplitude_power?: number, _n_octaves?: number, _normalized?: boolean): Float32Array;
        static Noise2D(_length: number, _frecuency_power?: number, _amplitude_power?: number, _n_octaves?: number, _normalized?: boolean): Float32Array[];
        /**
         *
         * @param _frecuency
         * @param _amplitude
         * @param _length
         */
        static Octave(_frecuency: number, _amplitude: number, _wave: Float32Array, _length: number): void;
        static Octave2D(_frecuency: number, _amplitude: number, _wave: Float32Array[], _length: number): void;
        /****************************************************/
        /****************************************************/
        private static MAX_LENGHT;
    }
}
declare module "listeners/mxListener" {
    /**
     * This class contains a Function and may have an object as the Function's context.
     * The "S" type can be defined as the type of the sender object (who calls this Listener),
     * and the "A" type can be defined as the type of the object who has the arguments.
     */
    export class MxListener<S, A> {
        /****************************************************/
        /****************************************************/
        /**
         * The MxListener needs a Function, and may have a context.
         *
         * @param _listener
         * @param _context
         */
        constructor(_listener: (_sender: S, _args: A) => void, _context?: any);
        /**
         * Calls the Function of this MxListener.
         *
         * @param _sender Sender object. The object who calls this listener.
         * @param _args Agument object.
         */
        call(_sender: S, _args: A): void;
        /**
         * Safely destroys this MxListener.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * The function of this MxListener.
         */
        private m_listener;
        /**
         * The context of the Function of this MxListener.
         */
        private m_context;
    }
}
declare module "listeners/mxListenerGroup" {
    import { MxListener } from "listeners/mxListener";
    /**
     * This class has a Map of MxListeners, identified by a string key, also called
     * the username. The username helps the MxListenerGroup to indentify and destroy
     * a MxListener with the unsuscribe(string) method.
     */
    export class MxListenerGroup<S, A> {
        /****************************************************/
        /****************************************************/
        constructor();
        call(_sender: S, _args: A): void;
        /**
         * Adds a new listener to this MxListenerGroup. If a MxListener already exists
         * with the given username, it will be overrided.
         *
         * @param _username an identifier of the given MxListener.
         * @param _listener the MxListener to be added.
         */
        suscribe(_username: string, _listener: MxListener<S, A>): void;
        /**
         * Destroys the MxListener with the given username, and removes it from this
         * MxListenerGroup.
         *
         * @param _username the identifier of the MxListener.
         */
        unsuscribe(_username: string): void;
        /**
         * Removes all the MxListeners attached to this MxListenerGroup. This methods
         * calls the destroy method of each MxListener before remove them.
         */
        clear(): void;
        /**
         * Calls the destroy method of each MxListener in this MxListenerGroup.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Map of funtions that belongs to this group. The first types "string" is
         * the key to identify its MxListener, also called as the "username".
         */
        private _m_listenersMap;
    }
}
declare module "listeners/mxListenerManager" {
    import { MxListener } from "listeners/mxListener";
    /**
     * This class manage a group of MxListenerGroup, or "events". By this object
     * an MxListener can suscribe or unsuscribe to an event.
     */
    export class MxListenerManager<S, A> {
        /****************************************************/
        /****************************************************/
        constructor();
        /**
         * Adds a new event (MxListenerGroup) to this MxListnerManager. If an event
         * with the same key exists, it will be destroyed and replaced.
         *
         * @param _event the event key.
         */
        addEvent(_event: string): void;
        /**
         * Call the MxListener attached to an event.
         *
         * @param _event The key of the event to be called.
         * @param _sender The sender object of this event.
         * @param _args The arguments obejct of this event.
         */
        call(_event: string, _sender: S, _args: A): void;
        /**
         * Suscribe a new MxListener to the given event. This method also needs the
         * username to identify the MxListener. If a MxListener already exists in the
         * event, that MxListener will be replaced.
         *
         * @param _event The string key of the event to add the given MxListener.
         * @param _username the string key to the identify the given MxListener.
         * @param _listener the MxListener that will be added to the event.
         */
        suscribe(_event: string, _username: string, _listener: MxListener<S, A>): void;
        /**
         * Destroys the MxListener with the given username and removes it from the
         * event.
         *
         * @param _event the string key of the event.
         * @param _username the string key of the MxListener that will be removed.
         */
        unsuscribe(_event: string, _username: string): void;
        /**
         * Removes all the MxListeners from an event. This method call the clear method
         * of the MxListenerGroup indentified by the event name.
         *
         * @param _event The string identifier of the MxListenerGroup.
         */
        clearEvent(_event: string): void;
        /**
         * Calls the destroy method of each MxListenerGroup and removes them from this
         * MxListenerManager. This MxListenerManager will be empty.
         */
        clear(): void;
        /**
        * Calls the destroy method of each MxListenerGroup and removes them from this
        * MxListenerManager.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * A map of MxListeners, also called as "events". The key (string) is used to
         * identify the event.
        */
        private _m_eventsMap;
    }
}
declare module "optimization/mxPoolArgs" {
    /**
     * This class contains the arguments delivered when an event of a MxObjecPool
     * is triggered.
     */
    export class MxPoolArgs<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Reference to the element just been modified.
         */
        element: T;
    }
}
declare module "optimization/mxObjectPool" {
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
    import { OPRESULT } from "commons/mxEnums";
    import { MxPoolArgs } from "optimization/mxPoolArgs";
    /**
     * Creational design pattern that uses a set of initalized objects kept ready
     * to use rather than allocating and destroying them on demand.
     */
    export class MxObjectPool<T> {
        /****************************************************/
        /****************************************************/
        /**
         * Create a new empty pool.
         */
        static Create<U>(): MxObjectPool<U>;
        /**
         * Setup the elements of this pool.
         *
         * @param _a_element Array of elements.
         */
        init(_a_element: Array<T>): void;
        /**
         * Call a function once for each active and desactive elements in an array
         * order.
         *
         * @param _fn Function
         * @param _context Context.
         */
        forEach(_fn: (_element: T) => void, _context?: any): void;
        /**
         * Call a function once for each active element in an array order.
         *
         * @param _fn Function.
         * @param _context Context.
         */
        forEachActive(_fn: (_element: T) => void, _context?: any): void;
        /**
         * Call a function once for each desactive element in an array order.
         *
         * @param _fn Function.
         * @param _context Context.
         */
        forEachDesactive(_fn: (_element: T) => void, _context?: any): void;
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
        suscribe(_event: string, _username: string, _fn: (_sender: MxObjectPool<T>, _args: MxPoolArgs<T>) => void, _context?: any): void;
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
        unsuscribe(_event: string, _username: string): void;
        /**
         * Get an available element from this MxObjectPool. Be careful, if this
         * MxObjectPool doesn't has any availble element and is full, this method
         * will returns a null type object.
         *
         * @retuns An available element of this MxObjectPool. If the MxObjectPool
         * doesn't has any available element and is full, it will returns a null
         * type object.
         */
        get(): T;
        /**
         * Desactive the given element. The "elementDesactive" event will be
         * triggered.
         *
         * @param _element The element to desactive.
         *
         * @returns OPRESULT.kObject_not_found when the element doesn't was found in
         * this MxObjectPool, otherwise returns an OPRESULT.kOk.
         */
        desactive(_element: T): OPRESULT;
        /**
         * Check if this MxObjectPool has any element available.
         *
         * @returns True if there are at least one element available.
         */
        hasDesactive(): boolean;
        /**
         * Get the number of elements of this MxObjectPool.
         *
         * @returns The number of elements in this MxObjectPool.
         */
        getSize(): number;
        /**
         * Get the number of active elements.
         *
         * @returns Number of active elements.
         */
        getActiveSize(): number;
        /**
         * Get the number of desactive elements.
         *
         * @returns Number of desactive elements.
         */
        getDesactiveSize(): number;
        /**
        * Remove the active and desactive elements of this pool.
        */
        clear(): void;
        /**
        * Safely destroys the object.
        */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        private _active;
        /**
         * Number of elements that this MxObjectPool contains.
         */
        private _m_size;
        /**
         * List of active elements.
         */
        private _m_a_active;
        /**
         * List of desactive elements.
         */
        private _m_a_desactive;
        /**
         * Handle the "elementActive" and "elementDesactive" events.
         */
        private _m_listenerManager;
        /**
         * Private constructor. Object Pool must be created with Factories.
         */
        private constructor();
    }
}
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
declare module MxTools.PseudoRandom {
    /**
     * Implementation of the Halton Sequence, a low discrepancy and deterministic
     * algortihm that appear to be random.
     */
    class MxHalton {
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
        static GetPointSet(_size: integer, _baseX?: integer, _baseY?: integer): Array<Phaser.Geom.Point>;
        /**
         * Halton sequence is a low discrepancy algorithm that appear to tbe random.
         *
         * @param _index index.
         * @param _base base.
         *
         * @returns result.
         */
        static Halton(_index: integer, _base: integer): number;
    }
}
declare module "shaders/mxShader" {
    export class MxShader {
        /****************************************************/
        /****************************************************/
        constructor();
        init(_shader: Phaser.GameObjects.Shader): void;
        setUniform(_uniform: string, _value: any): void;
        setMask(_mask: Phaser.Display.Masks.BitmapMask): void;
        getShader(): Phaser.GameObjects.Shader;
        initUniform(_key: string): void;
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Phaser Sprite Gameobject.
         */
        _m_shader: Phaser.GameObjects.Shader;
    }
}
/**
 * HummingFlight Software Technologies - 2020
 *
 * @summary Provides a class that immitates the Phaser CE's button.
 *
 * @file mxButton.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since July-27-2020
 */
declare module MxTools.UI {
    /**
     * Provides a class that immitates the Phaser CE's button. The buttes is build
     * using a Phaser.Gameobject.Image.
     */
    class MxButton {
        /****************************************************/
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
        static Create(_scene: Phaser.Scene, _x: number, _y: number, _texture: string, _frame?: number | string, _callback?: Function, _callbackContext?: any, _over_key?: number | string, _out_key?: number | string, _down_key?: number | string, _up_key?: number | string): MxButton;
        /**
         * Get the Phaser GameObject image.
         */
        getImage(): Phaser.GameObjects.Image;
        /**
         * Destroys this Game Object removing it from the Display List and Update
         * List and severing all ties to parent resources.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        /**
         * Called when a pointer is over the image.
         */
        protected _onOver(): void;
        /**
         * Called when a pointer is out of the image.
         */
        protected _onOut(): void;
        /**
         * Called when a pointer is been pressed over the image.
         */
        protected _onDown(): void;
        /**
         * Called when a pointer had been released over the image.
         */
        protected _onUp(): void;
        protected _m_up_key: number | string;
        protected _m_down_key: number | string;
        protected _m_over_key: number | string;
        protected _m_out_key: number | string;
        protected _m_image: Phaser.GameObjects.Image;
    }
}
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
declare module MxTools.UI {
    /**
    * Provides a class that immitates the Phaser CE's button. This button tint the
    * texture's frame instead of change the frame index when the pointer is over,
    * out, down or up.
    */
    class MxButtonTinted {
        /****************************************************/
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
        static Create(_scene: Phaser.Scene, _x: number, _y: number, _texture: string, _frame?: number | string, _callback?: Function, _callbackContext?: any, _over_color?: number, _out_color?: number, _down_color?: number, _up_color?: number): MxButtonTinted;
        /**
         * Get the Phaser GameObject image.
         */
        getImage(): Phaser.GameObjects.Image;
        /**
         * Destroys this Game Object removing it from the Display List and Update List
         * and severing all ties to parent resources.
         */
        destroy(): void;
        /****************************************************/
        /****************************************************/
        protected constructor();
        /**
         * Called when a pointer is over the image.
         */
        protected _onOver(): void;
        /**
         * Called when a pointer is out of the image.
         */
        protected _onOut(): void;
        /**
         * Called when a pointer is been pressed over the image.
         */
        protected _onDown(): void;
        /**
         * Called when a pointer had been released over the image.
         */
        protected _onUp(): void;
        protected _m_up_color: number;
        protected _m_down_color: number;
        protected _m_over_color: number;
        protected _m_out_color: number;
        protected _m_image: Phaser.GameObjects.Image;
    }
}
//# sourceMappingURL=mxUtilities.d.ts.map