package com.example.demo.service.onlineSales;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlRatingResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OlRatingService {
    List<RatingEntity> findByProduct(Product productDetail);
//    List<RatingEntity> findByProductId(Long id);

    List<RatingEntity> getRatingListByUsername( String username);

    void deleteRating(Long id);

    boolean addRating(OlRatingResponse ratingEntity);

//    List<RatingEntity> findByProduct_Id(Long productId);

    List<RatingEntity> findByBillDetailAndStatus(BillDetail billDetail,int status);

    List<RatingEntity> findByBillDetail_Id(Long idBillDetail);

    Page<RatingEntity> findAllByCustomer_IdOrderByYourFieldDesc(Long customerId, int page, int size);

    Page<RatingEntity> findByProductId( Long productId, int page, int size);


}
