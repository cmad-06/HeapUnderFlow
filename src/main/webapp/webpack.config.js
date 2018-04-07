config = {
   entry: './main.js',
	
   output: {
      path:'/Users/adprasad/Code/CMAD/react/project',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 7071
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
