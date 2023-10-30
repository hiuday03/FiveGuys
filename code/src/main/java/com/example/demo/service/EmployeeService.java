package com.example.demo.service;

import com.example.demo.entity.Employees;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface EmployeeService {
     List<Employees> getAll();
     Employees getById(Long id);

     Page<Employees> phanTrang(Integer pageNum, Integer pageNo);

     Employees create(Employees employees);

     void delete(Long id);

     Employees update(Long id, Employees employees);

     Employees updateRole(Long id, Employees employees);

     List<Employees> searchMa(@PathVariable String ma);
}
