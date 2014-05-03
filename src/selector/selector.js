/**
 * selector.js implements:
 * - ROM.selector (object)
 * - ROM.selector.Selector (constructor)
 */

window.ROM.selector = (function() {
  var selector = {};

  selector.Selector = function Selector(selectorString, tagName, id, classes, attributes, directAncestor) {
    this.selectorString = selectorString;

    this.match = function match(parentElement) {

    };

    return this;
  }

  return selector;
})();
