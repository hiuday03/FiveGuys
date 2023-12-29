package com.example.demo.restcontroller;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.BillRepository;
import com.example.demo.service.BillDetailService;
import com.example.demo.service.serviceiplm.BillServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bills")

public class BillsRestController {

    @Autowired
    BillRepository billRepository;

    @Autowired
    BillDetailService billDetailService;

    private final BillServiceImpl billService;

    @Autowired
    public BillsRestController(BillServiceImpl billService) {
        this.billService = billService;
    }

    @GetMapping("")
    public ResponseEntity<List<Bill>> getAllBill(){
        List<Bill> bills = billService.getAllBill();
        return ResponseEntity.ok(bills);
    }
    @PostMapping("")
    public ResponseEntity<?> createBill(@RequestBody Bill bill) {
        try {
            Bill createBill = billService.createBill(bill);
            return ResponseEntity.status(HttpStatus.CREATED).body(createBill);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateCustomer(@RequestBody Bill bill, @PathVariable Long id) {
        Bill bill1 = billService.updateBill(bill, id);
        if (bill1 != null) {
            return ResponseEntity.ok(bill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Bill> updateCustomer(@RequestBody Integer status, @PathVariable Long id) {
        Bill bill1 = billService.updateStatus(status, id);
        if (bill1 != null) {
            return ResponseEntity.ok(bill1);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        try {
            billService.deleteBill(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/billDetail")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") Long id){
        List<BillDetail> billDetails = billDetailService.getAllByBillId(id);
        return ResponseEntity.ok(billDetails);
    }

}
