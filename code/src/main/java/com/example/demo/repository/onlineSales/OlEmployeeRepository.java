package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OlEmployeeRepository extends JpaRepository<Employees, Long> {
    Employees findByAccount_Id(Long accountId);
}
