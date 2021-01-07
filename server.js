const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://dev.northsight.io",
    changeOrigin: true,
  })
);
app.listen(3000);