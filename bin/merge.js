/**
 * Node.js script which merges all scripts in to one
 * script.
 */
var path = require('path');
var fs = require('fs');

var paths = {
  src:    path.join(__dirname, '..', 'src'),
  files:  path.join(__dirname, 'ROM.template.js'),
  output: path.join(__dirname, 'ROM.js')
};

var embedPrefix = '//> ';

var logging = (process.argv.length > 2) ? (process.argv[2] !== '--silent') : true;

if (!logging)
  console.log = function() {};

// ScriptLines are textlines in the output
function ScriptLines(lines) {
  this.getContent = function() {
    return lines;
  }

  return this;
}

// ScriptEmbed is a script file embedded in the output
function ScriptEmbed(filePath) {
  console.log('Embed: ' + filePath);

  this.getContent = function() {
    return fs.readFileSync(filePath, 'utf8').split('\n');
  }

  return this;
}

function getContent() {
  // Read files
  var files = fs.readFileSync(paths.files, 'utf8');
  var filesLines = files.split('\n');

  // Array for all content
  var content = [];

  // Functions
  function isEmbed(line) {
    return (line.length > embedPrefix.length &&
            line.substr(0, embedPrefix.length) === embedPrefix);
  }

  var i = 0;
  while (i < filesLines.length) {
    var line = filesLines[i];

    // Embedded script
    if (isEmbed(line)) {
      content.push(new ScriptEmbed(path.join(paths.src, line.substr(embedPrefix.length))));
      i += 1;

      continue;
    }

    // Text lines
    var from = i;

    while (i < filesLines.length) {
      if (isEmbed(filesLines[i]))
        break;

      i += 1;
    }

    var textLines = filesLines.slice(from, i);

    content.push(new ScriptLines(textLines));
  }

  return content;
}

function writeOutput(content) {
  // Create stream
  var stream = fs.createWriteStream(paths.output);

  console.log('Writing to: ' + paths.output);

  function onStreamOpen() {

    // Iterate over all content
    for (var i = 0; i < content.length; i += 1) {
      var lines = content[i].getContent();

      // Write all lines of content to output
      for (var j = 0; j < lines.length; j += 1) {
        stream.write(lines[j]);
        stream.write('\n');
      }
    }

    stream.end();
  }

  stream.once('open', onStreamOpen);
}

writeOutput(getContent());
