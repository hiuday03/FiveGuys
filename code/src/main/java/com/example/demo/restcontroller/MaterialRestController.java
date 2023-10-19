package com.example.demo.restcontroller;

import com.example.demo.entity.Material;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/material")
public class MaterialRestController {

    @Autowired
    MaterialService materialService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<Material> materials = materialService.getAll();
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        Material material = materialService.getById(id);
        return ResponseEntity.ok(material);
    }
}
