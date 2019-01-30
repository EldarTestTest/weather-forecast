const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry:'./src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
        publicPath: 'public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};