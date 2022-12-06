const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        //代理的网站
      target: '',
      changeOrigin: true,
    })
  );
};