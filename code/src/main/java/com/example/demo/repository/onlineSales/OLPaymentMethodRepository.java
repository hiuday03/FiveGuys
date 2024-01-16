package com.example.demo.repository.onlineSales;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLPaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {


    @Query("SELECT v FROM PaymentMethod v WHERE v.status = 1 AND v.paymentType IN (2, 3)")
    List<PaymentMethod> findActivePaymentMethods();


}
