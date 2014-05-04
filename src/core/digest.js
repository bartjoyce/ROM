/**
 * digest.js implements:
 * - ROM.digest (function)
 * - ROM.digest.async (function)
 * - ROM.digest.queuePostDigest (function)
 */
window.ROM.digest = (function() {
  var isDigesting = false;

  var digestQueue = [];
  var postDigestQueue = [];

  /**
   * digest()
   * Runs a digest cycle (updates elements, etc...)
   */
  var digest = function digest() {
    if (isDigesting)
      return;

    isDigesting = true;

    var ttl = 10;

    // Run queue
    for (var i = 0; i < digestQueue.length; i += 1) {
      try {
        digestQueue[i]();
      } catch (e) {
        (console.error || console.log)(e);
      }

      if (!(ttl--))
        throw "10 digest iterations reached";
    }
    digestQueue = [];

    // Run postDigestQueue
    for (var i = 0; i < postDigestQueue.length; i += 1) {
      try {
        postDigestQueue[i]();
      } catch (e) {
        (console.error || console.log)(e);
      }
    }
    postDigestQueue = [];

    isDigesting = false;
  };

  /**
   * queue()
   * Adds a function to the queue (which executes
   * during a digest)
   */
  digest.queue = function queue(fn) {
    if (typeof fn !== 'function')
      return;

    digestQueue.push(fn);
  };

  /**
   * queuePostDigest()
   * Adds a function to the postDigest queue (which
   * executes after a digest)
   */
  digest.queuePostDigest = function queuePostDigest(fn) {
    if (typeof fn !== 'function')
      return;

    postDigestQueue.push(fn);
  };

  return digest;
})();
