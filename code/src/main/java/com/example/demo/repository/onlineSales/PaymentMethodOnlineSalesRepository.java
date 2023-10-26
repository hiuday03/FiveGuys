package com.example.demo.repository.onlineSales;

import com.example.demo.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodOnlineSalesRepository extends JpaRepository<PaymentMethod, Long> {
}
