/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file infoBook.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since December-08-2020
 */

import { ST_MANAGER_ID } from "../commons/stEnums";
import { AudioManager } from "../managers/audioManager/audioManager";
import { Master } from "../master/master";
import { InfoPage } from "./infoPage";

export class InfoBook
{

  constructor()
  {

    this.name = "";
    this.activePage = 0;
    this.pages = new Array<InfoPage>();    

    return;

  }

  reset()
  : void
  {

    this.activePage = 0;

    return;

  }

  getActivePage()
  : InfoPage
  {

    return this.pages[this.activePage];

  }

  nextPage()
  : boolean
  {

    let activePage = this.activePage;    

    if(activePage < (this.pages.length - 1))
    {

      ++activePage;

      this.activePage = activePage;

      return true;

    }    

    return false;

  }

  prevPage()
  : boolean
  {

    let activePage = this.activePage;    

    if(activePage > 0)
    {

      --activePage;

      this.activePage = activePage;

      return true;

    }    

    return false;

  }

  isLastPage()
  : boolean
  {

    return this.activePage >= (this.pages.length - 1);

  }

  name: string;

  pages: Array<InfoPage>;

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private activePage: number = 0;  

}