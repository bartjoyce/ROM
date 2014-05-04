#!/bin/bash
cd ${0%/*}
cd ../src

java -jar "../closurecompiler/compiler.jar" \
--js "main.js" \
--js "core/digest.js" \
--js "core/apply.js" \
--js "core/update.js" \
--js "selector/selector.js" \
--js "selector/tree.js" \
--js "selector/attributes.js" \
--js "selector/parser.js" \
--js "util/components.js" \
--js_output_file "../bin/ROM.js"
