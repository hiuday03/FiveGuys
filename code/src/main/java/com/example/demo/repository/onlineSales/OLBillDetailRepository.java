package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OLBillDetailRepository extends JpaRepository<BillDetail, Long> {

    List<BillDetail> findByProductDetailAndStatus(ProductDetail productDetail,int status);

    List<BillDetail> findByBill_Id(Long Id);

    @Query("SELECT bd FROM BillDetail bd WHERE bd.productDetail.id = :productDetailId AND bd.status = :status")
    List<BillDetail> findByProductDetailAndStatus(@Param("productDetailId") Long productDetailId, @Param("status") int status);


}
