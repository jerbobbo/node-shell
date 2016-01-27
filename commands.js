var fs = require('fs');
  
function pwd(file) {
   process.stdout.write(process.cwd());
   process.stdout.write('\nprompt > ');
}
   
function date(file) {
    var currDate = new Date().toString();
    process.stdout.write(currDate);
    process.stdout.write('\nprompt > ');
}     

function ls(file) {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            process.stdout.write(file.toString() + "\n");
        })
        newPrompt();
    });
}

function echo(file) {
    process.stdout.write(file);
    process.stdout.write('\nprompt > ');
}

function cat(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        process.stdout.write(data.toString());
        newPrompt();
    });
}

function head(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        var lines = data.toString().split('\n');
        for (var i = 0; i < 5; i++)
            process.stdout.write(lines[i] + '\n');
        newPrompt();
    });
}

function tail(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        var lines = data.toString().split("\n");
        for (var i = lines.length-5; i < lines.length; i++) {
             process.stdout.write(lines[i] + '\n' );
        }
        newPrompt();
    });
}

function sort(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        var lines = data.toString().split("\n");
        lines = lines.sort();
        lines.forEach(function(line) {
            process.stdout.write(line + '\n');
        });
        newPrompt()
    });
}

function wc(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var lines = data.toString().split('\n');
        process.stdout.write(lines.length.toString());
        newPrompt();
    })
}

function uniq(file) {
    
}

function newPrompt() {
    process.stdout.write('\nprompt > ');
}

module.exports = {
    pwd: pwd,
    date: date,
    ls: ls,
    echo: echo,
    cat: cat,
    head: head,
    tail: tail,
    sort: sort,
    wc: wc,
    uniq
};