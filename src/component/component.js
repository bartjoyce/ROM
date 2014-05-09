/**
 * component.js implements:
 * - ROM.components (object)
 * - ROM.Component (constructor)
 */
(function(ROM) {
  var components = {};

  /**
   * new Component()
   * Creates a new component object which can control elements.
   * It takes a string name which it is identified with; it takes
   * a string selector which is a CSS selector defining which elements
   * it acts upon; it takes an events object which defines the
   * behaviours it adds to elements.
   */
   var Component = function Component(name, selector, events) {
    var name = name || 'untitled_component';
    var selector = selector || '';
    var events = events || {};

    if (!isValidName(name))
      throw "Invalid component name: " + name;

    if (components[name] !== undefined)
      throw "Component already exists with name: " + name;

    this['name'] = name;
    this['selector'] = selector;
    this['events'] = events;

    Sizzle.compile(selector);

    /**
     * matchFn()
     * Given an element returns whether
     * it matches the selector.
     */
    var matchFn = function matchFn(element) {
      return Sizzle.matchesSelector(element, selector);
    };

    this['matchFn'] = matchFn;

    components[name] = this;

    return this;
  };

  /**
   * isValidName()
   * Checks whether a given name is a valid component name.
   */
  var isValidName = function isValidName(name) {
    return (name.length > 0 && name.indexOf(' ') === -1 && name[0] !== '+' && name[0] !== '-');
  };

  // EXPOSE
  ROM['components'] = components;
  ROM['Component'] = Component;
})(window['ROM']);
