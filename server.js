const NS_FS_API = "http://dev.northsight.io";
const express = require('express');//Simple Node HTML webserver 
const uuid = require('uuid');
const moment = require('moment');
const mysql = require('mysql');
const session = require('express-session');//express session manager. 
const MySQLStore = require('express-mysql-session')(session);
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');//proxy middleware for routing our back-end API requests to the API server, so we can keep things simple. 
const path = require('path');//path and directory tools.
const fetch = require('node-fetch');
const app = express();//create the server. 

var options = {
  host: 'nsmysql1.cebomn8yzntr.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'nsadmin',
  password: 'nsadmin1',
  database: 'nsFarsightAppDB',
  clearExpired: true,
  checkExpirationInterval : moment.duration(1,'hours').asMilliseconds(),
  expiration : moment.duration(1,'days').asMilliseconds()
};
var sessionStore = new MySQLStore(options);

app.use(express.static(path.join(__dirname, 'build')));
//Use Session Middleware 
app.use(session({
  genid: function(req){ return req.session?req.session.id:uuid.v4()},
	key: 'farsight_session_cookie',
	secret: 'farsight_super_secret_secret_dont_tell_3sdrd!$srdsr;ijrp433907t,rvenwo64%5465654we#rnb0930ix',
	store: sessionStore,
	resave: false,
  saveUninitialized: false,
  cookie : { 
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: moment.duration(1,'days').asMilliseconds(),
  }
}));

app.use('/error',function(req,res,next)
{
  res.send("Unexpected Response");
});

app.use('/requestMagicLink',function(req,res,next)
{
  return res.send("THIS PAGE IS A PLACEHOLDER FOR MAGIC LINK REQUEST FORM");
});

app.use('/auth/magicLink/:token',async function(req,res,next){
  //Session is new.
  if(!req.session.apiKey)
  {
    
    if(req.params.token)
      {
        
        const data = await fetch(NS_FS_API+"/api/utility/token_exchange",{
          "method":"POST",
          "headers":{
            "X-APP-ID":appId,
            "X-TOKEN-ID":req.params.token
          }
        }).then(response=>{return response.json()})
        .catch(err=>{return res.status(500).send(err);});
        if(data)
        {
        
          console.warn("FETCHED API KEY");
          console.log(data);
          if(data && data.APIKey)
          {
            req.session.apiKey = data.APIKey;
            req.session.save();
            res.redirect("/");
          }else{
            return res.status(403).send(data.message);
          }
          return next();
        
      }
      }
      
  }
  else{
    res.redirect("/");
    return next();
  }
});
//Use Custom Middleware to look up session-related data after session is established.
app.use(async function(req,res,next)
{
  if(req.sessionID)
  {
    if(req.session.apiKey){
      //Existing Session
      console.log("pre-existing session found.");
      req.session.viewCount++;
      //
      
      console.log("Session Found " +req.sessionID +" - viewed " + req.session.viewCount + " times :::"+req.originalUrl); 
      if(res.statusCode !== 500)
      {
      return next();      
      }
    }else{
      if(req.path.startsWith("/magicLink/"))
      {
        return next();
      }
      console.warn("NO SESSION");
      return res.status(401).send("No Access");      
    }
    
  }else{
    return res.status(401).send("Missing Session");
  }
});


const appId = "4010f312-fd81-4049-a482-9f2f4af24947";//HARD CODED APP ID FOR FARSIGHT. 
var apiKey = "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU";
var proxyOptions = {
  target: NS_FS_API,
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    console.warn("PROXYING API CALL");
    proxyReq.setHeader('X-USER-ID',apiKey); // add new header to response
    proxyReq.setHeader('X-APP-ID',appId);
  }
};
var proxy = createProxyMiddleware(proxyOptions);
app.use(
  "/api",
  proxy
);
//Pass back to client side router in the REACT app.
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(morgan('combined'));
app.listen(3000);