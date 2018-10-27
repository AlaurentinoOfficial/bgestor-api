var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser')

import { AllowCrossDomain } from './app/middlewares/cors'
import { DbConfig } from './app/config/database'
import { Router } from './app/config/router'

app.use(AllowCrossDomain)
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('crypt_key', 'ksdfadsklfjo34e')
app.set('port', process.env.PORT || 8080)

Router(app)
DbConfig("mongodb://localhost:27017/fastb")

exports.Server = app