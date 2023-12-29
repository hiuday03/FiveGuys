package com.example.demo.repository;

import com.example.demo.entity.Color;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {

    public Page<ProductDetail> findAllByProductId(Long id, Pageable pageable);

    ProductDetail findProductDetailByProductAndColorAndSize(Product product, Color color, Size size);
}
