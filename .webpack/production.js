import baseConfig from './base';
import webpack from 'webpack';

const config = {
    ...baseConfig,
    devtool: 'source-map',

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]
};

export default config;