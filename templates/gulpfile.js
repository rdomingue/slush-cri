var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');


var paths = {
  src: 'assets_dev',
  dest: 'assets_dist',
  scripts: 'assets_dev/js/**/*.js',
  csss: 'assets_dev/css/**/*.scss',
  imgs: 'assets_dev/img/**/*.{png,jpg,gif}'
};


gulp.task('concatTask', function() {  
  return gulp.src('assets_dev/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets_dist/js/'))
    .on('error', gutil.log)
});

// Copy all static images
gulp.task('img', function() {
  return gulp.src('assets_dev/img/**/*.{png,jpg,gif}')
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('assets_dist/img/'));
});


gulp.task('sassTask', function () {
  gulp.src('assets_dev/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets_dist/css/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['concatTask']);
  gulp.watch(paths.imgs, ['img']);
  gulp.watch(paths.csss, ['sassTask']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'concatTask', 'img']);