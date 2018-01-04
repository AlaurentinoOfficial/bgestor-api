var express = require('express')
var app = express()

var Router = require('./app/config/router')

Router(app)

app.listen(process.env.PORT | 3000, () => {
	console.log('The server is litening in :3000')
})
