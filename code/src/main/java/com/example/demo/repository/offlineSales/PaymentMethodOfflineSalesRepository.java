package com.example.demo.repository.offlineSales;

import com.example.demo.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodOfflineSalesRepository extends JpaRepository<PaymentMethod, Long> {
    @Query("SELECT v FROM PaymentMethod v WHERE v.status = 1 AND v.paymentType = 1")
    List<PaymentMethod> findActivePaymentMethods();

    @Query("SELECT v from PaymentMethod v WHERE v.paymentType = 3 AND v.status = 1")
    PaymentMethod getCOD();
}
