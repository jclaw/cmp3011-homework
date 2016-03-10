var gulp = require('gulp'),
	connect = require('gulp-connect'),
	express = require('express');


gulp.task('express', function(){
	var app = express();
	app.use(require('connect-livereload')({port: 35729}));
	app.use(express.static(__dirname));
	app.listen(process.env.PORT || 9000);
});

gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('*.html', ['html']);
});

gulp.task('serve', ['express'], function() {
	connect.server({
		livereload: true,
		root: ''
	});
});

gulp.task('default', ['watch', 'serve']);
