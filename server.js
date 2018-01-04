var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var db = require('./app/config/database')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

var Router = require('./app/config/router')

Router(app)
db.config({
    type: db.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "CRM",
    username: null,
    password: null
})

app.listen(process.env.PORT | 8080, () => {
	console.log('The server is litening in :8080')
})
