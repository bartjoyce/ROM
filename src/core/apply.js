/**
 * apply.js implements:
 * - ROM.apply (function)
 * - ROM.applyAsync (function)
 */
ROM.apply = (function() {
  /**
   * apply()
   * Executes a function followed by a digest.
   */
  var apply = function apply(fn) {
    try {
      fn();
    } catch(e) {
      (console.error || console.log)(e);
    }

    ROM.digest();
  };

  return apply;
})();

ROM.applyAsync = (function() {
  /**
   * applyAsync()
   * Applies a function in the next js step
   */
  var applyAsync = function applyAsync(fn) {
    setTimeout(function applyAsyncTimeout() {
      ROM.digest();
    }, 0);

    ROM.digest.queue(fn);
  };

  return applyAsync;
})();
