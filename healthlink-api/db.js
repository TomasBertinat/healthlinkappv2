const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'health-app-db'
});

connection.connect((err) => {
	if (err) {
		console.error('Error conectando a la base de datos:', err.stack);
		return;
	}
	console.log('Conectado a la base de datos MySQL con ID:', connection.threadId);
});

module.exports = connection;
