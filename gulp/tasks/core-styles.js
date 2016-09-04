/**
 * Stylesheet bundler.
 * @module gulp/tasks/bundle-styles
 */

/**
 * Builds stylesheets.
 * @return {Stream} Gulp stream.
 */
module.exports = function coreStylesTask() {
  const gulp = require('gulp');
  const gulpIf = require('gulp-if');
  const gulpCached = require('gulp-cached');
  const plumber = require('gulp-plumber');
  const cssPipe = require('../pipes/css-pipe');
  const notify = require('../helpers/notify');
  const {src, dest, env} = require('../config');

  return gulp
    .src(src.coreStylesMain)
    .pipe(plumber(notify.andEndStream))
    .pipe(cssPipe())
    .pipe(gulpIf(env.needsLivereload, gulpCached()))
    .pipe(gulp.dest(dest.root));
};
