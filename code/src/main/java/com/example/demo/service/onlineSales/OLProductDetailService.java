package com.example.demo.service.onlineSales;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;

import java.util.List;

public interface OLProductDetailService {

    List<ProductDetail> findByProduct(Product product);
}
