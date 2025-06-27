package com.oyku.appointment.System.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String getHomePage() {
        return "home";
    }

    @GetMapping
    public String getMainPage() {
        return "main";
    }
}