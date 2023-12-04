package com.example.demo.restcontroller;

import com.example.demo.entity.Brands;
import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@CrossOrigin("*")
@RequestMapping("/api/category")
public class CategoryRestController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        System.out.println("category");
        List<Category> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page){
        System.out.println("category");
        Page<Category> categories = categoryService.getAll(page);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        System.out.println("category");
        Category category = categoryService.getById(id);
        System.out.println(category);
        return ResponseEntity.ok(category);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Category categoryReq){
        Category category = categoryService.save(categoryReq);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Category categoryReq){
        Category category = categoryService.update(categoryReq, id);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Long id){
        Category category = categoryService.updateStatus(id);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        categoryService.delete(id);
    }

    @GetMapping("/brands")
    public ResponseEntity<?> getAllBrand(){
        System.out.println("brands");
        List<Brands> brands = categoryService.getAllBrand();
        return ResponseEntity.ok(brands);
    }
}
