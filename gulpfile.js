require('gulp')
  .task('cleanup', require('./gulp/tasks/cleanup'))
  .task('build', require('./gulp/tasks/build'))
  .task('serve', require('./gulp/tasks/serve'))
  .task('watch', require('./gulp/tasks/watch'))
  .task('core-styles', require('./gulp/tasks/core-styles'))
  .task('core-scripts', require('./gulp/tasks/core-scripts'))
  .task('index-file', require('./gulp/tasks/index-file'))
  .task('vendor-scripts', require('./gulp/tasks/vendor-scripts'));
