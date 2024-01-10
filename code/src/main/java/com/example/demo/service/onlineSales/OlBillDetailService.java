package com.example.demo.service.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;

import java.util.List;
import java.util.Optional;

public interface OlBillDetailService {
    List<BillDetail> findByProductDetail(ProductDetail productDetail);

    List<BillDetail> findByBill_IdAndStatus(Long Id);

    List<BillDetail> findByProductDetailAndStatus(Long Id,int status);


    Optional<BillDetail> findById(Long id);


}
