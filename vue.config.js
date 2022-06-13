const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    https: false
  },
  publicPath: '/price-compare-frontend/',
  pwa: {
    name: 'InCart',
    themeColor: '#4DBA87',
    msTileColor: '#0D6EFD',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  transpileDependencies: true
})
