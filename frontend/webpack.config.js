const isDevelopment = process.env.mode === 'development';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// https://github.com/mishoo/UglifyJS2
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack'); // eslint-disable-line

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    // style-loader - Inject CSS into the DOM
                    // MiniCssExtractPlugin - This plugin extracts CSS into separate files.
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // Emits TypeScript declaration files matching your CSS Modules in the same location as your source files, e.g. src/Component.css will generate src/Component.css.d.ts.
                    { loader: 'css-modules-typescript-loader' },
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                exportGlobals: true,
                                //localIdentName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64]',
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                            sourceMap: isDevelopment,
                        },
                    },
                    /*{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            },
                        },
                    },*/
                    // Loads a Sass/SCSS file and compiles it to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(php)$/,
                include: path.resolve(__dirname, 'src/inc/'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'inc/',
                        },
                    },
                ],
            },
            {
                test: /\.(php)$/,
                include: path.resolve(__dirname, 'src/api/'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'api/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.(ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
        alias: {
            'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
        },
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath:
            process.env.mode === 'production' ? 'https://mariani.life/project/kestrel/' : 'http://localhost:8080/',
        //filename: process.env.mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js',
        filename: isDevelopment ? 'js/[name].js' : 'js/[name].[hash].js',
        chunkFilename: isDevelopment ? 'js/[id].js' : 'js/[id].[chunkhash].js',
    },
    plugins: [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['**/*'],
            cleanOnceBeforeBuildPatterns: ['css/*', 'images/*', 'inc/*', 'js/*'],
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: isDevelopment ? 'css/[id].css' : 'css/[id].[chunkhash].css',
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: path.resolve(__dirname, 'build/index.html'),
        }),
    ],
    // Split vendors into single file
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
        // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
        /*splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight(item => item);
                        const allChunksNames = chunks.map(item => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all',
                },
            },
        },*/
    },
};
