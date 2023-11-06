package com.example.demo.restcontroller;

import com.example.demo.entity.Employees;
import com.example.demo.entity.Vouchers;
import com.example.demo.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/voucher")
public class VoucherRestController {

    @Autowired
    VoucherService voucherService;

    @GetMapping("")
    public ResponseEntity<List<Vouchers>> getAll() {
        return ResponseEntity.ok(voucherService.getAll());
    }

    @GetMapping("/list-current-date")
    public ResponseEntity<List<Vouchers>> getAllCurrentDate() {
        return ResponseEntity.ok(voucherService.getDataByCurrentDate());
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Vouchers vouchers) {
        try {
            Vouchers createdVoucher = voucherService.save(vouchers);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVoucher);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        voucherService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // update voucher
    @PutMapping("/{id}")
    public ResponseEntity<Vouchers> update(@PathVariable Long id, @RequestBody Vouchers vouchers) {
        voucherService.update(id, vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //delete
    @PutMapping("/delete/{id}")
    public ResponseEntity<Vouchers> updateStatus(@PathVariable Long id, @RequestBody Vouchers vouchers) {
        voucherService.updateStatus(id, vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //delete
    @PutMapping("/update-date/{id}")
    public ResponseEntity<Vouchers> updateStatusDangHoatDong(@PathVariable Long id, @RequestBody Vouchers vouchers) {
        voucherService.updateStatusDangHoatDong(id, vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
