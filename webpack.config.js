const path = require('path');

module.exports = {
    entry : __dirname + '/src/video.js',
    module : {
        rules : [
            {
                test : /\.js$/,
                include : path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loaders : 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use : ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                        {
                            loader: 'url-loader'
                        },
                    ]
            }
        ]
    },
    externals : {
        'react' : 'commonjs react'
    },
    output : {
        filename : 'index.js',
        path : path.resolve(__dirname, 'dist'),
        libraryTarget : 'commonjs2'
    }
}