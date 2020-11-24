/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file UIMessageBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-23-2020
 */

import { ST_BUTTON } from "../../../commons/stEnums";
import { UIBox } from "../uiBox/uiBox";
import { UIButton } from "../uiButton";
import { UIText } from "../uiText";
import { UIDialogBox } from "./UIDialogBox";

export class UIMessageBox 
extends UIDialogBox
{

  constructor
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _title: string,
    _message: string
  )
  {
    
    super(_x, _y, _scene, _title);

    // Message 

    const message = UIText.CreateStyleB(0, 0, _scene, _message);

    this._m_message = message;

    this._m_box.add(message);

    return;

  }

  static CreateAccept
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _title: string,
    _message: string,
    _callback: (_buttonKey: ST_BUTTON) => void,
    _context: any
  )
  : UIMessageBox
  {

    const messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);

    // Buttons Box.

    const buttonsBox= UIBox.CreateContentBoxB(0, 0, _scene);

    buttonsBox.setElementsGap(0);

    ///////////////////////////////////
    // Accept

    const accept = UIButton.CreateButton(_x, _y, _scene, "Accept");

    accept.subscribe
    (
      "buttonReleased", 
      "DialogBox",
      function(_sender, _args)
      : void
      {

        this.close();

        this._m_fn.call(this._m_context, ST_BUTTON.kAccept);

        return;

      },
      messageBox
    );

    buttonsBox.add(accept);

    // Add Buttons Box to the Dialog Box.

    messageBox._m_box.add(buttonsBox);

    // Callback

    messageBox._m_fn = _callback;
    messageBox._m_context = _context;

    return messageBox;

  }

  static CreateYesNo
  (
    _x: number,
    _y: number,
    _scene: Phaser.Scene,
    _title: string,
    _message: string,
    _callback: (_buttonKey: ST_BUTTON) => void,
    _context: any
  )
  : UIMessageBox
  {

    const messageBox = new UIMessageBox(_x, _y, _scene, _title, _message);

    // Buttons Box.

    const buttonsBox= UIBox.CreateContentBoxB(0, 0, _scene);

    buttonsBox.setHorizontalBox();

    ///////////////////////////////////
    // Yes

    const butYes = UIButton.CreateButton(_x, _y, _scene, "Yes");

    butYes.subscribe
    (
      "buttonReleased", 
      "DialogBox",
      function(_sender, _args)
      : void
      {

        this.close();

        this._m_fn.call(this._m_context, ST_BUTTON.kYes);

        return;

      },
      messageBox
    );

    buttonsBox.add(butYes);

    ///////////////////////////////////
    // Yes

    const butNo = UIButton.CreateButton(_x, _y, _scene, "No");

    butNo.subscribe
    (
      "buttonReleased", 
      "DialogBox",
      function(_sender, _args)
      : void
      {

        this.close();

        this._m_fn.call(this._m_context, ST_BUTTON.kNo);

        return;

      },
      messageBox
    );

    buttonsBox.add(butNo);

    // Add Buttons Box to the Dialog Box.

    messageBox._m_box.add(buttonsBox);

    // Callback

    messageBox._m_fn = _callback;
    messageBox._m_context = _context;

    return messageBox;

  }

  setMessage(_msg: string)
  : void
  {

    this._m_message.setText(_msg);

    this._m_box.updateBox();

    return;

  }

  destroy()
  : void
  {

    this._m_message.destroy();
    this._m_message = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
  
  /**
   * The message of this dialog box.
   */
  protected _m_message: UIText;

  /**
   * Dialog Box buttons.
   */
  protected _m_buttonsBox: UIBox;

}