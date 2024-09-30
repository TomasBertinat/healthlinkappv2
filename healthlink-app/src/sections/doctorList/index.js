import React, { useState, useEffect } from 'react';
import { Avatar, List, Rate, Modal, TimePicker, Calendar, theme, Row, message } from 'antd';
import Doctor1 from '../../assets/doctor/doctor-1.png';
import Doctor2 from '../../assets/doctor/doctor-2.png';
import Doctor3 from '../../assets/doctor/doctor-3.png';
import Doctor4 from '../../assets/doctor/doctor-4.png';
import Doctor5 from '../../assets/doctor/doctor-5.png';
import Doctor6 from '../../assets/doctor/doctor-6.png';
import Doctor7 from '../../assets/doctor/doctor-7.png';
import Doctor8 from '../../assets/doctor/doctor-8.png';
import dayjs from 'dayjs';

const doctorImages = [Doctor1, Doctor2, Doctor3, Doctor4, Doctor5, Doctor6, Doctor7, Doctor8];

// Descripciones estáticas para los médicos
const descriptions = [
	"Experto en medicina con 15 años de experiencia clínica.",
	"Especialista en salud, reconocido por su investigación en enfermedades crónicas.",
	"Profesional médico, autor de varios artículos científicos.",
	"Doctor en medicina, galardonado con premios por su labor humanitaria.",
	"Médico acreditado, con una práctica privada exitosa.",
	"Especialista en salud, consultor en hospitales de renombre.",
	"Experto médico, conocido por su enfoque innovador en tratamientos.",
	"Doctor en medicina, conferencista internacional en su campo."
];

// Función para obtener una descripción aleatoria del conjunto
const getRandomDescription = () => {
	return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const App = () => {
	const [doctors, setDoctors] = useState([]); // Estado para almacenar los médicos
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada
	const [selectedTime, setSelectedTime] = useState(null); // Estado para la hora seleccionada
	const [selectedDoctor, setSelectedDoctor] = useState(null); // Estado para el médico seleccionado
	const idPaciente = 1; // Suponemos que este es el id del paciente logueado

	// Fetch de los médicos al montar el componente
	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const response = await fetch('http://localhost:4000/medicos');
				if (response.ok) {
					const data = await response.json();
					// Asignar imágenes y descripciones aleatorias a cada médico
					const doctorsWithImagesAndDescriptions = data.map((doctor, index) => ({
						...doctor,
						img: doctorImages[index % doctorImages.length], // Asigna una imagen de la lista
						desc: getRandomDescription(), // Asigna una descripción aleatoria
					}));
					setDoctors(doctorsWithImagesAndDescriptions);
				} else {
					console.error('Error al obtener los médicos:', response.statusText);
				}
			} catch (error) {
				console.error('Error en la solicitud:', error);
			}
		};

		fetchDoctors();
	}, []); // El segundo parámetro vacío asegura que solo se ejecute una vez al montar

	const onPanelChange = (value) => {
		setSelectedDate(value); // Almacenar la fecha seleccionada
	};

	const onTimeChange = (time) => {
		setSelectedTime(time); // Almacenar la hora seleccionada
	};

	const showModal = (doctor) => {
		setSelectedDoctor(doctor); // Almacenar el médico seleccionado
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (selectedDate && selectedTime && selectedDoctor) {
			// Extraer solo la fecha (YYYY-MM-DD) y la hora (HH:mm)
			const dia = dayjs(selectedDate).format('YYYY-MM-DD');
			const horario = dayjs(selectedTime).format('HH:mm');

			// Enviar la solicitud a la API
			try {
				const response = await fetch('http://localhost:4000/turnos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						idmedico: selectedDoctor.id_medico, // ID del médico seleccionado
						dia: dia, // Fecha seleccionada
						horario: horario, // Hora seleccionada
						idpaciente: idPaciente // ID del paciente logueado
					}),
				});

				if (response.ok) {
					message.success('Turno creado exitosamente');
				} else {
					const errorData = await response.text();
					message.error(`Error al crear el turno: ${errorData}`);
				}
			} catch (error) {
				console.error('Error en la solicitud:', error);
				message.error('Error en la solicitud al crear el turno');
			}
		} else {
			console.error('Por favor, selecciona una fecha, hora y médico.');
			message.error('Por favor, selecciona una fecha, hora y médico.');
		}

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const { token } = theme.useToken();

	const wrapperStyle = {
		width: 300,
		border: `1px solid ${token.colorBorderSecondary}`,
		borderRadius: token.borderRadiusLG,
	};

	return (
		<>
			<Modal title="Agendar Turno" open={isModalOpen}
				onOk={handleOk} onCancel={handleCancel}
				okText='Agendar'
			>
				<Row justify='center'>
					<div>
						<div style={wrapperStyle}>
							<Calendar fullscreen={false} onSelect={onPanelChange} />
						</div>
						<br />
						<TimePicker onChange={onTimeChange} format='HH:mm' />
					</div>
				</Row>
			</Modal>

			<List
				itemLayout="horizontal"
				dataSource={doctors} // Usamos los médicos obtenidos de la API
				renderItem={(item) => (
					<List.Item
						actions={[<a
							onClick={() => showModal(item)} // Pasar el médico seleccionado al abrir el modal
							key="list-loadmore-edit">Agendar Turno
						</a>]}
					>
						<List.Item.Meta
							avatar={<Avatar src={item.img} />} // Usa la imagen asignada
							title={
								<>
									<a style={{ marginRight: '20px' }} href="">{item.nombre} {item.apellido}</a>
									<Rate allowHalf defaultValue={item.rating || 0} />
								</>
							}
							description={item.desc} // Descripción aleatoria del conjunto
						/>
					</List.Item>
				)}
			/>
		</>
	)
};

export default App;
