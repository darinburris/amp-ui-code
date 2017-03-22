const path = require('path');
const webpack = require('webpack');
const entry = require('./amp-config').wpentry;

module.exports = {
	//context: path.resolve(__dirname, './source'),
	entry: entry,
	output: {
		path: path.resolve(__dirname, './release/js'),
		publicPath: '/js/',
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','react','stage-2'],
					plugins: ['transform-decorators-legacy']
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react','stage-2'],
					plugins: ['transform-decorators-legacy']
				}
			},
 			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	resolve: {
		modules: [
			path.join(__dirname, 'source'),
			'node_modules',
			'source/js/modules/',
			'source/js/components/'
		],
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin(
			{
				name: 'commons',
				filename: 'commons.js',
				minChunks: 2,
			}
		),
	],
	devServer: {
		contentBase: path.resolve(__dirname, './release'),
		port: 3000,
		publicPath: '/js/'
	},
};
