const express = require('express');
const router = express.Router();
const db = require('../db'); // Importar la conexión a MySQL

// Registro
router.post('/register', (req, res) => {
	const { email, apellido, nombre, direccion, telefono, password } = req.body;

	// Validar si el email ya existe
	const checkEmailQuery = 'SELECT * FROM pacientes WHERE email = ?';
	db.execute(checkEmailQuery, [email], (err, results) => {
		if (err) {
			return res.status(500).send('Error al validar el correo electrónico');
		}

		if (results.length > 0) {
			// Si el correo ya existe, no se inserta el paciente
			return res.status(400).send('El correo electrónico ya está registrado');
		}

		const query = 'INSERT INTO pacientes (email, apellido, nombre, direccion, telefono) VALUES (?, ?, ?, ?, ?)';
		db.execute(query, [email, apellido, nombre, direccion, telefono], (err, results) => {
			if (err) {
				return res.status(500).send('Error al crear paciente');
			}
			const { insertId } = results;
			const query = 'INSERT INTO registro (id_paciente, password) VALUES (?, ?)';
			db.execute(query, [insertId, password], (err, results) => {
				if (err) {
					return res.status(500).send('Error al crear registro');
				}
				res.status(201).send('Registro creado');
			});
		});
	});
});

// Login
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	const query = `
        SELECT p.id_paciente
        FROM pacientes p
        JOIN registro r ON p.id_paciente = r.id_paciente
        WHERE p.email = ? AND r.password = ?
    `;

	db.execute(query, [email, password], (err, results) => {
		if (err) {
			console.error('Error en la consulta:', err);
			return res.status(500).send('Error en el servidor');
		}

		if (results.length > 0) {
			// Si se encuentra un registro, los datos son correctos
			res.status(200).send('Email y password correctos');
		} else {
			// No se encontró ningún registro, los datos no coinciden
			res.status(401).send('Email o password incorrectos');
		}
	});
});

// Logout
router.post('/logout', (req, res) => {
	const { idpaciente } = req.body;
	// Lógica para logout del paciente
	res.status(200).send('Logout exitoso');
});

module.exports = router;
