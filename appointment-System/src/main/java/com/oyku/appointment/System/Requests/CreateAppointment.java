package com.oyku.appointment.System.Requests;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
public class CreateAppointment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long patientId;
    String patientName;
    Long doctorId;
    String doctorName;
    Long departmentId;
    String departmentName;
    LocalDate date;
    LocalTime time;
}

