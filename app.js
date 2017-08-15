const restify = require('restify');
const logger  = require('morgan');

const server = restify.createServer();

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

server.use(logger('dev'));

require('./routes/index')(server);

server.listen(1337);