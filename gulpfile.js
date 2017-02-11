var gulp         = require('gulp'),
		sass           = require('gulp-sass'),
		gulpIf         = require('gulp-if'),
		autoprefixer   = require('gulp-autoprefixer'),
		cleanCSS       = require('gulp-clean-css'),
		htmlHint       = require('gulp-htmlhint'),
		browserSync    = require('browser-sync'),
		reload         = require('browser-sync').reload,
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		jshint   	   = require('gulp-jshint');

gulp.task('browserSync', ['styles'], function() {
		browserSync({
		    server: {
		      baseDir: "./"
		    },
		    port: 8080,
		    open: true,
		    notify: false
		  });
});

gulp.task('styles', function () {
	return gulp.src('scss/*.scss')
   .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: true}))
	.pipe(gulp.dest('css'))
	.pipe(reload({stream:true}));
});



// gulp.task('scripts', function() {
// 	return gulp.src('js/libs/*.js')
// 		.pipe(concat('libs.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./js'));
// });
gulp.task('mainJs', function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest('./js'))
});


gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['styles']);
	//gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('js/*.js', ['mainJs']);
	gulp.watch('*.html').on('change', reload);
});

gulp.task('default', ['browserSync', 'watch']);



