package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.onlineSales.OLPaymentMethodRepository;
import com.example.demo.repository.onlineSales.OLVouchersRepository;
import com.example.demo.service.onlineSales.OlPaymentMethodService;
import com.example.demo.service.onlineSales.OlVouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class OlPaymentMethodServiceImpl implements OlPaymentMethodService {

    @Autowired
    private OLPaymentMethodRepository repository;

    @Override
    public List<PaymentMethod> findAll() {
        return repository.findAll();
    }

}
