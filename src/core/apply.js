/**
 * apply.js implements:
 * - ROM.apply (function)
 * - ROM.applyAsync (function)
 */
(function(window) {
  /**
   * apply()
   * Executes a function followed by a digest.
   */
  window.ROM.apply = function apply(fn) {
    ROM.digest.queue(fn);
    ROM.digest();
  };

  /**
   * scheduledDigest
   * Used by applyAsync() to check whether
   * a digest has already been scheduled.
   */
  var scheduledDigest = false;

  /**
   * applyAsync()
   * Applies a function in the next js step
   */
  window.ROM.applyAsync = function applyAsync(fn) {
    if (!scheduledDigest) {
      setTimeout(function applyAsyncTimeout() {
        scheduledDigest = false;
        ROM.digest();
      }, 0);
    }

    scheduledDigest = true;

    ROM.digest.queue(fn);
  };
})(window);
