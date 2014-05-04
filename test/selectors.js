/**
 * As a means of testing whether the selectors work
 * the match() function has been writted.
 * It takes a string, parses it, and matches it globally
 * to find elements.
 */
var match = function match(query) {
    return matchSelectors(ROM.selector.parseString(query), document);
}

var matchSelector = function matchSelector(selector, elements) {
    var matched = [];

    for (var i = 0; i < elements.length; i += 1)
        matched = matched.concat(selector.match(elements[i]));

    return matched;
}

var matchSelectors = function matchSelectors(selectors, element) {
	var matched = [element];

	for (var i = 0; i < selectors.length; i += 1)
		matched = matchSelector(selectors[i], matched);

	return matched;
}
