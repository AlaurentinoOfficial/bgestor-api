'use strict';

var _database = require('./app/config/database');

var _passport = require('./app/config/passport');

var _router = require('./app/config/router');

var _solution = require('./app/models/solution');

var _product = require('./app/models/product');

var _user = require('./app/models/user');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.set('crypt_key', 'dfhads8g3bfosdfs');
app.set('port', process.env.PORT || 3000);

(0, _router.Router)(app);
(0, _database.DbConfig)("mongodb://localhost:27017/CRM");

exports.Server = app;