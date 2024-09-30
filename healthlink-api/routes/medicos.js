const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar la conexión a MySQL

// Obtener médicos
router.get('/', (req, res) => {
	const query = 'SELECT * FROM medicos';
	db.execute(query, [], (err, results) => {
		if (err) {
			return res.status(500).send('Error al obtener médicos');
		}
		res.status(200).json(results);
	});
})

module.exports = router;
