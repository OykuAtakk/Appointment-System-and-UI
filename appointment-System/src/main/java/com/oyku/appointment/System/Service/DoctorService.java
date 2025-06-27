package com.oyku.appointment.System.Service;

import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import com.oyku.appointment.System.Repository.DoctorRepository;
import com.oyku.appointment.System.Requests.CreateDoctor;
import com.oyku.appointment.System.Requests.UpdateDoctor;
import com.oyku.appointment.System.Responses.DoctorResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<DoctorResponse> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map(DoctorResponse::new).collect(Collectors.toList());
    }

    public DoctorResponse getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        return doctor != null ? new DoctorResponse(doctor) : null;
    }

    public Doctor saveDoctor(CreateDoctor newDoctor) {
        Doctor doctor = new Doctor();
        Department department = DepartmentService.getDepartmentByName(newDoctor.getDepartmentName());
        if (department == null) {
            throw new IllegalArgumentException("Invalid department ID: " + newDoctor.getDepartmentName());
        }
        doctor.setDepartment(department);
        doctor.setName(newDoctor.getDoctorName());
        doctor.setSurname(newDoctor.getDoctorSurname());

        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long doctorId, UpdateDoctor newDoctor) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorId);
        Department department = DepartmentService.getDepartmentByName(newDoctor.getDepartmentName());
        if (doctorOptional.isPresent() && department != null) {
            Doctor doctor = doctorOptional.get();
            doctor.setSurname(newDoctor.getDoctorSurname());
            doctor.setDepartment(department);
            doctor.setName(newDoctor.getDoctorName());
            return doctorRepository.save(doctor);
        }
        return null;
    }

    public void deleteById(Long doctorId) {
        try {
            doctorRepository.deleteById(doctorId);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Doctor " + doctorId + " doesn't exist");
        }
    }

    public int countByDepartmentId(Long departmentId) {
        return doctorRepository.countByDepartmentId(departmentId);
    }
}
