/**
 * parser.js implements:
 * - ROM.selector.parseString()
 */

window.ROM.selector.parseString = (function() {
  var parseString = function parseString(selectorString) {
    var index = 0;
    var char;
    var directAncestor = false;

    var selectors = [];

    while (index < selectorString.length) {
      char = selectorString[index];

      if (isWhitespace(char))
        index += 1;
      else if (char === '>') {
        directAncestor = true;
        index += 1;
        continue;
      } else
        selectors.push(parseSelector(selectorString, index, directAncestor));

      directAncestor = false;
    }

    return selectors;
  };

  /**
   * parseSelector()
   * Parses a given selector string.
   */
  var parseSelector = function parseSelector(selectorString, index, directAncestor) {
    var start = index;
    var char;

    var tagName, id, classes = [], attributes = {};

    var instance = [index]; // Make index mutable

    while (instance[0] < selectorString.length) {
      char = selectorString[instance[0]];

      if (isWhitespace(char) || char === '>')
        break;

      switch (char) {
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

    return new ROM.selector.Selector(selectorString.substring(index, instance[0]),
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

    instance[0] += 1;
    attribute.name = parseText(selectorString, instance);

    var char = selectorString[instance[0]];

    if (char === ']') {

    }

    return attribute;
  };

  /**
   * parseText()
   * Parses a name, e.g.:
   * "foo#bar" -> "foo"
   */
  var parseText = function parseText(selectorString, instance) {
    var start = instance[0];
    var char;

    while (instance[0] < selectorString.length) {
      char = selectorString[instance[0]];

      if (!isName(char))
        break;

      instance[0] += 1;
    }

    return selectorString.substring(start, instance[0]);
  };

  /**
   * isWhitespace()
   * Returns whether or not the character is a whitespace
   * character.
   */
  var isWhitespace = function isWhitespace(char) {
    return (' \t\r\n'.indexOf(char) !== -1);
  }

  /**
   * isName()
   * Returns whether or not the character is a name character,
   * e.g. not # . [] * | ^ = :
   */
  var isName = function isName(char) {
    return ('#.[]~|^$*="'.indexOf(char) === -1 && !isWhitespace(char));
  }

  return parseString;
})();
