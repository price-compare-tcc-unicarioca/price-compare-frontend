const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    https: false
  },
  publicPath: '/price-compare-frontend/',
  pwa: {
    name: 'InCart',
    themeColor: '#0D6EFD',
    msTileColor: '#0D6EFD',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  },
  transpileDependencies: true
})
