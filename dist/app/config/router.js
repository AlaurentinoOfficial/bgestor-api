'use strict';

var _product = require('../controllers/product');

var product = _interopRequireWildcard(_product);

var _user = require('../controllers/user');

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var passport = require("passport");

exports.Router = function (app) {
	app.get('/helloworld', function (req, res) {
		res.send('/hello.html');
	});

	app.route('/login').post(user.login);

	app.route('/products').get(passport.authenticate('jwt', { sessions: false }), product.get);
};