#!/bin/bash
cd ${0%/*}
cd ../src
java -jar ../closurecompiler/compiler.jar --js=main.js --js=selector/selector.js --js=selector/tree.js --js=selector/attributes.js --js=selector/parser.js --js_output_file=../bin/ROM.js
