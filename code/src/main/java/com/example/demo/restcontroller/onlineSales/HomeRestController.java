package com.example.demo.restcontroller.onlineSales;


import com.example.demo.model.response.onlineSales.OlProductRespone;
import com.example.demo.service.onlineSales.OLProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ol")
public class HomeRestController {

    @Autowired
    private OLProductService olProductService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllOlProductsRespone() {
        List<OlProductRespone> products = olProductService.getAllOlProductsRespone();

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
        }

        return ResponseEntity.ok(products);
    }

}
