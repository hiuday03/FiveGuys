package com.example.demo.restcontroller;

import com.example.demo.entity.Employees;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employee")
public class EmployeeRestController {
    @Autowired
    EmployeeService employeeService;


    //get employee
    @GetMapping("")
    public ResponseEntity<List<Employees>> getAll() {
        List<Employees> customers = employeeService.getAll();
        return ResponseEntity.ok(customers);
    }

    //search ma
    @GetMapping("/search/{code}")
    public ResponseEntity<List<Employees>> getByMa(@PathVariable String code) {
        List<Employees> customers = employeeService.searchMa(code);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employees> getById(@PathVariable Long id) {
        Employees customers = employeeService.getById(id);
        return ResponseEntity.ok(customers);
    }



    @GetMapping("/get-page")
    public ResponseEntity<Page<Employees>> phantrang(@RequestParam(defaultValue = "0", name = "page") Integer t) {
        Page<Employees> customers = employeeService.phanTrang(t, 5);

        return ResponseEntity.ok(customers);
    }


    //Thêm Employee

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Employees employees) {
        try {
            Employees createdEmployee = employeeService.create(employees);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    // delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    //update employee
    @PutMapping("/{id}")
    public ResponseEntity<Employees> update(@PathVariable Long id, @RequestBody Employees employees) {
        employeeService.update(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
        } else {
            return ResponseEntity.notFound().build();
        }

    }


//    @PostMapping("upload/save")
//    public String send(@RequestParam("attch")MultipartFile attch) throws IllegalStateException, IOException {
//        if(!attch.isEmpty()){
//            String fileName = attch.getOriginalFilename();
//            File file = new File(employeeService.get)
//        }
//    }

    //delete theo status
    @PutMapping("/delete/{id}")
    public ResponseEntity<Employees> updateStatus(@PathVariable Long id, @RequestBody Employees employees) {
        employeeService.updateRole(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
