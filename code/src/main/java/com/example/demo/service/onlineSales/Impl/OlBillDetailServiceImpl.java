package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.service.onlineSales.OlBillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OlBillDetailServiceImpl implements OlBillDetailService {


    @Autowired
    private OLBillDetailRepository olBillDetailRepository;


    @Override
    public List<BillDetail> findByProductDetail(ProductDetail productDetail) {

        return olBillDetailRepository.findByProductDetailAndStatus(productDetail,1);
    }

    @Override
    public List<BillDetail> findByBill_IdAndStatus(Long Id) {
        return  olBillDetailRepository.findByBill_IdAndStatus(Id,1);
    }


}
