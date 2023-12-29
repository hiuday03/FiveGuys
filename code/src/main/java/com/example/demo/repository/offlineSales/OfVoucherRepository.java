package com.example.demo.repository.offlineSales;

import com.example.demo.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfVoucherRepository extends JpaRepository<Vouchers, Long> {
    @Query("SELECT v FROM Vouchers v WHERE v.status = 1 and v.quantity >= 1")
    List<Vouchers> getAllVoucherByStatus();
}
