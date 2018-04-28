const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    optimization: {
        minimize: false
    },
    entry: './es6-POC/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [
                path.resolve(__dirname, "./node_modules"),
            ]
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};