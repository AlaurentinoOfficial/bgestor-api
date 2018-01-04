module.exports = function Router(app) {
	app.get('/helloworld', (req, res) => {
		res.send('<h1>Hello, world2</h1>')	
	})
}
