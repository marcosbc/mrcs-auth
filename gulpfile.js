'use strict';
var gulp = require('gulp');
var mongoose = require('mongoose');
var Token = require('./app/models/token');
var config;
try {
  config = require('./conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
gulp.task('list', (callback) => {
  mongoose.connect(config.mongoDbUri);
  Token.find({}, (err, data) => {
    if (!err) {
      console.log(data);
    }
    mongoose.connection.close(function () {
      callback(err);
    });
  });
});
gulp.task('clean', (callback) => {
  mongoose.connect(config.mongoDbUri);
  Token.remove({}, (err) => {
    mongoose.connection.close(function () {
      callback(err);
    });
  });
});
