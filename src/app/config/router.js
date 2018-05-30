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
		.get(Authenticate({}), user.info)

	app.route('/users')
		.get(Authenticate({}), user.getAllUsers)
		.post(Authenticate({permission: 'addUser'}), user.addNewUser)
	
	app.route('/users/:id')
		.get(Authenticate({}), user.getById)
		.put(Authenticate({permission: 'updateUser'}), user.updateById)

	app.route('/stores')
		.get(Authenticate({}), store.getAll)
		.post(Authenticate({permission: 'addStore'}), store.addNew)
	
	app.route('/stores/:id')
		.put(Authenticate({permission: 'updateStore', limit: {path: 'id', property: 'stores'}}), store.putById)

	app.route('/stores/:store/products')
		.get(Authenticate({limit: {path: 'store', property: 'stores'}}), product.getAll)
		.post(Authenticate({permission: 'addProduct', limit: {path: 'store', property: 'stores'}}), product.addNew) // Add in stock
	
	app.route('/stores/:store/products/:id')
		.put(Authenticate({permission: 'updateProduct', limit: {path: 'store', property: 'stores'}}), product.putById)
		.post(Authenticate({permission: 'addInStock', limit: {path: 'store', property: 'stores'}}), product.addInStockById)
	
	app.route('/stores/:store/sales')
		.get(Authenticate({limit: {path: 'store', property: 'stores'}}), sale.getAll)
		.post(Authenticate({permission: 'sell', limit: {path: 'store', property: 'stores'}}), sale.sell)
	
	app.route('/*')
		.get(notFound)
		.post(notFound)
		.put(notFound)
		.delete(notFound)
}
