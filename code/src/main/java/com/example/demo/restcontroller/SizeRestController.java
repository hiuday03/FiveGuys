package com.example.demo.restcontroller;

import com.example.demo.entity.Size;
import com.example.demo.service.SizeService;
import com.example.demo.service.serviceiplm.SizeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/size")
public class SizeRestController{

    @Autowired
    SizeServiceImpl sizeService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<Size> sizes = sizeService.getAll();
        return ResponseEntity.ok(sizes);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Page<Size> sizes = sizeService.getAll(page);
        return ResponseEntity.ok(sizes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        Size size = sizeService.getById(id);
        return ResponseEntity.ok(size);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Size sizeReq){
        Size size = sizeService.save(sizeReq);
        return ResponseEntity.ok(size);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Size sizeReq){
        Size size = sizeService.update(sizeReq, id);
        return ResponseEntity.ok(size);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Long id){
        Size size = sizeService.updateStatus(id);
        return ResponseEntity.ok(size);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        sizeService.delete(id);
    }
}
