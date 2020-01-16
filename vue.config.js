module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 10000,
        proxy: {
            '/admin': {
                target: 'http://127.0.0.1:9001',
                ws: true
            },
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false
}