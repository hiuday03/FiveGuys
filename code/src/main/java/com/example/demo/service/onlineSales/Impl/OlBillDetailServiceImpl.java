package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.service.onlineSales.OlBillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return  olBillDetailRepository.findByBill_Id(Id);
    }

    @Override
    public List<BillDetail> findByProductDetailAndStatus(Long Id, int status) {
        return olBillDetailRepository.findByProductDetailAndStatus(Id,status);
    }

    @Override
    public Optional<BillDetail> findById(Long id) {
        return olBillDetailRepository.findById(id);
    }


}
