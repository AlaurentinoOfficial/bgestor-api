import {Server} from '../server'

Server.listen(Server.get('port'), () => {
	console.log('The server is litening in :' + Server.get('port'))
})