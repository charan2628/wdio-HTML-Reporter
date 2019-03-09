const path = require('path');

module.exports = {
    entry: "./app.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: "bundle.map"
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}