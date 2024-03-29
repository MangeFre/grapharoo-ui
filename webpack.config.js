const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/env'],
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public/'),
		port: 3001,
		publicPath: 'http://localhost:3001/',
		hotOnly: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devtool: 'source-map',
};
