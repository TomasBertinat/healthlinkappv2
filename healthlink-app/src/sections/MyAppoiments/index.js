import React, { useState, useEffect } from 'react';
import { Avatar, List, Rate, message } from 'antd';
import Doctor1 from '../../assets/doctor/doctor-1.png';
import Doctor2 from '../../assets/doctor/doctor-2.png';
import Doctor3 from '../../assets/doctor/doctor-3.png';
import Doctor4 from '../../assets/doctor/doctor-4.png';
import Doctor5 from '../../assets/doctor/doctor-5.png';
import Doctor6 from '../../assets/doctor/doctor-6.png';
import Doctor7 from '../../assets/doctor/doctor-7.png';
import Doctor8 from '../../assets/doctor/doctor-8.png';

const doctorImages = [Doctor1, Doctor2, Doctor3, Doctor4, Doctor5, Doctor6, Doctor7, Doctor8];

// Asumimos que el paciente está logueado y su ID es 1
const idPaciente = 1;

const App = () => {
	const [turnos, setTurnos] = useState([]); // Estado para almacenar los turnos
	const [loading, setLoading] = useState(true); // Estado de carga

	// Función para obtener los turnos del paciente
	const fetchTurnos = async () => {
		try {
			const response = await fetch(`http://localhost:4000/turnos/${idPaciente}`);
			if (response.ok) {
				const data = await response.json();
				setTurnos(data); // Guardar los turnos en el estado
			} else {
				message.error('Error al obtener los turnos');
			}
		} catch (error) {
			console.error('Error en la solicitud:', error);
			message.error('Error en la solicitud al obtener los turnos');
		} finally {
			setLoading(false);
		}
	};

	// Hook para obtener los turnos cuando se monta el componente
	useEffect(() => {
		fetchTurnos();
	}, []);

	// Generar imágenes para los médicos de los turnos
	const getDoctorImage = (index) => doctorImages[index % doctorImages.length];

	return (
		<>
			<List
				itemLayout="horizontal"
				dataSource={turnos}
				loading={loading}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={getDoctorImage(index)} />}
							title={
								<>
									<a style={{ marginRight: '20px' }} href="">
										Dr. {item.nombre_medico} {item.apellido_medico}
									</a>
									<Rate allowHalf defaultValue={item.calificacion || 0} />
								</>
							}
							description={`Usted tiene un turno el día ${item.dia} a las ${item.horario}`}
						/>
					</List.Item>
				)}
			/>
		</>
	);
};

export default App;
