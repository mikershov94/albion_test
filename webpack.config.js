const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist')
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => filename.endsWith('.pug'));

module.exports = {
    
    entry: {
        app: PATHS.src + '/index.js',
    },

    output: {
        filename: 'js/[name].js',
        path: PATHS.dist
    },

    devServer: {
        contentBase: path.join(__dirname, './public'),
        open: true,
        overlay: true,
        stats: 'errors-only',
        port: 3000
    },

    module: {
        rules: [

            {
                test: /\.pug$/,
                use: [
                    { loader: 'pug-loader' }
                ]
            },

            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { 
                            sourceMap: true,
                            config: { path: __dirname }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },

            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'icons/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }

        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        
        ...PAGES.map((page) => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug$/, '.html')}`
        })),

        new CopyWebpackPlugin([
            { from: './public/img', to: `${PATHS.dist}/img` },
            { from: './public/fonts', to: `${PATHS.dist}/fonts` },
            { from: './public/icons', to: `${PATHS.dist}/icons` }
        ]),
    ],

}