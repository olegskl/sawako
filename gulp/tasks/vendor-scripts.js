/**
 * Vendor scripts task.
 * @module gulp/tasks/vendor-scripts
 */

/**
 * Bundles vendor scripts and exposes them to external require calls.
 * @return {Stream} Generated vendor bundle stream.
 */
module.exports = function vendorScriptsTask() {
  const browserify = require('browserify');
  const watchify = require('watchify');
  const gulp = require('gulp');
  const gulpIf = require('gulp-if');
  const gulpRev = require('gulp-rev');
  const gulpUglify = require('gulp-uglify');
  const buffer = require('vinyl-buffer');
  const source = require('vinyl-source-stream');
  const notify = require('../helpers/notify');
  const {env, dest, deps} = require('../config');

  return browserify(Object.assign({}, watchify.args))
    .require(deps)
    .bundle()
    .on('error', notify.andEndStream)
    .pipe(source('vendors.js'))
    .pipe(buffer())
    .pipe(gulpIf(env.needsMinification, gulpUglify()))
    .pipe(gulpIf(env.needsRevisioning, gulpRev()))
    .pipe(gulp.dest(dest.root));
};
