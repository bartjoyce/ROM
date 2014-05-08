/**
 * apply.js implements:
 * - ROM.apply (function)
 * - ROM.applyAsync (function)
 */
(function(ROM) {
  /**
   * apply()
   * Executes a function followed by a digest.
   */
  var apply = function apply(fn) {
    ROM['digest']['queue'](fn);
    ROM['digest']();
  };

  var scheduledDigest = false;

  /**
   * applyAsync()
   * Applies a function in the next js step
   */
  var applyAsync = function applyAsync(fn) {
    if (!scheduledDigest) {
      setTimeout(function applyAsyncTimeout() {
        scheduledDigest = false;
        ROM['digest']();
      }, 0);
    }

    scheduledDigest = true;

    ROM['digest']['queue'](fn);
  };

  // EXPOSE
  ROM['apply'] = apply;
  ROM['applyAsync'] = applyAsync;
})(window['ROM']);
