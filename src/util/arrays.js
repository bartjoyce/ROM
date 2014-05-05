/**
 * array.js implements:
 * - ROM.util.arrayFilter (function)
 * - ROM.util.arrayMap (function)
 * - ROM.util.arrayReduce (function)
 */
window.ROM.util.arrayFilter = (function() {
  /**
   * arrayFilter()
   * Filters an array based on the criteria set by the filterFn;
   * returns the filtered array.
   * @nosideeffects
   */
  var arrayFilter = function arrayFilter(array, filterFn) {
    var newArray = [];

    for (var i = 0; i < array.length; i += 1)
      if (filterFn(array[i], i))
        newArray.push(array[i]);

    return newArray;
  };

  return arrayFilter;
})();

window.ROM.util.arrayMap = (function() {
  /**
   * arrayMap()
   * Maps the output of mapFn to all elements of a given array,
   * mutates and returns the origin array.
   */
  var arrayMap = function arrayMap(array, mapFn) {
    for (var i = 0; i < array.length; i += 1)
      array[i] = mapFn(array[i], i);

    return array;
  };

  return arrayMap;
})();

window.ROM.util.arrayReduce = (function() {
  /**
   * arrayReduce()
   * Runs a reduceFn on all elements of the array
   * passing in two elements every time.
   * Optional third argument: startingValue. If it is
   * an empty array it will return the startingValue.
   */
  var arrayReduce = function arrayReduce(array, reduceFn, startingValue) {
    var value = startingValue || null;

    if (array.length === 1)
      return array[0];

    for (var i = 0; i < array.length - 1; i += 1)
      value = reduceFn(array[i], array[i + 1]);

    return value;
  };

  return arrayReduce;
})();
