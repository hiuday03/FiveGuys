package com.example.demo.repository.offlineSales;

import com.example.demo.entity.BillDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailOfflineSalesRepository extends JpaRepository<BillDetail, Long> {
    List<BillDetail> getAllByBill_Id(Long id);
}
