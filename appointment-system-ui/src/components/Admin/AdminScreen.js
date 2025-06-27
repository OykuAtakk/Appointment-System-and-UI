import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminEkranı = () => {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div style={styles.container}>
      <h1>Admin Ekranı</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigateTo('PatientManagement')} style={styles.button}>
          Hasta Yönetimi
        </button>
        <button onClick={() => navigateTo('AppointmentManagement')} style={styles.button}>
          Randevu Yönetimi
        </button>
        <button onClick={() => navigateTo('DoctorManagement')} style={styles.button}>
          Doktor Yönetimi
        </button>
        <button onClick={() => navigateTo('DepartmentManagement')} style={styles.button}>
          Departman Yönetimi
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminEkranı;
