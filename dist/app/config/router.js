'use strict';

var _user = require('../controllers/user');

var user = _interopRequireWildcard(_user);

var _store = require('../controllers/store');

var store = _interopRequireWildcard(_store);

var _product = require('../controllers/product');

var product = _interopRequireWildcard(_product);

var _sale = require('../controllers/sale');

var sale = _interopRequireWildcard(_sale);

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

	app.route('/store/:store/products').get(_passport.Authenticate, product.get).post(_passport.Authenticate, product.post);

	app.route('/sale/:store').post(_passport.Authenticate, sale.post);
};