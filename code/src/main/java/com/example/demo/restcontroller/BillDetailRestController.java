package com.example.demo.restcontroller;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.service.serviceiplm.BillDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/billDetails")

public class BillDetailRestController {
    @Autowired
    private BillDetailServiceImpl billDetailService;

    @GetMapping("")
    public ResponseEntity<List<BillDetail>> getAllBill(){
        List<BillDetail> billDetails = billDetailService.getAllBillDetail();
        return ResponseEntity.ok(billDetails);
    }
    @PostMapping("")
    public ResponseEntity<?> createBillDetail(@RequestBody BillDetail billDetail) {
        try {
            BillDetail createBillDetail = billDetailService.createBillDetail(billDetail);
            return ResponseEntity.status(HttpStatus.CREATED).body(createBillDetail);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BillDetail> updateCustomer(@RequestBody BillDetail billDetail, @PathVariable Long id) {
        BillDetail billDetail1 = billDetailService.updateBillDetail(billDetail, id);
        if (billDetail1 != null) {
            return ResponseEntity.ok(billDetail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillDetail(@PathVariable Long id) {
        try {
            billDetailService.deleteBillDetail(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllExportExcel")
    public ResponseEntity<?> getAllExportExcel(){
        return ResponseEntity.ok(billDetailService.getAllExportExcel());
    }
}
