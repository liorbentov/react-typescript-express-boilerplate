const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        stats: {
            children: false,
            maxModules: 0,
        },
        port: 3001,
    },
    context: path.join(__dirname, 'src'),
    entry: {
        app: ['react-hot-loader/patch', './main.tsx'],
    },
    output: {
        path: path.join(__dirname, 'www'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                            [
                                '@babel/plugin-proposal-decorators',
                                { legacy: true },
                            ],
                            [
                                '@babel/plugin-proposal-class-properties',
                                { loose: true },
                            ],
                            'react-hot-loader/babel',
                        ],
                    },
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
}
