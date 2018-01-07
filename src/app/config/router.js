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
		.get(Authenticate({level: 'admin'}), store.get)
		.post(Authenticate({level: 'admin'}), store.post)
	
	app.route('/store/:id')
		.put(Authenticate({level: 'admin'}), store.putById)

	app.route('/store/:store/products')
		.get(Authenticate({level: 'saler'}), product.get)
		.post(Authenticate({level: 'admin'}), product.post)
	
	app.route('/product/:id')
		.put(Authenticate({level: 'admin'}), product.putById)
		.post(Authenticate({level: 'admin'}), product.postById)
	
	app.route('/sale/:store')
		.get(Authenticate({level: 'saler'}), sale.get)
		.post(Authenticate({level: 'saler'}), sale.post)
}
