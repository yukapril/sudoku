const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        // 所有的规则放在rules下面
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": ["es2015"]
                }
            }]
        }]
    },
    plugins: [
        // new UglifyJSPlugin({
        //     compress: true,
        //     beautify: true
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'commons.js'
        })
    ]
}