package com.example.demo.restcontroller;

import com.example.demo.entity.Color;
import com.example.demo.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/color")
public class ColorRestController {

    @Autowired
    ColorService colorService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<Color> colors = colorService.getAll();
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Page<Color> colors = colorService.getAll(page);
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        Color color = colorService.getById(id);
        return ResponseEntity.ok(color);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Color colorReq){
        Color color = colorService.save(colorReq);
        return ResponseEntity.ok(color);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id){
        Color color = colorService.updateStatus(id);
        return ResponseEntity.ok(color);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        colorService.delete(id);
    }
}
