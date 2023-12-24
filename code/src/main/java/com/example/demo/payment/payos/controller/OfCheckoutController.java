package com.example.demo.payment.payos.controller;

import com.example.demo.service.offlineSales.OfBillService;
import com.fasterxml.jackson.databind.JsonNode;
import com.lib.payos.PayOS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OfCheckoutController {


    private final PayOS payOS;
    public OfCheckoutController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @Autowired
    private OfBillService ofBillService;

    @PostMapping( "/api/payment/payos-of/success")
    public ResponseEntity<?> Success(@RequestBody JsonNode orderData) {
        return ResponseEntity.ok(ofBillService.create(orderData));
    }


}