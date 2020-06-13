const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './app.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader']
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: 4200,
    },
    plugins: [
        new HTMLWebpackPlugin({template: './index.html'}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'build/assets')
            }
        ])
    ],
};
