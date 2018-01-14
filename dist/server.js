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

var argv = process.argv.slice(2);

(0, _router.Router)(app);
(0, _database.DbConfig)(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM");

// SolutionSchema.create({name: "STEAPH", cnpj: "1234567894567"}, (err, solution) => {
//     if(err)
//         return console.log(err);

//     var b = {
//         solution: solution,
//         name: "Anderson Laurentino",
//         email: "alaurentino.br@gmail.com",
//         password: "1234567890n",
//         cpf: "12345678910",
//         gender: "male",
//         level: "admin"
//     }

//     UserSchema.create(b, (err, user) => {
//         if(err)
//             return console.log("User not created");

//         console.log("Succefuly");
//     })
// });

// UserSchema.findOne({}, (err, u) => {
//     if(err)
//         return console.log(err)

//     u.status = true
//     u.save()
//     console.log("OK!")
// })

exports.Server = app;