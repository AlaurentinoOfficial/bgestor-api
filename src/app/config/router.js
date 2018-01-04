import * as user from '../controllers/user' 
import * as store from '../controllers/store' 
import * as product from '../controllers/product' 
import * as sale from '../controllers/sale' 

import * as jwt from "jsonwebtoken";
import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { Authenticate } from './passport';

exports.Router = (app) => {
	app.get('/helloworld', (req, res) => {
		res.send('/hello.html')	
	})

	app.route('/login')
		.post(user.login)

	app.route('/stores')
		.get(Authenticate, store.get)
		.post(Authenticate, store.post)

	app.route('/store/:store/products')
		.get(Authenticate, product.get)
		.post(Authenticate, product.post)
	
	app.route('/sale/:store')
		.post(Authenticate, sale.post)
}
