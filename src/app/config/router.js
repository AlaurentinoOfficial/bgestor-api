import * as store from '../controllers/store' 
import * as product from '../controllers/product' 
import * as user from '../controllers/user' 

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

	app.route('/products')
		.get(Authenticate, product.get)
}
