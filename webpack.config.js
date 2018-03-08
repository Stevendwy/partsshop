module.exports = {
  entry: `./src/main.js`,
  context: process.cwd(),
  output: {
    path: `${__dirname}/dist`,
    publicPath: 'dist/',
    chunkFilename: '[name].js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 20000,
          name: '/static/font/[name].[ext]'
        }
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '/static/img/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '~': __dirname
    }
  }
}
