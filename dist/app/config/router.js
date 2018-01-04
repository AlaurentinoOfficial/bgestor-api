'use strict';

var _store = require('../controllers/store');

var store = _interopRequireWildcard(_store);

var _product = require('../controllers/product');

var product = _interopRequireWildcard(_product);

var _user = require('../controllers/user');

var user = _interopRequireWildcard(_user);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _server = require('../../server');

var _user2 = require('../models/user');

var _passport = require('./passport');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Router = function (app) {
	app.get('/helloworld', function (req, res) {
		res.send('/hello.html');
	});

	app.route('/login').post(user.login);

	app.route('/stores').get(_passport.Authenticate, store.get).post(_passport.Authenticate, store.post);

	app.route('/store/:id/products').get(_passport.Authenticate, product.get);
};