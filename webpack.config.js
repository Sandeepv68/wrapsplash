var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './es6-POC/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};