module.exports = {
    publicPath: './',
    outputDir: '安全检查管理移动端',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === 'darwin',
        //韩磊
        // host:'192.168.2.166',
        //服务器
        // host:'129.28.66.56',
        //本地IP
        host: '192.168.0.100',
        // host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        before: app => {}
    },
    configureWebpack: {
        // plugins: [
        //     new webpack.ProvidePlugin({
        //         jQuery: 'jquery',
        //         $: 'jquery'
        //     })
        // ]
    }
};