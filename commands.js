var fs = require('fs');
var request = require('request');


function pwd(stdin, file, done) {
   done(process.cwd());
}
   
function date(stdin, file, done) {
    var currDate = new Date().toString();
    done(currDate);
}     

function ls(stdin, file, done) {
    var dir = ".";
    if (stdin)
        dir = stdin;
    else if (file) 
        dir = file;
    

    fs.readdir(dir, function(err, files) {
        if (err) throw err;
        var list = '';
        files.forEach(function(filename) {
            list += filename.toString() + "\n";
        })
        done(list);
    });
}

function echo(stdin, file, done) {
    done(file);
}

function cat(stdin, file, done) {
    if (stdin !== '') {
        file = stdin;
        done(file);
    } else {
        fs.readFile(file, function(error, data) {
            if (error) throw error;
            done(data.toString());
        });
    }
}

function head(stdin, file, done) {
    if (stdin)
        file = stdin;
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        var lines = data.toString().split('\n');
        var headOfFile = '';
        for (var i = 0; i < 5; i++)
            headOfFile += lines[i] + '\n';
        done(headOfFile);
    });
}

function tail(stdin, file, done) {
    var output = "";
    var lines = [];
    
    if (stdin !== '') {
        file = stdin;
        lines = file.split("\n");
        for (var i = lines.length-5; i < lines.length; i++) {
            output += lines[i] + '\n';
        }
        
        done(output);
    } else {
        fs.readFile(file, function(error, data) {
            if (error) throw error;
            
            output = "";
            lines = data.toString().split("\n");
            for (var i = lines.length-5; i < lines.length; i++) {
                output += lines[i] + '\n';
            }
            
            done(output);
        });
    }
}

function sort(stdin, file, done) {
    var lines = [];
    var output = '';
    if (stdin !== '') {
    
        lines = stdin.toString().split("\n");
        lines = lines.sort();
        lines.forEach(function(line) {
            output += line + '\n';
        });
        done(output);
        
    }
    else {
        fs.readFile(file, function(error, data) {
            if (error) throw error;
            lines = data.toString().split("\n");
            lines = lines.sort();
            lines.forEach(function(line) {
                output += line + '\n';
            });
            
            done(output);
        });
    } 
    
}

function wc(stdin, file, done) {
    var lines = [];
    if (stdin !== '') {
        file = stdin;
        lines = file.split('\n');
        done(lines.length.toString());
        
    } else {
        fs.readFile(file, function(error, data) {
            if (error) throw error;
            lines = data.toString().split('\n');
            done(lines.length.toString());
        });
    }

}

function uniq(stdin, file, done) {
    var output = '';
    var lines = [];
    
    if (stdin !== '') {
        file = stdin;
        lines = file.split('\n');
        output += lines[0];
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] !==  lines[i-1]) {
                output += '\n' + lines[i];
            }
        }
        
        done(output);
    } else {
        fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var output = "";
        var lines = data.toString().split('\n');
        output += lines[0];
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] !==  lines[i-1]) {
                output += '\n' + lines[i];
            }
        }
        
        done(output);
    });
    }
}

function curl(stdin, url, done) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            done(body.toString());
        }
    });
    
}

function grep(stdin, file, done) {
    var output = "";
    var inputArray = stdin.split('\n');
    inputArray.forEach(function(line) {
        if (line.indexOf(file) !== -1)
            output += line + '\n';
    });
    done(output);
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
    uniq: uniq,
    curl: curl,
    grep: grep
};