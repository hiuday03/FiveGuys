package com.example.demo.restcontroller;

import com.example.demo.entity.Image;
import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin("*")
@RequestMapping("/api/image")
public class ImageRestController {

    @Autowired
    ImageService imageService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        System.out.println("image");
        List<Image> categories = imageService.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page){
        System.out.println("image");
        Page<Image> categories = imageService.getAll(page);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        System.out.println("image");
        Image image = imageService.getById(id);
        System.out.println(image);
        return ResponseEntity.ok(image);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Image imageReq){
        Image image = imageService.save(imageReq);
        return ResponseEntity.ok(image);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Image imageReq){
        Image image = imageService.update(imageReq, id);
        return ResponseEntity.ok(image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        imageService.delete(id);
    }
}
