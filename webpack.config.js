var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './es6-POC/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, "es6-POC/index.js"),
            ],
            exclude: [
                path.resolve(__dirname, "node_modules"),
            ],
            query: {
                presets: ['es2015', 'stage-0'],
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};