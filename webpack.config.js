const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

module.exports = {
	mode: mode,
	entry: './src/index.js',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'js/app.[hash].js',
		clean: true,
	},
	devServer: {
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [
						['mozjpeg', { quality: 85 }],
						['optipng', { optimizationLevel: 5 }],
						[
							"svgo",
							{
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeViewBox: false,
												addAttributesToSVGElement: {
													params: {
														attributes: [
															{ xmlns: "http://www.w3.org/2000/svg" },
														],
													},
												},
											},
										},
									},
								],
							},
						],
					],
				},
			},
			generator: [
				{
					preset: 'webp',
					implementation: ImageMinimizerPlugin.imageminGenerate,
					options: {
						plugins: ['imagemin-webp']
					}
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/images',
				},
			},
			{
				test: /\.svg$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/icons',
				},
			},
			{
				test: /\.module\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: `[folder]__[local]___[hash:base64:5]`,
							},
							sourceMap: true,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.m?jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				}
			}
		]
	}
}