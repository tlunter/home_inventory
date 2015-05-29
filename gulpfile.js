var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var bower = require('main-bower-files');
var gulpFilter = require('gulp-filter');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  less: './assets/less/**/*.less',
  fonts: './assets/fonts/**/*',
  js: ['./assets/js/**/*.jsx', './assets/js/**/*.js'],
  html: 'assets/html/*.html'
};

gulp.task('less', function() {
  gulp.src(paths.less)
    .pipe(concat('app.css'))
    .pipe(less())
    .on('error', swallowError)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
  return browserify({
    entries: './assets/js/home.jsx',
    paths: [ './node_modules', './assets/js' ],
    transform: [babelify]
  })
    .on('error', swallowError)
    .bundle()
    .on('error', swallowError)
    .pipe(source('./public/js/app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest('./public/.'));
});

gulp.task('bower', ['bower:materialize:roboto', 'bower:css']);

gulp.task('bower:materialize:roboto', function() {
  gulp.src('./bower_components/materialize/font/**/*')
    .pipe(gulp.dest('./public/font'));
});

gulp.task('bower:css', function() {
  var cssFilter = gulpFilter('*.css');

  gulp.src(bower())
    .pipe(cssFilter)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(cssFilter.restore());
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('build', ['less', 'fonts', 'js', 'html', 'bower']);

gulp.task('default', ['build', 'watch']);
