/**
 * match.js implements:
 * ROM.matchComponents (function)
 */
(function() {
  /**
   * matchComponents()
   * Takes an element and matches it with
   * the registered components.
   *
   * Currently this follows a naive
   * implementation, we iterate over all
   * components, passing the element in to
   * their match functions. In the future
   * a tree structure will be used to replace
   * this implementation.
   */
  ROM.matchComponents = function matchComponents(element) {
    var componentKeys = Object.keys(ROM.components);

    var matched = [];

    for (var i = 0; i < componentKeys.length; i += 1) {
      var componentKey = componentKeys[i];
      var component = ROM.components[componentKey];

      if (component.matchFn(element))
        matched.push(componentKey);
    }

    return matched;
  };
})();
