package com.example.demo.restcontroller.offlineSales;

import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import com.example.demo.service.offlineSales.OfProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/off-productDetail")
public class OfProductDetailController {
    @Autowired
    private OfProductDetailService service;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<OfModelProductDetail> productDetails = service.getAll();
        return ResponseEntity.ok(productDetails);
    }

    @GetMapping("/{barcode}")
    public ResponseEntity<?> getByBarCode(@PathVariable("barcode") String barcode) {
        return ResponseEntity.ok(service.getByBarCode(barcode));
    }
}
