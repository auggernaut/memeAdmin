var Parse = require('node-parse-api').Parse,
    config = require('../config');

var APP_ID = config.parse_appid;
var RESTAPI_KEY = config.parse_restapikey;

var Squishle = new Parse(APP_ID, RESTAPI_KEY);

module.exports = Squishle;
