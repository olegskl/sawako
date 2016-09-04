/**
 * Build task.
 * @module gulp/tasks/build
 */

module.exports = function buildTask(done) {
  require('run-sequence')(
    'cleanup',
    [
      'core-scripts',
      'core-styles',
      'vendor-scripts'
    ],
    'index-file',
    done
  );
};
