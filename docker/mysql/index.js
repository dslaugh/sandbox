const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'secret',
	database: 'todos',
});


con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});

const sql = 'SELECT * FROM todo_items';
//const sql = 'SHOW TABLES';
con.query(sql, function(err, result, fields) {
	if (err) throw err;
	result.forEach((row) => {
		console.log(row.id, row.name, row.completed);
	});
});

con.end();
