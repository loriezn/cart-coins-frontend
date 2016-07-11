var gulp = require("gulp");
var sh = require('shelljs');


gulp.task('templates', function () {
    sh.rm('-rf', 'assets/templates'); // Delete folder and all files within.

    gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('assets/templates'));

});