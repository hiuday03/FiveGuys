package com.example.demo.restcontroller;

import com.example.demo.entity.Material;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/material")
public class MaterialRestController {

    @Autowired
    MaterialService materialService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<Material> materials = materialService.getAll();
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam("page") Integer page){
        Page<Material> materials = materialService.getAll(page);
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        Material material = materialService.getById(id);
        return ResponseEntity.ok(material);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Material materialReq){
        Material material = materialService.save(materialReq);
        return ResponseEntity.ok(material);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Material materialReq, @PathVariable Long id){
        Material material = materialService.update(materialReq, id);
        return ResponseEntity.ok(material);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        materialService.delete(id);
    }
}
