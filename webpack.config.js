let webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: ['babel-polyfill','./js/index.js','whatwg-fetch'],
    output: {
        path: __dirname+"/src/",
        filename: 'bundle.js'
    },
    devServer:{
        proxy: {
            '/api/*': {
                target: 'http://localhost:8081'
            }
        },
    },
    module: {
        loaders: [
            //下面是添加的 css 的 loader，也即是 css 模块化的配置方法
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?modules'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            },

            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-3', 'react'],
                }
            }
        ]
    }

};