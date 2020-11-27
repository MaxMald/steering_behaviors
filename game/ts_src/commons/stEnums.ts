import { EnumLiteralsOf } from "commons/mxEnums";

/**
 * Components IDs
 * 
 * Component identifiers.
 */

export type ST_MANAGER_ID = EnumLiteralsOf<typeof ST_MANAGER_ID>;

export const ST_MANAGER_ID = Object.freeze
({
  
  kUndefined : -1 as -1,

  kSimManager : 1 as 1,

  kUIManager : 2 as 2,

  kDebugManager : 3 as 3
});

/**
 * Components IDs
 * 
 * Component identifiers.
 */

export type ST_COMPONENT_ID = EnumLiteralsOf<typeof ST_COMPONENT_ID>;

export const ST_COMPONENT_ID = Object.freeze
({
  
  kUndefined : -1 as -1,

  kForceController : 1 as 1,

  kSpriteController : 2 as 2,

  kShipPropulsor : 3 as 3

});

/**
 * Messages IDs
 * 
 * Message identifiers, used by any message system in the game. The description
 * of each identifier indicates what it is supposed to do, and the type of
 * object provided.
 */

export type ST_MESSAGE_ID = EnumLiteralsOf<typeof ST_MESSAGE_ID>;

export const ST_MESSAGE_ID = Object.freeze
({
  
  /**
   * Move agent.
   * 
   * msg : Phaser.Math.Vector2
   */
  kMove : 1 as 1,

  /**
   * Set agent position.
   * 
   * msg : Phaser.Math.Vector2
   */
  kSetPosition : 2 as 2,

  /**
   * Set the agent scale.
   * 
   * msg : Phaser.Math.Vector2
   */
  kSetScale : 3 as 3,

  /**
   * Set the anget angle in radians.
   * 
   * msg : number
   */
  kSetAngle : 4 as 4,

  /**
   * Set the angent speed (pixels per second).
   * 
   * msg : number
   */
  kSetSpeed : 5 as 5,

  /**
   * Set the agent mass (units).
   * 
   * msg : number
   */
  kSetMass : 6 as 6,

  /**
   * Set the agent max speed (pixels per second).
   * 
   * msg : number
   */
  kSetMaxSpeed : 7 as 7
});

/**
 * Colors  IDs
 */

export type ST_COLOR_ID = EnumLiteralsOf<typeof ST_COLOR_ID>;

export const ST_COLOR_ID = Object.freeze
({
  
  kBlack : 0x000000 as 0x000000,

  kWhite : 0xFFFFFF as 0xFFFFFF,

  kRed : 0xFF0000 as 0xFF0000,

  kGreen : 0x00FF00 as 0x00FF00,

  kBlue : 0x0000FF as 0x0000FF,

  kYellow : 0xFFFF00 as 0xFFFF00,

  kOrange : 0xFFA500 as 0xFFA500,

  kGray : 0x808080 as 0x808080,

  kPurple : 0x800080 as 0x800080,

  kBrown : 0xA52A2A as 0xA52A2A,

  kSkyBlueNeon: 0xa7edeb as 0xa7edeb,

  kGold: 0xffe033 as 0xffe033,

  kDarkGold: 0x94351e as 0x94351e

});

/**
 * Text Type
 */

export type ST_TEXT_TYPE = EnumLiteralsOf<typeof ST_TEXT_TYPE>;

export const ST_TEXT_TYPE = Object.freeze
({
  
  H1 : 0 as 0,

  H2 : 1 as 1,

  Normal: 2 as 2

});

/**
 * Button Type
 */

export type ST_BUTTON = EnumLiteralsOf<typeof ST_BUTTON>;

export const ST_BUTTON = Object.freeze
({
  
  kAccept : 0 as 0,

  kCancel : 1 as 1,

  kYes: 2 as 2,

  kNo: 4 as 4

});

export type ST_STEER_FORCE = EnumLiteralsOf<typeof ST_STEER_FORCE>;

export const ST_STEER_FORCE = Object.freeze
({
  
  kSeek: 0 as 0,

  kFlee: 1 as 1,

  kArrive: 2 as 2,
  
  kWander: 3 as 3,

  kPursue: 4 as 4,

  kObstacleAvoidance: 5 as 5,

  kFollowPath: 6 as 6

});

/**
 * Indicates the current state of the Simulation Manager.
 */

export type ST_SIM_SATE = EnumLiteralsOf<typeof ST_SIM_SATE>;

export const ST_SIM_SATE = Object.freeze
({
  
  /**
   * The simulation is stopped.
   */
  kStopped: 0 as 0,

  /**
   * The simulation is running.
   */
  kRunning: 1 as 1,

  /**
   * The simulation is paused.
   */
  kPaused: 2 as 2

});