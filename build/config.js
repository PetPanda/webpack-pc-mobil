
module.exports = {
	cssPublicPath: '../src/style',
	imgOutputPath: 'img/',
	cssOutputPath: './css/styles.css',
  devServerOutputPath: '../dist',
  devProxyTable: {
    '/itings': {
      target: 'http://192.168.4.175:9090/itings',
      changeOrigin: true,
      logLevel: 'debug'
    }  
  }, // 反向代理配置
};