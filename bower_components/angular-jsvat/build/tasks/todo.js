"use strict";

const gulp = require('gulp');
const config = require('../config');
const todo = require('gulp-todo');

gulp.task('todo', function () {
  const src = config.js.src.concat(['build/**/*.js']);

  return gulp.src(src)
      .pipe(todo())
      .pipe(gulp.dest('./'));
});