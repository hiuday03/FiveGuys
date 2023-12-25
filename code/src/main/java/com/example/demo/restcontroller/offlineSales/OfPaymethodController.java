package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.service.offlineSales.Impl.OfPayMethodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pay-method")
public class OfPaymethodController {
    @Autowired
    private OfPayMethodServiceImpl payMethodService;
    @GetMapping()
    public ResponseEntity<List<PaymentMethod>> getAllAddress() {
        List<PaymentMethod> paymentMethods = payMethodService.getAll();
        return ResponseEntity.ok(paymentMethods);
    }
}
