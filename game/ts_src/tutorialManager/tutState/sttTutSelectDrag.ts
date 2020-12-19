import { TutState } from "./tutState";

export class SttTutSelectDrag
extends TutState
{

  openBook()
  : void
  {  

    this._m_manager.m_infoBox.setBook("tutorial_select_drag");
    this._m_manager.m_infoBox.open();

    return;

  }

}