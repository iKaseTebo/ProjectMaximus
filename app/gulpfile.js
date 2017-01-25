var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    scripts: 'public/javascripts/*.js',
    images: 'public/images/**/*'
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});


gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});


gulp.task('server', function() {
    var restart = nodemon({
        script: './bin/www',
        watch: [ "/public/**", '/views/**', '/routes/*.js'],
        ext: 'js ejs'
    })
        restart.on('restart', function() {
        gulp.src('./bin/www')
        .pipe(notify('Running the start tasks and stuff'));
});
});

gulp.task('default', ['server', 'watch', 'scripts', 'images']);