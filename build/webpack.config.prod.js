
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');


// 合并配置文件
module.exports = webpackMerge(webpackBase, {
	devtool: false,
	plugins: [
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
    }),
		// 提取公共 JavaScript 代码
		new webpack.optimize.CommonsChunkPlugin({
			// chunk 名为 commons
			name: 'commons',
			filename: 'js/[name].bundle.js'
		})
	]
});