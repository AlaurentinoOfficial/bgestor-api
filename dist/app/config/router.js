'use strict';

var _product = require('../controllers/product');

var product = _interopRequireWildcard(_product);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Router = function (app) {
	app.get('/helloworld', function (req, res) {
		res.send('/hello.html');
	});

	app.get('/products', product.get);
};