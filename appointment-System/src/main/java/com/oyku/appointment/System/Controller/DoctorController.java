package com.oyku.appointment.System.Controller;

import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import com.oyku.appointment.System.Requests.CreateDoctor;
import com.oyku.appointment.System.Requests.UpdateDoctor;
import com.oyku.appointment.System.Responses.DoctorResponse;
import com.oyku.appointment.System.Service.DepartmentService;
import com.oyku.appointment.System.Service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    private final DoctorService doctorService;
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
        List<DoctorResponse> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Doctor> postDoctor(@RequestBody CreateDoctor newDoctor) {
        Department department = DepartmentService.getDepartmentByName(newDoctor.getDepartmentName());
        if (department == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Doctor doctor = doctorService.saveDoctor(newDoctor);
        if (doctor != null) {
            return new ResponseEntity<>(doctor, HttpStatus.OK);
        }
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long doctorId) {
        DoctorResponse doctor = doctorService.getDoctorById(doctorId);
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long doctorId, @RequestBody UpdateDoctor newDoctor) {
        Doctor updatedDoctor = doctorService.updateDoctor(doctorId, newDoctor);
        if (updatedDoctor != null) {
            return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{doctorId}")
    public void deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteById(doctorId);
    }
//doktorun takvimini unutma
}
