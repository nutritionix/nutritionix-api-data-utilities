'use strict';

const gulp = require('gulp');
const fs = require('fs-extra');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');

const PATHS = {
  dst: './dist',
  entry: './src/index.js'
};
const LIB_NAME = 'nutritionix-api-data-utilities';


gulp.task('clean', () => fs.emptyDirSync(PATHS.dst));


gulp.task('main', () => {
  return browserify({
    entries: PATHS.entry,
    standalone: LIB_NAME
  })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(PATHS.dst));
});

gulp.task('minify', () => {
  return gulp.src(PATHS.dst + '/index.js')
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.dst + '/min'));
});


gulp.task('default', ['clean', 'main']);
gulp.task('release', cb => {
  return runSequence('default', 'minify', cb);
});
