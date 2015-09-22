var gulp = require('gulp');

var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minifyCSS = require('gulp-cssmin');

//Javascript linting task
gulp.task('jshint', function() {
	return gulp.src(['js/*.js', 'js/components/graphics/*.js', 'js/entities/*.js', 'js/systems/*.js' ]) //TODO RYAN: how do i include js files in subdirectories also?
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
// Watch task
gulp.task('watch', function() {
  gulp.watch('site/js/*.js', ['jshint']);//TODO RYAN: how do i include js files in subdirectories also?
	gulp.watch('js/components/graphics/*.js', ['jshint']);
	gulp.watch('js/entities/*.js', ['jshint']);
	gulp.watch('js/systems/*.js', ['jshint']);
});
// Default task
gulp.task('default', ['jshint', 'watch']);

// Minify index
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
// Styles build task, concatenates all the files
gulp.task('styles', function() {
  gulp.src('css/*.css')
		.pipe(minifyCSS())
		.pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});
// Image optimization task
gulp.task('images', function() {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});
//minify css

// Build task
gulp.task('build', ['jshint', 'html', 'scripts', 'styles', 'images']);
