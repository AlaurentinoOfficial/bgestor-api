'use strict';

var _server = require('../server');

_server.Server.listen(_server.Server.get('port'), function () {
	console.log('The server is litening in :' + _server.Server.get('port'));
});