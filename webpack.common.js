const { resolve, join } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const CssNanoPlugin = require('cssnano');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		app: ['./assets/js/index.js', './assets/scss/index.scss']
	},
	output: {
		filename: 'js/[name].js',
		path: resolve(__dirname, 'public')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': join(__dirname, 'assets'),
			'@js': join(__dirname, 'assets/js'),
			'~': join(__dirname, 'node_modules')
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new HtmlWebpackPlugin({
			template: './assets/pug/index.pug',
			minify: isProd
		}),
		new FileManagerPlugin({
			onEnd: {
				copy: [
					{source: 'assets/img', destination: 'public/img'},
					{source: 'assets/fonts', destination: 'public/fonts'}
				]
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
		        exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				include: [
				    resolve(__dirname, "assets/scss")
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: !isProd,
							publicPath: "../"
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProd,
							url: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								AutoprefixerPlugin({
									overrideBrowserslist: ["defaults", "last 4 safari version"]
								}),
								CssNanoPlugin({ preset: ['default', { discardComments: false }] })
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProd,
							outputStyle: 'expanded',
							sassOptions: {
								outputStyle: 'expanded'
							}
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: [{
					loader: 'pug-loader',
					options: {
						pretty: !isProd
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