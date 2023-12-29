package com.example.demo.restcontroller;

import com.example.demo.entity.Brands;
import com.example.demo.service.serviceiplm.BrandServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brand")

public class BrandRestController {

    @Autowired
    BrandServiceImpl brandService;


    @GetMapping("")
    public ResponseEntity<List<Brands>> getAllBrand() {
        List<Brands> brands = brandService.getAll();
        return ResponseEntity.ok(brands);
    }

    @PostMapping("")
    public ResponseEntity<?> createBrand(@RequestBody Brands brands) {
        try {
            Brands createBrand = brandService.save(brands);
            return ResponseEntity.status(HttpStatus.CREATED).body(createBrand);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@RequestBody Brands brands, @PathVariable Long id) {
        try {
            Brands updatedBrand = brandService.update(brands, id);
            return ResponseEntity.ok(updatedBrand);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        try {
            brandService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
