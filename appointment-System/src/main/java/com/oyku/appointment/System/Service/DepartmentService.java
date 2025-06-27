package com.oyku.appointment.System.Service;

import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import com.oyku.appointment.System.Repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private static DepartmentRepository departmentRepository;
    private DoctorService doctorService;

    public DepartmentService(DepartmentRepository departmentRepository) {
        DepartmentService.departmentRepository = departmentRepository;
    }

    public static Department getDepartmentByName(String departmentName) {
        return departmentRepository.findByName(departmentName);
    }

    @Autowired
    public void setDoctorService( DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department saveOneDepartment(Department newDepartment) {
        return departmentRepository.save(newDepartment);
    }

   public static Department getDepartmentById(Long departmentId) {
        return departmentRepository.findById(departmentId).orElse(null);
    }

    public ResponseEntity<String> deleteById(Long departmentId) {
        int doctorCount = doctorService.countByDepartmentId(departmentId);

        if (doctorCount > 0) {
            String errorMessage = "Departman silinemez. Bu departmana bağlı " + doctorCount + " doktor var.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }

        try {
            departmentRepository.deleteById(departmentId);
            return ResponseEntity.status(HttpStatus.OK).body("Departman başarıyla silindi.");
        } catch (EmptyResultDataAccessException e) {
            String errorMessage = "Departman " + departmentId + " mevcut değil.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }


    public ResponseEntity<List<Doctor>> getAllDoctorsByDepartmentId(Long departmentId) {
        Department department = getDepartmentById(departmentId);
        List<Doctor> doctors = department.getDoctors();
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }
}
