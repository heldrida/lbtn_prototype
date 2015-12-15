var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var mixins = require("postcss-mixins");
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('css', function () {
	var processors = [autoprefixer, cssnext, precss];

	return gulp.src('./src/main.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'))
		.pipe(browserSync.stream());
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('watch', function () {
	gulp.watch('./src/*.js', ['browserify']);
	gulp.watch('./src/*.css', ['css']);
	gulp.watch("./dest/*css", ['reload']);
	gulp.watch("index.html", ['reload']);
	gulp.watch("./dest/*js", ['reload']);
});

gulp.task('serve', ['watch'], function () {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

});

gulp.task('default', ['serve']);

gulp.task('browserify', function () {
	return browserify('./src/app.js')
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dest/'));
});