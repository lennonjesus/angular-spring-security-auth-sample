var
  gulp            = require('gulp'),
  del             = require('del'),
  browserSync     = require('browser-sync').create(),
  proxy           = require('proxy-middleware'),
  wiredep         = require('wiredep').stream,
  usemin          = require('gulp-usemin'),
  minifyCss       = require('gulp-minify-css'),
  minifyHtml      = require('gulp-minify-html'),
  uglify          = require('gulp-uglify'),
  jshint          = require('gulp-jshint'),
  jshintStylish   = require('jshint-stylish'),
  autoprefixer    = require('gulp-autoprefixer'),
  url             = require('url'),
  inject          = require('gulp-inject');
;

var basePaths = {
  src: 'app/',
  dest: 'dist/',
  tmp: 'tmp/'
}



gulp.task('change-src', function () {
  browserSync.reload();
});

gulp.task('default', [], function () {
  gulp.start('jshint');
});


gulp.task('serve', [], function () {

  var proxyOptions = url.parse('http://localhost:8080/sample/api');
  proxyOptions.route = '/sample/api';

  browserSync.init({
    port: 9000,
    server: {
      baseDir: basePaths.src,
      middleware: [proxy(proxyOptions)]
    }
  });

  gulp.watch(basePaths.src + '**/*', ['change-src']);


});
