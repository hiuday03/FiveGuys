package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OLCartRepository extends JpaRepository<Cart, Long> {

    Cart findByCustomerId(Long id);
}
