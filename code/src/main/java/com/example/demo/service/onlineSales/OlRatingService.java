package com.example.demo.service.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.RatingEntity;

import java.util.List;

public interface OlRatingService {
    List<RatingEntity> findByProductDetail(ProductDetail productDetail);

}
