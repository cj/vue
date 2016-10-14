const webpack           = require('webpack')
const base              = require('./webpack.base.config')
const vueConfig         = require('./vue-loader.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: base.plugins.concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'client-vendor-bundle.js'
    })
  ])
})

config.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    hash: false,
    inject: 'body',
    template: './src/index.html'
  })
)

if (process.env.NODE_ENV === 'production') {
  const WebpackMd5Hash = require('webpack-md5-hash')
  // Use ExtractTextPlugin to extract CSS into a single file
  // so it's applied on initial render
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  config.output.filename = '[name].[chunkhash].js'

  // vueConfig is already included in the config via LoaderOptionsPlugin
  // here we overwrite the loader config for <style lang="stylus">
  // so they are extracted.
  vueConfig.loaders = {
    sass: ExtractTextPlugin.extract({
      loader: 'css-loader!sass-loader',
      fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader
    })
  }

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  )
}

module.exports = config
