package com.example.demo.restcontroller;

import com.example.demo.entity.Employees;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.VoucherRepository;
import com.example.demo.service.VoucherService;
import com.fasterxml.jackson.core.io.BigDecimalParser;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/voucher")
public class VoucherRestController {

    @Autowired
    VoucherService voucherService;

    @Autowired
    VoucherRepository voucherRepository;

    @GetMapping("")
    public ResponseEntity<List<Vouchers>> getAll() {
        return ResponseEntity.ok(voucherService.getAll());
    }

    @GetMapping("/list-current-date")
    public ResponseEntity<List<Vouchers>> getAllCurrentDate() {
        return ResponseEntity.ok(voucherService.getDataByCurrentDate());
    }
    @GetMapping("/timkiem-status/{st}")
    public ResponseEntity<?> getVoucherStatus(@PathVariable Integer st){
        return ResponseEntity.ok(voucherService.getVoucherStatus(st));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Vouchers vouchers) {
        voucherService.save(vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        voucherService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // update voucher
    @PutMapping("/update/{id}")
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


}
