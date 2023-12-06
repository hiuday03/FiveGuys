package com.example.demo.repository;

import com.example.demo.entity.Bill;
import com.example.demo.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface StatisticalRepository extends JpaRepository<Bill, Long> {
    //Tống số tiền trong 1 tháng
    @Query("SELECT COALESCE(SUM(v.totalAmountAfterDiscount), 0) AS totalAmount FROM Bill v where MONTH(v.paymentDate) = :month And YEAR(v.paymentDate)  = :year")
    BigDecimal GetAllSumTotalAmountAfterDiscount(Integer month, Integer year);

    //Tổng số dơn trong 1 ngày
    @Query("select b from Bill b where Day(b.paymentDate)  = :day and Month(b.paymentDate)  = :mouth And YEAR(b.paymentDate)  = :year")
    List<Bill> listCodeDay(Integer day, Integer mouth, Integer year);

    //Tổng số khách hàng trong 1 nam
    @Query("SELECT b from CustomerEntity b where YEAR(b.createdAt)  = :year")
    List<CustomerEntity> ListCustumerYear(Integer year);

    //Tổng số khách hàng trong 1 nam
    @Query("SELECT COUNT(b.id) as hihi from CustomerEntity b where Day(b.createdAt)  = :day")
    Long ListCustumerDay(Integer day);
}
