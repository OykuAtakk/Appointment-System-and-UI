package com.oyku.appointment.System.Responses;

import com.oyku.appointment.System.Entity.Appointment;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentResponse {
    Long id;
    String departmentName;
    String doctorName;
    String patientName;
    LocalDate appointmentDate;
    LocalTime appointmentTime;

    public AppointmentResponse(Appointment appointment) {
        this.id = appointment.getId();
        this.departmentName = appointment.getDepartment().getName();
        this.doctorName = appointment.getDoctor().getName();
        this.patientName = appointment.getPatient().getName();
        this.appointmentDate = appointment.getAppointmentDate();
        this.appointmentTime =  appointment.getTime();
    }
}
