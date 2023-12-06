package com.example.demo.restcontroller;

import com.example.demo.entity.Bill;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.repository.StatisticalRepository;
import com.example.demo.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
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
    @GetMapping("/list-customer-day/{sl}")
    public Long ListCustumerDay(@PathVariable Integer sl) {
        return statisticalService.listCustomerDay(sl);
    }

}
