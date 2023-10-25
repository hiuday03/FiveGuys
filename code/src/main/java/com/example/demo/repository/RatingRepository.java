package com.example.demo.repository;

import com.example.demo.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingEntity, Long> {
    @Query("SELECT r FROM RatingEntity r WHERE r.customer.id = :customerId AND r.productDetail.id = :productDetailId")
    List<RatingEntity> findByCustomerAndProductDetail(
            @Param("customerId") Long customerId,
            @Param("productDetailId") Long productDetailId
    );
}
