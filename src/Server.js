const {createProxyMiddleware} = require("http-proxy-middleware");
const morgan = require("morgan");
const port = process.env.PORT || 3000;

module.exports = app => {
  app.use(
    "/list",
    createProxyMiddleware({
      target: "http://dev.northsight.io/api/work_order",
      changeOrigin: true,
      pathRewrite: {
        "^/list": "/list"
      }
    })
  );
  app.use(morgan('combined'));
};