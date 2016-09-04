/**
 * Build changes watcher task.
 * @module gulp/tasks/watch
 */

function watchStyles() {
  const gulpWatch = require('gulp-watch');
  const runSequence = require('run-sequence');
  const {src} = require('../config');

  return gulpWatch(src.coreStyles, function () {
    runSequence('core-styles');
  });
}

function watchIndexFile() {
  const gulpWatch = require('gulp-watch');
  const runSequence = require('run-sequence');
  const {src} = require('../config');

  return gulpWatch([
    src.htmlIndex,
    src.criticalScripts,
    src.criticalStyles
  ], function () {
    runSequence('index-file');
  });
}

/**
* Watches app for changes, reloads necessary tasks, refreshes browser.
* @return {Stream} Neverending stream.
*/
module.exports = function watchTask() {
  const mergeStream = require('merge-stream');
  const browserSync = require('browser-sync');
  const historyApiFallback = require('connect-history-api-fallback');
  const {dest} = require('../config');

  browserSync.create().init({
    files: `${dest.root}/**/*.*`,
    server: {
      baseDir: dest.root,
      middleware: [
        historyApiFallback()
      ]
    }
  });

  return mergeStream(
    watchStyles(),
    watchIndexFile()
  );
};
