var gulp = require('gulp');

gulp.task('fonts',function(){
   gulp.src('src/fonts/*')
       .pipe(gulp.dest('assets/fonts'))
});