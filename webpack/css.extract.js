const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');

module.exports = function(paths) {
	return {
		module : {
			rules: [
				{
					test   : /\.scss$/,
					include: paths,
					use    : ExtractTextPlugin.extract({
						publicPath: '../',
						fallback  : 'style-loader',
						use       : ['css-loader', {
							loader : 'postcss-loader',
							options: {
								plugins: function() {
									return [
										cssnano({
											preset      : 'default'
											,
										autoprefixer: {
											browsers: ['last 2 versions'],
											add     : true
										}
										})
									];
								}
							}
						}, 'sass-loader']
					})
				},
				{
					test   : /\.css$/,
					include: paths,
					use    : ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use     : 'css-loader'
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('./css/[name].css')
		]
	};
};