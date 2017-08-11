var gulp = require('gulp');  //引入gulp
var $ = require("gulp-load-plugins")();  //引进所有的包，并不能引进所有，比如open
var open= require("open");  //引入open


//lib   复制插件store.js,jquery.js
gulp.task("lib",function () {
    gulp.src("bower_components/**/dist/*.js")
        .pipe(gulp.dest("bulid/lib/"))
        .pipe(gulp.dest("dev/lib/"))
});

//复制html
gulp.task("html",function(){
    gulp.src("src/*.html")   //读取文件
        .pipe(gulp.dest("bulid/"))  //复制到开发环境
        //压缩后复制到生产环境
        .pipe($.minifyHtml())   //压缩
        .pipe(gulp.dest("dev/"))  //复制到生产环境
        .pipe($.connect.reload());
});

//合并压缩js
gulp.task("js",function(){
    gulp.src("src/js/*.js")   //读取文件
        //合并JS
        .pipe($.concat("index.js"))
        //复制到开发环境
        .pipe(gulp.dest("bulid/js"))
        //压缩js复制到 生产环境
        .pipe($.uglify())
        //复制到生产环境
        .pipe(gulp.dest("dev/js"))
        .pipe($.connect.reload());

});

//压缩css
gulp.task("css",function(){
    gulp.src("src/css/*.css")   //读取文件
    //复制到开发环境
        .pipe(gulp.dest("bulid/css"))
        //压缩css复制到 生产环境
        .pipe($.cssmin())
        //复制到生产环境
        .pipe(gulp.dest("dev/css"))
        .pipe($.connect.reload());

});

//压缩img
gulp.task("img",function(){
    gulp.src("src/images/*")   //读取文件
    //复制到开发环境
        .pipe(gulp.dest("bulid/images"))
        //压缩img复制到 生产环境
        .pipe($.imagemin())
        //复制到生产环境
        .pipe(gulp.dest("dev/images"))
        .pipe($.connect.reload());

});

//删除文件夹
gulp.task("clear",function () {
    gulp.src(["dev/","bulid/"])
        .pipe($.clean());
});


//总的任务
gulp.task("bulid",["html","js","img","css","lib"]);


//自动刷新，自动打开
gulp.task("server",function(){
    $.connect.server({
        root:"bulid/",
        port: 8000,
        livereload: true
    });

    open("http://localhost:8000");

    gulp.watch("src/*.html",["html"]);
    gulp.watch("src/css/*.css",["css"]);
    gulp.watch("src/js/*.js",["js"]);
    gulp.watch("src/images/*",["img"]);
});

//默认任务
gulp.task('default', ['server']);