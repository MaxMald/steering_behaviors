/**
 * Universidad de Artes Digitales, Guadalajara - 2020
 *
 * @summary 
 *
 * @file baseActor.ts
 * @author Max Alberto Solano Maldonado <nuup20@gmail.com>
 * @since August-30-2020
 */

import { IBaseComponent } from "../components/iBaseComponent";
import { IActor } from "./iActor";

/**
 * Simple actor class (from the Component Pattern) wich has an array of 
 * components that defines its behaviour. 
 */
export class BaseActor<T>
implements IActor
{

  /**
   * Creates a new Actor, with no components.
   * 
   * @param _instance The wrapped instance.
   * @param _name The actor's names, used as an identifier.
   * 
   * @readonly A new Actor.
   */
  static Create<U>(_instance : U, _name : string)
  : BaseActor<U>
  {
    let actor : BaseActor<U> = new BaseActor<U>();
    
    actor._m_components = new Array<IBaseComponent<U>>();
    actor._m_instance = _instance;
    actor.m_name = _name;   

    return actor;
  }

  /**
   * Call the init method of all the component attached to this BaseActor.
   */
  init()
  : void
  {
    let index : number = 0;
    let components : IBaseComponent<T>[] = this._m_components;
    let length : number = components.length; 
    
    while(index < length)
    {
      components[index].init(this);  
      ++index;
    }

    return;
  }

  /**
   * Calls the update method of every component attached to this BaseActor.
   */
  update()
  : void
  {
    let components : IBaseComponent<T>[] = this._m_components;
    
    // Update Phase

    components.forEach
    (
      this._updateComponent,
      this
    );

    return;
  }

  /**
   * Send a message to every component attached to this BaseActor.
   * 
   * @param _id Message ID. 
   * @param _obj Message Object.
   */
  sendMessage(_id : number, _obj : any)
  : void
  {
    let index : number = 0;
    let aComponent = this._m_components;
    let size = aComponent.length;

    while(index < size)
    {
      if(aComponent[index] != null)
      {
        aComponent[index].receive(_id, _obj);
      }

      ++index;
    }
    return;
  }

  /**
   * Get the wrapped instance of this Actor.
   */
  getWrappedInstance()
  : T
  {
    return this._m_instance;
  }

  /**
   * Add a component to this BaseActor. If a component with the same id exists,
   * it will be removed from the component list, before the new one is added.
   * 
   * @param _component The component.
   */
  addComponent(_component : IBaseComponent<T>)
  : void
  {
    if(this.hasComponent(_component.getID())) 
    {
      this.removeComponent(_component.getID());
    }

    this._m_components.push(_component);
    return;
  }

  /**
   * Get a component from this BaseActor.
   * 
   * If the component wasn't found this will throw a console error.
   * 
   * @param _id The id of the component. 
   */
  getComponent<U extends IBaseComponent<T>>(_id : number)
  : U
  {
    let index : number = 0;

    let length : number = this._m_components.length; 
    
    while(index < length)
    {
      if(this._m_components[index].getID() == _id) 
      {
        return (this._m_components[index] as unknown) as U;
      }
      ++index;
    }

    throw new Error
    (
      "Component of index : " + _id.toString() + " not founded"
    );
  }

  /**
   * Removes a component from this BaseActor. The destroy method of the component
   * will not be called.
   * 
   * @param _id component id. 
   */
  removeComponent(_id : number)
  : void
  {
    let index : number = 0;
    let length : number = this._m_components.length; 
    
    while(index < length)
    {
      if(this._m_components[index].getID() ==_id) {
        this._m_components.splice(index, 1);
        return;
      }
      ++index;
    }

    return;
  }

  /**
   * Check if a component exists in this BaseActor.
   * 
   * @param _id component id.
   */
  hasComponent(_id : number)
  : boolean
  {
    let index : number = 0;
    let length : number = this._m_components.length; 
    
    while(index < length)
    {
      if(this._m_components[index].getID() == _id) {
        return true;
      }
      ++index;
    }

    return false;
  }

  /**
   * Called when the simulation had just started.
   */
  onSimulationStart()
  : void
  {
    return;
  }

  /**
   * Called when the simulation had just paused.
   */
  onSimulationPause()
  : void
  {
    return;
  }

  /**
   * Called when the simualtion had just resumed.
   */
  onSimulationResume()
  : void
  {
    return;
  }

  /**
   * Get the actor's name.
   * 
   * @returns the actor's name.
   */
  getName()
  : string
  {
    return this.m_name;
  }

  /**
   * Destroys all the component attached to this BaseActor.
   */
  destroy()
  : void
  {    
    let component : IBaseComponent<T>;

    while(this._m_components.length) 
    {
      component = this._m_components.pop();
      
      component.destroy();      
    }
    return;
  }

  /****************************************************/
  /* Protected                                        */
  /****************************************************/
  
  /**
   * Protected constructor.
   */
  protected constructor() 
  { }

  /**
   * Called in the update method.
   * 
   * @param _component component. 
   */
  protected _updateComponent(_component : IBaseComponent<T>)
  : void
  {
    _component.update(this);
    return;
  }

  /**
   * The name of this BaseActor.
   */
  protected m_name : string;

  /**
   * Reference to the wrapped instance.
   */
  protected _m_instance : T;

  /**
   * List of components attached to this BaseActor.
   */
  protected _m_components : Array<IBaseComponent<T>>;
}