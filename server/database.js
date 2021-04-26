const moment = require('moment');
const databaseOptions = {
  host: process.env.NS_DB_HOST,
  port: parseInt(process.env.NS_DB_PORT),
  user: process.env.NS_DB_USER,
  password: process.env.NS_DB_PWD,
  database: process.env.NS_DB_DATABASE,
  clearExpired: true,
  checkExpirationInterval: moment.duration(1, 'day').asMilliseconds(),
  expiration: moment.duration(1, 'day').asMilliseconds()
};

module.exports = databaseOptions;
