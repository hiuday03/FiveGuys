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
import java.util.Optional;
import java.util.UUID;

@Service
public class OLProductDetailServiceImpl implements OLProductDetailService {

    @Autowired
    private OLProductDetailRepository olProductDetailRepository;


    @Override
    public List<ProductDetail> findByProduct(Product product) {
        return olProductDetailRepository.findByProductAndStatus(product,1);
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
        return olProductDetailRepository.findByColorIdAndSizeIdAndProductIdAndStatus(colorId,sizeId,productId,1);
    }

    @Override
    public Optional<ProductDetail> findById(Long productDetailId) {
        return olProductDetailRepository.findById(productDetailId);
    }

    @Override
    public ProductDetail save(ProductDetail productDetail) {
        return olProductDetailRepository.save(productDetail);
    }

    @Override
    public List<ProductDetail> findByColorIdAndProductId(Long colorId, Long productId) {
        return olProductDetailRepository.findByColorIdAndProductIdAndStatus(colorId,productId,1);
    }

}
