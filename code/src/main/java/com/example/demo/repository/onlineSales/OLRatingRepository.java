package com.example.demo.repository.onlineSales;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLRatingRepository extends JpaRepository<RatingEntity, Long> {

    List<RatingEntity> findByBillDetailAndStatus(Product product, int status);

    List<RatingEntity> findAllByCustomer_Id(Long Id);


//    List<RatingEntity> findByProduct_Id(Long productId);

//    List<RatingEntity> findByBillDetail_Product_ProductId(Long idProduct);

    List<RatingEntity> findByBillDetailAndStatus(BillDetail billDetail,int status);

}
