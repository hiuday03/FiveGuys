package com.example.demo.restcontroller;

import com.example.demo.entity.Vouchers;
import com.example.demo.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/voucher")
public class VoucherRestController {

    @Autowired
    VoucherService voucherService;

    @GetMapping("")
    public ResponseEntity<List<Vouchers>> getAll(){
        return ResponseEntity.ok(voucherService.getAll());
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
    public ResponseEntity<Void> delete(@PathVariable Long id){
        voucherService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vouchers> update(@PathVariable Long id,@RequestBody Vouchers vouchers ){
        voucherService.update(id, vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
