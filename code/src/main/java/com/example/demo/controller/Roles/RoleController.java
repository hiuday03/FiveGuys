package com.example.demo.controller.Roles;

import com.example.demo.entity.Employees;
import com.example.demo.entity.Roles;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    RoleService roleService;

    // select all dư liệu
    @GetMapping("/get-all")
    public ResponseEntity<List<Roles>> getAll() {
        List<Roles> roles = roleService.getAll();
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Roles roles) {
        try {
            Roles createdRoles = roleService.save(roles);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRoles);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Roles> update(@PathVariable Long id,@RequestBody Roles roles ){
        roleService.update(id, roles);
        if (roles != null) {
            return ResponseEntity.ok(roles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
