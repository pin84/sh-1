const path = require('path');
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
                path.resolve(__dirname, './src/assets/var.scss')
            ]
        }
    },
    //http://52.253.90.5:8081/gtl_jk.SterilizingZoneService/BankuangList
    // devServer: {                //webpack-dev-server配置
    //     host : 'localhost',       
    //     port : 8080,            //配置本项目运行端口
    //     proxy: {                //配置代理服务器来解决跨域问题
    //         '/bankuang': {
    //             target: 'http://52.253.90.5:8081/gtl_jk.SterilizingZoneService/BankuangList',      //配置要替换的后台接口地址
    //             changOrigin: true,                      //配置允许改变Origin
    //             pathRewrite: {
    //                 '^/bankuang': ''
    //             }
    //         },
    //         '/miejunqi': {
    //             target: 'http://52.253.90.5:8081/gtl_jk.SterilizingZoneService/MiejunqiList',      //配置要替换的后台接口地址
    //             changOrigin: true,                      //配置允许改变Origin
    //             pathRewrite: {
    //                 '^/miejunqi': ''
    //             }
    //         },
    //         '/ZhuangpingxianList': {
    //             target: 'http://52.253.90.5:8081/gtl_jk.SterilizingZoneService/ZhuangpingxianList',      //配置要替换的后台接口地址
    //             changOrigin: true,                      //配置允许改变Origin
    //             pathRewrite: {
    //                 '^/ZhuangpingxianList': ''
    //             }
    //         },



    //     }
    // },

    outputDir: 'gaitianli',

    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/style.scss";`
            }
        }
    },

    chainWebpack(config) {
        config.module
            .rule('scss')
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('sass-loader') // this makes it work.
            .options({ remUnit: 192, remPrecision: 8 })
            .end()
    }
}