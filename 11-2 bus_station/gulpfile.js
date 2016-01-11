var gulp = require("gulp");
var less = require("gulp-less");
var minifycss = require("gulp-minify-css");

return gulp.task("default",function(){
	gulp.src("*.less")
	.pipe(less())
	.pipe(minifycss())
	.pipe(gulp.dest('./'));
});