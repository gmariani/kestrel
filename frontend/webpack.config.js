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
                    // to inject the result into the DOM as a style block
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    { loader: 'css-modules-typescript-loader' },
                    // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
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
                    // to convert SASS to CSS
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
        publicPath: process.env.mode === 'production' ? 'https://mariani.life/project/kestrel/' : 'http://localhost/',
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
