package com.oyku.appointment.System.Repository;

import com.oyku.appointment.System.Entity.Appointment;
import com.oyku.appointment.System.Requests.CreateAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorIdAndAppointmentDateAndTime(Long doctor_id, LocalDate appointmentDate, LocalTime appointmentTime);

    List<Appointment> findByPatientIdAndDepartmentId(Long patientId, Long departmentId);

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

}
