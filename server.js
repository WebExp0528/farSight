const express = require('express');//Simple Node HTML webserver 
const session = require('express-session');//express session manager. 
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');//proxy middleware for routing our back-end API requests to the API server, so we can keep things simple. 
const path = require('path');//path and directory tools.

const app = express();//create the server. 
app.use(express.static(path.join(__dirname, 'build')));//
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
app.use(morgan('combined'));
app.listen(3000);