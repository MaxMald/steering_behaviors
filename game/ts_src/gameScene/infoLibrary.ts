/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file infoLibrary.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-08-2020
 */

import { InfoBook } from "./infoBook";

export class InfoLibrary 
{

  constructor()
  {

    this.books = new Array<InfoBook>();
    
    return;

  }

  books: Array<InfoBook>;

}