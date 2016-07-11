var gulp = require ("gulp");


gulp.task('watch', function(){
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/css/**/*.css', ['styles']);
    gulp.watch('./src/**/*.html', ['templates']);
    gulp.watch('./src/images/**.*', ['files']);
});