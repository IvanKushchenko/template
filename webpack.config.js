const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports = {
	entry: './assets/js/index.js',
	output: {
		filename: 'js/script.js',
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new BrowserSyncPlugin({
			server: {baseDir: ['public/'] },
			open: false,
			notify: false,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new HtmlWebpackPlugin({
			template: './assets/pug/index.pug',
			minify: false
		}),
		/* Other pages */
		// new HtmlWebpackPlugin({
		// 	filename: 'contacts.html',
		// 	template: './assets/pug/contacts.pug'
		// }),
		new FileManagerPlugin({
			onEnd: {
				copy: [
					{source: 'public', destination: 'docs'}
				]
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: [
				    path.resolve(__dirname, "assets/scss")
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../"
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							url: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							outputStyle: 'expanded'
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: [{
					loader: 'pug-loader',
					options: {
						pretty: true
					}
				}]
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: 'img/[name].[ext]'
					}
				}],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				use: [ {
					loader: 'file-loader',
					options:{
						name: '/fonts/[name].[ext]'
					}
				}],

			}
			
		]
	}
}