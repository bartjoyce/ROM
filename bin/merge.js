/**
 * Node.js script which merges all scripts in to one
 * script.
 */
var path = require('path');
var fs = require('fs');

var paths = {
  src:    path.join(__dirname, '..', 'src'),
  files:  path.join(__dirname, 'FILES'),
  output: path.join(__dirname, 'ROM.js')
};

var logging = (process.argv.length > 2) ? (process.argv[2] !== '--silent') : true;

if (!logging)
  console.log = function() {};

// ScriptFile is a file referred to in files.txt
function ScriptFile(filePath) {
  console.log('File: ' + filePath);

  this.getContent = function() {
    return fs.readFileSync(filePath, 'utf8').split('\n');
  }
}

// ScriptLine is a line embedded in files.txt
function ScriptEmbed(lines) {
  console.log('Embed: ' + lines[0]);

  this.getContent = function() {
    return lines;
  }
}

function getContent() {
  console.log('Reading files.txt...');

  // Read files
  var files = fs.readFileSync(paths.files, 'utf8');
  var filesLines = files.split('\n');

  // Array for all content
  var content = [];

  // Functions
  function isComment(line) {
    return (line[0] === '#');
  }
  function isEmbed(line) {
    return (line[0] === '>' && line[1] === ' ');
  }

  var i = 0;
  while (i < filesLines.length) {
    var line = filesLines[i];

    // Nothing
    if (line === '') {
      i += 1;
      continue;
    }

    // Comment
    if (isComment(line)) {
      i += 1;
      continue;
    }

    // Embedded script
    if (isEmbed(line)) {
      var embedLines = [];

      while (i < filesLines.length) {
        if (!isEmbed(filesLines[i]))
          break;
        else
          embedLines.push(filesLines[i].substr(2));

        i += 1;
      }

      content.push(new ScriptEmbed(embedLines));
      continue;
    }

    // Script file
    content.push(new ScriptFile(path.join(paths.src, line)));
    i += 1;
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

      // Spacing between content
      stream.write('\n');
    }

    stream.end();
  }

  stream.once('open', onStreamOpen);
}

writeOutput(getContent());
