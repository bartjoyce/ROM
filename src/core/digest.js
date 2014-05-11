/**
 * digest.js implements:
 * - ROM.digest (function)
 * - ROM.digest.queue (function)
 * - ROM.digest.queuePostDigest (function)
 * - ROM.digestAsync (function)
 */
(function() {
  /** @const */ var IDLE_PHASE = 0;      // Nothing happening
  /** @const */ var DIGESTING_PHASE = 1; // Currently digesting
  /** @const */ var SCHEDULED_PHASE = 2; // Digest is scheduled to happen

  var phase = IDLE_PHASE;

  var digestQueue = [];
  var postDigestQueue = [];

  /**
   * digest()
   * Runs a digest cycle (updates elements, etc...)
   */
  ROM.digest = function digest() {
    if (phase === DIGESTING_PHASE)
      return;

    phase = DIGESTING_PHASE;

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

    phase = IDLE_PHASE;
  };

  /**
   * queue()
   * Adds a function to the queue (which executes
   * during a digest)
   */
  ROM.digest.queue = function queue(fn) {
    if (typeof fn !== 'function')
      return;

    digestQueue.push(fn);
  };

  /**
   * queuePostDigest()
   * Adds a function to the postDigest queue (which
   * executes after a digest)
   */
  ROM.digest.queuePostDigest = function queuePostDigest(fn) {
    if (typeof fn !== 'function')
      return;

    postDigestQueue.push(fn);
  };

  /**
   * digestAsync()
   * Runs a digest cycle later on
   */
  ROM.digestAsync = function digestAsync() {
    // Only schedule a digest if none is scheduled
    // or in progress.
    if (phase === IDLE_PHASE) {
      window.setTimeout(function() {
        if (phase !== SCHEDULED_PHASE)
          return;

        ROM.digest();
      }, 0);

      phase = SCHEDULED_PHASE;
    }
  };
})();
