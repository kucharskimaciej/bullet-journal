var webpack = require('webpack');
module.exports = {
    entry: {
        client: './source/bullet/client/index.tsx',
        server: './source/bullet/server/index.ts'
    },
    output: {
        filename: './app/[name]/bundle.main.js'
    },
    // Turn on sourcemaps
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    //// Add minification
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin()
    //],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};