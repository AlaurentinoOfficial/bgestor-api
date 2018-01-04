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
app.set('port', 8080);

(0, _router.Router)(app);
(0, _database.DbConfig)({
    type: _database.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "CRM",
    username: null,
    password: null
});

// SolutionSchema.create({name: "STEAPH"}, (err, solution) => {
//     if(err)
//         return console.log("Solution not created");

//     UserSchema.create({solution: solution, email: "alaurentino.br@gmail.com", password: "1234567890n"}, (err, user) => {
//         if(err)
//             return console.log("User not created");

//         console.log("Succefuly");
//     })
// });

exports.Server = app;