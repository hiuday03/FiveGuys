package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLCartDetailRepository extends JpaRepository<CartDetail, Long> {
}
