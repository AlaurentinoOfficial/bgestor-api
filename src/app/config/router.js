var passport = require("passport")

import * as product from '../controllers/product' 
import * as user from '../controllers/user' 

exports.Router = (app) => {
	app.get('/helloworld', (req, res) => {
		res.send('/hello.html')	
	})

	app.route('/login')
		.post(user.login)

	app.route('/products')
		.get(passport.authenticate('jwt', {sessions: false}), product.get)
}
