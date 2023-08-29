const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? 'production' : 'development',
    cache: false,
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@app': path.resolve(__dirname, '../src/app'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@pages': path.resolve(__dirname, '../src/pages'),
            '@language': path.resolve(__dirname, '../src/language'),
            '@redux': path.resolve(__dirname, '../src/redux'),
            '@router': path.resolve(__dirname, '../src/router')
        }
    },
    entry: './src/index.tsx',
    output: {
        path: isProduction ? path.resolve(__dirname, '../build') : undefined,
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        clean: true,
        publicPath: isProduction ? '' : '/'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        use: [
                            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: ['postcss-preset-env']
                                    }
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    lessOptions: {
                                        javascriptEnabled: true
                                    }
                                }
                            },
                            {
                                loader: 'style-resources-loader',
                                options: {
                                    patterns: path.resolve(__dirname, '../src/assets/style/variables.less')
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 8 * 1024
                            }
                        },
                        generator: {
                            filename: 'image/[name].[hash:8][ext]'
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf|mp3|mp4|avi|mkv)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'media/[name].[hash:8][ext]'
                        }
                    },
                    {
                        test: /\.(js|ts)x?$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        // 按需导入core-js
                                        [
                                            '@babel/preset-env',
                                            {
                                                useBuiltIns: 'usage',
                                                corejs: 3
                                            }
                                        ],
                                        '@babel/preset-react',
                                        '@babel/preset-typescript'
                                    ],
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: [
                                        !isProduction && 'react-refresh/babel',
                                        '@babel/plugin-transform-runtime',
                                        // 按需导入antd
                                        [
                                            'import',
                                            {
                                                libraryName: 'antd',
                                                libraryDirectory: 'es',
                                                style: true
                                            }
                                        ]
                                    ].filter(Boolean)
                                }
                            }
                        ]
                    },
                ]
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            cache: true
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new WebpackBar(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../build'),
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash:8].css',
            chunkFilename: 'style/[name].[contenthash:8].chunk.css'
        }),
        !isProduction && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    optimization: {
        minimize: isProduction,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            name: false,
            cacheGroups: {
                reactBase: {
                    name: 'reactBase',
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    priority: 10,
                    chunks: 'all'
                },
                antdBase: {
                    name: 'antdBase',
                    test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
                    priority: 9,
                    chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    priority: 5,
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        }
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        host: '0.0.0.0',
        port: 8000,
        hot: true
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}