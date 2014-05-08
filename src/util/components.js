/**
 * components.js implements:
 * - ROM.util.getElementComponents (function)
 */
(function() {
  /**
   * getElementComponents()
   * Given an element returns the elements that are attached to it.
   */
  var getElementComponents = function getElementComponents(element) {
    if (!element.hasAttribute || !element.hasAttribute('data-components'))
      return [];

    var components = element.getAttribute('data-components').split(' ');

    return ROM.util.arrayMap(components, getComponentName);
  };

  /**
   * componentHasPrefix()
   * Checks whether a component name is prefixed with a
   * + or - character.
   */
  var componentHasPrefix = function componentHasPrefix(name) {
    return (name[0] === '+' || name[0] === '-');
  };

  /**
   * getComponentName()
   * Given a name returns the actual name (removes its prefix
   * if there is one).
   */
  var getComponentName = function getComponentName(name) {
    return componentHasPrefix(name) ? name.substr(1) : name;
  };

  // EXPOSE
  window.ROM.util.getElementComponents = getElementComponents;
})();
