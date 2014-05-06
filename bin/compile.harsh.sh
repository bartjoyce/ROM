#!/bin/bash
cd ${0%/*}
cd ../src

java -jar "../closurecompiler/compiler.jar" \
--js "main.js" \
--js "core/digest.js" \
--js "core/apply.js" \
--js "core/update.js" \
--js "component/component.js" \
--js "selector/selector.js" \
--js "selector/attributes.js" \
--js "selector/parser.js" \
--js "util/util.js" \
--js "util/components.js" \
--js "util/arrays.js" \
--js_output_file "../bin/ROM.js" \
--use_types_for_optimization \
--compilation_level ADVANCED_OPTIMIZATIONS

