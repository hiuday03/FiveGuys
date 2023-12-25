package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Size;
import com.example.demo.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLVouchersRepository extends JpaRepository<Vouchers, Long> {

    Vouchers findByCode(String code);

    @Query("SELECT v FROM Vouchers v WHERE v.status = 1 AND v.startDate <= CURRENT_DATE AND v.endDate >= CURRENT_DATE")
    List<Vouchers> findActiveVouchers();
}
