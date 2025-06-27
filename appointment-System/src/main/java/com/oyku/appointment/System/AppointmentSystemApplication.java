package com.oyku.appointment.System;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.*;


@SpringBootApplication
public class AppointmentSystemApplication {

	public static void main(String[] args) {

			SpringApplication.run(AppointmentSystemApplication.class, args);
			//System.setProperty("java.awt.headless", "false");
		//SwingUtilities.invokeLater(() -> {

			//System.setProperty("java.awt.headless", "false");
			//SwingUtilities.invokeLater(LoginScreen::new);

	}
}
