import { EnumLiteralsOf } from "commons/mxEnums";

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

  kSpriteController : 2 as 2

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