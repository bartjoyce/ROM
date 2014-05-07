#!/bin/bash
cd ${0%/*}
cd ../src

java -jar "../closurecompiler/compiler.jar" \
--js "main.js" \
--js "core/digest.js" \
--js "core/apply.js" \
--js "core/update.js" \
--js "component/component.js" \
--js "util/util.js" \
--js "util/components.js" \
--js "util/arrays.js" \
--js "selector/sizzle.js" \
--js_output_file "../bin/ROM.js"
