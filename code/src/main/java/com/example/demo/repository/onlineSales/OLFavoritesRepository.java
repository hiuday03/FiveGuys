package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLFavoritesRepository extends JpaRepository<FavoriteEntity, Long> {

    List<FavoriteEntity> findAllByCustomer_IdAndStatus(Long Id,int status);

    boolean existsByCustomerAndProduct(CustomerEntity customer, Product product);
}
