/**
 * component.js implements:
 * - ROM.components (object)
 * - ROM.Component (constructor)
 */
window.ROM.components = {};

window.ROM.Component = (function() {
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
    var selectors = selector.split(',') || '';
    var events = events || {};

    if (this.name.indexOf(' ') !== -1)
      throw "Component name cannot have spaces: " + this.name;

    this.name = name;
    this.selectors = [];
    this.events = events;

    for (var i = 0; i < selectors.length; i += 1)
      this.selectors.push(ROM.selector.parseString(selectors[i]));

    return this;
  };

  return Component;
})();
