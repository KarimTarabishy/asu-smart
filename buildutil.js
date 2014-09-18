var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var dive = require('diveSync');
var fs = require('fs');
var del = require('del').sync;
var chok = require('chokidar');



module.exports = (function(){
    'use strict';

    var count = function(msgFunc) {
        var count = 0;
        var stream = through.obj(function(file, enc, cb) {
            count++;
            this.push(file);
            cb();
        });
        stream.on('end',function(){
            var msg = msgFunc;
            gutil.log(gutil.colors.green(msg.title),": ", gutil.colors.magenta(count+" file"+(count == 1 ? " ":"s ")),
                msg.str);
        });
        return stream;
    };

    var makeSimilar = function (srcDir, similarDir){
        var filesToDelete = [];
        srcDir = path.resolve(process.cwd(),srcDir);
        similarDir = path.resolve(process.cwd(),similarDir);
        var info = {deletedFiles : 0, deletedDir : 0};
        dive(similarDir,function(err, file){
            if(err){
                console.log(err.toString())
            }
            else
            {
                var baseFile = path.basename(file,'.css');
                var srcFileDir = path.dirname(file).replace(similarDir,srcDir)
                var srcFilePath = path.resolve(srcFileDir , baseFile + ".styl");
                if(!fs.existsSync(srcFilePath)){
                    filesToDelete.push(file);
                }

            }
        })
        info.deletedFiles = filesToDelete.length;
        del(filesToDelete);
        deleteEmptyDir(similarDir, info);
        gutil.log(gutil.colors.red("Deleted " ),gutil.colors.magenta(info.deletedFiles ), " files");
        gutil.log(gutil.colors.red("Deleted " ),gutil.colors.magenta(info.deletedDir ), " directories");


        return null;
    };


    var deleteEmptyDir = function(dir, info) {
        dir = path.resolve(process.cwd(),dir);
        try {
            // read the directory
            var list = fs.readdirSync(dir);

            var count = list.length
            // for every file in the list
            list.forEach(function (file) {
                    var p = path.resolve(dir , file);

                    // get the file's stats
                    var stat = fs.statSync(p);

                    // if the file is a directory
                    if (stat && stat.isDirectory()) {
                        var dirSize = deleteEmptyDir(p, info);
                        if(dirSize == 0)
                        {
                            fs.rmdirSync(p);
                            info.deletedDir++;
                            count--;
                        }
                    }
            });
            return count;
        } catch(err) {
            console.log(err);
        }
        return 1;
    };


    var watch = function(path, cb){
        var firstCall = true;
        var timer = null;
        var files={};
        chok.watch(path, {ignored: /[\/\\]\./, persistent: true}).on('all', function(event, path) {
            // Make sure not to fire events on starting watch
            // as plugin fire events when it starts watching existing files
            if(firstCall )
            {
                if(timer === null)
                {
                    setTimeout(function(){firstCall = false;},600);
                }
                return;
            }
            // Some hack to prevent duplicate event on save
            // so basically leave a 700ms between each event on the same file
            var ltime = files[path];
            if( ltime)
            {
                var diff =  new Date().getTime() - ltime[1] ;
                if(diff < 700 && event == ltime[0])
                    return;
            }
            // if the event is an unlink event and this path is saved delete it
            if(event.search('unlink') != -1 && ltime)
            {
                delete files[path]
            }
            else // otherwise update/save
            {
                files[path] = [event,new Date().getTime()];
            }
            //fire the event
            cb(event, path);
        });
    }
    return {
        count : count,
        makeSimilar: makeSimilar,
        watch: watch
    }

})();
