package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.repository.onlineSales.OLCartRepository;
import com.example.demo.repository.onlineSales.OlCustomerRepository;
import com.example.demo.service.onlineSales.OlCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class OlCustomerServiceImpl implements OlCustomerService {

    @Autowired
    private OlCustomerRepository olCustomerRepository;

    @Override
    public Optional<CustomerEntity> findById(Long Id) {
        Optional<CustomerEntity> customer = olCustomerRepository.findById(Id);

        if (customer.isPresent()){
            return customer;
        }

        return Optional.empty();
    }

    @Override
    public CustomerEntity findByAccount_Id(Long accountId) {
        return olCustomerRepository.findByAccount_Id(accountId);
    }
}
