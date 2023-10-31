package com.example.demo.controller.employee;

import com.example.demo.entity.Employees;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/account/employee")
    public String viewEmployee(){
        return "/admin/account/employee/employee_home";
    }
    @PostMapping("/account/employee/create")
    public String addEmployee(){
        return "/admin/account/employee/employee_add";
    }




//    public String ViewEmployee(@RequestParam(defaultValue = "0", name = "page")Integer p ,Model model) {
//        Page<Employees> employees = employeeService.phanTrang(p, 5);
//        model.addAttribute("list", employees);
//        return "/admin/account/employee";
//    }
//

}
