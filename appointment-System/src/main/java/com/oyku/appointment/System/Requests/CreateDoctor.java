package com.oyku.appointment.System.Requests;

import lombok.Data;

@Data
public class CreateDoctor {
    String doctorName;
    String doctorSurname;
    String departmentName;
}
