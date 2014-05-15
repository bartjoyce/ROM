/**
 * object.js implements:
 * - ROM.Object (constructor)
 * - ROM.Object.addEventListener (function)
 * - ROM.Object.removeEventListener (function)
 * - ROM.Object.attachComponent (function)
 * - ROM.Object.detachComponent (function)
 * - ROM.Object.getComponents (function)
 * - ROM.Object.trigger (function)
 */
(function() {
  /**
   * new Object()
   * Creates a new ROM.Object instance.
   */
  ROM.Object = function ROM_Object(context) {
    this.context = context;

    // Used for non-DOMElement contexts
    this.eventListeners = [];
    this.components = [];

    return this;
  };

  /**
   * addEventListener()
   * Adds an event listener/callback to the object.
   */
  ROM_Object.prototype.addEventListener = function addEventListener(eventName, callback) {
    eventName = eventName.toString().toLowerCase();

    if (typeof callback !== 'function')
      throw 'Callback has to be a function.';

    if (ROM.util.isElement(this.context))
      this.context.addEventListener(eventName, callback, false);
    else
      this.eventListeners.push([eventName, callback]);
  };

  /**
   * removeEventListener()
   * Removes an event listener/callback from the object.
   */
  ROM_Object.prototype.removeEventListener = function removeEventListener(eventName, callback) {
    eventName = eventName.toString().toLowerCase();

    if (typeof callback !== 'function')
      throw 'Callback has to be a function.';

    if (ROM.util.isElement(this.context))
      this.context.removeEventListener(eventName, callback, false);
    else {
      // Find and remove event listener.
      for (var i = 0; i < this.eventListeners.length; i += 1) {
        if (this.eventListeners[i][0] === eventName &&
            this.eventListeners[i][1] === callback) {
          this.eventListeners.splice(i, 1);
          return;
        }
      }
    }
  };

  /**
   * attachComponent()
   * Attaches a component to the object.
   */
  ROM_Object.prototype.attachComponent = function attachComponent(component) {
    component = component.toString().toLowerCase();

    if (ROM.components[component] === undefined)
      throw 'Component "' + component + '" doesn\'t exist.';

    if (ROM.util.isElement(this.context)) {
      // Attach component to DOMElement

      if (ROM.util.hasComponent(component, this.context))
        return; // Don't add a component more than once

      if (!this.context.hasAttribute('data-components'))
        this.context.setAttribute('data-components', '+' + component);
      else {
        var oldAttribute = this.context.getAttribute('data-components');
        var newAttribute = (oldAttribute === '') ? '+' + component : [oldAttribute, ' +', component].join('');

        this.context.setAttribute('data-components', newAttribute);
      }

      // Update element
      ROM.update(this.context);

    } else {
      // Attach component to object

      if (this.components.indexOf(component) !== -1)
        return; // Don't add a component more than once

      this.components.push(component);

      // Add component events
      this.eventListeners = this.eventListeners.concat(this.components[component].getEvents());
    }
  };

  /**
   * detachComponent()
   * Detaches a component from the object.
   */
  ROM_Object.prototype.detachComponent = function detachComponent(component) {
    component = component.toString().toLowerCase();

    if (ROM.components[component] === undefined)
      throw 'Component "' + component + '" doesn\'t exist.';

    if (ROM.util.isElement(this.context)) {
      // Detach component from DOMElement

      if (!ROM.util.hasComponent(component, this.context))
        return; // Component isn't attached to element

      // TODO: remove event listeners of component from element

      // TODO: remove component from data-components attribute

    } else {
      // Detach component from object

      var index = this.components.indexOf(component);
      if (index === -1)
        return; // Component isn't attached to object

      this.components.splice(index, 1);
    }
  };

  /**
   * getComponents()
   * Returns an array of the components attached
   * to the object.
   */
  ROM_Object.prototype.getComponents = function getComponents() {
    if (ROM.util.isElement(this.context))
      return ROM.util.getElementComponents(this.context);

    else
      return this.components;
  };

  // TODO: implement trigger()

})();
