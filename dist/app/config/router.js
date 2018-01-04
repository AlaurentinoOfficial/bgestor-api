'use strict';

exports.Router = function (app) {
	app.get('/helloworld', function (req, res) {
		res.send('/hello.html');
	});
};