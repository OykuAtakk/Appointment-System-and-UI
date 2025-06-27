import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Shared/Login";
import AdminScreen from './components/Admin/AdminScreen';
import DoctorScreen from "./components/Doctor/DoctorScreen";
import PatientScreen from "./components/Patient/PatientScreen";
import PatientManagement from "./components/Admin/PatientManagement";
import DoctorManagement from "./components/Admin/DoctorManagement";
import DepartmentManagement from  "./components/Admin/DepartmentManagement";
import AppointmentManagement from "./components/Admin/AppointmentManagement";
function App() {
  return (
    <Router>
      <div className="App">
        <h1>Randevu Sistemi</h1> 
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/DoctorManagement" element={<DoctorManagement />} />
          <Route path="/PatientManagement" element={<PatientManagement />} />
          <Route path="/DepartmentManagement" element={<DepartmentManagement />} />
          <Route path="/AppointmentManagement" element={<AppointmentManagement/>}/>
          <Route path="/doctor" element={<DoctorScreen/>}/>
          <Route path="/patient" element={<PatientScreen/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;