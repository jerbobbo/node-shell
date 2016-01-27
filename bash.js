var commands = require("./commands");
var cmdList = [];
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline
  cmdList = cmd.split(/\s*\|\s*/g);
  var words = cmdList[0].split(" ");
  
  cmdList.shift();
  commands[words[0]]('',words[1],done);
  
});

function done(output) {
    if (cmdList.length > 0) {
        var nextCommand = cmdList.shift();
        commands[nextCommand](output,'', done);
    } else {
         process.stdout.write(output);
         process.stdout.write('\nprompt > ');
    }
}