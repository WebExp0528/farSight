require('dotenv').config();
const express = require('express'); //Simple Node HTML webserver
const uuid = require('uuid');
const moment = require('moment');
const mysql = require('mysql');
const session = require('express-session'); //express session manager.
const MySQLStore = require('express-mysql-session')(session);
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware'); //proxy middleware for routing our back-end API requests to the API server, so we can keep things simple.
const path = require('path'); //path and directory tools.
const fetch = require('node-fetch');
const cors = require('cors');
const _ = require('lodash');

const { Provider } = require('react-redux');
const app = express(); //create the server.

const appId = process.env.APP_ID;
const NS_FS_API = process.env.NS_FS_API;

/**
 * const NS_FS_API = "http://localhost:5000";//local testing only
 */

/**
 * Session Store Configuration
 */
if (process.env.NODE_ENV === 'production') {
  var options = {
    host: process.env.NS_DB_HOST,
    port: process.env.NS_DB_PORT,
    user: process.env.NS_DB_USER,
    password: process.env.NS_DB_PWD,
    database: process.env.NS_DB_DATABASE,
    clearExpired: true,
    checkExpirationInterval: moment.duration(1, 'day').asMilliseconds(),
    expiration: moment.duration(1, 'day').asMilliseconds()
  };
  sessionStore = new MySQLStore(options);
}

if (process.env.NODE_ENV === 'development') {
  var options = { path: './sessions' };
  sessionStore = new FileStore(options);
}

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.static(path.join(__dirname, 'build')));

/**
 * Use Session Middleware
 */

app.use(
  session({
    genid: function (req) {
      return req.session ? req.session.id : uuid.v4();
    },
    key: 'farsight_session_cookie',
    secret: process.env.NS_FS_SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'development' ? 'none' : 'strict',
      secure: false,
      maxAge: moment.duration(1000, 'years').asMilliseconds()
    }
  })
);

app.set('trust proxy', 1);

/**
 * Register Default Session
 */
app.use('/demo', function (req, res, next) {
  req.session.apiKey = '00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU';
  console.warn('STARTING DEMO', req.session);
  req.session.save();
  return res.send({ message: 'Set Test Key' });
});

app.use('/error', function (req, res, next) {
  res.send('Unexpected Response');
});

app.use('/requestMagicLink', function (req, res, next) {
  //return res.send("THIS PAGE IS A PLACEHOLDER FOR MAGIC LINK REQUEST FORM");
  return next();
});

app.use('/auth/magicLink/:token', async function (req, res, next) {
  //Session is new.
  if (!req.session.apiKey) {
    if (req.params.token) {
      const data = await fetch(NS_FS_API + '/api/utility/token_exchange', {
        method: 'POST',
        headers: {
          'X-APP-ID': appId,
          'X-TOKEN-ID': req.params.token
        }
      })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          return res.status(500).send(err);
        });
      if (data) {
        console.warn('FETCHED API KEY');
        console.log(data);
        if (data && data.APIKey) {
          req.session.apiKey = data.APIKey;
          req.session.save();
          console.log('redirecting to / (HOME)');
          return res.redirect('/');
        } else {
          console.log('redirecting to /requestMagicLink');
          return res.redirect('/requestMagicLink');
        }
        //return next();
      }
    }
  } else {
    console.log('Session exists and API KEY FOUND : redirecting to / (HOME)');
    return res.redirect('/');
  }
});

//Use Custom Middleware to look up session-related data after session is established.
app.use(async function (req, res, next) {
  console.log('~~~~~ check session', req.session);
  if (req.sessionID) {
    if (req.session.apiKey) {
      //Existing Session
      console.log('pre-existing session found.');
      req.session.viewCount++;
      //

      console.log(
        'Session Found ' + req.sessionID + ' - viewed ' + req.session.viewCount + ' times :::' + req.originalUrl
      );
      if (res.statusCode !== 500) {
        return next();
      }
    } else {
      if (req.path.startsWith('/auth/magicLink/')) {
        console.warn('RESOLVING MAGIC LINK');
        return next();
      }
      if (req.path.startsWith('/requestMagicLink')) {
        console.warn('NEED MAGIC LINK');
        return next();
      }
      console.warn('NO API KEY');
      console.warn('Session:' + req.sessionID);
      return res.status(401).send('No Access');
    }
  } else {
    console.warn('NO SESSION AT ALL');
    return res.status(401).send('Missing Session');
  }
});

var proxyOptions = {
  target: NS_FS_API,
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    console.warn('PROXYING API CALL');
    proxyReq.setHeader('X-USER-ID', req.session.apiKey); // add new header to response
    proxyReq.setHeader('X-APP-ID', appId);
  },
  onProxyRes(proxyRes, req, res) {
    //console.log(proxyRes);
  }
};

var proxy = createProxyMiddleware(proxyOptions);
app.use('/api', proxy);

//Pass back to client side router in the REACT app.

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

console.log('APP ID ' + process.env.NS_DB_DATABASE);
app.use(morgan('combined'));
app.listen(process.env.PORT);

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
