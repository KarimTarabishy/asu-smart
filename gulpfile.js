
var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    changed = require('gulp-changed'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    util = require('./buildutil.js'),
    livereload = require('gulp-livereload'),
    globule = require("globule"),
    path = require("path")
    ;

gulp.task('js-concat',function(){  // depends on stylus task
    return gulp.src(['app/app.js','app/**/*.js'])
        .pipe(plumber())
        .pipe(util.count({
            str: "concated",
            title: 'js-concat'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/'));
});


gulp.task('stylus', function () {
    return gulp.src('app/**/*.styl')
        .pipe(plumber())
        .pipe(changed('build/css/',{ extension: '.css' }))
        .pipe(util.count({
            str: "compiled",
            title: 'stylus'
        }))
        .pipe(stylus({
            paths: ["build-imports"],
            import: ["rules.styl"]
        }))
        .pipe(gulp.dest('build/css/'));
});
gulp.task('css-concat', ['stylus'],function(){  // depends on stylus task
    return gulp.src('build/css/**/*.css')
        .pipe(plumber())
        .pipe(util.count({
            str: "concated",
            title: 'css-concat'
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build/'));
});




gulp.task('smart-clean', function(){
    util.makeSimilar('app','build/css');

});
gulp.task("start",['smart-clean','js-concat'], function(){
    livereload.listen();
    setTimeout(function(){gulp.start('css-concat')},0);
    util.watch(['app/','build/app.css','build/app.js'], function (event, path) {
        console.log(path);
        if(globule.isMatch('app/**/*.styl', path))
        {
            if (event.type === 'unlink') {                   // if a file is deleted, delete it from build
                var t = event.path.replace(".styl",".css").replace(/^.+\\app\\/,"build/css/");
                del(t, function(){gulp.start('css-concat')});
            }
            else
            {
                gulp.start('css-concat');
            }
        }
        else if(globule.isMatch('app/**/*.js', path))
        {
            gulp.start('js-concat');
        }
        else if(globule.isMatch('app/**/*.html', path) || globule.isMatch('build/**',path))
        {
            livereload.changed(path);
        }


    });
});











