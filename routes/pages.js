const mysql = require('mysql2');
const db = mysql.createConnection({
	'host': 'localhost',
	'user': 'root',
	'password': '',
	'database': 'vvs'
});

module.exports = (server) => {
	// hent alle sider
	server.get('/pages', (req, res) => {
		db.query('SELECT id, title, body FROM pages', (error, rows) => {
			if (error) {
				res.status(500);
				res.end();
			}
			res.send(200, rows);
		});
	});

	// opret ny side
	server.post('/pages', (req, res) => {
		res.send(200, req.params);
	});

	server.get('/pages/:id', (req, res) => {
		db.execute('SELECT id, title, body FROM pages WHERE id = ?',
			[req.params.id], (error, row) => {
				if (error) {
					res.status(500);
					res.end();
				}
				if (Object.keys(row).length === 0 && row.constructor === Array) {
					res.status(400);
					res.end();
				} else {
					res.send(200, row);
				} 
			});
	});
};