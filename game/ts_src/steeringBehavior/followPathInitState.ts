/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file followPathInitState.ts
 * @author Jorge Alexandro Zamudio Arredondo <alexzamudio_11@hotmail.com>
 * @since December-15-2020
 */

import { ForceInitState } from "./forceInitState";

export class FollowPathInitState
extends ForceInitState
{
  public m_initForceToPathScale : number = 0;

  public m_initVisionRadius : number = 0;
}