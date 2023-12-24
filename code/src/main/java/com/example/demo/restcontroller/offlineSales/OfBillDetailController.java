package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.service.offlineSales.OfBillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bill-detail")
public class OfBillDetailController {
    @Autowired
    private OfBillDetailService service;

    @RequestMapping("/{id}")
    public ResponseEntity<List<BillDetail>> getAllBilDTByBillId(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAllByBill_Id(id));
    }
}
