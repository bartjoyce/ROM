/**
 * element.js implements:
 * - ROM.util.isElement (function)
 */
(function() {
  /**
   * isElement()
   * Given an element returns whether or not
   * it is in fact an element.
   */
  ROM.util.isElement = function isElement(element) {
    // Copied from the nice people over at StackOverflow!
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrom)
      return obj instanceof HTMLElement;
    }
    catch(e){
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have. (works on IE7)
      return ((typeof obj === "object") &&
              (obj.nodeType === 1) && (typeof obj.style === "object") &&
              (typeof obj.ownerDocument ==="object"));
    }
  };
})();
