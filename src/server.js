var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var passport = require("passport")

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

Passport(app)
app.use(passport.initialize());
app.use(passport.session());


Router(app)
DbConfig({
    type: Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "CRM",
    username: null,
    password: null
})

// SolutionSchema.create({name: "STEAPH"}, (err, solution) => {
//     if(err)
//         return console.log("Solution not created");

//     UserSchema.create({solution: solution, email: "alaurentino.br@gmail.com", password: "1234567890n"}, (err, user) => {
//         if(err)
//             return console.log("User not created");
        
//         console.log("Succefuly");
//     })
// });

exports.Server = app