package com.example.demo.repository;

import com.example.demo.entity.Employees;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Long> {
    // gen Code Tăng dần
    @Query("SELECT code FROM Employees code")
    List<Employees> genCode();

    // Tim theo ma
    @Query("SELECT m FROM Employees m WHERE m.code LIKE %:code%")
    List<Employees> searchMa(String code);

}
