const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const scss = require('gulp-sass');
scss.compiler = require('node-sass');
const moduleImporter = require('sass-module-importer'); // for import node_module
const notify = require('gulp-notify'); // for notification
const plumber = require('gulp-plumber'); // for errors
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();


/* Success fn for notify */
function onSuccess(msg){
	return{
		message: msg+' Complete',
		onLast: true
	}
}

/* Error fn for notify */
function onError(error){
	notify.onError({
		title: "Error: " + error.plugin,
		message: "<%= error.message %>"
	})(error)
	this.emit('end');
}


/* Pug */
gulp.task('pug', function(){
	return (
		gulp
			.src('assets/pug/**/*.pug')
			.pipe(pug())
			.pipe(gulp.dest('public/'))
			.pipe(browserSync.stream())
			.pipe(notify(onSuccess('Pug')))
	)
})

gulp.task('watchPug', function(){
	gulp.watch('assets/pug/**/*.pug', gulp.series('pug'))
})


/* Scss */
gulp.task('scss', function(){
	return (
		gulp
			.src('assets/scss/index.scss')
			.pipe(plumber({errorHandler: onError}))
			.pipe(scss({
				importer: moduleImporter()
			})).on('error', scss.logError, onError)
			.pipe(autoprefixer({
				browsers: ['last 4 versions'],
				remove: false
			}))
			.pipe(rename('style.css'))
			.pipe(gulp.dest('public/css'))
			.pipe(browserSync.stream())
			.pipe(notify(onSuccess('Scss')))
	)
})

gulp.task('watchScss', function(){
	gulp.watch('assets/scss/**/*.scss', gulp.series('scss'))
})



gulp.task('watch', gulp.series(gulp.parallel('watchScss', 'watchPug'), function(){
	browserSync.init({
		server: "./public"
	})
}))