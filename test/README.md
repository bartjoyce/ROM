Tests
-----
To test different functionality of ROM you have to open the ``index.html`` file in a browser and use the developer tools of the browser to run tests. These are the tests that are available:

- **Selectors**:
  To test whether the CSS selector scripts work you can run ``match(query)`` as defined in ``selectors.js``. This function takes a string query, parses it, and returns an array of matching elements.
  Aside from ``match()`` you can also use ``parse(query)`` to see the unique selector string that gets generated. Any selector that is semantically equivalent should output the same unique string.
