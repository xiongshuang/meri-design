const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin'); // 自动生成index.html
const MiniCssExtractPlugin=require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin'); // 清理垃圾文件

const WebpackBar = require('webpackbar');

const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source

/**
 * 判断是生产环境还是开发环境
 * @type {boolean}
 * isProd为true表示生产
 */
const isProd=process.env.NODE_ENV==='production';


// 获取本机ip
const get_ip=require('./get_ip')();

// 获取时间
const TimeFn=require('./get_time');
console.log(
    `
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\\  =  /O
               ____/\`---'\\____
             .'  \\\\|     |//  \`.
            /  \\\\|||  :  |||//  \\
           /  _||||| -:- |||||-  \\
           |   | \\\\\\  -  /// |   |
           | \\_|  ''\\---/''  |   |
           \\  .-\\__  \`-\`  ___/-. /
         ___\`. .'  /--.--\\  \`. . __
      ."" '<  \`.___\\_<|>_/___.'  >'"".
     | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
     \\  \\ \`-.   \\_ __\\ /__ _/   .-\` /  /
======\`-.____\`-.___\\_____/___.-\`____.-'======
                   \`=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
               ${TimeFn()}
    `
);

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig=[
    isProd?MiniCssExtractPlugin.loader:'vue-style-loader',
    'thread-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProd
        }
    },
    'postcss-loader'
]
    ,stylusConfig=[
        isProd?MiniCssExtractPlugin.loader:'vue-style-loader',
        'thread-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: !isProd
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: !isProd
            }
        },{
            loader: 'style-resources-loader',
            options: {
                injector: 'prepend',
                patterns: path.resolve(__dirname, 'src/assets/stylus/variables.styl')
            }
        }
    ];

const config={
    entry: {
        // index: isProd ? ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js'] : './src/main.js' // 入口文件
        index: ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js'] // 入口文件
    },
    output: {
        path: path.resolve(__dirname, 'production'),
        filename: isProd?'javascript/[name].[hash:8].js':'[name].js', // [name] 是entry的key
        publicPath: isProd?'./':'/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:cssConfig
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig,
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.vue$/,
                use: [
                    'thread-loader',
                    {
                    loader: 'vue-loader',
                    options: {
                        loaders:{
                            css: cssConfig,
                            stylus: stylusConfig
                        },
                        preserveWhitespace: false // 不要留空白
                    }
                }],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.js$/,
                use: ['thread-loader', 'cache-loader', `babel-loader?cacheDirectory=${!isProd}`],
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.svg$/,
                use: ['thread-loader', 'babel-loader', 'vue-svg-loader'],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(png|jpe?g|gif|bmp)$/,
                use: [
                    {
                    loader: 'url-loader',
                    options: { // 配置图片编译路径
                        limit: 8192, // 小于8k将图片转换成base64
                        name: '[name].[ext]?[hash:8]',
                        outputPath: 'images/'
                    }
                }],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { // 配置html中图片编译
                        minimize: true
                    }
                }]
            },
            {test: /\.(mp4|ogg)$/,use: ['file-loader'], include: [path.resolve(__dirname, 'src')]},
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name:'fonts/[name].[ext]?[hash:8]'
                }
            },
            { test: /\.md$/, use: 'text-loader' }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.vue', '.styl', '.md'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules'
            ,path.resolve(__dirname, 'src/assets')
            ,path.resolve(__dirname, 'src/docs')
            ,path.resolve(__dirname, 'src/utils')
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`@meri-design ${TimeFn()}`),
        new HardSourceWebpackPlugin(),
        new VueLoaderPlugin(), // vue加载器
        new webpack.LoaderOptionsPlugin({ // stylus加前缀
            options: {
                stylus: {
                    use: [
                        PostStylus(['autoprefixer'])
                    ],
                    include: [path.resolve(__dirname, 'src')]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html') // 引入模版
            ,favicon: path.join(__dirname, 'src/assets/favicon.ico')
            ,filename: 'index.html'
            ,minify: { // 对index.html压缩
                collapseWhitespace: isProd // 去掉index.html的空格
                ,removeAttributeQuotes: isProd // 去掉引号
            }
            ,hash: true // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            // ,chunks:['vendor','main'] // 在产出的html文件里面引入哪些代码块，里面的名字要跟entry里面key对应(一般用于多文件入口)
            ,inlineSource:  '.(js|css)'
        }),
        new WebpackBar()
    ]
};

if(isProd){
    config.plugins.push(
        new CleanWebpackPlugin([path.join(__dirname, 'production')]),
        new MiniCssExtractPlugin({ // 分离css
            filename: 'stylesheets/[name].[contenthash:8].css'
            // chunkFilename: isProd?'stylesheets/[name].[contenthash:8].css':'[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        })
    );

    config.optimization={ // 抽离第三方插件
        splitChunks: {
            chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 10000, // 提高缓存利用率，这需要在http2/spdy
            maxSize: 0, // 没有限制
            minChunks: 3,// 共享最少的chunk数，使用次数超过这个值才会被提取
            maxAsyncRequests: 5,//最多的异步chunk数
            maxInitialRequests: 5,// 最多的同步chunks数
            name: true,
            cacheGroups: { // 这里开始设置缓存的 chunks
                vendor: { // key 为entry中定义的 入口名称，new webpack.ProvidePlugin中的库
                    test: /node_modules/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    enforce: true
                },
                styles: {
                    test: /src\.(css|styl)$/,
                    name: 'main',
                    enforce: true
                }
            }
        }
        , runtimeChunk: { name: 'manifest' } // 为每个入口提取出webpack runtime模块
    };
} else {
    config.devtool='source-map'; // 如果只用source-map开发环境出现错误定位源文件，生产环境会生成map文件
    config.devServer = {
        contentBase: path.join(__dirname, 'production') // 将 dist 目录下的文件，作为可访问文件。
        , compress: true // 开启Gzip压缩
        // , host: 'localhost' // 设置服务器的ip地址，默认localhost
        , host: get_ip // 设置服务器的ip地址，默认localhost
        , port: 3002 // 端口号
        , open: true // 自动打开浏览器
        , hot: true
        , overlay: { // 当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        disableHostCheck: true //  不检查主机
        // ,historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 /
        //     rewrites: [{ from: /./, to: '/' }]
        // }
    };
}

module.exports=config;
