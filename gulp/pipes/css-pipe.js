/**
 * Reusable CSS gulp pipe.
 * @module gulp/pipes/css-pipe
 */

const lazypipe = require('lazypipe');
const gulpIf = require('gulp-if');
const gulpRev = require('gulp-rev');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpPostcss = require('gulp-postcss');
const gulpCssmin = require('gulp-cssmin');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssExtend = require('postcss-extend');
const postcssImport = require('postcss-import');
const {env, browsers} = require('../config');

/**
 * CSS compilation pipe.
 * @type Object
 */
module.exports = lazypipe()
  .pipe(() => gulpIf(env.needsSourcemaps, gulpSourcemaps.init()))
  .pipe(gulpPostcss, [
    autoprefixer({browsers}),
    postcssImport(),
    postcssCustomProperties(),
    postcssExtend()
  ])
  .pipe(() => gulpIf(env.needsMinification, gulpCssmin()))
  .pipe(() => gulpIf(env.needsRevisioning, gulpRev()))
  .pipe(() => gulpIf(env.needsSourcemaps, gulpSourcemaps.write()));
