package com.oyku.appointment.System.Service;

import com.oyku.appointment.System.Entity.Appointment;
import com.oyku.appointment.System.Entity.Department;
import com.oyku.appointment.System.Entity.Doctor;
import com.oyku.appointment.System.Entity.Patient;
import com.oyku.appointment.System.Repository.AppointmentRepository;
import com.oyku.appointment.System.Requests.CreateAppointment;
import com.oyku.appointment.System.Responses.AppointmentResponse;
import com.oyku.appointment.System.Responses.DoctorResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private DoctorService doctorService;
    private PatientService patientService;
    private DepartmentService departmentService;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
/*@Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientService patientService,
                              DepartmentService departmentService) {
        this.appointmentRepository = appointmentRepository;
        this.patientService = patientService;
        this.departmentService = departmentService;
    }

    @Autowired
    public void setDoctorService(DoctorService doctorService) {
        this.doctorService = doctorService;
    }*/

    //Doktorun uygunluğu
    public boolean isDoctorAvailable(Long doctorId, LocalDate appointmentDate, LocalTime appointmentTime) {
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentDateAndTime(doctorId, appointmentDate, appointmentTime);
        return appointments.isEmpty();
    }

    //Hasta için departman kontrolü
    public boolean hasPatientAppointmentInDepartment(Long patientId, Long departmentId) {
        List<Appointment> appointments = appointmentRepository.findByPatientIdAndDepartmentId(patientId, departmentId);
        return !appointments.isEmpty();
    }

    public AppointmentResponse saveAppointment(CreateAppointment newAppointment) {
        // Doktor bilgilerini al
        DoctorResponse doctorResponse = doctorService.getDoctorById(newAppointment.getDoctorId());
        Doctor doctor = new Doctor();
        doctor.setId(doctorResponse.getId());
        doctor.setName(doctorResponse.getDoctorName());
        doctor.setSurname(doctorResponse.getDoctorSurname());

        // Hastayı ve departmanı al
        Patient patient = patientService.getPatientById(newAppointment.getPatientId());
        Department department = departmentService.getDepartmentById(newAppointment.getDepartmentId());

        // Randevu nesnesini oluştur
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDepartment(department);
        appointment.setAppointmentDate(newAppointment.getDate());
        appointment.setTime(newAppointment.getTime());

        Long doctorId = newAppointment.getDoctorId();
        Long patientId = newAppointment.getPatientId();
        Long departmentId = newAppointment.getDepartmentId();

        // Doktorun uygunluğunu kontrol et
        if (!isDoctorAvailable(doctorId, appointment.getAppointmentDate(), appointment.getTime())) {
            throw new IllegalArgumentException("Doctor is not available at the selected time.");
        }

        // Hastanın aynı departmanda randevusu olup olmadığını kontrol et
        if (hasPatientAppointmentInDepartment(patientId, departmentId)) {
            throw new IllegalArgumentException("Patient already has an appointment in this department.");
        }

        // Randevuyu veritabanına kaydet
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Kaydedilen randevuya ait yanıt nesnesini oluştur ve döndür
        return new AppointmentResponse(savedAppointment);
    }


    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    public void deleteById(Long appointmentId) {
        try {
            appointmentRepository.deleteById(appointmentId);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("Appointment not found");
        }
    }

    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
