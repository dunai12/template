var 	
	gulp           = require('gulp'),
	jade		   = require('gulp-jade'),
	sass           = require('gulp-sass'),
	sourcemaps     = require('gulp-sourcemaps'),
	autoprefixer   = require('gulp-autoprefixer'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	minifyCss      = require('gulp-minify-css'),
	prettify	   = require('gulp-prettify'),
	clean          = require('gulp-clean'),
	wiredep		   = require('wiredep').stream,
	useref         = require('gulp-useref'),
	imagemin       = require('gulp-imagemin'),
	filter         = require('gulp-filter'),
	gulpif         = require('gulp-if'),
	size           = require('gulp-size'),
	browserSync    = require('browser-sync'),
    pug 		   = require('gulp-pug'),
	reload         = require('browser-sync').reload;


/* --------------------------------------
работа в app
--------------------------------------- */

// // Компиляция pug в html
// gulp.task('jade', function(){
// 	gulp.src('app/templates/pages/*.jade')
// 		.pipe(jade())
// 		.on('error', log)
// 		.pipe(prettify({indent_size: 2}))
// 		.pipe(gulp.dest('app/'))
// 		.pipe(reload({stream: true}));
// });

// 	// Подключение ссылок на bower компоненты (с pug)
// 	gulp.task('wiredep', function(){
// 		 gulp.src('app/templates/common/*.jade')
// 		   .pipe(wiredep({
// 		   		ignorePath: /^(\.\.\/)*\.\./
// 		   }))
// 		   .pipe(gulp.dest('app/templates/common/'));
// 	});
gulp.task('pug', function buildHTML() {
    return gulp.src('app/templates/pages/*.pug')
        .pipe(pug({
            // Your options in here.
        }))
		.pipe(prettify({indent_size: 2}))
		.pipe(gulp.dest('app/'))
		.pipe(reload({stream: true}));
});

// Подключение ссылок на bower компоненты (без jade)
gulp.task('wiredep', function(){
	 gulp.src('app/templates/common/*.pug')
	   .pipe(wiredep({
           ignorePath: /^(\.\.\/)*\.\./
	   }))
	   .pipe(gulp.dest('app/templates/common/'));
});

//локальный сервер
gulp.task('server', ['pug'], function(){
	browserSync({
		notify: false,
		port: 8080,
		server: {
			baseDir: 'app'
		}
	});
});

// Sass to css
gulp.task('styles', function () {
		gulp.src('app/css/')
		.pipe(clean());
	return gulp.src('app/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 15 versions']}))
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream: true}));
});

/* --------------------------------------
сборка
--------------------------------------- */

// Отчистка папки
gulp.task('clean', function(){
	return gulp.src('dist')
		.pipe(clean());
});

// Перенос HTML, CSS, JS в папку dist
gulp.task('useref', function(){
	//var assets = useref.assets();
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
		.pipe(gulp.dest('dist'));
});

// Перенос шрифтов
gulp.task('fonts', function(){
	gulp.src('app/fonts/')
		// .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
		.pipe(gulp.dest('dist/fonts/'));
});

// Картинки
gulp.task('images', function(){
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			prigressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

// Остальные файлы
gulp.task('extras', function(){
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	])
	.pipe(gulp.dest('dist/'));
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'fonts', 'images', 'extras'], function(){
	return gulp.src('dist/**/*')
		.pipe(size({title: 'build'}));
});

// Собираем папку dist
gulp.task('build', ['clean'], function(){
	gulp.start('dist');
});



/* --------------------------------------
watch
--------------------------------------- */
gulp.task('watch', function(){
	gulp.watch('app/templates/**/*.pug', ['pug']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js'
	]).on('change', reload);
});

//запуск по дефолту
gulp.task('default', ['server', 'watch']);
