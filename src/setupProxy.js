const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        //代理的网站
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};