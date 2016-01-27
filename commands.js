var fs = require('fs');
var request = require('request');


function pwd(file) {
   done(process.cwd());
}
   
function date(file) {
    var currDate = new Date().toString();
    done(currDate);
}     

function ls(file) {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        var list = '';
        files.forEach(function(file) {
            list += file.toString() + "\n";
        })
        done(list);
    });
}

function echo(file) {
    done(file);
}

function cat(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        done(data.toString());
       
    });
}

function head(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        var lines = data.toString().split('\n');
        var headOfFile = '';
        for (var i = 0; i < 5; i++)
            headOfFile += lines[i] + '\n';
        done(headOfFile);
    });
}

function tail(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var output = "";
        var lines = data.toString().split("\n");
        for (var i = lines.length-5; i < lines.length; i++) {
            output += lines[i] + '\n';
        }
        
        done(output);
    });
}

function sort(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var output = "";
        var lines = data.toString().split("\n");
        lines = lines.sort();
        lines.forEach(function(line) {
            output += line + '\n';
        });
        
        done(output);
    });
}

function wc(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var lines = data.toString().split('\n');
        done(lines.length.toString());
    })
}

function uniq(file) {
    fs.readFile(file, function(error, data) {
        if (error) throw error;
        
        var output = "";
        var lines = data.toString().split('\n');
        process.stdout.write(lines[0] + '\n');
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] !==  lines[i-1]) {
                output += lines[i] + '\n';
            }
        }
        
        done(output);
    });
}

function curl(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            done(body.toString());
        }
    });
    
}

function done(output) {
    process.stdout.write(output);
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
    uniq: uniq,
    curl: curl
};