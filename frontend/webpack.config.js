const isDevelopment = process.env.mode === 'development';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// https://github.com/mishoo/UglifyJS2
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack'); // eslint-disable-line

module.exports = {
    entry: {
        /* Webpack v5 supports dependOn */
        /*viewer: { import: path.resolve(__dirname, 'src/index.js'), dependOn: 'shared' },
        presenter: { import: path.resolve(__dirname, 'src/presenter.js'), dependOn: 'shared' },
        shared: 'jquery',*/
        viewer: path.resolve(__dirname, 'src/js/ViewerPage.js'),
        presenter_record: path.resolve(__dirname, 'src/js/RecordPage.js'),
        presenter: path.resolve(__dirname, 'src/js/PresenterPage.js'),
        presenter_settings: path.resolve(__dirname, 'src/js/SettingsPage.js'),
        presenter_login: path.resolve(__dirname, 'src/js/LoginPage.js'),
        presenter_chat: path.resolve(__dirname, 'src/js/ChatPage.js'),
    },
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
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
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
        extensions: ['*', '.js', '.jsx', '.css', '.scss'],
        alias: {
            'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
        new HtmlWebpackPlugin({
            chunks: [
                'viewer',
                'runtime',
                'presenter_record~viewer',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            minify: false,
            inject: true,
            template: path.resolve(__dirname, 'src/index.php'),
            filename: path.resolve(__dirname, 'dist/index.php'),
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'presenter_record',
                'runtime',
                'presenter_record~viewer',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/record.html'),
            filename: path.resolve(__dirname, 'dist/presenter/record.html'),
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'presenter',
                'runtime',
                'vendors~presenter',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            minify: false,
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/index.php'),
            filename: path.resolve(__dirname, 'dist/presenter/index.php'),
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'presenter_settings',
                'runtime',
                'vendors~presenter_settings',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            minify: false,
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/settings.php'),
            filename: path.resolve(__dirname, 'dist/presenter/settings.php'),
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'presenter_login',
                'runtime',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            minify: false,
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/login.php'),
            filename: path.resolve(__dirname, 'dist/presenter/login.php'),
        }),
        new HtmlWebpackPlugin({
            chunks: [],
            minify: false,
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/logout.php'),
            filename: path.resolve(__dirname, 'dist/presenter/logout.php'),
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'presenter_chat',
                'runtime',
                'vendors~presenter~presenter_chat~presenter_login~presenter_settings~presenter_record~viewer',
            ],
            inject: true,
            template: path.resolve(__dirname, 'src/presenter/chat.html'),
            filename: path.resolve(__dirname, 'dist/presenter/chat.html'),
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
