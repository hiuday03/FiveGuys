package com.example.demo.repository;

import com.example.demo.entity.Employees;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Long> {
    // gen Code Tăng dần
    @Query("SELECT code FROM Employees code")
    List<Employees> genCode();

    // Tim theo ma
    @Query("SELECT m FROM Employees m WHERE m.code LIKE %:code%")
    Page<Employees> searchMa(String code,Pageable pageable);

    //Employee status = 1
    @Query("SELECT m FROM Employees m WHERE m.status = 1")
    List<Employees> getAllStatusDangLam();

    @Query("SELECT m FROM Employees m WHERE m.status = :status")
    List<Employees> getAllStatus(Integer status);

    @Modifying
    @Query("update Employees m set m.status = 2 where m.id=:id")
    void updateStatusEmployee(Long id);


    Optional<Employees> findByAccount_Id(Long accountId);

}
