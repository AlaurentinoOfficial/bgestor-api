import { Server } from '../server'
import { cyan, blue, green } from 'colors'

Server.listen(Server.get('port'), () => {
	console.log(green('➜  ') + cyan('SERVER:') + " Listening in " + blue(`:${Server.get('port')}`))
})