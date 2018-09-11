
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const config = require('./config');

module.exports = webpackMerge(webpackBase, {
	devServer: {
		contentBase: config.devServerOutputPath,
		overlay: {
			errors: true,
			warnings: true
    },
    proxy: {
      '/itings': {
        target: 'http://192.168.4.175:9090',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/itings': '/itings'
        }
      }  
    },   
	}
});