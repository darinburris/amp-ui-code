// function buildConfig(env) {
// 	return require('./' + env + '.js')(
// 		{
// 			env: env
// 		}
// 	)
// }
//
// module.exports = buildConfig;



var path = require('path'),
	webpack = require('webpack'),
	entry = require('./amp-config').wpentry,
	WebpackDevServer = require('webpack-dev-server');

module.exports = function(env){

	var env = env;

	return {

		entry: entry,
		output: {
			path: path.resolve(__dirname, './release/js'),
			publicPath: '/js/',
			filename: '[name].js'
		},
		devServer : {
			inline: false,
			port: 3333,
			contentBase: './release',
			publicPath: '/js/',
			hot: false,
			historyApiFallback: true,
			stats: {
				colors: true
			}
		},
		module: {
			rules: [//wp2
	//		loaders: [//wp1
				{
					test: /.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015','react','stage-2','react-hmre'],
						plugins: ['transform-decorators-legacy']
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015','react','stage-2','react-hmre'],
						plugins: ['transform-decorators-legacy']
					}
				}		]
		},
		resolve: {
			modules: [
				path.join(__dirname, 'source'),
				'node_modules',
				'source/js/modules/',
				'source/js/components/'
			],
			//modulesDirectories: [path.join(__dirname, 'source'), 'node_modules','source/js/modules/','source/js/components/'],
			extensions: ['.js', '.jsx']
		},
		plugins: env !== 'develop' ? [
			//new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: true }),
			new webpack.DefinePlugin(
				{
					'process.env': {
						'NODE_ENV': JSON.stringify('production')
					}
				}
			)
		] : [
			new webpack.HotModuleReplacementPlugin()
		],
		devtool: 'cheap-module-source-map',

	}

};
