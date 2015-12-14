var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var mixins = require("postcss-mixins");

gulp.task('css', function () {
	var processors = [autoprefixer, cssnext, precss];

	return gulp.src('./src/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
	gulp.watch('./src/*.css', ['css']);
});

gulp.task('default', ['watch']);