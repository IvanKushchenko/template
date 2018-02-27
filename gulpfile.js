var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var cssComb = require('gulp-csscomb');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var htmlImport = require('gulp-html-import');


gulp.task('html', function(){
    gulp.src('./templates/index.html')
        .pipe(htmlImport('./templates/'))
        .pipe(gulp.dest('./'))
});


// Build
gulp.task('build', function(){
    // html, css
    gulp.src(['./index.html', './style.css'])
        .pipe(gulp.dest('docs'))
    // Fonts
    gulp.src(['./fonts/**.*'])
        .pipe(gulp.dest('docs/fonts'))
    // Images
    gulp.src(['./img/**/*.*'])
        .pipe(gulp.dest('img'))
    // Scripts
    gulp.src(['./js/main.js', './js/plugins.js'])
        .pipe(gulp.dest('docs/js'))

});

// Build js
gulp.task('buildjs', ['js'], function(){
    gulp.run('uglify');
    gulp.src(['./js/scripts.min.js'])
        .pipe(gulp.dest('docs/js'))
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

gulp.task('autoprefixer', function() {
    gulp.src('style.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
        }))
        .pipe(gulp.dest('./'))
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

// Sass
gulp.task('sass', function() {
    return gulp.src('sass/style.sass')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        // .pipe(cssComb())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('docs'))
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