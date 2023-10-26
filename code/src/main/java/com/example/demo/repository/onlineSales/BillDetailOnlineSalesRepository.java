package com.example.demo.repository.onlineSales;

import com.example.demo.entity.BillDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailOnlineSalesRepository extends JpaRepository<BillDetail, Long> {
}
