var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import {DbConfig, Mongo} from './app/config/database'
import {Router} from './app/config/router'
import {Passport} from './app/config/passport'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.set('crypt_key', 'dfhads8g3bfosdfs')

Router(app)
DbConfig({
    type: Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "CRM",
    username: null,
    password: null
})
Passport(app)

app.listen(process.env.PORT | 8080, () => {
	console.log('The server is litening in :8080')
})
