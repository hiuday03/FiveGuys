package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.BillDetail;
import com.example.demo.repository.offlineSales.BillDetailOfflineSalesRepository;
import com.example.demo.service.offlineSales.OfBillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfBillDetailServiceImpl implements OfBillDetailService {
    @Autowired
    private BillDetailOfflineSalesRepository repository;
    @Override
    public List<BillDetail> getAllByBill_Id(Long id) {
        return repository.getAllByBill_Id(id);
    }
}
