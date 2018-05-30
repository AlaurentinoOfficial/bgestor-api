import * as user from '../controllers/user' 
import * as store from '../controllers/store' 
import * as product from '../controllers/product' 
import * as sale from '../controllers/sale' 

import * as jwt from "jsonwebtoken";
import { Server } from "../../server";
import { UserSchema } from "../models/user";
import { Authenticate } from '../middlewares/passport';
import { Strings } from './strings';

var notFound = (req, res) => res.json({status: false, value: Strings.INVALID_ROUTE})

exports.Router = (app) => {

	app.route('/login')
		.post(user.login)

	app.route('/info')
		.get(Authenticate({level: ['admin', 'reader', 'salesman']}), user.info)

	app.route('/users')
		.get(Authenticate({level: ['admin', 'reader']}), user.getAllUsers)
		.post(Authenticate({level: ['admin']}), user.addNewUser)
	
	app.route('/users/:id')
		.get(Authenticate({level: ['admin', 'reader']}), user.getById)
		.put(Authenticate({level: ['admin']}), user.updateById)

	app.route('/stores')
		.get(Authenticate({level: ['admin', 'reader', 'salesman']}), store.getAll)
		.post(Authenticate({level: ['admin']}), store.addNew)
	
	app.route('/stores/:id')
		.put(Authenticate({level: ['admin']}), store.putById)

	app.route('/stores/:store/products')
		.get(Authenticate({level: ['admin', 'reader', 'salesman']}), product.getAll)
		.post(Authenticate({level: ['admin']}), product.addNew) // Add in stock
	
	app.route('/stores/:store/products/:id')
		.put(Authenticate({}), product.putById)
		.post(Authenticate({level: ['admin']}), product.addInStockById)
	
	app.route('/stores/:store/sales')
		.get(Authenticate({level: ['admin', 'reader', 'salesman']}), sale.getAll)
		.post(Authenticate({level: ['admin', 'reader', 'salesman']}), sale.sell)
	
	app.route('/*')
		.get(notFound)
		.post(notFound)
		.put(notFound)
		.delete(notFound)
}
