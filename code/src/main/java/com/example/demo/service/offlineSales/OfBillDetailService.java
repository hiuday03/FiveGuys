package com.example.demo.service.offlineSales;

import com.example.demo.entity.BillDetail;

import java.util.List;

public interface OfBillDetailService {
    List<BillDetail> getAllByBill_Id(Long id);
}
