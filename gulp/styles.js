var gulp = require('gulp');

gulp.task('styles',function(){
    gulp.src('src/css/**/*')
        .pipe(gulp.dest('assets/css'))
});