package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OLProductDetailServiceImpl implements OLProductDetailService {

    @Autowired
    private OLProductDetailRepository olProductDetailRepository;


    @Override
    public List<ProductDetail> findByProduct(Product product) {
        return olProductDetailRepository.findByProduct(product);
    }

}
