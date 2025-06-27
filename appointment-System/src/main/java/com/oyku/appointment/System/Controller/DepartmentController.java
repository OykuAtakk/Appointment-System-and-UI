package com.oyku.appointment.System.Controller;

import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import com.oyku.appointment.System.Requests.CreateDepartment;
import com.oyku.appointment.System.Service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Department> addDepartment(@RequestBody Department newDepartment) {
        Department department = departmentService.saveOneDepartment(newDepartment);
        if (department != null) {
            return new ResponseEntity<>(department, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long departmentId) {
        Department department = DepartmentService.getDepartmentById(departmentId);
        if (department == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<String> deleteOneDepartment(@PathVariable Long departmentId) {
        return departmentService.deleteById(departmentId);
    }

    @GetMapping("/{departmentId}/doctors")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartmentId(@PathVariable Long departmentId) {
        return departmentService.getAllDoctorsByDepartmentId(departmentId);
    }

}
