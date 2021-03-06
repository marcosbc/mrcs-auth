'use strict';
// Dependencies and variables
var path = require('path');
var mongoose = require('mongoose');
var waitForMongo = require('wait-for-mongo');
var microservice = require('microservice-skeleton');
var authUtils = require('./lib');
var config;
var app;
// Try to load configuration file
try {
  config = require('../conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
// Express customizations and database init
microservice.registerHook('express', (expressInstance) => {
  app = expressInstance;
  app.set('config', config);
  app.set('authUtils', authUtils);
  waitForMongo(config.mongoDbUri, {
    timeout: config.mongoDbTimeout
  }, (err) => {
    if (err) {
      console.error('Timeout exceeded connecting to MongoDB');
      process.exit(1);
    }
    mongoose.connect(config.mongoDbUri);
    // This should ideally be done with Mongoose event handlers
    setInterval(() => {
      var dbConnected = mongoose.connection.readyState === 1;
      if (dbConnected) {
        app.set('ready', true);
      } else {
        app.set('ready', false);
      }
    }, 1000);
  });
});
// Populate controllers
microservice.registerHook('controllers', (registerDir) => {
  registerDir(path.join(__dirname, 'controllers'));
});
// Start the server
microservice.listen(config.port);
console.log('Auth server - Listening on ' + app.get('utils').http.getFrontEndUrl(config.frontend));
