package com.example.demo.repository.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLRatingRepository extends JpaRepository<RatingEntity, Long> {

    List<RatingEntity> findByProductDetailAndStatus(ProductDetail productDetail,int status);


}
