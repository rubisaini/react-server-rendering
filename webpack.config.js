/**
 * Created by intelligrape on 3/5/17.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = {
    entry : './src/main.js' ,
    output: {
        path : __dirname + '/src',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ]

};

module.exports = config;