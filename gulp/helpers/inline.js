/**
 * Preconfigured inliner of file references into a stream.
 * @module gulp/helpers/inline
 */

const gulpInject = require('gulp-inject');
const {transformScripts, transformStyles} = require('./transform');

/**
 * Inlines file references from a given stream to the running stream.
 * @param  {Stream}   stream      Stream with file references to inline.
 * @param  {Function} transformer Stream transformer funtion.
 * @return {Stream}               Gulp stream.
 */
function inline(stream, transformer) {
  return gulpInject(stream, {
    transform: transformer, // custom transformer to force inlining
    name: 'inline' // use with "inline" placeholder <!-- inline:js -->
  });
}

/**
 * Inlines JavaScript file references from a given stream to the running stream.
 * @param  {Stream} stream Stream with JavaScript file references.
 * @return {Stream}        Gulp stream.
 */
function inlineScripts(stream) {
  return inline(stream, transformScripts);
}

/**
 * Inlines CSS file references from a given stream to the running stream.
 * @param  {Stream} stream Stream with CSS file references.
 * @return {Stream}        Gulp stream.
 */
function inlineStyles(stream) {
  return inline(stream, transformStyles);
}

exports.inline = inline;
exports.inlineScripts = inlineScripts;
exports.inlineStyles = inlineStyles;
