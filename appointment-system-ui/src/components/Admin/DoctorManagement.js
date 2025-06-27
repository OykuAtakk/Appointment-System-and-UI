import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    doctorName: '',
    doctorSurname: '',
    departmentName: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctor');
        setDoctors(response.data);
      } catch (err) {
        setError('Doktorları yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/department');
        setDepartments(response.data);
      } catch (err) {
        setError('Departmanları yüklerken bir hata oluştu.');
      }
    };

    fetchDoctors();
    fetchDepartments(); 
  }, []);

  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:8080/doctor/${doctorId}`);
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    } catch (err) {
      setError('Doktoru silerken bir hata oluştu.');
    }
  };

  const handleUpdate = (doctor) => {
    setFormType('update');
    setSelectedDoctor(doctor);
    setFormData({
      doctorName: doctor.doctorName,
      doctorSurname: doctor.doctorSurname,
      departmentName: doctor.departmentName
    });
    setIsFormVisible(true);
  };

  const handleAddDoctor = () => {
    setFormType('add');
    setFormData({ doctorName: '', doctorSurname: '', departmentName: '' });
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'add') {
        const response = await axios.post('http://localhost:8080/doctor', formData);
        setDoctors([...doctors, response.data]);
      } else if (formType === 'update' && selectedDoctor) {
        const response = await axios.put(`http://localhost:8080/doctor/${selectedDoctor.id}`, formData);
        setDoctors(
          doctors.map(doctor => 
            doctor.id === selectedDoctor.id ? response.data : doctor
          )
        );
      }
      setIsFormVisible(false);
      setSelectedDoctor(null);
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
      <h1>Doktor Yönetimi</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Departman</th>
            <th style={styles.actionHeader}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td style={styles.centered}>{doctor.id}</td>
              <td style={styles.centered}>{doctor.doctorName}</td>
              <td style={styles.centered}>{doctor.doctorSurname}</td>
              <td style={styles.centered}>{doctor.departmentName}</td>
              <td style={styles.centered}>
                <button onClick={() => handleUpdate(doctor)} style={styles.button}>
                  Güncelle
                </button>
                <button onClick={() => handleDelete(doctor.id)} style={styles.button}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddDoctor} style={styles.addButton}>
        Yeni Doktor Ekle
      </button>

      {isFormVisible && (
        <div style={styles.formContainer}>
          <h2>{formType === 'add' ? 'Yeni Doktor Ekle' : 'Doktor Güncelle'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="doctorName"
              placeholder="Ad"
              value={formData.doctorName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="doctorSurname"
              placeholder="Soyad"
              value={formData.doctorSurname}
              onChange={handleInputChange}
              required
            />
            <select 
              name="departmentName" 
              value={formData.departmentName} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Departman Seç</option>
              {departments.map(department => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
            <button type="submit" style={styles.submitButton}>
              {formType === 'add' ? 'Ekle' : 'Güncelle'}
            </button>
            <button type="button" onClick={() => setIsFormVisible(false)} style={styles.cancelButton}>
              İptal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  actionHeader: {
    textAlign: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
  },
  addButton: {
    marginTop: '20px',
    padding: '10px 20px',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default DoctorManagement;
