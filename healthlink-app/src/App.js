import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Row } from 'antd';
import Register from './sections/register'
import Logo from './logo.png'
import Login from './sections/login'
import MainPanel from './sections/mainPanel';
import DepartmentList from './sections/departmentList'
import DoctorList from './sections/doctorList'
import MyAppos from './sections/MyAppoiments'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/mainpanel/departmentlist" element={<MainPanel childComponent={<DepartmentList />} />} />
        <Route exact path="/mainpanel/doctorlist" element={<MainPanel childComponent={<DoctorList />} />} />
        <Route exact path="/mainpanel/myappos" element={<MainPanel childComponent={<MyAppos />} />} />

      </Routes>

    </BrowserRouter>
  );
}

/*
<Row style={{ marginTop: '5%' }} justify={'center'}>
        <img alt='' style={{ width: '250px', height: '250px' }} src={Logo} />
      </Row>

*/

export default App;

