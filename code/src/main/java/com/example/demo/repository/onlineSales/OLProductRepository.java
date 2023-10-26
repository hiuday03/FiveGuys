package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLProductRepository extends JpaRepository<Product, Long> {

    List<Product> getAllProducts();
}
