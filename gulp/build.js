var gulp = require('gulp');

gulp.task('build', ['bower-files','styles', 'scripts', 'templates', 'fonts','files', 'watch']);