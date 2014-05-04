/**
 * selector.js implements:
 * - ROM.selector (object)
 * - ROM.selector.Selector (constructor)
 */

window.ROM.selector = (function() {
  var selector = {};

  selector.Selector = function Selector(selectorString, tagName, id, classes, attributes, directAncestor) {
    // Argument default values
    selectorString = selectorString || '';
    tagName = tagName || null;
    id = id || null;
    classes = classes || [];
    attributes = attributes || {};
    directAncestor = !!directAncestor;

    // Other default values
    var classString = classes.join(' ');
    var attributeKeys = Object.keys(attributes);

    /**
     * matchTagName()
     * Returns an array of elements matching the tagName
     */
    var matchTagName = function matchTagName(parentElement) {
      var elements = parentElement.getElementsByTagName(tagName);

      var parentFilter = function parentFilter(element) {
        return isParent(parentElement, element);
      };

      return (directAncestor) ? filterArray(elements, parentFilter) : elements;
    };

    /**
     * matchId()
     * Returns an array of elements matching an id
     */
    var matchId = function matchId(parentElement) {
      var element = document.getElementById(id);
      if (element === null || !isAncestor(parentElement, element))
        return [];

      return (!directAncestor || isParent(parentElement, element)) ? [element] : [];
    };

    /**
     * matchClasses()
     * Returns an array of elements matching all classes
     */
    var matchClasses = function matchClasses(parentElement) {
      var elements = parentElement.getElementsByClassName(classString);

      var parentFilter = function parentFilter(element) {
        return isParent(parentElement, element);
      };

      return (directAncestor) ? filterArray(elements, parentFilter) : elements;
    };

    /**
     * matchAttributes()
     * Returns an array of elements matching all attributes
     */
    var matchAttributes = function matchAttributes(parentElement) {
      var elements = [].concat(parentElement.children);

      if (!directAncestor) {
        var concatenateChildren = function concatenateChildren(element) {
          elements = elements.concat(element);

          for (var i = 0; i < element.children.length; i += 1)
            concatenateChildren(element.children[i]);
        };
      }

      return filterAttributes(parentElement, elements);
    };

    /**
     * filterTagName()
     * Returns a subset of the elements array for which the elements
     * match a given tagName.
     */
    var filterTagName = function filterTagName(parentElement, elements) {
      var upperCaseTagName = tagName.toUpperCase();

      var tagNameFilter = function tagNameFilter(element) {
        return (element.tagName === upperCaseTagName);
      };

      return filterArray(elements, tagNameFilter);
    };

    /**
     * filterId()
     * Returns a subset of the elements array for which the elements
     * match a given id.
     */
    var filterId = function filterId(parentElement, elements) {
      /* Elements are never filtered by Id */
    };

    /**
     * filterClasses()
     * Returns a subset of the elements array for which the elements
     * match all classes.
     */
    var filterClasses = function filterClasses(parentElement, elements) {
      var classFilter = function classFilter(element) {
        for (var i = 0; i < classes.length; i += 1) {
          var className = classes[i];
          if (!element.classList.contains(className))
            return false;
        }

        return true;
      };

      return filterArray(elements, classFilter);
    };

    /**
     * filterAttributes()
     * Returns a subset of the elements array for which the elements
     * match all attributes.
     */
    var filterAttributes = function filterClasses(parentElement, elements) {
      var attributeFilter = function attributeFilter(element) {
        for (var i = 0; i < attributeKeys.length; i += 1) {
          var attributeKey = attributeKeys[i];
          var match = attributes[attributeKey];

          if (!element.hasAttribute(attributeKey) || !match(element.getAttribute(attributeKey)))
            return false;
        }

        return true;
      };

      return filterArray(elements, attributeFilter);
    };

    /**
     * isAncestor()
     * Returns whether an element is an ancestor of another element.
     */
    var isAncestor = function isAncestor(ancestorElement, childElement) {
      while (childElement.parentElement !== null) {
        if (isParent(ancestorElement, childElement))
          return true;

        childElement = childElement.parentElement;
      }

      return false;
    };

    /**
     * isParent()
     * Returns whether an element is the parent of another element.
     */
    var isParent = function isParent(parentElement, childElement) {
      return (childElement.parentElement === parentElement);
    };

    /**
     * filterArray()
     * Given an array and a function, it returns a new array of all
     * elements for which the filterFn returned true.
     */
    var filterArray = function filterArray(array, filterFn) {
      var newArray = [];

      for (var i = 0; i < array.length; i += 1)
        if (filterFn(array[i], i))
          newArray.push(array[i]);

      return newArray;
    };

    /**
     * mapArray()
     * Given an array and a function, it maps the function to each
     * individual element, returning the resulting array.
     * NOTE: Original array mutated.
     */
    var mapArray = function mapArray(array, mapFn) {
      for (var i = 0; i < array.length; i += 1)
        array[i] = mapFn(array[i], i);

      return array;
    };

    /**
     * multiMapArray()
     * Given an array and a function (which returns an array), it creates
     * a new array with all of the function arrays concatenated.
     */
    var multiMapArray = function multiMapArray(array, mapFn) {
      var newArray = [];

      for (var i = 0; i < array.length; i += 1)
        newArray = newArray.concat(mapFn(array[i], i));

      return newArray;
    };

    /**
     * match()
     * Returns an array of elements which match the selector (and are
     * children of the parentElement).
     */
    this.match = function match(parentElement) {
      var primaryCondition;
      var matchFns = [matchId, matchTagName, matchClasses, matchAttributes];

      // Match elements
      if (id !== null)
        primaryCondition = 0; // Match by id
      else if (tagName !== null)
        primaryCondition = 1; // Match by tagName
      else if (classes.length !== 0)
        primaryCondition = 2; // Match by classes
      else
        primaryCondition = 3; // Match by attributes **** VERY SLOW ****

      var elements = matchFns[primaryCondition](parentElement);

      // Filter elements
      if (primaryCondition < 1 && tagName !== null)
        elements = filterTagName(parentElement, elements);    // Filter by tagName
      if (primaryCondition < 2 && classes.length !== 0)
        elements = filterClasses(parentElement, elements);    // Filter by classes
      if (primaryCondition < 3 && attributeKeys.length !== 0)
        elements = filterAttributes(parentElement, elements); // Filter by attributes

      return elements;
    };

    this.selectorString = selectorString;

    return this;
  }

  return selector;
})();
