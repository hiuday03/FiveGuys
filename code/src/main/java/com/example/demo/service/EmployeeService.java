package com.example.demo.service;

import com.example.demo.entity.Employees;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {
     List<Employees> getAll();

     Page<Employees> phanTrang(Integer pageNum, Integer pageNo);

     Employees create(Employees employees);

     void delete(Long id);

     Employees update(Long id, Employees employees);
}
