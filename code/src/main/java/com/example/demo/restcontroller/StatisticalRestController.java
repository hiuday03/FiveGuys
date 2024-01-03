package com.example.demo.restcontroller;

import com.example.demo.entity.Bill;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Statistical;
import com.example.demo.repository.StatisticalRepository;
import com.example.demo.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/statistical")
public class StatisticalRestController {
    @Autowired
    StatisticalRepository statisticalRepository;

    @Autowired
    StatisticalService statisticalService;

    @GetMapping("")
    public ResponseEntity<BigDecimal> getAll() {
        BigDecimal customers = statisticalService.GetAllSumTotalAmountAfterDiscount();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/he")
    public ResponseEntity<BigDecimal> GetAllSumTotalAmountAfterDiscountTiLe() {
        BigDecimal customers = statisticalService.GetAllSumTotalAmountAfterDiscountTiLe();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/count-day")
    public Integer listCodeDay() {
        return statisticalService.listCodeDay();
    }

    @GetMapping("/tile-day")
    public Integer listCodeDayTiLe() {
        return statisticalService.listCodeDayTiLe();
    }

    @GetMapping("/get-all-list")
    public List<Bill> getAllList() {
        return statisticalService.getAllList();
    }

    @GetMapping("/list-customer-year")
    public Integer ListCustumerYear() {
        return statisticalService.listCustomerYear();
    }

    @GetMapping("/list-customer-year-tile")
    public Integer ListCustumerYearTile() {
        return statisticalService.listCustomerYearTile();
    }

    @GetMapping("/list-customer-day/{sl}")
    public Long ListCustumerDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return statisticalService.listCustomerDay(sl);
    }
    @GetMapping("/list-bill-day/{sl}")
    public Long ListBillDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return statisticalService.listBillDay(sl);
    }
    @GetMapping("/list-doanhthu-day/{sl}")
    public ResponseEntity<BigDecimal> ListDoanhThuDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return ResponseEntity.ok(statisticalService.listDoanhThuDay(sl));
    }

    @GetMapping("/top5-ban-chay")
    public ResponseEntity<?> topbanchay(){
        return ResponseEntity.ok().body(statisticalService.getThongKeSanPhamBanChay());
    }
    @GetMapping("/top5-ban-chay-date/{sl}")
    public ResponseEntity<?> topbanchayDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getThongKeSanPhamBanChayDate(sl));
    }
}
