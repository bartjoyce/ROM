/**
 * component.js implements:
 * - The :component() pseudo-selector
 */
Sizzle.selectors.pseudos['component'] = Sizzle.selectors.createPseudo(function(component) {
  return function(elem) {
    return ROM.util.hasComponent(component, elem);
  };
});
