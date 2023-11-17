package com.example.demo.repository.offlineSales;

import com.example.demo.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfEmployeeRepository extends JpaRepository<Employees, Long> {
    Employees findByAccount_Id(Long accountId);
}
