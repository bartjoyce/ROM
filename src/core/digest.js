/**
 * digest.js implements:
 * - ROM.digest (function)
 * - ROM.digest.watch (function)
 * - ROM.digest.async (function)
 * - ROM.digest.queuePostDigest (function)
 */
ROM.digest = (function() {
  var queue = [];
  var postDigestQueue = [];

  /**
   * digest()
   * Runs a digest cycle (updates elements, etc...)
   */
  var digest = function digest() {
    var ttl = 10;

    // Run queue
    for (var i = 0; i < queue.length; i += 1) {
      try {
        queue[i]();
      } catch (e) {
        (console.error || console.log)(e);
      }

      if (!(ttl--))
        throw "10 digest iterations reached";
    }
    queue = [];

    // Run postDigestQueue
    for (var i = 0; i < postDigestQueue.length; i += 1) {
      try {
        postDigestQueue[i]();
      } catch (e) {
        (console.error || console.log)(e);
      }
    }
    postDigestQueue = [];

  };

  /**
   * queue()
   * Adds a function to the queue (which executes
   * during a digest)
   */
  digest.queue = function queue(fn) {
    if (typeof fn !== 'function')
      return;

    queue.push(fn);
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
