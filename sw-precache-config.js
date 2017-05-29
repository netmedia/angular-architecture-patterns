module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: './dist',
  root: './dist/',
  staticFileGlobs: [
    './dist/index.html',
    './dist/**.js',
    './dist/**.css',
    './dist/**.ttf',
    './dist/assets/images/*',
    './dist/config/*',
    './dist/i18n/en.json',
    './dist/i18n/hr.json'
  ],
  runtimeCaching: [{
    urlPattern: '',
	  handler: 'fastest'
	}]
};