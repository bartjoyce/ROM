#!/bin/bash
cd ${0%/*}

# Merge source files
node merge.js --silent

# Compile ROM.js
java -jar "../closurecompiler/compiler.jar" \
--js "ROM.js" \
--compilation_level ADVANCED_OPTIMIZATIONS \
--js_output_file "ROM.min.js"
