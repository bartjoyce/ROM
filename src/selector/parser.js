/**
 * parser.js implements:
 * - ROM.selector.parseString()
 */

window.ROM.selector.parseString = (function() {
  var parseString = function parseString(selectorString) {
    var instance = [0]; // Make index mutable
    var chr;
    var directAncestor = false;

    var selectors = [];

    while (instance[0] < selectorString.length) {
      chr = selectorString[instance[0]];

      if (isWhitespace(chr))
        instance[0] += 1;
      else if (chr === '>') {
        directAncestor = true;
        instance[0] += 1;
        continue;
      } else
        selectors.push(parseSelector(selectorString, instance, directAncestor));

      directAncestor = false;
    }

    return selectors;
  };

  /**
   * parseSelector()
   * Parses a given selector string.
   */
  var parseSelector = function parseSelector(selectorString, instance, directAncestor) {
    var start = instance[0];
    var chr;

    var tagName, id, classes = [], attributes = {};

    while (instance[0] < selectorString.length) {
      chr = selectorString[instance[0]];

      if (isWhitespace(chr) || chr === '>')
        break;

      switch (chr) {
        case '.':
          // Class
          classes.push(parseClass(selectorString, instance))
          break;
        case '#':
          // Id
          id = parseId(selectorString, instance);
          break;
        case '[':
          // Attribute
          var attribute = parseAttribute(selectorString, instance);
          attributes[attribute.name] = attribute.matchFn;
          break;
        default:
          // TagName
          tagName = parseTagName(selectorString, instance);
          break;
      }
    }

    return new ROM.selector.Selector(selectorString.substring(start, instance[0]),
                                     tagName, id, classes, attributes, directAncestor);
  };

  /**
   * parseClass()
   * Parses a ".class" lex
   */
  var parseClass = function parseClass(selectorString, instance) {
    instance[0] += 1;
    return parseText(selectorString, instance);
  };

  /**
   * parseId()
   * Parses a "#id" lex
   */
  var parseId = function parseId(selectorString, instance) {
    instance[0] += 1;
    return parseText(selectorString, instance);
  };

  /**
   * parseTagName()
   * Parses a "tag-elem" lex
   */
  var parseTagName = function parseTagName(selectorString, instance) {
    return parseText(selectorString, instance);
  };

  /**
   * parseAttribute()
   * Parses a [type|="input"] lex
   */
  var parseAttribute = function parseAttribute(selectorString, instance) {
    var attribute = {};

    // Read attribute name
    instance[0] += 1;
    attribute.name = parseText(selectorString, instance);

    // Determine match type, e.g. = ~= |= ...
    var chr = selectorString[instance[0]];

    var matchType;

    if (chr === ']') {
      attribute.matchFn = ROM.selector.attributes.getMatchFunction('exists');
      return attribute;

    } else if (chr === '=') {
      matchType = '=';

    } else {

      instance[0] += 1;
      var comparator = chr + selectorString[instance[0]];
      var comparators = Object.keys(ROM.selector.attributes.attr);

      if (comparators.indexOf(comparator) !== -1)
        matchType = comparator;
      else
        matchType = 'exists';
    }

    instance[0] += 1;

    // Read value
    var chr = selectorString[instance[0]];

    if (chr === '"') {
      instance[0] += 1;

      var start = instance[0];
      while (instance[0] < selectorString.length) {
        chr = selectorString[instance[0]];

        if (chr === '"')
          break;
        else
          instance[0] += 1;
      }

      attribute.matchValue = selectorString.substring(start, instance[0]);
      instance[0] += 1;

    } else {
      attribute.matchValue = parseText(selectorString, instance);
    }

    // Closing bracket
    instance[0] += 1;

    attribute.matchFn = ROM.selector.attributes.getMatchFunction(matchType, attribute.matchValue);
    return attribute;
  };

  /**
   * parseText()
   * Parses a name, e.g.:
   * "foo#bar" -> "foo"
   */
  var parseText = function parseText(selectorString, instance) {
    var start = instance[0];
    var chr;

    while (instance[0] < selectorString.length) {
      chr = selectorString[instance[0]];

      if (!isName(chr))
        break;

      instance[0] += 1;
    }

    return selectorString.substring(start, instance[0]);
  };

  /**
   * isWhitespace()
   * Returns whether or not the chracter is a whitespace
   * chracter.
   */
  var isWhitespace = function isWhitespace(chr) {
    return (' \t\r\n'.indexOf(chr) !== -1);
  }

  /**
   * isName()
   * Returns whether or not the chracter is a name chracter,
   * e.g. not # . [] * | ^ = :
   */
  var isName = function isName(chr) {
    return ('#.[]~|^$*=">'.indexOf(chr) === -1 && !isWhitespace(chr));
  }

  return parseString;
})();
