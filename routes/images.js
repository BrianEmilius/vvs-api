const fs = require('fs');
// const gm = require('gm');

module.exports = function (server) {
	server.get('/images/:name', (req, res) => {
		fs.open(`../assets/images/${req.params.name}`, 'r', (err, fd) => {
			console.log(fd);
			if (!err) {
				res.setHeader('content-type', 'image/png');
				res.write(fd);
			}
			res.end();
		});
	});

	server.get('/images/:name/:width/:height', (req, res) => {
		res.end();
	});
};