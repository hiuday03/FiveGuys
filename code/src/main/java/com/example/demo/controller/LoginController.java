package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")

public class LoginController {
    @GetMapping("/login")
    public String viewDashBoard() {
        return "/login/index";
    }

    @GetMapping("/login/{id}")
    public String viewLogin() {
        return "/login/login";
    }
}
