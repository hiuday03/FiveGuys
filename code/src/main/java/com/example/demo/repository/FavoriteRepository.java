package com.example.demo.repository;

import com.example.demo.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {
    @Query("SELECT f FROM FavoriteEntity f WHERE f.customer.id = :customerId AND f.product.id = :product")
    List<FavoriteEntity> findByCustomerAndProductDetail(
            @Param("customerId") Long customerId,
            @Param("product") Long product
    );
}
