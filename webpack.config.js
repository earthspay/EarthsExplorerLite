const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const buildPath = path.join(__dirname, 'dist');
const sourcesPath = path.join(__dirname, 'src');
const scriptsPath = path.join(sourcesPath, 'js');

var config = {
    entry: {
        main: path.join(scriptsPath, 'index.js')
    },
    output: {
        filename: '[name].[hash:16].js',
        path: buildPath,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                }
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader'
            }]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: false
                    }
                },
                //'postcss-loader',
                'sass-loader'
            ]
        },
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[hash].[ext]'
                    }
                }]
            }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(sourcesPath, 'index.html'),
            filename: './index.html'
        }),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(require('./package.json').version)
        }),
        new LodashModuleReplacementPlugin({
            shorthands: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([{
            from: path.join(sourcesPath, 'favicon.png'),
            to: buildPath
        }, {
            from: 'manifest.json',
            to: buildPath
        }], { debug: true })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
};

const networks = {
    mainnet: ['mainnet', 'testnet'],
    devnet: ['devnet']
};

module.exports = (env, argv) => {
    let googleTrackingId;
    let amplitudeApiKey;
    let sentryDsn;
    if (argv.mode === 'development') {
        config.devtool = 'source-map';

        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        }));

        googleTrackingId = 'UA-138153851-2';
        amplitudeApiKey = '0b3481b4cb40d949738933a57eaeb4fe';
        sentryDsn = 'https://52c223677af144dfabcc0ef333e978aa@sentry.io/1436900';
    }

    if (argv.mode === 'production') {
        config.output.filename = '[name].[chunkhash].js';

        googleTrackingId = 'UA-138153851-1';
        amplitudeApiKey = 'e15743e3459050165886afc936f1a08e';
        sentryDsn = 'https://4ee1bef0c10c44859b069dcb5cf61534@sentry.io/1436851';
    }

    const network = (env && env.network) || 'mainnet';
    const networkConfiguration = networks[network];
    config.plugins.push(new webpack.DefinePlugin({
        __NETWORKS__: JSON.stringify(networkConfiguration),
        __GOOGLE_TRACKING_ID__: JSON.stringify(googleTrackingId),
        __AMPLITUDE_API_KEY__: JSON.stringify(amplitudeApiKey),
        __SENTRY_DSN__: JSON.stringify(sentryDsn)
    }));

    return config;
};
