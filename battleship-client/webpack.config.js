var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:9090/api'
        })
    },
    // resolve: {
    //     extensions: ['', '.js', '.jsx', '.css'],
    //     modulesDirectories: [
    //         'node_modules'
    //     ]
    // }
}