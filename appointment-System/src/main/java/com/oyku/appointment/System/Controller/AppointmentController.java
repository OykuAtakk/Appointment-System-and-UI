package com.oyku.appointment.System.Controller;

import com.oyku.appointment.System.Entity.Appointment;
import com.oyku.appointment.System.Requests.CreateAppointment;
import com.oyku.appointment.System.Responses.AppointmentResponse;
import com.oyku.appointment.System.Responses.DoctorResponse;
import com.oyku.appointment.System.Service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @GetMapping
    public ResponseEntity<List<CreateAppointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        List<CreateAppointment> createAppointments = new ArrayList<>();

        for (Appointment appointment : appointments) {
            CreateAppointment createAppointment = new CreateAppointment();
            createAppointment.setDepartmentId(appointment.getDepartment().getId());
            createAppointment.setDepartmentName(appointment.getDepartment().getName());
            createAppointment.setPatientId(appointment.getPatient().getId());
            createAppointment.setPatientName(appointment.getPatient().getName() + " " + appointment.getPatient().getSurname());
            createAppointment.setDoctorId(appointment.getDoctor().getId());
            createAppointment.setDoctorName(appointment.getDoctor().getName() + " " + appointment.getDoctor().getSurname());
            createAppointment.setDate(appointment.getAppointmentDate());
            createAppointment.setTime(appointment.getTime());
            createAppointment.setId(appointment.getId());

            createAppointments.add(createAppointment);
        }

        return new ResponseEntity<>(createAppointments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> addAppointment(@RequestBody CreateAppointment newAppointment) {
        AppointmentResponse appointment = appointmentService.saveAppointment(newAppointment);
        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<CreateAppointment> getAppointmentById(@PathVariable Long appointmentId) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        CreateAppointment createAppointment = new CreateAppointment();
        createAppointment.setDepartmentId(appointment.getDepartment().getId());
        createAppointment.setDepartmentName(appointment.getDepartment().getName());
        createAppointment.setPatientId(appointment.getPatient().getId());
        createAppointment.setPatientName(appointment.getPatient().getName() + " " + appointment.getPatient().getSurname());
        createAppointment.setDoctorId(appointment.getDoctor().getId());
        createAppointment.setDoctorName(appointment.getDoctor().getName() + " " + appointment.getDoctor().getSurname());
        createAppointment.setDate(appointment.getAppointmentDate());
        createAppointment.setTime(appointment.getTime());

        return new ResponseEntity<>(createAppointment, HttpStatus.OK);
    }

    @DeleteMapping("/{appointmentId}")
    public void deleteAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteById(appointmentId);
    }

    @GetMapping("/patient/{patientId}")
    public List<AppointmentResponse> getAppointmentsByPatientId(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(patientId);
        if (appointments.isEmpty()) {
            return new ArrayList<>();
        }
        return appointments.stream().map(AppointmentResponse::new).collect(Collectors.toList());
    }

    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentResponse> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        if (appointments.isEmpty()) {
            return new ArrayList<>();
        }
        return appointments.stream().map(AppointmentResponse::new).collect(Collectors.toList());
    }
}
