package com.example.demo.service;

import com.example.demo.entity.Bill;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillService {
    List<Bill> getAllBill();

    Bill getBillById(Long id);

    Page<Bill> getAllBillPage(Integer page);

    Bill createBill(Bill bill);

    Bill updateBill(Bill bill, Long id);

    void deleteBill(Long id);


    Bill updateStatus(Integer status, Long id);

}
