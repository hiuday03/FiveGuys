package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLBillRepository extends JpaRepository<Bill, Long> {
}
