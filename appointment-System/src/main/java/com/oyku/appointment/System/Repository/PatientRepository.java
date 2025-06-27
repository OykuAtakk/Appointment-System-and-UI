package com.oyku.appointment.System.Repository;

import com.oyku.appointment.System.Entity.Appointment;
import com.oyku.appointment.System.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByTckn(String tckn);

}
