import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
    entry: {
        client: './imports/client/index.tsx',
        server: './imports/server/index.ts'
    },
    output: {
        filename: './[name]/bundle.main.js'
    },
    
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        new ExtractTextPlugin("public/bundle.css", { allChunks: true })
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [ 'babel-loader', 'ts-loader']
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader',
                    'css-loader?&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader!stylus-loader')
            }
        ]
    }
};

export default config;