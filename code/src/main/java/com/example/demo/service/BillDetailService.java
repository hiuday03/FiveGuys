package com.example.demo.service;

import com.example.demo.entity.BillDetail;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillDetailService {

    List<BillDetail> getAllBillDetail();

    BillDetail getBillDetailById(Long id);

    Page<BillDetail> getAllBillDetailPage(Integer page);

    BillDetail createBillDetail(BillDetail billDetail);

    BillDetail updateBillDetail(BillDetail billDetail, Long id);

    void deleteBillDetail(Long id);

    List<BillDetail> getAllByBillId(Long id);
}
