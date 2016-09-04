/**
 * Scripts bundler.
 * @module gulp/tasks/core-scripts
 */

/**
 * Creates a new bundle from the given configuration.
 * @param {String} source - Source file.
 * @return {Object} Browserify bundle.
 */
function createBundle(source) {
  const browserify = require('browserify');
  const babelify = require('babelify');
  const watchify = require('watchify');
  const {deps} = require('../config');

  const bundler = browserify(Object.assign({}, watchify.args, {
    entries: [source],
    extensions: ['.js'],
    debug: true
  }));

  return bundler
    .transform(babelify)
    .external(deps);
}

/**
 * Builds the given bundle.
 * @param  {Object} bundle       Browserify bundle.
 * @param  {String} bundleSource Output bundle filename.
 * @param  {String} bundleDest   Output bundle directory.
 * @return {Stream}              Bundle stream.
 */
function buildBundle(bundle, bundleSource, bundleDest) {
  const gulp = require('gulp');
  const gulpIf = require('gulp-if');
  const gulpUglify = require('gulp-uglify');
  const gulpRev = require('gulp-rev');
  const gulpSourcemaps = require('gulp-sourcemaps');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const notify = require('../helpers/notify');
  const {env} = require('../config');

  return bundle
    .bundle()
    .on('error', notify.andEndStream)
    .pipe(source(bundleSource))
    .pipe(buffer())
    .pipe(gulpIf(env.needsSourcemaps, gulpSourcemaps.init({loadMaps: true})))
    .pipe(gulpIf(env.needsMinification, gulpUglify()))
    .pipe(gulpIf(env.needsRevisioning, gulpRev()))
    .pipe(gulpIf(env.needsSourcemaps, gulpSourcemaps.write()))
    .pipe(gulp.dest(bundleDest));
}

/**
 * Builds and reloads script bundles.
 * @return {Stream} Gulp stream.
 */
module.exports = function coreScriptsTask() {
  const path = require('path');
  const gulpUtil = require('gulp-util');
  const watchify = require('watchify');
  const {env, src, dest} = require('../config');

  let bundle = createBundle(src.coreScriptsMain);

  if (env.needsLivereload) {
    bundle = watchify(bundle);

    bundle.on('log', gulpUtil.log);
    bundle.on('update', function () {
      buildBundle(bundle, path.basename(src.coreScriptsMain), dest.root);
    });
  }

  return buildBundle(bundle, path.basename(src.coreScriptsMain), dest.root);
};
