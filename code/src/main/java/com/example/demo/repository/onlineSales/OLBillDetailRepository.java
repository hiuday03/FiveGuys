package com.example.demo.repository.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLBillDetailRepository extends JpaRepository<BillDetail, Long> {

    List<BillDetail> findByProductDetailAndStatus(ProductDetail productDetail,int status);

    List<BillDetail> findByBill_IdAndStatus(Long Id,int status);
}
