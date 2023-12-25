package com.example.demo.service.onlineSales;

import com.example.demo.entity.CustomerEntity;

import java.util.Optional;
import java.util.UUID;

public interface OlCustomerService {

    Optional<CustomerEntity> findById(Long Id);

    CustomerEntity findByAccount_Id(Long accountId);


}
