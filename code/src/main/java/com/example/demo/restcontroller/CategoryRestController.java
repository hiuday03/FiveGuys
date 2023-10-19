package com.example.demo.restcontroller;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/admin/category")
public class CategoryRestController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        System.out.println("category");
        List<Category> categories = categoryService.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        System.out.println("category");
        Category category = categoryService.getById(id);
        System.out.println(category);
        return ResponseEntity.ok(category);
    }
}
