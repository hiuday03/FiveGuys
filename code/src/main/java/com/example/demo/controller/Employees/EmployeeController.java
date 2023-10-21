package com.example.demo.controller.Employees;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    // select all dư liệu
    @GetMapping("/get-all")
    public ResponseEntity<List<Employees>> getAll() {
        List<Employees> customers = employeeService.getAll();
        return ResponseEntity.ok(customers);
    }


    //Thêm Employee

//    public ResponseEntity<?> create(Employees employees) {
//         employeeService.create(employees);
//        return ResponseEntity.ok(employees);
//
//    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Employees employees) {
        try {
            Employees createdEmployee = employeeService.create(employees);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Employees> update(@PathVariable Long id,@RequestBody Employees employees ){
        employeeService.update(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
