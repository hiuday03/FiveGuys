package com.example.demo.repository;

import com.example.demo.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Vouchers, Long> {
    @Query("SELECT v FROM Vouchers v WHERE :currentDate BETWEEN  v.startDate AND v.endDate")
    List<Vouchers> findEntitiesInDateRange(Date currentDate);

    @Modifying
    @Query(value = "UPDATE Vouchers set status = ?1 where id = ?2", nativeQuery = true)
    void updateStatusDiscount(Integer status, Long id);

    @Modifying
    @Query(value = "UPDATE Vouchers set status = ?1 where id = ?2", nativeQuery = true)
    void updateStatusQuantity(Integer status, Long id);

}
