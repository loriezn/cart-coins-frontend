var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
gulp.task('bower-files', function () {
    gulp.src(mainBowerFiles('**/**/*.js',{
            debugging: true
        }))
        .pipe(gulp.dest('assets/js/vendor'));

    gulp.src(mainBowerFiles('**/**/*.css',{
            debugging: true
        }))
        .pipe(gulp.dest('assets/css/vendor'));
});