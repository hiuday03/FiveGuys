package com.example.demo.restcontroller;

import com.example.demo.entity.Roles;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/roles")
public class RoleRestController {
    @Autowired
    RoleService roleService;

    // select all dư liệu
    @GetMapping("")
    public ResponseEntity<List<Roles>> getAll() {
        List<Roles> roles = roleService.getAll();
        return ResponseEntity.ok(roles);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Roles roles) {
        try {
            Roles createdRoles = roleService.save(roles);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRoles);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Roles> update(@PathVariable Long id,@RequestBody Roles roles ){
        roleService.update(id, roles);
        if (roles != null) {
            return ResponseEntity.ok(roles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
