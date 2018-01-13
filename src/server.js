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


Router(app)
DbConfig("mongodb://mongo/CRM")

exports.Server = app