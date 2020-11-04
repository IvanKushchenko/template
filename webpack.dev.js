const { join } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: join(__dirname, 'public'),
		watchContentBase: true,
		port: 4000,
		hot: true
	},

	plugins: [
		
		new HtmlBeautifyPlugin(),
	]
})