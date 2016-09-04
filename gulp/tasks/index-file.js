/**
 * Index file builder.
 * @module gulp/tasks/index-file
 */

/**
 * Returns a processed stream of critical styles.
 * @return {Stream} Processed critical styles stream.
 */
function streamCriticalStyles() {
  const gulp = require('gulp');
  const plumber = require('gulp-plumber');
  const cssPipe = require('../pipes/css-pipe');
  const notify = require('../helpers/notify');
  const {src} = require('../config');

  return gulp
    .src(src.criticalStylesMain)
    .pipe(plumber(notify.andEndStream))
    .pipe(cssPipe());
}

/**
 * Returns a processed stream of critical scripts.
 * @return {Stream} Processed critical scripts stream.
 */
function streamCriticalScripts() {
  const gulpIf = require('gulp-if');
  const gulpUglify = require('gulp-uglify');
  const browserify = require('browserify');
  const watchify = require('watchify');
  const babelify = require('babelify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const notify = require('../helpers/notify');
  const {env, src} = require('../config');

  return browserify(Object.assign({}, watchify.args))
    .add(src.criticalScriptsMain)
    .transform(babelify)
    .bundle()
    .on('error', notify.andEndStream)
    .pipe(source('critical.js'))
    .pipe(buffer())
    .pipe(gulpIf(env.needsMinification, gulpUglify()));
}

/**
 * Returns a stream of core styles.
 * @return {Stream} Core styles stream.
 */
function streamCoreStyles() {
  const gulp = require('gulp');
  const {dest} = require('../config');
  return gulp.src(dest.coreStyles, {read: false});
}

/**
 * Returns a stream of core scripts.
 * @return {Stream} Core scripts stream.
 */
function streamCoreScripts() {
  const gulp = require('gulp');
  const {dest} = require('../config');
  return gulp.src(dest.coreScripts, {read: false});
}

/**
 * Returns a stream of vendor scripts.
 * @return {Stream} Vendor scripts stream.
 */
function streamVendorScripts() {
  const gulp = require('gulp');
  const {dest} = require('../config');
  return gulp.src(dest.vendorScripts, {read: false});
}

/**
 * Builds the index file.
 * @return {Stream} Generated index file stream.
 */
module.exports = function indexFileTask() {
  const gulp = require('gulp');
  const gulpIf = require('gulp-if');
  const gulpRevReplace = require('gulp-rev-replace');
  const gulpHtmlmin = require('gulp-htmlmin');
  const series = require('stream-series');
  const {inlineScripts, inlineStyles} = require('../helpers/inline');
  const inject = require('../helpers/inject');
  const {env, src, dest} = require('../config');

  return gulp
    .src(src.htmlIndex)
    .pipe(inlineStyles(streamCriticalStyles()))
    .pipe(inlineScripts(streamCriticalScripts()))
    .pipe(inject(streamCoreStyles()))
    .pipe(inject(series(streamVendorScripts(), streamCoreScripts())))
    .pipe(gulpIf(env.needsMinification, gulpHtmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulpIf(env.needsRevisioning, gulpRevReplace({
      manifest: gulp.src(dest.revManifest)
    })))
    .pipe(gulp.dest(dest.root));
};
