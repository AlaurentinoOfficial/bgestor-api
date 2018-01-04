'use strict';

var _database = require('./app/config/database');

var _router = require('./app/config/router');

var _passport = require('./app/config/passport');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

app.set('crypt_key', 'dfhads8g3bfosdfs');

(0, _router.Router)(app);
(0, _database.DbConfig)({
    type: _database.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "CRM",
    username: null,
    password: null
});
(0, _passport.Passport)(app);

app.listen(process.env.PORT | 8080, function () {
    console.log('The server is litening in :8080');
});