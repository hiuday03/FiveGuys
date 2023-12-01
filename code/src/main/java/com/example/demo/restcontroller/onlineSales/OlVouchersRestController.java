package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.Vouchers;
import com.example.demo.service.onlineSales.OlVouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/ol")
public class OlVouchersRestController {

    @Autowired
    private OlVouchersService olVouchersService;

//    @GetMapping("/vouchers")
//    public ResponseEntity<?> findAllVouchers() {
//        return ResponseEntity.ok(olVouchersService.findAll());
//    }

    @GetMapping("/vouchers")
    public ResponseEntity<?> findActiveVouchers() {
        return ResponseEntity.ok(olVouchersService.findActiveVouchers());
    }

//    @GetMapping("/vouchers/{id}")
//    public ResponseEntity<?> getVouchers(@PathVariable("id") Long id) {
//        Optional<Vouchers> optionalVouchers = olVouchersService.findById(id);
//
//        if (optionalVouchers.isPresent()) {
//            Vouchers vouchers = optionalVouchers.get();
//            return ResponseEntity.ok(vouchers);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @GetMapping("/vouchers/{code}")
    public ResponseEntity<?> findVoucherByCode(@PathVariable("code") String code) {
        Vouchers voucher = olVouchersService.findByCode(code);
        List<Vouchers> vouchersList = new ArrayList<Vouchers>();
        vouchersList.add(voucher);

        if (vouchersList != null) {
            return ResponseEntity.ok(vouchersList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
