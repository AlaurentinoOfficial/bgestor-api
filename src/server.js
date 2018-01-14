var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import {DbConfig, Mongo} from './app/config/database'
import {Passport} from './app/config/passport'
import {Router} from './app/config/router'

import {SolutionSchema} from './app/models/solution'
import {ProductSchema} from './app/models/product'
import {UserSchema} from './app/models/user'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 3000)

var argv = process.argv.slice(2)

Router(app)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

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

exports.Server = app