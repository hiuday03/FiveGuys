package com.example.demo.service.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.RatingEntity;

import java.util.List;

public interface OlRatingService {
    List<RatingEntity> findByProductDetail(ProductDetail productDetail);
    List<RatingEntity> getRatingListByUsername( String username);

    void deleteRating(Long id);

    boolean addRating(RatingEntity ratingEntity);

}
