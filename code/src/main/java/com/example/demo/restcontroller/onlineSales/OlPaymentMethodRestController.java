package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.entity.Vouchers;
import com.example.demo.service.onlineSales.OlPaymentMethodService;
import com.example.demo.service.onlineSales.OlVouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class OlPaymentMethodRestController {

    @Autowired
    private OlPaymentMethodService olPaymentMethodService;

        @GetMapping("/paymentMethods")
    public ResponseEntity<?> findAllVouchers() {
        return ResponseEntity.ok(olPaymentMethodService.findAll());
    }


}
