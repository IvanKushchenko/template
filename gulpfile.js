var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var cssComb = require('gulp-csscomb');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
    gulp.run('concat', 'watch');
});
gulp.task('autoprefixer', function() {
    gulp.src('style.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
        }))
        .pipe(gulp.dest('./'))
});

// Concat all Plugins
gulp.task('plugins', function() {
    return gulp.src(['js/vendor/*.js'])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('js'))
});

// Concat all JS
gulp.task('js', function() {
    return gulp.src(['js/plugins.js', 'js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
});

// Minify Main JS
gulp.task('uglify', function() {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js'))
});

gulp.task('sass', function() {
    return gulp.src('sass/style.sass')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        // .pipe(cssComb())
        // .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
});

gulp.task('sprite', function() {
    var spriteData = gulp.src(['img/icons/*.png', 'img/icons/*.jpg']).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite-style.css',
        padding: 10
    }));
    return spriteData.pipe(gulp.dest('build/img/'));
});

gulp.task('watch', function() {
    gulp.watch('js/vendor/*.js', ['plugins']);
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['sass']);
});