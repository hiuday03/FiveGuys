package com.example.demo.service.offlineSales;

import com.example.demo.entity.PaymentMethod;

import java.util.List;

public interface OfPayMethodService {
    List<PaymentMethod> findActivePaymentMethods();

    PaymentMethod getCOD();
}
