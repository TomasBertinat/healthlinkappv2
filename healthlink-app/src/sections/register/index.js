import React from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/healthlink-logo2-v2.png';
import './register.css';

const App = () => {
	const navigate = useNavigate();

	const irALogin = () => {
		navigate('/login');
	};

	const irAMainPanel = () => {
		navigate('/mainpanel/departmentlist');
	};

	// Modificar la función onFinish para hacer la solicitud al endpoint de registro
	const onFinish = async (values) => {
		try {
			const response = await fetch('http://localhost:4000/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: values.email,
					apellido: values.lastname,
					nombre: values.firstname,
					direccion: values.address,
					telefono: values.phone,
					password: values.password,
				}),
			});

			if (response.ok) {
				message.success('Registro exitoso');
				irALogin(); // Redirigir al login solo si el registro fue exitoso
			} else {
				const errorMessage = await response.text();
				message.error(errorMessage); // Mostrar el mensaje de error proveniente del servidor
			}
		} catch (error) {
			message.error('Error en el servidor. Intenta nuevamente.');
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		message.error('Verifica los campos e intenta nuevamente.');
	};

	return (
		<div className='fondo-register'>
			<Row className='form-position-register' justify={"left"}>
				<Col>
					<img src={LOGO} alt='Logo' style={{ width: '300px', marginBottom: '20px', marginTop: '20px' }} />
				</Col>
			</Row>
			<Row justify={"left"}>

				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish} // Llamar a onFinish para hacer la solicitud de registro
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Apellido"
								name="lastname"
								rules={[
									{
										required: true,
										message: 'Ingrese su apellido!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Nombre"
								name="firstname"
								rules={[
									{
										required: true,
										message: 'Ingrese su nombre!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Telefono"
								name="phone"
								rules={[
									{
										required: true,
										message: 'Ingrese su telefono!',
									},
								]}
							>
								<Input type='number' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Direccion"
								name="address"
								rules={[
									{
										required: true,
										message: 'Ingrese su direccion!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: 'Ingrese su email!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Clave"
								name="password"
								rules={[
									{
										required: true,
										message: 'Ingrese su contraseña!',
									},
								]}
							>
								<Input.Password />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						wrapperCol={{
							offset: 7,
							span: 16,
						}}
					>
						<Button size='large' type="primary" htmlType="submit"
							style={{ marginRight: '10px' }}
						>
							Registrarse
						</Button>
						<Button size='large' type="primary" onClick={irALogin}>
							Ir a Login
						</Button>
					</Form.Item>

				</Form >
			</Row>
		</div>
	)
}

export default App;
