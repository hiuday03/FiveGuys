package com.example.demo.service;


import com.example.demo.entity.Bill;
import com.example.demo.entity.Statistical;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface StatisticalService {
    BigDecimal GetAllSumTotalAmountAfterDiscount();

    BigDecimal GetAllSumTotalAmountAfterDiscountTiLe();

    Integer listCodeDay();

    Integer listCodeDayTiLe();

    List<Bill> getAllList();

    Integer listCustomerYear();

    Integer listCustomerYearTile();

    Long listCustomerDay(Date ngayHienTai);

    Long listBillDay(Date ngayHienTai);

    BigDecimal listDoanhThuDay(Date ngayHienTai);

    List<Statistical> getThongKeSanPhamBanChay();
    List<Statistical> getThongKeSanPhamBanChayDate(Date paymentDate);

}
