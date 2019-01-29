const path = require('path');

module.exports = {
    entry:'./js/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
        publicPath: 'data'
    },
    module: {
        rules: [
            {

            }
        ]
    }
};