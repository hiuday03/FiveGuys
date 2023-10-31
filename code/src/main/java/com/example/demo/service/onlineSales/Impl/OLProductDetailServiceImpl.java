package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Color;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Size;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OLProductDetailServiceImpl implements OLProductDetailService {

    @Autowired
    private OLProductDetailRepository olProductDetailRepository;


    @Override
    public List<ProductDetail> findByProduct(Product product) {
        return olProductDetailRepository.findByProduct(product);
    }

    @Override
    public List<Color> findDistinctColorsBySanPhamId(Long productId) {
        return olProductDetailRepository.findDistinctColorsBySanPhamId(productId);
    }

    @Override
    public List<Size> findDistinctSizesBySanPhamId(Long productId) {
        return olProductDetailRepository.findDistinctSizesBySanPhamId(productId);
    }

    @Override
    public ProductDetail findByColorIdAndSizeIdAndProductId(Long colorId, Long sizeId, Long productId) {
        return olProductDetailRepository.findByColorIdAndSizeIdAndProductId(colorId,sizeId,productId);
    }

}
