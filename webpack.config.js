module.exports = {
	entry: __dirname + '/src/index.js',
	mode: 'production',
	output: {
		path: __dirname + '/public/js',
		filename: 'bundle.js'
	},
	watch: true,
	module: {
		rules: [
			{
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env'],
							['@babel/preset-react']
						]
					}
				}
			}
		]
	}
}