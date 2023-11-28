package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.repository.offlineSales.PaymentMethodOfflineSalesRepository;
import com.example.demo.service.offlineSales.OfPayMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfPayMethodServiceImpl implements OfPayMethodService {

    @Autowired
    private PaymentMethodOfflineSalesRepository repository;

    @Override
    public List<PaymentMethod> getAll() {
        return repository.findAll();
    }
}
