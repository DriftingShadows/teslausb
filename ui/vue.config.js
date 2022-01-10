const veuiLoaderOptions = require('veui-theme-dls/veui-loader-options');

const proxyTarget = process.env.PROXY_TARGET;

module.exports = {
    devServer: {
        proxy: {
            '/*.log': { target: proxyTarget },
            '/cgi-bin/': { target: proxyTarget },
            '/TeslaCam/': { target: proxyTarget }
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
        },
    },
    transpileDependencies: ['veui'],
    configureWebpack: {
        plugins: [
            require('unplugin-vue-components/webpack')({
                resolvers: [require('unplugin-vue-components/resolvers').VeuiResolver({})]
            }),
        ],
    },
    chainWebpack
};

function chainWebpack(config) {
    config.module
        .rule('veui')
        .test(/\.vue$/)
        .pre()
        .use('veui-loader')
        .loader('veui-loader')
        .tap(() => veuiLoaderOptions);
}
