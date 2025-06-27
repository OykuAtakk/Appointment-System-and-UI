package com.oyku.appointment.System.Service;

import com.oyku.appointment.System.Entity.Patient;
import com.oyku.appointment.System.Repository.PatientRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long patientId) {
        return patientRepository.findById(patientId).orElse(null);
    }

    public Patient savePatient(Patient newPatient) {
        return patientRepository.save(newPatient);
    }

    public Patient updatePatient(Long patientId, Patient newPatient) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if (patientOptional.isPresent()) {
            Patient patient = patientOptional.get();
            patient.setName(newPatient.getName());
            patient.setSurname(newPatient.getSurname());
           //patient.setAppointments(newPatient.getAppointments());
            return patientRepository.save(patient);
        }
        return null;
    }

    public void deleteById(Long patientId) {
        try {
            patientRepository.deleteById(patientId);
        }catch(EmptyResultDataAccessException e) {
            System.out.println("Patient "+patientId+" doesn't exist");
        }
    }
    public Patient getPatientByTckn(String tckn) {
        return patientRepository.findByTckn(tckn);
    }



}
