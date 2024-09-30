import React from 'react';
import { Button, Checkbox, Form, Col, Input, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/healthlink-logo2-v2.png';
import './login.css';

const App = () => {
	const navigate = useNavigate();

	// Función para realizar la solicitud a la API de login
	const onFinish = async (values) => {
		try {
			const response = await fetch('http://localhost:4000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					email: values.username, // Username es el email en este caso
					password: values.password,
				}),
			});

			if (response.ok) {
				message.success('Login exitoso');
				// Redirigir al panel principal
				navigate('/mainpanel/departmentlist');
			} else {
				const errorMessage = await response.text();
				message.error(errorMessage); // Mostrar el mensaje de error desde la API
			}
		} catch (error) {
			message.error('Error en el servidor. Intenta nuevamente.');
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		message.error('Verifica los campos e intenta nuevamente.');
	};

	const irARegistro = () => {
		navigate('/register');
	};

	return (
		<div className='fondo-login'>
			<Row className='form-position' justify={"left"}>
				<Col>
					<img src={LOGO} alt='Logo' style={{ width: '300px', marginBottom: '20px', marginTop: '20px' }} />
				</Col>
			</Row>
			<Row className='form-position' justify={"left"}>
				<Col>
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
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="username"
							rules={[
								{
									required: true,
									message: 'Por favor ingresa tu email!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Por favor ingresa tu password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="remember"
							valuePropName="checked"
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
								Login
							</Button>
							<Button type="primary" onClick={() => irARegistro()}>
								Ir a Registro
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default App;
