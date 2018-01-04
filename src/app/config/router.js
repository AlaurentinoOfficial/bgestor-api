import * as product from '../controllers/product' 

exports.Router = (app) => {
	app.get('/helloworld', (req, res) => {
		res.send('/hello.html')	
	})

	app.get('/products', product.get)
}
