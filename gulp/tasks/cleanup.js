/**
 * Cleanup task for the build folder.
 * @module gulp/tasks/cleanup
 */

module.exports = function cleanupTask() {
  const del = require('del');
  const {dest} = require('../config');

  return del(dest.root);
};
