var path = require('path');
var webpack = require('webpack');

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
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },

    debug: true,
    devtool: 'source-map'
};

module.exports = config;