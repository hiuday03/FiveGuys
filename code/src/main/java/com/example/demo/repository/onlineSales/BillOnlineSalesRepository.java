package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillOnlineSalesRepository extends JpaRepository<Bill, Long> {
}
