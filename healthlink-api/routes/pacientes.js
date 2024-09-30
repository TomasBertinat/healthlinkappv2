const express = require('express');
const router = express.Router();

// Obtener información del paciente
router.get('/', (req, res) => {
	const { idpaciente, rating } = req.query;
	// Lógica para obtener la información del paciente y el rating
	res.status(200).json({ paciente: {}, rating: 0 });
});

module.exports = router;
