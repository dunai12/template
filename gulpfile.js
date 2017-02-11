var 	gulp           = require('gulp'),
		sass           = require('gulp-sass'),
		gulpIf         = require('gulp-if'),
		autoprefixer   = require('gulp-autoprefixer'),
		cleanCSS       = require('gulp-clean-css'),
		browserSync    = require('browser-sync'),
		reload         = require('browser-sync').reload,
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		wiredep		   = require('wiredep').stream;


gulp.task('wiredep', function(){
	 gulp.src('app/index.html')
	   .pipe(wiredep())
	   .pipe(gulp.dest('app/'));
});


// gulp.task('browserSync', ['styles'], function() {
// 		browserSync({
// 		    server: {
// 		      baseDir: "./"
// 		    },
// 		    port: 8080,
// 		    open: true,
// 		    notify: false
// 		  });
// });

// gulp.task('styles', function () {
// 	return gulp.src('scss/*.scss')
//    .pipe(sass().on('error', sass.logError))
// 	.pipe(autoprefixer({browsers: ['last 15 versions']}))
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(reload({stream:true}));
// });



// // gulp.task('scripts', function() {
// // 	return gulp.src('js/libs/*.js')
// // 		.pipe(concat('libs.js'))
// // 		.pipe(uglify())
// // 		.pipe(gulp.dest('./js'));
// // });
// // gulp.task('mainJs', function(){
// // 	return gulp.src('js/*.js')
// // 	.pipe(gulp.dest('app/js/'))
// // });


// gulp.task('watch', function () {
// 	gulp.watch('scss/*.scss', ['styles']);
// 	//gulp.watch('app/libs/**/*.js', ['scripts']);
// 	gulp.watch('js/*.js');
// 	gulp.watch('*.html').on('change', reload);
// });

// gulp.task('default', ['browserSync', 'watch']);



