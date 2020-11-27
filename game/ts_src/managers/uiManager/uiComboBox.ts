/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary It is a combination of a drop-down list or list box and a
 * single-line UI Label, allowing the user to  select a value from the list.
 *
 * @file uiComboBox.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since November-18-2020
 */

import { ST_COLOR_ID } from "../../commons/stEnums";
import { UILabelBox } from "./uiLabelBox";
import { UIObject } from "./uiObject";

/**
 * It is a combination of a drop-down list or list box and a single-line
 * UI Label, allowing the user to  select a value from the list.
 * 
 * Events:
 * 
 * * selectionChanged: Triggered when the selected value had been changed. Sends
 *   the selected value [string] as argument.
 * * optionsChanged: Triggered when the list of values had been changed. Sends
 *   the array of values [string[]] as argument.
 */
export class UIComboBox
  extends UIObject
{

  constructor(_x: number, _y: number, _scene: Phaser.Scene)
  {

    super();

    this._m_scene = _scene;

    this._m_isOpen = false;

    // Events

    this._m_listenerManager.addEvent("selectionChanged");
    this._m_listenerManager.addEvent("optionsChanged");

    // UI Button

    const button = _scene.add.image
    (
      0,
      0,
      "game_art",
      "combo_but_normal.png"
    );

    this._m_button = button;

    button.setOrigin(0.0, 0.0);

    button.setInteractive();

    button.on
    (
      "pointerdown", 
      function()
      {

        button.setFrame("combo_but_press.png");

        return;

      }, 
      this
    );

    button.on
    (
      "pointerup", 
      this._onButtonRelease, 
      this
    );

    button.on
    (
      "pointerover",
      function()
      {
        
        button.setFrame("combo_but_hover.png");

        return;

      }
    );

    button.on
    (
      "pointerout",
      function()
      {
        
        button.setFrame("combo_but_normal.png");

        return;

      }
    );

    // UI Label Box list.

    this._m_aOptions = new Array<UILabelBox>();

    // Selected Option

    const selectedLabel = new UILabelBox(_x, _y, _scene, "");

    selectedLabel.setBoxTint(0xbefbff);

    this._m_selectedLabel = selectedLabel;

    // Update box

    this.updateCombo(undefined);

    return;

  }

  /**
   * The width of the UI Object.
   */
  getWidth()
  : number
  {

    return this._m_selectedLabel.getWidth() + this._m_button.width;

  }

  /**
   * The height of the UI Object.
   */
  getHeight()
  : number
  {

    return this._m_selectedLabel.getHeight();

  }

  /**
   * Get the x position of this UI Object.
   */
  getX()
  : number
  {

    return this._m_selectedLabel.getX();

  }

  /**
   * Get the y position of this UI Object.
   */
  getY()
  : number
  {

    return this._m_selectedLabel.getY();

  }

  /**
   * Get the depth value.
   */
  getZ()
  : number
  {

    return this._m_selectedLabel.getZ();

  }

  /**
   * Move the UI Object an amount.
   * 
   * @param _x amount in x axis. 
   * @param _y amount in y axis.
   */
  move(_x: number, _y: number)
  : void
  {

    this._m_selectedLabel.move(_x, _y);

    this._updatePosition();

    return;

  }

  /**
   * Set the position of the UI Object.
   * 
   * @param _x position in x axis. 
   * @param _y position in y axis.
   */
  setPosition(_x: number, _y: number)
  : void
  {

    this._m_selectedLabel.setPosition(_x, _y);

    this._updatePosition();

    return;

  }

  /**
   * Set the horizontal and vertical anchor (origin) of this UI Object.
   * 
   * @param _x The horizontal anchor (origin) of this UI Object.
   * @param _y The vertical anchor (origin) of this UI Object.
   */
  setAnchor(_x: number, _y: number)
  : void
  {

    this._m_selectedLabel.setAnchor(_x, _y);

    this._updatePosition();

    return;

  }

  /**
   * The horizontal anchor (origin) of this UI Object.
   */
  getAnchorX()
  : number
  {

    return this._m_selectedLabel.getAnchorX();

  }

  /**
   * The vertical anchor (origin) of this UI Object.
   */
  getAnchorY()
  : number
  {

    return this._m_selectedLabel.getAnchorY();

  }

  /**
   * Enable the UI Element.
   */
  enable()
  : void
  {

    this._m_selectedLabel.enable();

    if(this._m_isOpen)
    {
      
      const aOptionLabels = this._m_aOptions;

      const size = aOptionLabels.length;

      for(let i = 0; i < size; ++i)
      {

        aOptionLabels[i].enable();

      }

    }    

    this._m_button.setActive(true);
    this._m_button.setVisible(true);

    return;

  }

  /**
   * Disable the UI Element.
   */
  disable()
  : void
  {

    this.closeCombo();

    this._m_selectedLabel.disable();

    this._m_button.setActive(false);
    this._m_button.setVisible(false);

    return;

  }

  /**
   * Set the selected value.
   * 
   * @param _option selected value. 
   */
  setSelection(_option: string)
  : void
  {

    this._m_selectedLabel.setText(_option);

    this._m_listenerManager.call("selectionChanged", this, _option);

    return;

  }

  /**
   * Update the drop down list options of this UI Combo Box.
   * 
   * @param _options Array of options.
   */
  updateCombo(_options: string[])
  : void
  {

    this._m_aOptionsStr = _options;

    this._updateLabels();

    this._updatePosition();

    this.setSelection("");    

    this.closeCombo();

    this._m_listenerManager.call("optionsChanged", this, _options);

    return;

  }

  /**
   * Open the drop down list.
   */
  openCombo()
  : void
  {

    if(!this._m_isOpen)
    {

      const aOptionsStr = this._m_aOptionsStr;

      if(aOptionsStr === undefined)
      {

        return;

      }

      if(aOptionsStr.length <= 0)
      {

        return;

      }

      this._m_isOpen = true;

      const aOptions = this._m_aOptions;

      const size = aOptionsStr.length;

      const selectedLabel = this._m_selectedLabel;

      for(let i = 0; i < size; ++i)
      {

        aOptions[i].enable();

      }

    }

    return;

  }

  /**
   * Close the drop down list.
   */
  closeCombo()
  : void
  {

    if(this._m_isOpen)
    {

      const aOptions = this._m_aOptions;

      const size = aOptions.length;

      for(let i = 0; i < size; ++i)
      {

        aOptions[i].disable();

      }

      this._m_isOpen = false;

    }

    return;

  }

  destroy()
  : void
  {

    this._m_selectedLabel.destroy();

    this._m_aOptions.forEach
    (
      function(_value: UILabelBox)
      : void
      {
        _value.destroy();
      }
    );
    this._m_aOptions = null;

    this._m_aOptionsStr = null;

    super.destroy();

    return;

  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  private _onButtonRelease()
  : void
  {

    if(this._m_isOpen)
    {

      this.closeCombo();

    }
    else
    {

      this.openCombo();

    }

    this._m_button.setFrame("combo_but_normal.png");

    return;

  }

  /**
   * Check, and create if is necessary the number of UI Box Label according to 
   * the number of options available in this combo box.
   */
  private _updateLabels()
  : void
  {

    const aOptionsStr = this._m_aOptionsStr;

    if(aOptionsStr === undefined)
    {

      return;

    }

    const size = aOptionsStr.length;

    const aOptionLabels = this._m_aOptions;

    for(let i = 0; i < size; ++i)
    {

      if(aOptionLabels.length <= size)
      {

        // Create option label.

        const optionLabel = new UILabelBox
        (
          0, 
          0, 
          this._m_scene,
          aOptionsStr[i]
        );

        optionLabel.setBoxTint(0xaffaff);

        optionLabel.setZ(10);

        optionLabel.setAnchor(0.0, 0.0);

        optionLabel.setInteractive();

        optionLabel.subscribe
        (
          "pointerdown", 
          "comboBox", 
          this._onOptionDown, 
          this
        );

        optionLabel.subscribe
        (
          "pointerup", 
          "comboBox", 
          this._onOptionUp, 
          this
        );

        optionLabel.subscribe
        (
          "pointerover", 
          "comboBox", 
          this._onOptionOver, 
          this
        );

        optionLabel.subscribe
        (
          "pointerout", 
          "comboBox", 
          this._onOptionOut, 
          this
        );

        optionLabel.disable();

        aOptionLabels.push(optionLabel);

      }
      else
      {

        aOptionLabels[i].setText(aOptionsStr[i]);

      }

    }

    return;

  }

  /**
   * Position each label below the selected label.
   */
  private _updatePosition()
  : void
  {

    // Get the initial point of the option labels.

    const selectedLabel = this._m_selectedLabel;

    const x = selectedLabel.getX() 
            - (selectedLabel.getWidth() * selectedLabel.getAnchorX());

    let y = selectedLabel.getY() 
          - (selectedLabel.getHeight() * selectedLabel.getAnchorY());

    // Set button position.

    this._m_button.setPosition
    (
      x + selectedLabel.getWidth(),
      y 
    );

    y += selectedLabel.getHeight();

    // Order the options labels in a vertical list below the selected label.

    const aOptions = this._m_aOptions;

    const size = aOptions.length;

    let optionLabel : UILabelBox;

    for(let i = 0; i < size; ++i)
    {

      optionLabel = aOptions[i];

      optionLabel.setPosition(x, y);

      y += optionLabel.getHeight();

    }

    return;

  }

  private _onOptionDown(_uiLabel: UIObject, _args: any)
  : void
  {

    const labelBox = _uiLabel as UILabelBox;

    labelBox.setBoxTint(ST_COLOR_ID.kBlack);
    labelBox.setTextTint(ST_COLOR_ID.kWhite);

    return;

  }

  private _onOptionUp(_uiLabel: UIObject, _args: any)
  : void
  {

    const labelBox = _uiLabel as UILabelBox;

    this.setSelection(labelBox.getText());

    labelBox.setBoxTint(ST_COLOR_ID.kSkyBlueNeon);
    labelBox.setTextTint(ST_COLOR_ID.kBlack);

    this.closeCombo();

    return;

  }

  private _onOptionOver(_uiLabel: UIObject, _args: any)
  : void
  {

    const labelBox = _uiLabel as UILabelBox;

    labelBox.setBoxTint(0x5dc7ce);
    labelBox.setTextTint(ST_COLOR_ID.kBlack);

    return;

  }

  private _onOptionOut(_uiLabel: UIObject, _args: any)
  : void
  {

    const labelBox = _uiLabel as UILabelBox;

    labelBox.setBoxTint(ST_COLOR_ID.kSkyBlueNeon);
    labelBox.setTextTint(ST_COLOR_ID.kBlack);

    return;

  }

  private _m_button: Phaser.GameObjects.Image;

  private _m_selectedLabel: UILabelBox;

  private _m_aOptions : Array<UILabelBox>;

  private _m_aOptionsStr : Array<string>;

  private _m_scene : Phaser.Scene;

  private _m_isOpen : Boolean;

}