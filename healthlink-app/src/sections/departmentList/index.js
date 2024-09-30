import React from 'react';
import { Avatar, Card } from 'antd';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme, Row, Col } from 'antd';
import CardDepartment from '../cardDepartment';
import CardeoImg from '../../assets/cardeo.jpeg';
import NeuroImg from '../../assets/neuro.jpeg'
import CirugiaImg from '../../assets/cirugia.jpeg'
import DentistImg from '../../assets/dentist.jpeg'
import RadioImg from '../../assets/radio.jpeg'
import TraumaImg from '../../assets/trauma.jpeg'

const App = () => {


	return (
		<>
			<Row>
				<Col span={8}>
					<CardDepartment img={CardeoImg}
						name="Cardiologia"
						desc="La cardiología es la especialidad médica dedicada al estudio, diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio."

					/>
				</Col>
				<Col span={8}>
					<CardDepartment img={NeuroImg}
						name="Neurología"
						desc="La neurología es la rama de la medicina que estudia y trata las enfermedades del sistema nervioso."
					/>
				</Col>
				<Col span={8}>
					<CardDepartment img={CirugiaImg}
						name="Cirugía"
						desc="La cirugía es el campo de la medicina que se dedica a realizar intervenciones quirúrgicas para tratar enfermedades, lesiones o afecciones físicas mediante procedimientos específicos y precisos."

					/>
				</Col>
			</Row>
			<br />
			<br />
			<Row>
				<Col span={8}>
					<CardDepartment img={DentistImg}
						name="Odontología"
						desc="Un dentista es un profesional de la salud que cuida y trata los dientes y las encías."

					/>
				</Col>
				<Col span={8}>
					<CardDepartment img={RadioImg}
						name="Radiología"
						desc="La radiología es la especialidad médica que utiliza imágenes médicas, como rayos X, tomografías, resonancias magnéticas y ecografías, para diagnosticar y tratar enfermedades y lesiones."
					/>
				</Col>
				<Col span={8}>
					<CardDepartment img={TraumaImg}
						name="Traumatología"
						desc="La traumatología es la especialidad médica que se enfoca en el diagnóstico, tratamiento y rehabilitación de lesiones musculoesqueléticas, como fracturas, luxaciones y lesiones deportivas."

					/>
				</Col>
			</Row>
		</>
	)
}


export default App;