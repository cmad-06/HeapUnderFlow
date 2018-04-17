config = {
   entry: './main.js',
	
   output: {
      path:'C:\\Users\\vibhjain\\Desktop\\CISCO_DOCS\\STUDY_17\\CMAD\\PROJECT\\HeapUnderFlow\\src\\main\\webapp\\',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 7071,
      historyApiFallback: true
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
