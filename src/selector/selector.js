/**
 * selector.js implements:
 * - ROM.selector (object)
 * - ROM.selector.Selector (constructor)
 */

window.ROM.selector = (function() {
  var selector = {};

  selector.Selector = function Selector(selectorString, tagName, id, classes, attributes, directAncestor) {
    // Argument default values
    selectorString = selectorString || '';
    tagName = tagName || null;
    id = id || null;
    classes = classes || [];
    attributes = attributes || {};
    directAncestor = !!directAncestor;

    var matchTagName = function matchTagName(parentElement) {

    };
    var matchId = function matchId(parentElement) {

    };
    var matchClasses = function matchClasses(parentElement) {

    };
    var matchAttributes = function matchAttributes(parentElement) {

    };

    this.match = function match(parentElement) {

    };

    this.selectorString = selectorString;

    return this;
  }

  return selector;
})();
