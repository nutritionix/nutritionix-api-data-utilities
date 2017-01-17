'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const fs = require('fs-extra');
const runSequence = require('run-sequence');

const PATHS = {
  src: 'src/*',
  dst: './dist',
  entry: 'src/index.js'
};


gulp.task('clean', () => fs.emptyDirSync(PATHS.dst));


gulp.task('main', () => {
  return gulp.src(PATHS.entry)
    .pipe(plugins.browserify({
      standalone: 'nutritionix-api-data-utilities'
    }))
    .pipe(plugins.babel({presets: ['es2015']}))
    .pipe(gulp.dest(PATHS.dst));
});

gulp.task('minify', () => {
  return gulp.src(PATHS.dst + '/index.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest(PATHS.dst + '/min'));
});


gulp.task('default', ['clean', 'main']);
gulp.task('release', cb => {
  return runSequence('default', 'minify', cb);
});
