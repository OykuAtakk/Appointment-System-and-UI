package com.oyku.appointment.System.Repository;

import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String departmentName);

}

