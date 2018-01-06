import * as user from '../controllers/user' 
import * as store from '../controllers/store' 
import * as product from '../controllers/product' 
import * as sale from '../controllers/sale' 

import * as jwt from "jsonwebtoken";
import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { Authenticate } from './passport';

exports.Router = (app) => {

	app.route('/login')
		.post(user.login)

	app.route('/stores')
		.get(Authenticate, store.get)
		.post(Authenticate, store.post)
	
	app.route('/store/:id')
		.put(Authenticate, store.putById)

	app.route('/store/:store/products')
		.get(Authenticate, product.get)
		.post(Authenticate, product.post)
	
	app.route('/product/:id')
		.put(Authenticate, product.putById)
		.post(Authenticate, product.postById)
	
	app.route('/sale/:store')
		.get(Authenticate, sale.get)
		.post(Authenticate, sale.post)
}
