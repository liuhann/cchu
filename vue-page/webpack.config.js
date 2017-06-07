const path = require('path');
const nodePageRoot = path.resolve(__dirname, '../egg-demo/page/js/');
const vuxLoader = require('vux-loader')

const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');

const webpackConfig  = {
    entry: {
        man: './src/entry.js',
    },
    output: {
        path : path.resolve(__dirname, "build"),
        filename:  '[name].js'
    },
    module: {
        rules:[
            //npm install --save-dev less-loader style-loader less-loader less
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            //npm install --save-dev css-loader
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            //npm install --save-dev url-loader file-loader
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            //npm install --save-dev babel-loader babel-core babel-preset-env
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.vue$/,
                use: [ 'vux-loader']
            }
        ]
    },
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin()
    ]
};


module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
});