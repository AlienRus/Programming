const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: '../Lab6/public/js/view/start.js'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: 'auto',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'ATLAS',
            template: './index.html',
        }),
    ],
}