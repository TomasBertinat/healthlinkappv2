import React, { useState } from 'react';
import Logo from '../../logo.png'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme, Row, Col } from 'antd';
import LOGO from '../../assets/healthlink-logo2.png'

const { Header, Sider, Content } = Layout;
const App = (params) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const navigate = useNavigate();

	const handleMenuClick = (key) => {

		switch (key) {
			case '1':
				navigate("/mainpanel/departmentlist")
				break;
			case '2':
				navigate("/mainpanel/doctorlist")
				break;
			case '3':
				navigate("/mainpanel/myappos")
				break;
			case '4':
				navigate("/login")
				break;
			default:
				break;
		}
	};


	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Row justify={'center'}>
					<img src={LOGO} alt='Logo' style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
				</Row>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					onClick={({ key }) => handleMenuClick(key)}

					items={[
						{
							key: '1',
							icon: <UserOutlined />,
							label: 'Home',
						},
						{
							key: '2',
							icon: <UserOutlined />,
							label: 'Buscar Especialista',
						},
						{
							key: '3',
							icon: <VideoCameraOutlined />,
							label: 'Mis Turnos',
						},
						{
							key: '4',
							icon: <UploadOutlined />,
							label: 'Logout',
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 1000,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{params.childComponent}
				</Content>
			</Layout>
		</Layout>
	);
};
export default App;