const path = require('path');

// Webpack and its plugins
const CommonsChunkPlugin   = require('webpack/lib/optimize/CommonsChunkPlugin');
const CompressionPlugin    = require('compression-webpack-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const DedupePlugin         = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin         = require('webpack/lib/DefinePlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const UglifyJsPlugin       = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.NODE_ENV = 'production';
const metadata = {
  env: ENV
};

module.exports = {
  debug: false,
  devtool: 'source-map',
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'main':      './src/main.ts',
  },
  metadata: metadata,
  module: {
    loaders: [
      // {test: /\.css$/,  loader: 'raw', exclude: /node_modules/},
      {test: /\.css$/,  loader: 'style!css?-minimize'},
      {test: /\.html$/, loader: 'raw'},
      // .ts files for TypeScript
      { test: /\.ts$/, loader: 'awesome-typescript-loader' }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
          path.join(__dirname, 'node_modules', '@angular'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new CommonsChunkPlugin({name: ['main', 'vendor', 'polyfills'], minChunks: Infinity}),
    new CopyWebpackPlugin([
      {from: './src/index.html', to: 'index.html'},
      {from: './src/assets', to: 'assets'},
      {from: './src/app', to: 'app'}
    ],{
      ignore: [
                // Doesn't copy any files with a ts extension
                '*.ts',
            ],
            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
    }),
    //new CompressionPlugin({test: /\.css$|\.html$|\.js$|\.map$/}),
    new DedupePlugin(),
    new DefinePlugin({
      'webpack': {'ENV': JSON.stringify(metadata.env)}
    }),
    new OccurenceOrderPlugin(true),
    new UglifyJsPlugin({
      beautify: false, //prod
      comments: false, //prod
      compress: {screw_ie8 : true},
      mangle: false, // TODO: Remove after #6678 fixed
      // mangle: {
      //   screw_ie8 : true,
      // }
    })
  ],
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js'],
    alias: {
      'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'core', 'testing.js'),
      '@angular/testing': path.join(__dirname, 'node_modules', '@angular', 'core', 'testing.js'),
      'angular2/core': path.join(__dirname, 'node_modules', '@angular', 'core', 'index.js'),
      'angular2/platform/browser': path.join(__dirname, 'node_modules', '@angular', 'platform-browser', 'index.js'),
      'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'testing', 'index.js'),
      'angular2/router': path.join(__dirname, 'node_modules', '@angular', 'router-deprecated', 'index.js'),
      'angular2/http': path.join(__dirname, 'node_modules', '@angular', 'http', 'index.js'),
      'angular2/http/testing': path.join(__dirname, 'node_modules', '@angular', 'http', 'testing.js')
    },
  },
};
