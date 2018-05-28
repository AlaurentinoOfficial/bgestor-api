import { Server } from '../server'
import { cyan, blue, green, bold } from 'colors'

Server.listen(Server.get('port'), () => {
	console.log(bold(green('\n➜  ')) + bold(cyan('SERVER:')) + " Listening in " + bold(blue(`:${Server.get('port')}`)))
})