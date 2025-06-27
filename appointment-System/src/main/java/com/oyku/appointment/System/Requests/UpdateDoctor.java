package com.oyku.appointment.System.Requests;

import lombok.Data;

@Data
public class UpdateDoctor {

    String doctorName;
    String doctorSurname;
    String departmentName;
}
