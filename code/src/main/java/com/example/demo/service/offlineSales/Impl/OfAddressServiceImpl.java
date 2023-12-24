package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.AddressEntity;
import com.example.demo.repository.offlineSales.OfAddressRepository;
import com.example.demo.service.offlineSales.OfAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OfAddressServiceImpl implements OfAddressService {
    @Autowired
    private OfAddressRepository repository;


    @Override
    public AddressEntity findByCustomerId(Long customerId) {
        return repository.findByCustomerId(customerId);
    }
}
