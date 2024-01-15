package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLFavoritesRepository extends JpaRepository<FavoriteEntity, Long> {

    List<FavoriteEntity> findAllByCustomer_IdAndStatus(Long Id,int status);

    boolean existsByCustomerAndProduct(CustomerEntity customer, Product product);

//    Page<FavoriteEntity> findAllByCustomerEntity_IdOrderByCreatedAtDesc(Long customerId, Pageable pageable);


    @Query("SELECT b FROM FavoriteEntity b WHERE b.customer.id = :customerId ORDER BY b.createdAt DESC")
    Page<FavoriteEntity> findAllByCustomer(@Param("customerId") Long customerId, Pageable pageable);




}
