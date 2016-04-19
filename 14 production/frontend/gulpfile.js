var gulp	= require('gulp'),
    sass	= require('gulp-sass'),
    connect	= require('gulp-connect'),
	express	= require('express'),
	reload	= require('connect-livereload'),
	$		= require('gulp-load-plugins')();

var sassPaths = [
	'builds/node_modules/foundation-sites/scss',
	'builds/node_modules/motion-ui/src'
];

gulp.task('express', function(){
  var app = express();
  app.use(reload({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9000);
});

gulp.task('html', function () {
  gulp.src('builds/*.html')
    .pipe(connect.reload());
});

//
// gulp.task('views', function () {
//   gulp.src('builds/dumbo/views/*')
//     .pipe(connect.reload());
// });

gulp.task('js', function() {
  gulp.src('builds/scripts/**/*')
    .pipe(connect.reload());
    // .pipe(jshint('./.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
	return gulp.src('process/sass/app.scss')
		.pipe($.sass({
			includePaths: sassPaths
		})
			.on('error', sass.logError))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9']
		}))
		.pipe(gulp.dest('builds/styles'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('builds/*.html', ['html']);
  gulp.watch('builds/scripts/**/*', ['js']);
  gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('serve', ['express'], function() {
  connect.server({
	port: 8000,
    livereload: true,
    root: 'builds'
  });
});


gulp.task('default', ['sass', 'watch', 'serve']);
