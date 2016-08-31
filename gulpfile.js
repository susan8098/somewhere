'use strict'

const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const concat 		= require('gulp-concat');
const sourcemaps 	= require('gulp-sourcemaps');
const minifycss		= require('gulp-cssnano');
const browserSync	= require('browser-sync').creat();
const babel			= require('gulp-babel');
const rename		= require('gulp-rename');
const uglify     	= require('gulp-uglify');
const reload 		= browserSync.reload;


gulp.task('styles', () => {
	return gulp.src('./sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
            includePaths: ['styles', 'node_modules'].concat(
            )
        }))
        .on('error', handleError)
        .pipe(autoprefixer({ browsers: ['ie 9', 'last 3 versions', '> 1%']}))
        .pipe(minifycss({
            autoprefixer: false,
            zindex: false,
            calc: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
        .pipe(reload({stream: true}));
});


gulp.task('scripts', () => {
 	gulp.src('./js/main.js')
 	.pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js/'));
    .pipe(reload({stream: true}));
});


gulp.task('watch', () => {
  gulp.watch('./sass/*.scss', ['styles']);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('**/*.html', reload);
});


gulp.task('browser-sync', () => {
  browserSync.init({
    open: false,
    notify: false,
    ui: false,
    files: ['**/*.css','**/*.php', '**/app.min.js'],
    proxy: "http://somewhere.dev/",
  })
});


gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);

