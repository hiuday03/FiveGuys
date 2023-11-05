package com.example.demo.repository.offlineSales;

import com.example.demo.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodOfflineSalesRepository extends JpaRepository<PaymentMethod, Long> {
}
