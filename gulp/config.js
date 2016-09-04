/**
 * Build configuration.
 * @module gulp/config
 */

const env = exports.env = {};
const src = exports.src = {};
const dest = exports.dest = {};
exports.browsers = ['last 2 versions'];
exports.deps = Object.keys(require('../package').dependencies || {});

//
// Environment config
// --------------------

const gulpEnv = process.env.GULP_ENV || 'dist'; // eslint-disable-line no-process-env, no-undef

const isDist = gulpEnv.indexOf('dist') !== -1;
const isLive = gulpEnv.indexOf('live') !== -1;

env.needsSourcemaps = isLive;
env.needsLivereload = isLive;
env.needsMinification = isDist;
env.needsRevisioning = isDist;

//
// Source files and folders
// --------------------

src.root = 'src';
src.htmlIndex = `${src.root}/index.html`;

src.coreStyles = `${src.root}/styles/core/**/*.css`;
src.coreStylesMain = `${src.root}/styles/core/core.css`;
src.coreScripts = `${src.root}/scripts/core/**/*.js`;
src.coreScriptsMain = `${src.root}/scripts/core/core.js`;
src.criticalStyles = `${src.root}/styles/critical/**/*.css`;
src.criticalStylesMain = `${src.root}/styles/critical/critical.css`;
src.criticalScripts = `${src.root}/scripts/critical/**/*.js`;
src.criticalScriptsMain = `${src.root}/scripts/critical/critical.js`;

//
// Destination files and folders
// --------------------

dest.root = 'dist';

dest.coreScripts = `${dest.root}/core*.js`;
dest.coreStyles = `${dest.root}/core*.css`;
dest.vendorScripts = `${dest.root}/vendors*.js`;

dest.revManifest = `${dest.root}/rev-manifest.json`;
