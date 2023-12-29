package com.example.demo.service.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;

import java.util.Optional;

public interface OlEmployeeService {

    Optional<Employees> findById(Long Id);

    Employees findByAccount_Id(Long accountId);

    Employees save(Employees employees);


}
