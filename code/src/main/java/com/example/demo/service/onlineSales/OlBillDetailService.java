package com.example.demo.service.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface OlBillDetailService {
    List<BillDetail> findByProductDetail(ProductDetail productDetail);

    List<BillDetail> findByBill_IdAndStatus(Long Id);

}
