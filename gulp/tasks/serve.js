/**
 * Serve task.
 * @module gulp/tasks/serve
 */

module.exports = function serveTask(done) {
  require('run-sequence')(
    'build',
    'watch',
    done
  );
};
