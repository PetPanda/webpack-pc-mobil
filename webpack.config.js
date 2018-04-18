
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// 根据环境使用相应文件
module.exports = require(`./build/webpack.config.${env}.js`);