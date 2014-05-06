/**
 * attributes.js implements:
 * - ROM.selector.attributes (object)
 * - ROM.selector.attributes.getMatchFunction (function)
 * - ROM.selector.attributes.attr (object)
 */
window['ROM']['selector']['attributes'] = (function() {
  var attributes = {};

  /**
   * getMatchFunction()
   * Given the type of attribute selector and the search value
   * returns a function with which you can match attribute values
   * against the selector.
   */
  attributes.getMatchFunction = function getMatchFunction(matchType, matchValue) {
    var matchFn = attributes.attr[matchType] || function() { return false; };
    var matchValue = matchValue.toLowerCase();

    var matchAttribute = function matchAttribute(attributeValue) {
      return matchFn(matchValue, attributeValue.toLowerCase());
    };

    return matchAttribute;
  };

  /**
   * attr
   * Stores all the different match functions for the
   * various attribute selectors.
   */
  attributes.attr = {
    '=': function valueEqual(matchValue, attributeValue) {
      return (matchValue === attributeValue);
    },
    '~=': function valueContainsWord(matchValue, attributeValue) {
      var matchValueWords = splitWords(matchValue);
      var attributeValueWords = splitWords(attributeValue);

      for (var i = 0; i < matchValueWords.length; i += 1)
        if (attributeValueWords.indexOf(matchValueWords[i]) === -1)
          return false;

      return true;
    },
    '|=': function valueStartsWithWord(matchValue, attributeValue) {
      var matchValueWords = splitWords(matchValue);
      var attributeValueWords = splitWords(attributeValue);

      for (var i = 0; i < matchValueWords.length; i += 1)
        if (attributeValueWords[i] !== matchValueWords[i])
          return false;

      return true;
    },
    '^=': function valueStartsWith(matchValue, attributeValue) {
      return (attributeValue.indexOf(matchValue) === 0);
    },
    '$=': function valueEndsWith(matchValue, attributeValue) {
      return (attributeValue.indexOf(matchValue, attributeValue.length - matchValue.length) !== -1);
    },
    '*=': function valueContains(matchValue, attributeValue) {
      return (attributeValue.indexOf(matchValue) !== -1);
    },
    'exists': function attributeExists() {
      return true;
    }
  };

  /**
   * splitWords()
   * Returns an array of the words of the value.
   * A word is separated from other words by a space or hyphen.
   */
  var splitWords = function splitWords(value) {
    var words1 = value.split(' ');
    var words2 = [];
    var words3 = [];

    for (var i = 0; i < words1.length; i += 1)
      words2 = words2.concat(words1[i].split('-'));

    for (var i = 0; i < words2.length; i += 1)
      if (words2[i] !== '')
        words3.push(words2[i]);

    return words3;
  };

  return attributes;
})();
