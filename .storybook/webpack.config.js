const path = require('path');

const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const SRC_PATH = path.resolve(__dirname, '../src');
const PLATFORM_PATH = /node_modules\/meetup-web-platform/;

module.exports = {
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader?{fix:true}',
				include: SRC_PATH
			},
			{
				test: /\.scss$/,
				include: SCSS_PATH,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: (loader) => [
								require('postcss-css-variables')({
									preserve: true
								}),
								require('postcss-cssnext')({
									browsers: [
										'last 2 versions',
										'not ie <= 10'
									],
									features: {
										customProperties: false
									}
								})
							]
						},
					},
					'sass-loader',
				]
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					SRC_PATH,
					PLATFORM_PATH
				]
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

};

