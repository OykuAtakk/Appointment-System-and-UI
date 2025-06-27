package com.oyku.appointment.System.Responses;

import com.oyku.appointment.System.Entity.Doctor;
import lombok.Data;

@Data
public class DoctorResponse {
    Long id;
    String doctorName;
    String doctorSurname;
    String departmentName;

    public DoctorResponse(Doctor doctor) {
        this.id = doctor.getId();
        this.doctorName = doctor.getName();
        this.doctorSurname = doctor.getSurname();
        this.departmentName = doctor.getDepartment().getName();
    }
}
