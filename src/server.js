var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser')

import { AllowCrossDomain } from './app/middlewares/cors'
import { DbConfig, Mongo } from './app/config/database'
import { Router } from './app/config/router'
import { Markup } from './app/models/analytics';

app.use(AllowCrossDomain)
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('crypt_key', 'ksdfadsklfjo34e')
app.set('port', process.env.PORT || 8080)

var argv = process.argv.slice(2)

Router(app)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

exports.Server = app