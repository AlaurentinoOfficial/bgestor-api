module.exports = function Router(app) {
	app.get('/helloworld', (req, res) => {
		res.send('/hello.html')	
	})
}
