/**
 * component.js implements:
 * - ROM.components (object)
 * - ROM.Component (constructor)
 */
(function() {
  ROM.components = {};

  /**
   * new Component()
   * Creates a new component object which can control elements.
   * It takes a string name which it is identified with; it takes
   * a string selector which is a CSS selector defining which elements
   * it acts upon; it takes an events object which defines the
   * behaviours it adds to elements.
   */
  ROM.Component = function ROM_Component(name, selector, events) {
    var name = name || 'untitled_component';
    var selector = selector || '';
    var events = events || {};

    if (!isValidName(name))
      throw "Invalid component name: " + name;

    if (ROM.components[name] !== undefined)
      throw "Component already exists with name: " + name;

    this.name = name;
    this.selector = selector;
    this.events = events;

    Sizzle.compile(selector);

    /**
     * matchFn()
     * Given an element returns whether
     * it matches the selector.
     */
    var matchFn = function matchFn(element) {
      return Sizzle.matchesSelector(element, selector);
    };

    this.matchFn = matchFn;

    ROM.components[name] = this;

    return this;
  };

  /**
   * getEvents()
   * Returns an array of events.
   */
  ROM_Component.prototype.getEvents = function getEvents() {
    var eventKeys = Object.keys(this.events);

    ROM.util.arrayMap(eventKeys, function mapListeners(eventKey) {
      return [eventKey, this.events[eventKey]];
    });
  };

  /**
   * isValidName()
   * Checks whether a given name is a valid component name.
   */
  var isValidName = function isValidName(name) {
    return (name.length > 0 && name.indexOf(' ') === -1 && name[0] !== '+' && name[0] !== '-');
  };
})();
