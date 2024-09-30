const express = require('express');
const router = express.Router();
const db = require('../db'); // Asumiendo que tienes una conexión a MySQL en `db.js`

// Crear un turno
router.post('/', async (req, res) => {
	const { idmedico, dia, horario, idpaciente } = req.body;

	// Validar que todos los campos requeridos estén presentes
	if (!idmedico || !dia || !horario || !idpaciente) {
		return res.status(400).send('Faltan datos requeridos para crear el turno');
	}

	try {
		// Verificar si ya existe un turno en el mismo día y horario para el mismo médico

		// Validar si el email ya existe
		const checkEmailQuery = 'SELECT * FROM turnos WHERE id_medico = ? AND dia = ? AND horario = ?';
		db.execute(checkEmailQuery, [idmedico, dia, horario], (err, results) => {
			if (err) {
				return res.status(500).send('Error al validar el correo electrónico');
			}

			if (results.length > 0) {
				return res.status(400).send('Ya existe un turno para este médico en el día y horario seleccionado');
			}

			db.execute(`
			INSERT INTO turnos (id_medico, id_paciente, dia, horario, calificacion) 
			VALUES (?, ?, ?, ?, 0)`, [idmedico, idpaciente, dia, horario],
				(err, results) => {
					if (err) {
						return res.status(500).send('Error al validar el correo electrónico');
					}
					res.status(201).send('Turno creado exitosamente');


				});

		})

	} catch (err) {
		console.error('Error al crear el turno:', err);
		return res.status(500).send('Error al crear el turno');
	}
});

router.get('/:id_paciente', async (req, res) => {
	const { id_paciente } = req.params;

	try {
		// Consulta para obtener los turnos del paciente
		db.execute(`
			SELECT t.id_turno, t.dia, t.horario, t.calificacion, m.nombre AS nombre_medico, m.apellido AS apellido_medico
			FROM turnos t
			JOIN medicos m ON t.id_medico = m.id_medico
			WHERE t.id_paciente = ?`,
			[id_paciente],
			(err, result) => {

				if (err) {
					return res.status(500).send('Error obteniendo turnos');
				}

				if (result.length === 0) {
					return res.status(404).send('No se encontraron turnos para este paciente');
				}
				res.status(200).json(result);

			});

	} catch (err) {
		console.error('Error al obtener los turnos:', err);
		return res.status(500).send('Error al obtener los turnos');
	}
});
module.exports = router;
