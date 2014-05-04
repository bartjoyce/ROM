/**
 * digest.js implements:
 * - ROM.digest (function)
 * - ROM.digest.watch (function)
 * - ROM.digest.queueAsync (function)
 * - ROM.digest.queuePostDigest (function)
 */
ROM.digest = (function() {
  var watchers = [];
  var asyncQueue = [];
  var postDigestQueue = [];

  /**
   * digest()
   * Runs a digest cycle (updates elements, etc...)
   */
  var digest = function digest() {
    var ttl = 10;
    var dirty;

    do {
      // Run asyncQueue
      for (var i = 0; i < asyncQueue.length; i += 1) {
        try {
          asyncQueue[i]();
        } catch (e) {
          (console.error || console.log)(e);
        }
      }
      asyncQueue = [];

      // Run watchers
      for (var i = 0; i < watchers.length; i += 1) {
        try {
          var watcher = watchers[i];
          if (watcher.watchFn()) {
            watcher.listenerFn();
            dirty = true;
          }
        } catch (e) {
          (console.error || console.log)(e);
        }
      }

      if (!(ttl--))
        throw "10 digest iterations reached";

    } while (dirty);

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
   * watch()
   * Adds a watcher to the digest system and returns a
   * functions with which you can remove the watcher.
   */
  digest.watch = function watch(watchFn, listenerFn) {
    var watcher = {
      watchFn: watchFn,
      listenerFn: listenerFn || function() { }
    };
    watchers.push(watcher);

    var deleteWatcher = function deleteWatcher() {
      var index = watchers.indexOf(watcher);
      if (index !== -1)
        watchers.splice(index, 1);
    };
    return deleteWatcher;
  };

  /**
   * queueAsync()
   * Adds a function to the asynchronous queue (which
   * executes during a digest)
   */
  digest.queueAsync = function queueAsync(fn) {
    if (typeof fn !== 'function')
      return;

    asyncQueue.push(fn);
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
