var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var dive = require('diveSync');
var fs = require('fs');
var del = require('del').sync;



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


    return {
        count : count,
        makeSimilar: makeSimilar
    }

})();
