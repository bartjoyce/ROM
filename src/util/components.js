/**
 * components.js implements:
 * - ROM.util.getElementComponents (function)
 * - ROM.util.hasComponent (function)
 */
(function() {
  /**
   * getElementComponents()
   * Given an element returns the elements that are attached to it.
   */
  ROM.util.getElementComponents = function getElementComponents(element) {
    if (!element.hasAttribute || !element.hasAttribute('data-components'))
      return [];

    var components = element.getAttribute('data-components').toLowerCase().split(' ');

    components = ROM.util.arrayFilter(components, componentIsIncluded);

    return ROM.util.arrayMap(components, getComponentName);
  };

  /**
   * hasComponent()
   * Given a component name and an element checks whether the element
   * has the component.
   */
  ROM.util.hasComponent = function hasComponent(component, element) {
    if (!element.hasAttribute || !element.hasAttribute('data-components'))
      return false;

    component = component.toLowerCase();

    var components = element.getAttribute('data-components').toLowerCase().split(' ');

    for (var i = 0; i < components.length; i += 1)
      if (componentIsIncluded(components[i]) &&
          getComponentName(components[i]) === component)
        return true;

    return false;
  };

  /**
   * getComponentName()
   * Given a name returns the actual name (removes its prefix
   * if there is one).
   */
  var getComponentName = function getComponentName(name) {
    return componentHasPrefix(name) ? name.substr(1) : name;
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
   * componentIsIncluded()
   * Checks whether a component name is included or excluded;
   * it is an excluded component if it is prefixed with a -
   * character.
   */
  var componentIsIncluded = function componentIsIncluded(name) {
    return (name[0] !== '-');
  };
})();
