const {createProxyMiddleware} = require("http-proxy-middleware");
const morgan = require("morgan");
//const port = process.env.PORT || 3000;

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://dev.northsight.io",
      changeOrigin: true,
    })
  );
  app.use(morgan('combined'));
};