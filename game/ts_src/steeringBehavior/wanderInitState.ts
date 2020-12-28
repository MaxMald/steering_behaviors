/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file wanderInitState.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since December-27-2020
 */

import { ForceInitState } from "./forceInitState";

 export class WanderInitState
 extends ForceInitState
 {
   public m_initTargetDistance : number = 0;

   public m_initCircleRadius : number = 0;

   public m_initDisplacementAngle : number = 0;

   public m_initAngleChange : number = 0;
 }