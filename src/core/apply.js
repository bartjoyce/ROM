/**
 * apply.js implements:
 * - ROM.apply (function)
 * - ROM.applyAsync (function)
 */
(function() {
  /**
   * apply()
   * Executes a function followed by a digest.
   */
  ROM.apply = function apply(fn) {
    ROM.digest.queue(fn);
    ROM.digest();
  };

  /**
   * applyAsync()
   * Applies a function to be executed later.
   */
  ROM.applyAsync = function applyAsync(fn) {
    ROM.digest.queue(fn);
    ROM.digestAsync();
  };
})();
