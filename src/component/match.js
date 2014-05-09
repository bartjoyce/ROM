/**
 * match.js implements:
 * ROM.matchComponents (function)
 */
(function(ROM) {
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
  var matchComponents = function matchComponents(element) {
    var components = ROM['components'];
    var componentKeys = Object.keys(components);

    var matched = [];

    for (var i = 0; i < componentKeys.length; i += 1) {
      var componentKey = componentKeys[i];
      var component = components[componentKey];

      if (component['matchFn'](element))
        matched.push(componentKey);
    }

    return matched;
  };

  // EXPOSE
  ROM['matchComponents'] = matchComponents;
})(window['ROM']);
