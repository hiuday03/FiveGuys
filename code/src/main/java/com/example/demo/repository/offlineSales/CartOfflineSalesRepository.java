package com.example.demo.repository.offlineSales;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartOfflineSalesRepository extends JpaRepository<Cart, Long> {
}
