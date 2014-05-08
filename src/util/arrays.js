/**
 * array.js implements:
 * - ROM.util.arrayFilter (function)
 * - ROM.util.arrayMap (function)
 * - ROM.util.arrayReduce (function)
 */
(function(window) {
  /**
   * arrayFilter()
   * Filters an array based on the criteria set by the filterFn;
   * returns the filtered array.
   */
  window.ROM.util.arrayFilter = function arrayFilter(array, filterFn) {
    var newArray = [];

    for (var i = 0; i < array.length; i += 1)
      if (filterFn(array[i], i))
        newArray.push(array[i]);

    return newArray;
  };

  /**
   * arrayMap()
   * Maps the output of mapFn to all elements of a given array,
   * mutates and returns the origin array.
   */
  window.ROM.util.arrayMap = function arrayMap(array, mapFn) {
    for (var i = 0; i < array.length; i += 1)
      array[i] = mapFn(array[i], i);

    return array;
  };

  /**
   * arrayReduce()
   * Runs a reduceFn on all elements of the array
   * passing in two elements every time.
   * Optional third argument: startingValue. If it is
   * an empty array it will return the startingValue.
   */
  window.ROM.util.arrayReduce = function arrayReduce(array, reduceFn, startingValue) {
    var value = array[0] || startingValue;

    if (array.length === 1)
      return value;

    for (var i = 1; i < array.length; i += 1)
      value = reduceFn(value, array[i]);

    return value;
  };
})(window);
