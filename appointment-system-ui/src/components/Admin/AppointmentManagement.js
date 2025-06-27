import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorId: '',
    patientId: '',
    departmentId: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/appointment');
        const updatedAppointments = response.data.map(appointment => ({
          ...appointment,
          doctorName: appointment.doctorName,
          patientName: appointment.patientName,
          departmentName: appointment.departmentName,
        }));
        setAppointments(updatedAppointments);
      } catch (err) {
        setError('Randevuları yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    if (!appointmentId) {
      setError('Geçersiz randevu ID’si!');
      return; 
    }

    try {
      await axios.delete(`http://localhost:8080/appointment/${appointmentId}`);
      // Randevular listesinden silinmiş randevuyu kaldır
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Silinmek istenen randevu bulunamadı.');
      } else {
        setError('Randevuyu silerken bir hata oluştu.');
      }
    }
  };

  const handleAddAppointment = () => {
    setFormData({ date: '', time: '', doctorId: '', patientId: '', departmentId: '' });
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/appointment', {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        departmentId: formData.departmentId,
        date: formData.date,
        time: formData.time,
      });
      const newAppointment = {
        ...response.data,
        doctorName: formData.doctorId, 
        patientName: formData.patientId,
        departmentName: formData.departmentId,
      };
      setAppointments([...appointments, newAppointment]);
      setIsFormVisible(false);
    } catch (err) {
      setError('Randevu eklerken bir hata oluştu.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h1>Randevu Yönetimi</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Tarih</th>
            <th style={styles.header}>Saat</th>
            <th style={styles.header}>Doktor</th>
            <th style={styles.header}>Hasta</th>
            <th style={styles.header}>Departman</th>
            <th style={styles.header}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td style={styles.cell}>{appointment.date}</td>
              <td style={styles.cell}>{appointment.time}</td>
              <td style={styles.cell}>{appointment.doctorName}</td>
              <td style={styles.cell}>{appointment.patientName}</td>
              <td style={styles.cell}>{appointment.departmentName}</td>
              <td style={styles.cell}>
                <button onClick={() => handleDelete(appointment.id)} style={styles.button}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.addButtonContainer}>
        <button onClick={handleAddAppointment} style={styles.addButton}>
          Yeni Randevu Ekle
        </button>
      </div>

      {isFormVisible && (
        <div style={styles.formContainer}>
          <h2>Yeni Randevu Ekle</h2>
          <form onSubmit={handleFormSubmit} style={styles.form}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="doctorId"
              placeholder="Doktor ID"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="patientId"
              placeholder="Hasta ID"
              value={formData.patientId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="departmentId"
              placeholder="Departman ID"
              value={formData.departmentId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>
                Ekle
              </button>
              <button type="button" onClick={() => setIsFormVisible(false)} style={styles.cancelButton}>
                İptal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
  },
  addButtonContainer: {
    textAlign: 'center', 
    marginTop: '20px',
  },
  addButton: {
    padding: '10px 20px',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    marginTop: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
  },
};

export default AppointmentManagement;
