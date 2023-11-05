package com.example.demo.service;

import com.example.demo.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    List<CustomerEntity> getAllCustomer();

//    Page<CustomerEntity> getAll(Integer page);

    CustomerEntity getCustomerById(Long id);

    Page<CustomerEntity> getAllCustomerPage(Integer page);

    CustomerEntity createCustomer(CustomerEntity customerEntity);

    CustomerEntity updateCustomer(CustomerEntity customerEntity, Long id);

    void deleteCustomer(Long id);

}
