var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('scripts', function () {

    gulp.src(['src/**/**/*.js', '!src/js/*'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets/js'));

    gulp.src('src/js/*')
        .pipe(gulp.dest('assets/js'));
});