package com.example.demo.service.onlineSales;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlRatingResponse;

import java.util.List;

public interface OlRatingService {
    List<RatingEntity> findByProduct(Product productDetail);
    List<RatingEntity> findByProductId(Long id);

    List<RatingEntity> getRatingListByUsername( String username);

    void deleteRating(Long id);

    boolean addRating(OlRatingResponse ratingEntity);

//    List<RatingEntity> findByProduct_Id(Long productId);

    List<RatingEntity> findByBillDetailAndStatus(BillDetail billDetail,int status);


}
