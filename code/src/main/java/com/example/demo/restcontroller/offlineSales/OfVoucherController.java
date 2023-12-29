package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.Vouchers;
import com.example.demo.service.offlineSales.OfVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/off-voucher")
public class OfVoucherController {
    @Autowired
    private OfVoucherService service;

    @GetMapping()
    public ResponseEntity<List<Vouchers>> getAll() {
        return ResponseEntity.ok(service.getAllVoucherByStatus());
    }
}
