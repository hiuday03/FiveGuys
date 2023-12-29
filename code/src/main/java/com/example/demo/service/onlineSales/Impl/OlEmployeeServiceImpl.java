package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.repository.onlineSales.OlCustomerRepository;
import com.example.demo.repository.onlineSales.OlEmployeeRepository;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OlEmployeeServiceImpl implements OlEmployeeService {

    @Autowired
    private OlEmployeeRepository employeeRepository;

    @Override
    public Optional<Employees> findById(Long Id) {
        Optional<Employees> employees = employeeRepository.findById(Id);

        if (employees.isPresent()){
            return employees;
        }

        return Optional.empty();
    }

    @Override
    public Employees findByAccount_Id(Long accountId) {
        return employeeRepository.findByAccount_Id(accountId);
    }

    @Override
    public Employees save(Employees employees) {
        return employeeRepository.save(employees);
    }
}
