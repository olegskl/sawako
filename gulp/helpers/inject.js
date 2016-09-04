/**
 * Preconfigured injector of file references into a stream.
 * @module gulp/helpers/inject
 */

const gulpInject = require('gulp-inject');
const {dest} = require('../config');

/**
 * Custom transformer with default fallback.
 * @see https://github.com/klei/gulp-inject#optionstransform
 * @param  {String} filepath The "unixified" path to the file.
 * @return {String}          The content to inject for each file.
 */
function transform(filepath) {
  if (filepath.slice(-4) === '.ico') {
    return `<link rel="shortcut icon" href="${filepath}">`;
  }
  // Use the default transform as fallback:
  return gulpInject.transform(...arguments);
}

/**
 * Injects file references from a given stream to the running stream.
 * @param  {Stream} stream Stream with file references.
 * @return {Stream}        Gulp stream.
 */
module.exports = function inject(stream) {
  return gulpInject(stream, {
    addRootSlash: false,
    ignorePath: dest.root, // remove "build/" from paths
    name: 'inject', // use with "inject" prefix, e.g. <!-- inject:js -->
    transform // apply custom transformations, e.g. for .ico files
  });
};
