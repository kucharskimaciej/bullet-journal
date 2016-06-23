import baseConfig from './base';
import webpack from 'webpack';

const config = {
    ...baseConfig,
    debug: true,
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        ...baseConfig.plugins,
        //new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

export default config;