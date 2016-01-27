var commands = require("./commands");
var cmdList = [];
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline
  cmdList = cmd.split(/\s*\|\s*/g);
  var words = cmdList.shift().split(" ");  
  commands[words[0]]('', words[1], done);
  
});

function done(output) {
    if (cmdList.length > 0) {
        var nextCommand = cmdList.shift();
        var searchText = '';
        if (nextCommand.indexOf('grep') !== -1) {
          searchText = nextCommand.split(' ')[1];
          nextCommand = 'grep';
        }
        commands[nextCommand](output, searchText, done);
    } else {
         process.stdout.write(output);
         process.stdout.write('\nprompt > ');
    }
}