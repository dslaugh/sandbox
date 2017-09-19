delete process.env.DEBUG_FD; // remove DeprecationWarning: `DEBUG_FD` is deprecated. Override `debug.log` if you want to use a different log function (https://git.io/vMUyr). Supposedly WebStorm 2017.3 will fix this...?
const path = require('path');
const _ = require('lodash');
const fs = require('graceful-fs');
const express = require('express');
const cors = require('cors');
const i18n = require('i18n');
const logger = require('./logger/logger');
const mongoose = require('mongoose');
const StatsDClient = require('statsd-client');
const getRouteFilesInDir = require('./lib/getRouteFilesInDir');
const errorHandler = require('./middleware/errorHandler');
const securityCheck = require('./middleware/securityCheck');

const PORT = process.env.PORT || 5000;

// get mongo url from environment, else use local
const MONGO_URL_ENV = process.env.MONGO_URL;
const MONGO_URL_LOCAL = 'mongodb://localhost:27017/silversearch';
const MONGO_URL = _.isEmpty(MONGO_URL_ENV) ? MONGO_URL_LOCAL : MONGO_URL_ENV;
const STATSD_HOST = process.env.STATSD_HOST || '54.215.134.149';
const STATSD_PORT = process.env.STATSD_PORT || 8125;

const app = express();

if (!process.env.DEV_LOCAL) {
  const statsd = new StatsDClient({ host: STATSD_HOST, port: STATSD_PORT, debug: true });
  app.use(statsd.helpers.getExpressMiddleware('silversuite', { timeByUrl: true }));
}

app.use(cors());

app.use('/templates', express.static('templates'));

app.use((req, res, next) => {
  logger.debug('Route:', req.url, req.headers);
  next();
});

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(express.static('public'));

// Configure i18n
i18n.configure({
  locales: ['en'],
  register: global,
  directory: `${__dirname}/locales`,
  updateFiles: false,
  objectNotation: true,
});

app.use(i18n.init);

// connect mongoose to Mongo
const mongooseOptions = {
  db: { safe: true },
  server: {
    socketOptions: {
      keepAlive: 1,
    },
  },
};
mongoose.Promise = global.Promise;
logger.debug('connecting to DB: ', MONGO_URL);
mongoose.connect(MONGO_URL, mongooseOptions);

// Require all routes in Silver Sweetness Server
// with route prefix of /api/* to run security check
app.use(/^\/api\/(?!facilities|user|facility-search).*$/, securityCheck('general'));

// Require all routes in Silver Sweetness Server
// with route prefix of /silver-sign/* to run security check
app.use('/silver-sign/*', securityCheck('silverSign'));

const routeFiles = getRouteFilesInDir(path.join(__dirname, '/routes'));
routeFiles.forEach((routeFile) => {
  /* eslint-disable global-require, import/no-dynamic-require */
  require(routeFile)(app);
  /* eslint-enable global-require, import/no-dynamic-require */
});

fs.readdirSync(`${__dirname}/schedule`).forEach((file) => {
  /* eslint-disable global-require, import/no-dynamic-require */
  require(`./schedule/${file}`).runSchedule();
  /* eslint-enable global-require, import/no-dynamic-require */
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`SilverSuite listening on port ${PORT}`);
});

exports.app = app;
