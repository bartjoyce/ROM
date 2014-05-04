/**
 * components.js implements:
 * - ROM.util.getElementComponents (function)
 */
window.ROM.util.getElementComponents = (function() {
  /**
   * getElementComponents()
   * Given an element returns the elements that are attached to it.
   */
  var getElementComponents = function getElementComponents(element) {
    if (!element.hasAttribute || !element.hasAttribute('data-components'))
      return [];

    return element.getAttribute('data-components').split(' ');
  };

  return getElementComponents;
})();
