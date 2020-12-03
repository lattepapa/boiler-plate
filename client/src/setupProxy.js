// CORS 해결을 위한 Proxy 설정 :::>  https://create-react-app.dev/docs/proxying-api-requests-in-development/
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
