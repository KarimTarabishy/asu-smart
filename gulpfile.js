
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
    path = require("path"),
    templateCache = require("gulp-angular-templatecache"),
    replaceStream = require("gulp-replace");
;

gulp.task('template-cache', function(){
    return gulp.src(['app/components/**/*.html'])
        .pipe(plumber())
        .pipe(util.count({
            str: "cached",
            title: 'template-cache'
        }))
        .pipe(templateCache('templates.js',{
            root: "components/",
            module: "app"
        }))
        .pipe(gulp.dest('build/'));
});
function jsConcat(){
    return gulp.src(['app/app.js','app/components/**/*.js','build/templates.js'])
        .pipe(plumber())
        .pipe(util.count({
            str: "concated",
            title: 'js-concat'
        }))
        .pipe(concat('app.js',{newLine: '\r\n'}))
        .pipe(gulp.dest('app/include/'));
}

gulp.task('js-concat',function(){
    return jsConcat();
});


gulp.task('stylus', function () {
    return gulp.src(['app/**/*.styl','!app/rules.styl'],{base:"app/"})
        .pipe(plumber())
        .pipe(changed('build/css/',{ extension: '.css' }))
        .pipe(util.count({
            str: "compiled",
            title: 'stylus'
        }))
        .pipe(stylus({
            paths: ["app"],
            import: ["rules.styl"]
        }))
        .pipe(replaceStream("\n","\r\n"))
        .pipe(gulp.dest('build/css/'));
});
gulp.task('css-concat', ['stylus'],function(){  // depends on stylus task
    return gulp.src('build/css/**/*.css')
        .pipe(plumber())
        .pipe(util.count({
            str: "concated",
            title: 'css-concat'
        }))
        .pipe(concat('app.css',{newLine: '\r\n'}))
        .pipe(gulp.dest('app/include/'));
});




gulp.task('smart-clean', function(){
    util.makeSimilar('app','build/css');

});
gulp.task('dummy',['smart-clean','template-cache'], function(){
    return jsConcat();
})
gulp.task("start",['dummy'], function(){
    livereload.listen();
    setTimeout(function(){gulp.start('css-concat')},0);
    util.watch(['app/','build/templates.js'], function (event, path) {
        if(globule.isMatch('app/include/**',path)){
            livereload.changed(path);
        }
        else if(globule.isMatch('app/**/*.styl', path))
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
        else if(globule.isMatch(['app/**/*.js','build/templates.js'], path))
        {
            gulp.start('js-concat');
        }
        else if(globule.isMatch('app/index.html', path)){
            livereload.changed(path);
        }
        else if(globule.isMatch('app/**/*.html', path))
        {
            gulp.start('template-cache');
        }


    });
});











