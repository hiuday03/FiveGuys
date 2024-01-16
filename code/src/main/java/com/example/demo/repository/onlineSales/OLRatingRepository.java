package com.example.demo.repository.onlineSales;

import com.example.demo.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLRatingRepository extends JpaRepository<RatingEntity, Long> {

//    List<RatingEntity> findByBillDetailAndStatus(Product product, int status);

    List<RatingEntity> findAllByCustomer_Id(Long Id);

    @Query("SELECT r FROM RatingEntity r WHERE r.customer.id = :customerId ORDER BY r.createdAt DESC")
    Page<RatingEntity> findAllByCustomer_IdOrderByYourFieldDesc(Long customerId, Pageable pageable);

//    List<RatingEntity> findByProduct_Id(Long productId);

//    List<RatingEntity> findByBillDetail_Product_ProductId(Long idProduct);

    List<RatingEntity> findByBillDetailAndStatus(BillDetail billDetail, int status);

    List<RatingEntity> findByBillDetail_Id(Long idBillDetail);

    @Query("SELECT r FROM RatingEntity r " +
            "JOIN r.billDetail bd " +
            "JOIN bd.productDetail pd " +
            "WHERE pd.product.id = :productId AND r.status = 2")
    Page<RatingEntity> findByProductId(@Param("productId") Long productId, Pageable pageable);

    boolean existsByCustomerAndBillDetail(CustomerEntity customerEntity,BillDetail billDetail);

}
