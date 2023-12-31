package com.example.demo.repository.offlineSales;

import com.example.demo.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailOfflineSalesRepository extends JpaRepository<CartDetail, Long> {
}
