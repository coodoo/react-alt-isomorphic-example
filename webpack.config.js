var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        boot: path.resolve(__dirname, 'js/boot.js')
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'babel-loader?stage=0' },
            { test: /\.js$/, loader: 'babel-loader?stage=0' },
            { test: /\.json$/, loader: 'json'}
            //
            // {
            //     test: /\.css$/, loader: ExtractTextPlugin.extract(
            //                 'css-loader?sourceMap!postcss-loader')
            // }
        ]
    },
    resolve: {
      extensions: [ '', '.js', '.jsx']
    },

    //plugins: [new ExtractTextPlugin('main.css')],
    //postcss: [require('autoprefixer-core'), require('csswring')({map: true})],
    debug: true,
    devtool: 'source-map'
};

module.exports = config;