import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const App = (params) => {
	const navigate = useNavigate();

	const irADoctorList = () => {
		navigate("/mainpanel/doctorlist")
	}
	return (
		<Card
			onClick={() => irADoctorList()}
			style={{
				width: 300,
				cursor: 'pointer'
			}}
			cover={
				<img
					alt="example"
					src={params.img}
				/>
			}
		>
			<Meta
				title={params.name}
				description={params.desc}
			/>

		</Card>
	)
}


export default App;