The following files should be compiled (in order):
```
main.js
selector/selector.js
selector/tree.js
selector/parser.js
```

This results in the following command-line command:
```
java -jar ../closurecompiler/compiler.jar js=main.js js=selector/selector.js js=selector/tree.js js=selector/parser.js js_output_file=../bin/ROM.js
```
