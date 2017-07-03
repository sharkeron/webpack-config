const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const fontMagician = require('postcss-font-magician');

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
											preset      : 'default',
											autoprefixer: {
												browsers: ['last 2 versions'],
												add     : true
											},
											minifyFontValues: false,
											discardUnused: false
										}),
										fontMagician({
											variants: {
												"Indie Flower": {
													'400': ['woff']
												},
												'Open Sans': {
													'300': ['woff'],
													'300 italic': ['woff'],
													'400': ['woff'],
													'600 italic': ['woff'],
													'700': ['woff']
												}
											},
											foundries: ['google']
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