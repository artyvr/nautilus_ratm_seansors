module.exports = {
  pwa: {
    name: 'Nautilus RATM BRM Sensors',
    short_name: 'nrs',
    themeColor: '#FFFFFF',
    msTileColor: '#000000',
    background_color: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/nrs/'
      : '/'
  }