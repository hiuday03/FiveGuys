package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.RatingEntity;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLRatingRepository;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OlRatinglServiceImpl implements OlRatingService {


    @Autowired
    private OLRatingRepository olRatingRepository;


    @Override
    public List<RatingEntity> findByProductDetail(ProductDetail productDetail) {
        return olRatingRepository.findByProductDetailAndStatus(productDetail,1);
    }
}
