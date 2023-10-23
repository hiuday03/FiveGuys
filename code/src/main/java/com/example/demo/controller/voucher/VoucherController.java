package com.example.demo.controller.voucher;

import com.example.demo.entity.Roles;
import com.example.demo.entity.Vouchers;
import com.example.demo.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    @Autowired
    VoucherService voucherService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Vouchers>> getAll(){
        return ResponseEntity.ok(voucherService.getAll());
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Vouchers vouchers) {
        try {
            Vouchers createdVoucher = voucherService.save(vouchers);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVoucher);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        voucherService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Vouchers> update(@PathVariable Long id,@RequestBody Vouchers vouchers ){
        voucherService.update(id, vouchers);
        if (vouchers != null) {
            return ResponseEntity.ok(vouchers);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
