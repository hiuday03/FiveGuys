package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLProductDetailRepository extends JpaRepository<ProductDetail, Long> {

    List<ProductDetail> findByProduct(Product product);
}
