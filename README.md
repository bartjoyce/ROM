Reactive Object Model
=====================
ROM is a JavaScript DOM library which enables you to easily add functionality (JS) to any DOM element.
*Note: Library still in development, not yet fully functional*.
To understand the way ROM operates, read the [example usage](https://github.com/bartjoyce/ROM/blob/master/USAGE.md).

#### Difference between ROM and jQuery
Like jQuery, ROM uses CSS selectors for identifying elements in the DOM, the difference is in the *reactiveness* of ROM. When you write something like ``$('ul').click(function(){})`` in jQuery you are attaching a click event to all UL elements that exist at that moment in time, doing something similar in ROM will attach a click event to all ULs regardless of whether they existed at the time.

Setup & Compilation
-------------------
ROM consists of many javascript files in the ``src`` directory. All these files are merged in to ``ROM.js`` by the Node.js script ``bin/merge.js``. After the files have been merged, the [Google Closure Compiler](https://developers.google.com/closure/compiler/) is used to generate a minified, optimised file. You can merge and compile the ``ROM.js`` and ``ROM.min.js`` files by executing the ``bin/compile.sh`` script like so:
```bash
sh bin/compile.sh
```

Dependencies
------------
- Node.js
- Google Closure Compiler
- JVM version 1.7 or later (for the Google Closure Compiler)

To-do
-----
- [ ] Create component structure
