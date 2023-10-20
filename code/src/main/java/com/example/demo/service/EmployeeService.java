package com.example.demo.service;

import com.example.demo.entity.Employees;

import java.util.List;

public interface EmployeeService {
     List<Employees> getAll();

     Employees create(Employees employees);

     public void delete(Long id);
}
