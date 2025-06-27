import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Patient.css';

function Patient() {
  const location = useLocation();
  const patientData = location.state;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    departmentId: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointment/patient/${patientData.id}`
        );
        setAppointments(response.data);
      } catch (err) {
        setError("Randevuları yüklerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/department');
        setDepartments(response.data);
      } catch (err) {
        setError("Departmanları yüklerken bir hata oluştu.");
      }
    };

    if (patientData && patientData.id) {
      fetchAppointments();
      fetchDepartments();
    }
  }, [patientData]);

  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setNewAppointment({ ...newAppointment, departmentId, doctorId: '' });

    if (departmentId) {
      try {
        const response = await axios.get(`http://localhost:8080/department/${departmentId}/doctors`);
        setDoctors(response.data);
        setDoctorAppointments([]);
        setAvailableSlots([]); 
      } catch (err) {
        setError("Doktorlar yüklenirken bir hata oluştu.");
      }
    } else {
      setDoctors([]);
      setDoctorAppointments([]);
      setAvailableSlots([]);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value
    });
  
    if ((name === "doctorId" || name === "date") && newAppointment.doctorId && newAppointment.date) {
      await fetchDoctorAppointments(newAppointment.date);
    }
  };

  const fetchDoctorAppointments = async (selectedDate) => {
    try {
      if (newAppointment.doctorId) {
        const response = await axios.get(
          `http://localhost:8080/appointment/doctor/${newAppointment.doctorId}`
        );
        const filteredAppointments = response.data.filter(
          appointment => appointment.appointmentDate === selectedDate
        );
  
        console.log("Filtered Appointments:", filteredAppointments); 
        setDoctorAppointments(filteredAppointments);
  
        const availableSlots = generateTimeSlots(filteredAppointments);
        setAvailableSlots(availableSlots);
      } else {
        setDoctorAppointments([]);
        setAvailableSlots(generateTimeSlots([]));
      }
    } catch (err) {
      setError("Doktor randevuları yüklenirken bir hata oluştu.");
    }
  };
  const generateTimeSlots = (doctorAppointments) => {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(8, 30, 0, 0);
    const endTime = new Date();
    endTime.setHours(17, 30, 0, 0);
  
    while (startTime <= endTime) {
      const timeString = startTime.toTimeString().slice(0, 5);
  
      const isBooked = doctorAppointments.some(
        appointment => appointment.appointmentTime.slice(0, 5) === timeString
      );
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return slots.filter(slot => !doctorAppointments.some(appointment => 
      appointment.appointmentTime.slice(0, 5) === slot));
  };
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/appointment', {
        patientId: patientData.id,
        doctorId: newAppointment.doctorId,
        departmentId: newAppointment.departmentId,
        date: newAppointment.date,
        time: newAppointment.time
      });
      alert("Randevu başarıyla oluşturuldu.");
      setShowAppointmentForm(false);
      setAppointments([...appointments, response.data]);
    } catch (error) {
      alert("Randevu oluşturulurken bir hata oluştu.");
    }
  };
  const handleAppointmentCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Bu randevuyu iptal etmek istediğinize emin misiniz?");
    if (confirmCancel) {
      try {
        await axios.delete(`http://localhost:8080/appointment/${appointmentId}`);
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
        alert("Randevu başarıyla iptal edildi.");
      } catch (error) {
        alert("Randevu iptal edilirken bir hata oluştu.");
      }
    }
  };
  if (!patientData) {
    return <div>Hasta bilgileri bulunamadı.</div>;
  }

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="patient-container">
      <h1>Hasta Bilgileri</h1>
      <p>Ad: {patientData.name}</p>
      <p>Soyad: {patientData.surname}</p>
      <p>ID: {patientData.id}</p>
      <p>TC Kimlik No: {patientData.tckn}</p>

      <h2>Randevular</h2>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarih</th>
              <th>Saat</th>
              <th>Doktor</th>
              <th>Departman</th>
              <th>İptal</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.departmentName}</td>
                <td>
                  <button onClick={() => handleAppointmentCancel(appointment.id)}>İptal</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Henüz randevu bulunmuyor.</p>
      )}
      <button onClick={() => setShowAppointmentForm(!showAppointmentForm)}>
        {showAppointmentForm ? "Formu Kapat" : "Randevu Oluştur"}
      </button>

      {showAppointmentForm && (
        <form onSubmit={handleAppointmentSubmit} className="appointment-form">
          <h3>Yeni Randevu Oluştur</h3>
          <select
            name="departmentId"
            value={newAppointment.departmentId}
            onChange={handleDepartmentChange}
            required
          >
            <option value="">Departman Seçin</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <select
            name="doctorId"
            value={newAppointment.doctorId}
            onChange={handleInputChange}
            required
            disabled={!newAppointment.departmentId}
          >
            <option value="">Doktor Seçin</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            required
          />
          <select
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            required
            disabled={!availableSlots.length}
          >
            <option value="">Saat Seçin</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button type="submit">Randevu Oluştur</button>
        </form>
      )}
    </div>
  );
}
export default Patient;
