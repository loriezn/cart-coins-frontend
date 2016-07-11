var gulp = require('gulp');
gulp.task('files', function(){

    gulp.src([
        'src/images/**.*',
    ]).pipe(gulp.dest('assets/images'))

});