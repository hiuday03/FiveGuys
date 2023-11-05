package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.service.onlineSales.OlBillService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/ol")
public class BillRestController {

    @Autowired
    private OlBillService olBillService;

    @PostMapping("/bill/create")
    public ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData){
        return ResponseEntity.ok(olBillService.TaoHoaDonNguoiDungChuaDangNhap(orderData));
    }
}
