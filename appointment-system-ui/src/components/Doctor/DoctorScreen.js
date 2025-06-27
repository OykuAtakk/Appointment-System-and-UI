import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Doctor() {
  const location = useLocation();
  const doctorData = location.state;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("Alınan Doktor Bilgileri:", doctorData);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointment/doctor/${doctorData.id}`
        );
        setAppointments(response.data);
      } catch (err) {
        setError("Randevuları yüklerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (doctorData && doctorData.id) {
      fetchAppointments();
    }
  }, [doctorData]);

  if (!doctorData) {
    return <div>Doktor bilgileri bulunamadı.</div>;
  }

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Doktor Bilgileri</h1>
      <p>Ad: {doctorData.doctorName}</p>
      <p>Soyad: {doctorData.doctorSurname}</p>
      <p>ID: {doctorData.id}</p>
      <p>Departman: {doctorData.departmentName}</p>

      <h2>Randevular</h2>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarih</th>
              <th>Saat</th>
              <th>Hasta</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.patientName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Henüz randevu bulunmuyor.</p>
      )}
    </div>
  );
}

export default Doctor;
