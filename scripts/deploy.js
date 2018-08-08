/* eslint-env node */
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
}, err => console.error('[gh-pages] Error:', err));
