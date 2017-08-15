const fs = require('fs');
const path = require('path');
const im = require('../services/imageMan');

const mainPath = path.join(__dirname, '..', 'assets', 'images');

module.exports = function (server) {
	server.get('/images/:name', (req, res) => {
		const file = path.join(mainPath, 'originals', req.params.name);
		if (fs.existsSync(file)) {
			fs.readFile(file, (err, data) => {
				if (err) {
					res.send(500, { 'code': 'InternalError', 'message': err });
					res.end();
				}
				res.sendRaw(200, data,
					{ 'Content-Length': Buffer.byteLength(data) });
				res.end();
			});
		} else {
			res.send(404, {
				'code': 'NotFound',
				'message': `The resource '${req.params.name}' was not found.`
			});
			res.end();
		}
	});

	server.get('/images/:name/:width', (req, res) => {
		const file = {
			'name': req.params.name,
			'path': mainPath
		};
		const width = parseInt(req.params.width); 
		im.resize(file, width)
			.then((resizedFile) => {
				fs.readFile(resizedFile, (err, newData) => {
					if (err) {
						res.send(500, { 'code': 'InternalError', 'message': err });
						res.end();
					}
					res.sendRaw(200, newData,
						{ 'Content-Length': Buffer.byteLength(newData) });
					res.end();
				});
			})
			.catch((err) => {
				res.send(500, { 'code': 'InternalError', 'message': err });
				res.end();
			});
	});
};
