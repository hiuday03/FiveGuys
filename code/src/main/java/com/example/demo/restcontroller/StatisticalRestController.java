package com.example.demo.restcontroller;

import com.example.demo.entity.Bill;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Statistical;
import com.example.demo.repository.StatisticalRepository;
import com.example.demo.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/statistical")
@CrossOrigin("*")
public class StatisticalRestController {
    @Autowired
    StatisticalRepository statisticalRepository;

    @Autowired
    StatisticalService statisticalService;

    @GetMapping("/tong-doanh-thu-ngay/{sl}")
    public ResponseEntity<BigDecimal> tongTienDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        BigDecimal customers = statisticalService.tongTienDay(sl);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/tong-doanh-thu-thang/{sl}")
    public ResponseEntity<BigDecimal> tongTienMonth(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        BigDecimal customers = statisticalService.tongTienMonth(sl);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/tong-doanh-thu-nam/{sl}")
    public ResponseEntity<BigDecimal> tongTienYear(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        BigDecimal customers = statisticalService.tongTienYear(sl);
        return ResponseEntity.ok(customers);
    }

//    @GetMapping("/he")
//    public ResponseEntity<BigDecimal> GetAllSumTotalAmountAfterDiscountTiLe() {
//        BigDecimal customers = statisticalService.GetAllSumTotalAmountAfterDiscountTiLe();
//        return ResponseEntity.ok(customers);
//    }
    // tổng hóa đơn
    @GetMapping("/tong-hoa-don-ngay/{sl}")
    public Integer sumBillDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return statisticalService.sumBillDay(sl);
    }
    @GetMapping("/tong-hoa-don-thang/{sl}")
    public Integer sumBillMonth(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return statisticalService.sumBillMonth(sl);
    }
    @GetMapping("/tong-hoa-don-nam/{sl}")
    public Integer sumBillYear(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        return statisticalService.sumBillYear(sl);
    }

//    @GetMapping("/tile-day")
//    public Integer listCodeDayTiLe() {
//        return statisticalService.listCodeDayTiLe();
//    }

    @GetMapping("/get-all-list")
    public List<Bill> getAllList() {
        return statisticalService.getAllList();
    }

    @GetMapping("/san-pham-ban-ra-ngay/{sl}")
    public ResponseEntity<Integer> sanPhamBanDuocNgay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        Integer customers = statisticalService.sanPhamBanDuocNgay(sl);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/san-pham-ban-ra-thang/{sl}")
    public ResponseEntity<Integer> sanPhamBanDuocThang(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        Integer customers = statisticalService.sanPhamBanDuocThang(sl);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/san-pham-ban-ra-nam/{sl}")
    public ResponseEntity<Integer> sanPhamBanDuocNam(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl) {
        Integer customers = statisticalService.sanPhamBanDuocNam(sl);
        return ResponseEntity.ok(customers);
    }


//    @GetMapping("/list-customer-year-tile")
//    public Integer ListCustumerYearTile() {
//        return statisticalService.listCustomerYearTile();
//    }

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

    @GetMapping("/top5-ban-chay-day/{sl}")
    public ResponseEntity<?> top5banchayDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getTop5SanPhamBanChayDay(sl));
    }
    @GetMapping("/top5-ban-chay-month/{sl}")
    public ResponseEntity<?> top5banchayMonth(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getTop5SanPhamBanChayMonth(sl));
    }
    @GetMapping("/top5-ban-chay-year/{sl}")
    public ResponseEntity<?> top5banchayYear(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getTop5SanPhamBanChayYear(sl));
    }
    @GetMapping("/top-ban-chay-date/{sl}")
    public ResponseEntity<?> topbanchayDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getThongKeSanPhamBanChayDate(sl));
    }
    @GetMapping("/top-ban-chay-month/{sl}")
    public ResponseEntity<?> topbanchayMonth(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getThongKeSanPhamBanChayMonth(sl));
    }
    @GetMapping("/top-ban-chay-year/{sl}")
    public ResponseEntity<?> topbanchayYear(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date sl){
        return ResponseEntity.ok().body(statisticalService.getThongKeSanPhamBanChayYear(sl));
    }
}
