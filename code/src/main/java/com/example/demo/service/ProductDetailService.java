package com.example.demo.service;

import com.example.demo.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetail> getAll();

    Page<ProductDetail> getAll(Integer page);

    ProductDetail getById(Long id);

    ProductDetail save(ProductDetail productDetail);

    ProductDetail update(ProductDetail productDetail, Long id);

    ProductDetail updateStatus(Integer status, Long id);

    void delete(Long id);

    Page<ProductDetail> getAllByPId(Long pid, Integer page);

    ProductDetail saveI(ProductDetail productDetail, List<Image> images);

    ProductDetail updateI(ProductDetail productDetail, Long id, List<Image> images);

    ProductDetail checkTrungFK(Product product, Color color, Size size);
}
