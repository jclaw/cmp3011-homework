var gulp	= require('gulp');

// Server
var	express	= require('express');

// Utilities
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var fs = require('fs');

// Gulp plugins
var $		= require('gulp-load-plugins')(),
 	concat 	= require('gulp-concat'),
	gutil 	= require('gulp-util'),
	header 	= require('gulp-header'),
	postcss = require('gulp-postcss'),
	rename 	= require('gulp-rename'),
	sass	= require('gulp-sass'),
	connect	= require('gulp-connect'),
	reload	= require('connect-livereload');

// Misc/global vars

var sassPaths = [
	'builds/node_modules/foundation-sites/scss',
	'builds/node_modules/motion-ui/src'
];
var animatePath = 'builds/vendor/animate.css-master';
var animatePkg = JSON.parse(fs.readFileSync(animatePath + '/package.json'));
var activatedAnimations = activateAnimations();

// Task options
var opts = {
  destPath: animatePath,
  concatName: 'animate.css',

  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },

  minRename: {
    suffix: '.min'
  },

  banner: [
    '@charset "UTF-8";\n',
    '/*!',
    ' * <%= name %> -<%= homepage %>',
    ' * Version - <%= version %>',
    ' * Licensed under the MIT license - http://opensource.org/licenses/MIT',
    ' *',
    ' * Copyright (c) <%= new Date().getFullYear() %> <%= author.name %>',
    ' */\n\n'
  ].join('\n')
};


// ----------------------------
// Gulp task definitions
// ----------------------------


gulp.task('express', function(){
  var app = express();
  app.use(reload({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9999);
});

gulp.task('html', function () {
  gulp.src('builds/*.html')
    .pipe(connect.reload());
});

gulp.task('views', function () {
  gulp.src('builds/views/*')
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('builds/scripts/**/*')
    .pipe(connect.reload());
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
	gulp.watch('builds/views/*.html', ['views']);
	gulp.watch('builds/scripts/**/*', ['js']);
	gulp.watch([animatePath + '/source/**/*'], ['createCSS']);
	gulp.watch(['process/sass/**/*'], ['sass']);

});

gulp.task('serve', ['express'], function() {
  connect.server({
	port: 8000,
    livereload: true,
    root: 'builds'
  });
});

gulp.task('createCSS', function() {
  return gulp.src(activatedAnimations)
    .pipe(concat(opts.concatName))
    .pipe(postcss([
      autoprefixer(opts.autoprefixer)
    ]))
    .pipe(gulp.dest(opts.destPath))
    .pipe(postcss([
      autoprefixer(opts.autoprefixer),
      cssnano({reduceIdents: {keyframes: false}})
    ]))
    .pipe(rename(opts.minRename))
    .pipe(gulp.dest(opts.destPath))
	.pipe(connect.reload());
});

gulp.task('addHeader', function() {
  return gulp.src('*.css')
    .pipe(header(opts.banner, animatePkg))
    .pipe(gulp.dest(opts.destPath));
});

gulp.task('default', ['sass', 'createCSS', 'addHeader', 'serve', 'watch']);


// ----------------------------
// Helpers/functions
// ----------------------------

// Read the config file and return an array of the animations to be activated
function activateAnimations() {
  var categories = JSON.parse(fs.readFileSync(animatePath + '/animate-config.json')),
    category, files, file,
    target = [ animatePath + '/source/_base.css' ],
    count = 0;

  for (category in categories) {
    if (categories.hasOwnProperty(category)) {
      files = categories[category];

      for (var i = 0; i < files.length; ++i) {
        target.push( animatePath + '/source/' + category + '/' + files[i] + '.css');
        count += 1;
      }
    }
  }

  if (!count) {
    gutil.log('No animations activated.');
  } else {
    gutil.log(count + (count > 1 ? ' animations' : ' animation') + ' activated.');
  }

  return target;
}
