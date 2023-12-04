package com.example.demo.service;


import com.example.demo.entity.Bill;

import java.math.BigDecimal;
import java.util.List;

public interface StatisticalService {
    BigDecimal GetAllSumTotalAmountAfterDiscount();

    BigDecimal GetAllSumTotalAmountAfterDiscountTiLe();

    Integer listCodeDay();

    Integer listCodeDayTiLe();

    List<Bill> getAllList();

    Integer listCustomerYear();

    Long listCustomerDay(Integer ngayHienTai);
}
