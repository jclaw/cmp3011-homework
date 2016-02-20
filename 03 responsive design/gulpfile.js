var gulp = require('gulp'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect');

gulp.task('express', function(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9000);
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('assets/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('assets/css'))
      .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('assets/js/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('*.html', ['html']);
  gulp.watch(['assets/scss/*'], ['sass']);
  gulp.watch(['assets/js/*'], ['js']);
});

gulp.task('serve', ['express'], function() {
  connect.server({
    livereload: false,
    root: '.'
  });
});
gulp.task('default', ['sass', 'watch', 'serve']);
