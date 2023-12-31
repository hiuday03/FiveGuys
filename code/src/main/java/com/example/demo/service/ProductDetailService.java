package com.example.demo.service;

import com.example.demo.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetail> getAll();

    Page<ProductDetail> getAll(Integer page);

    ProductDetail getById(Long id);

    ProductDetail save(ProductDetail productDetail);

    ProductDetail update(ProductDetail productDetail, Long id);

    void delete(Long id);

    Page<ProductDetail> getAllByPId(Long pid, Integer page);
}
