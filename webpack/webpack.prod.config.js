const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var parentDir = path.join(__dirname, '../');

module.exports = {
	mode: 'production',
	entry: [
		path.join(__dirname, '../src/web/index.js')
	],
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},{
				test: /\.(less|css)$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
			}
		]
    },
    output: {
        path: parentDir + '/src/web',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
	}
}