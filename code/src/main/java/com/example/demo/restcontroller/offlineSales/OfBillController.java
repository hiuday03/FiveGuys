package com.example.demo.restcontroller.offlineSales;

import com.example.demo.service.offlineSales.Impl.OfBillServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bill")
public class OfBillController {
    @Autowired
    private OfBillServiceImpl service;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody JsonNode data) {
        return ResponseEntity.ok(service.create(data));
    }
}
