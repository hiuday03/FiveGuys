package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Employees;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Employees> getAll(){
        return employeeRepository.findAll();
    }
    @Override
    public Employees create(Employees employees){
        return employeeRepository.save(employees);
    }

    @Override
    public void delete(Long id){
         employeeRepository.deleteById(id);
    }

}
