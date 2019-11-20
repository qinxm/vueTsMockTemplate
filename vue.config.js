const path = require('path')

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9527 // TODO: get this variable from setting.ts
const name = '' // TODO: get this variable from setting.ts
const CDN_URL = '//static-supplier.missfresh.cn'
const BASE_URL = (process.env.NODE_ENV === 'production')?CDN_URL: './' // 文件相对路径
const OUTPUT_DIR = 'dist' // 打包输出路径
const INDEX_PATH = 'index.html'
const PROXY = {
  '/srm': {
    target: `http://10.2.3.87:8084`,
    changeOrigin: true,
    pathRewrite: {
      ['^srm']: '/srm'
    }
  }
}

module.exports = {
  publicPath: BASE_URL,
  outputDir: OUTPUT_DIR, // 生产环境构建文件的目录
  indexPath: INDEX_PATH, // 指定生成的 index.html 的输出路径
  assetsDir: './src/assets',//放置生成的静态资源 (js、css、img、fonts) 的 目录。
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 将其设置为 false 以加速生产环境构建
  transpileDependencies: ['vuex-module-decorators'],
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: PROXY
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    config
      .when(process.env.NODE_ENV === 'development',
        // config => config.devtool('cheap-source-map')
        config => config.devtool('source-map')
      )
      // 10k以内的图片转为base64
      config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
      // 文件后缀
      config.output.filename('[name].[hash].js').end()

  }
}
