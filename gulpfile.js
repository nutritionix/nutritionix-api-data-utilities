const argv = require('yargs').version(false).argv;
const gulp = require('gulp');
const fs = require('fs-extra');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');

const PATHS = {
  dst: './dist',
  entry: './src/index.js'
};
const LIB_NAME = 'nutritionix-api-data-utilities';


gulp.task('clean', (done) => {
  fs.emptyDirSync(PATHS.dst);
  done();
});


gulp.task('main', () => {
  return browserify({
    entries: PATHS.entry,
    standalone: LIB_NAME
  })
    .transform('babelify', {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(PATHS.dst));
});

gulp.task('minify', () => {
  return gulp.src(PATHS.dst + '/index.js')
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.dst + '/min'));
});


gulp.task('default', gulp.series(['clean', 'main']));
gulp.task('release', gulp.series(['default', 'minify']));

gulp.task('setVersion', function (done) {
  let version = argv.version;
  if (!version) {
    console.error('--version=x.x.x param is required');
  } else {
    ['bower.json', 'package.json'].forEach(file => {
      file = __dirname + '/' + file;
      fs.writeFileSync(
        file,
        fs.readFileSync(file)
          .toString()
          .replace(/"version":\s*"[\d.]+?"/, `"version": "${version}"`)
      );
    });

    fs.writeFileSync(
      PATHS.entry,
      fs.readFileSync(PATHS.entry)
        .toString()
        .replace(/@version\s+[^\s\n]+/, `@version ${version}`)
    );
  }
  done();
});
