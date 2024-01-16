package com.example.demo.service;


import com.example.demo.entity.Bill;
import com.example.demo.entity.Statistical;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface StatisticalService {
    BigDecimal tongTienDay(Date date);

    BigDecimal tongTienMonth(Date date);

    BigDecimal tongTienYear(Date date);

    Integer sumBillDay(Date date);

    Integer sumBillMonth(Date date);

    Integer sumBillYear(Date date);

    Integer listCodeDayTiLe(Date date);

    List<Bill> getAllList();

    Integer sanPhamBanDuocNgay(Date date);

    Integer sanPhamBanDuocThang(Date date);

    Integer sanPhamBanDuocNam(Date date);

    List<Bill> searchStatusBill(Integer hi);
//
//    Integer listCustomerYearTile();

    Long listCustomerDay(Date ngayHienTai);

    Long listBillDay(Date ngayHienTai);

    BigDecimal listDoanhThuDay(Date ngayHienTai);

    List<Statistical> getTop5SanPhamBanChayDay(Date date);

    List<Statistical> getTop5SanPhamBanChayMonth(Date date);

    List<Statistical> getTop5SanPhamBanChayYear(Date date);

    List<Statistical> getThongKeSanPhamBanChayDate(Date paymentDate);

    List<Statistical> getThongKeSanPhamBanChayMonth(Date date);

    List<Statistical> getThongKeSanPhamBanChayYear(Date date);

}
