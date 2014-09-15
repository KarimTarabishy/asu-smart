
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
        .pipe(stylus())
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
    gulp.watch(['build/app.css','build/app.js']).on("change",livereload.changed);
    gulp.watch(['app/**'], function (event) {
        var ff = path.relative(process.cwd(), event.path);

        console.log(event.type+": "+event.path);
        if(globule.isMatch('app/**/*.styl', ff))
        {
            if (event.type === 'deleted') {                   // if a file is deleted, delete it from build
                var t = event.path.replace(".styl",".css").replace(/^.+\\app\\/,"build/css/");
                del(t, function(){gulp.start('css-concat')});
            }
            else
            {
                gulp.start('css-concat');
            }
        }

        if(globule.isMatch('app/**/*.js', ff))
        {
            gulp.start('js-concat');
        }
        if(globule.isMatch('app/**/*.html', ff))
        {
            livereload.changed(event.path);
        }

    });
});











