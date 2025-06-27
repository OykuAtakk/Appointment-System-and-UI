import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [formData, setFormData] = useState({
    tckn: '',
    name: '',
    surname: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/patient');
        setPatients(response.data);
      } catch (err) {
        setError('Hastaları yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`/patient/${patientId}`);
      setPatients(patients.filter(patient => patient.id !== patientId));
    } catch (err) {
      setError('Hastayı silerken bir hata oluştu.');
    }
  };

  const handleUpdate = (patient) => {
    setFormType('update');
    setSelectedPatient(patient);
    setFormData({
      tckn: patient.tckn,
      name: patient.name,
      surname: patient.surname,
    });
    setIsFormVisible(true);
  };

  const handleAddPatient = () => {
    setFormType('add');
    setFormData({ tckn: '', name: '', surname: '' });
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'add') {
        const response = await axios.post('http://localhost:8080/patient', formData);
        setPatients([...patients, response.data]);
      } else if (formType === 'update' && selectedPatient) {
        const response = await axios.put(`http://localhost:8080/patient/${selectedPatient.id}`, formData);
        setPatients(
          patients.map(patient => 
            patient.id === selectedPatient.id ? response.data : patient
          )
        );
      }
      setIsFormVisible(false);
      setSelectedPatient(null);
    } catch (err) {
      setError('İşlem sırasında bir hata oluştu.');
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
      <h1 style={styles.title}>Hasta Yönetimi</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>ID</th>
            <th style={styles.header}>Ad</th>
            <th style={styles.header}>Soyad</th>
            <th style={styles.header}>TC Kimlik No</th>
            <th style={styles.header}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td style={styles.cell}>{patient.id}</td>
              <td style={styles.cell}>{patient.name}</td>
              <td style={styles.cell}>{patient.surname}</td>
              <td style={styles.cell}>{patient.tckn}</td>
              <td style={styles.cell}>
                <button onClick={() => handleUpdate(patient)} style={styles.button}>
                  Güncelle
                </button>
                <button onClick={() => handleDelete(patient.id)} style={styles.button}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.addButtonContainer}>
        <button onClick={handleAddPatient} style={styles.addButton}>
          Yeni Hasta Ekle
        </button>
      </div>

      {isFormVisible && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>{formType === 'add' ? 'Yeni Hasta Ekle' : 'Hasta Güncelle'}</h2>
          <form onSubmit={handleFormSubmit} style={styles.form}>
            <input
              type="text"
              name="tckn"
              placeholder="TC Kimlik No"
              value={formData.tckn}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="name"
              placeholder="Ad"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="surname"
              placeholder="Soyad"
              value={formData.surname}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>
                {formType === 'add' ? 'Ekle' : 'Güncelle'}
              </button>
              <button onClick={() => setIsFormVisible(false)} style={styles.cancelButton}>
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
  title: {
    textAlign: 'center', 
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
  formTitle: {
    textAlign: 'center', // Form başlığını ortalar
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
    textAlign: 'center', // Giriş alanlarını ortalar
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

export default PatientManagement;
