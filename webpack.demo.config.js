
var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : __dirname + '/demo/src/app.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : __dirname + '/demo/src',
                exclude : /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'demo/dist')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
         // include: /\.min\.js$/,
          minimize: true
        })
      ]
}