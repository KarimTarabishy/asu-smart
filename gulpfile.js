
var
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    changed = require('gulp-changed'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    util = require('./buildutil.js'),
    livereload = require('gulp-livereload');
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

//gulp.task('css-watch', ['css-concat'], function () { // run css concat first which in trun runs stylus first
//    livereload.listen();
//    gulp.watch(['build/app.css']).on('change', livereload.changed);
//    gulp.watch(['build/app.js']).on('change', livereload.changed);
//    gulp.watch(['app/**/*.html']).on('change', livereload.changed);
//    gulp.watch(['app/**/*.styl'], function (event) {
//        if (event.type === 'deleted') {                   // if a file is deleted, delete it from build
//            var t = event.path.replace(".styl",".css").replace(/^.+\\app\\/,"build/css/");
//            del(t, function(){gulp.start('css-concat')});
//        }
//        else
//        {
//            gulp.start('css-concat');
//        }
//    });
//    gulp.watch(['app/**/*.js'], function(event){
//        gulp.start('js-concat');
//    });
//
//});

gulp.task('smart-clean', function(){
    util.makeSimilar('app','build/css');

});
gulp.task("start",['smart-clean','js-concat'], function(){
   setTimeout(function(){gulp.start('css-concat')},0);
});











