package com.example.demo.restcontroller;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.service.ProductDetailService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductRestController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductDetailService productDetailService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<Product> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Page<Product> products = productService.getAll(page);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        Product product = productService.getById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Product productReq){
        Product product = productService.save(productReq);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Product productReq, @PathVariable("id") Long id){
        Product product = productService.update(productReq, id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody Integer status, @PathVariable("id") Long id){
        Product product = productService.updateStatus(status, id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        productService.delete(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/productDetail")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") Long id,
                                              @RequestParam(value = "page", defaultValue = "0") Integer page){
        Page<ProductDetail> productDetails = productDetailService.getAllByPId(id, page);
        return ResponseEntity.ok(productDetails);
    }

    @GetMapping("/searchByStatus")
    public ResponseEntity<?> searchByStatus(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                            @RequestParam(value = "status", defaultValue = "0") Integer status){
        Page<Product> products = productService.searchByStatus(status, page);
        return ResponseEntity.ok(products);
    }

}
