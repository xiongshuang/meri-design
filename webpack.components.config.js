const path=require('path');
const webpack=require('webpack');
const MiniCssExtractPlugin=require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin'); // 清理垃圾文件

const WebpackBar = require('webpackbar');

const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀

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
    MiniCssExtractPlugin.loader,
    'thread-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: false
        }
    },
    'postcss-loader'
]
    ,stylusConfig=[
        MiniCssExtractPlugin.loader,
        'thread-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: false
            }
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: false
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
        index: './src/entry/multiple.js' // 入口文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', // [name] 是entry的key
        publicPath: '/',
        library: 'meri-design', // 指定的就是你使用require时的模块名
        libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
        umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
        globalObject: 'this'
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
                use: ['thread-loader', 'babel-loader'],
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.svg$/,
                use: ['babel-loader', 'vue-svg-loader'],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(png|jpe?g|gif|bmp)$/,
                use: [{
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
            }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.vue', '.styl'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules'
            ,path.resolve(__dirname, 'src/assets')
            ,path.resolve(__dirname, 'src/components')
            ,path.resolve(__dirname, 'src/utils')
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`@meri-design ${TimeFn()}`),
        new VueLoaderPlugin(), // vue加载器
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        }),
        new webpack.LoaderOptionsPlugin({ // stylus加前缀
            options: {
                stylus: {
                    use: [
                        PostStylus(['autoprefixer']),
                    ]
                }
            }
        }),
        new WebpackBar(),
        new CleanWebpackPlugin([path.join(__dirname, 'dist'), path.join(__dirname, 'lib')]),
        new MiniCssExtractPlugin({ // 分离css
            filename: '[name].css'
        })
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
};

module.exports=config;
