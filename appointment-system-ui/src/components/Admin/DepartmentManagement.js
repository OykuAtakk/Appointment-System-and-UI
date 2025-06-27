import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './DepartmentManagement.css';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [deleteError, setDeleteError] = useState(''); // Silme hatası için state

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/department');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError('Departmanlar alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/department/${id}`);
      fetchDepartments();
      setDeleteError(''); // Silme başarılı olduğunda hata mesajını sıfırla
    } catch (error) {
      console.error('Error deleting department:', error);
      if (error.response && error.response.data) {
        setDeleteError(error.response.data); // Backend'den gelen hatayı göster
      } else {
        setDeleteError('Departman silinirken bir hata oluştu.');
      }
    }
  };

  const addDepartment = async () => {
    if (!newDepartmentName) {
      alert('Lütfen bir departman adı girin.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/department', {
        name: newDepartmentName,
      });
      setNewDepartmentName('');
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <div className="department-management">
      <h1>Departman Yönetimi</h1>
      {deleteError && <p className="error">{deleteError}</p>} {/* Silme hatası üstte */}
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="department-list">
          {departments.map((department) => (
            <div className="department-card" key={department.id}>
              <h2>{department.name}</h2>
              <h3>Doktorlar</h3>
              {department.doctors.length > 0 ? (
                <ul>
                  {department.doctors.map((doctor) => (
                    <li key={doctor.id}>
                      {doctor.doctorName} {doctor.doctorSurname} - {department.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Doktor yok</p>
              )}
              <button className="delete-button" onClick={() => deleteDepartment(department.id)}>Sil</button>
            </div>
          ))}
        </div>
      )}
      <div className="add-department">
        <input
          type="text"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
          placeholder="Yeni Departman Adı"
        />
        <button onClick={addDepartment}>Departman Ekle</button>
      </div>
    </div>
  );
};

export default DepartmentManagement;
