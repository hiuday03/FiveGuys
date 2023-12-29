package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Bill;
import com.example.demo.entity.Statistical;
import com.example.demo.repository.BillRepository;
import com.example.demo.repository.StatisticalRepository;
import com.example.demo.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class StatisticalServiceIpm implements StatisticalService {

    @Autowired
    StatisticalRepository statisticalRepository;
    @Autowired
    BillRepository billRepository;

    @Autowired
    JdbcTemplate jdbctemplate;

    @Override
    public BigDecimal GetAllSumTotalAmountAfterDiscount() {
        LocalDate localDate = LocalDate.now();
        int thangHienTai = localDate.getMonthValue();
        int namHienTai = localDate.getYear();
        return statisticalRepository.GetAllSumTotalAmountAfterDiscount(thangHienTai, namHienTai);
    }
    @Override
    public BigDecimal GetAllSumTotalAmountAfterDiscountTiLe() {
        LocalDate localDate = LocalDate.now();
        int thangHienTai = localDate.getMonthValue()-1;
        int namHienTai = localDate.getYear();
        return statisticalRepository.GetAllSumTotalAmountAfterDiscount(thangHienTai, namHienTai);
    }

    @Override
    public Integer listCodeDay(){
        LocalDate localDate = LocalDate.now();
        int ngayHienTai = localDate.getDayOfMonth();
        int thangHienTai = localDate.getMonthValue();
        int namHienTai = localDate.getYear();
        int listBill = statisticalRepository.listCodeDay(ngayHienTai, thangHienTai, namHienTai).size();
        return listBill;
    }
    @Override
    public Integer listCodeDayTiLe(){
        LocalDate localDate = LocalDate.now();
        int ngayHienTai = localDate.getDayOfMonth()-1;
        int thangHienTai = localDate.getMonthValue();
        int namHienTai = localDate.getYear();
        int listBill1 = statisticalRepository.listCodeDay(ngayHienTai, thangHienTai, namHienTai).size();
        return listBill1;
    }

    //Tổng khách hàng 1 năm
    @Override
    public Integer listCustomerYear(){
        LocalDate localDate = LocalDate.now();
        int namHienTai = localDate.getYear();
        int listBill1 = statisticalRepository.ListCustumerYear(namHienTai).size();
        return listBill1;
    }
    @Override
    public Integer listCustomerYearTile(){
        LocalDate localDate = LocalDate.now();
        int namHienTai = localDate.getYear();
        int listBill1 = statisticalRepository.ListCustumerYear(namHienTai - 1).size();
        return listBill1;
    }
    //Tông số customes trong ngày
    @Override
    public Long listCustomerDay(Date ngayHienTai){
        Long listBill1 = statisticalRepository.ListCustumerDay(ngayHienTai);
        return listBill1;
    }
    //tổng số bill trong ngày
    @Override
    public Long listBillDay(Date ngayHienTai){
        Long listBill1 = statisticalRepository.ListBillDay(ngayHienTai);
        return listBill1;
    }
    //Tông doanh thu 1 ngay
    @Override
    public BigDecimal listDoanhThuDay(Date ngayHienTai){
        return statisticalRepository.ListDoanhThuDay(ngayHienTai);
    }
    @Override
    public List<Bill> getAllList(){
        return billRepository.findAll();
    }

    @Override
    public List<Statistical> getThongKeSanPhamBanChay() {
        return jdbctemplate.query(
                "  SELECT top 5\n" +
                        "        spct.Id AS sanpham_id,\n" +
                        "        sp.Name AS ten_sanpham,\n" +
                        "        spct.Price AS price,\n" +
                        "        COUNT(hdct.id) AS so_luong_ban,\n" +
                        "        SUM(hdct.Price) AS doanh_thu,\n" +
                        "        ha.Name AS anh_mac_dinh\n" +
                        "    FROM\n" +
                        "        ProductDetails spct\n" +
                        "    JOIN\n" +
                        "        BillDetails hdct ON spct.id = hdct.IdProductDetail\n" +
                        "    JOIN\n" +
                        "        Products sp ON spct.IdProduct = sp.id\n" +
                        "    JOIN\n" +
                        "        Images ha ON spct.id = ha.Id\n" +
                        "    GROUP BY spct.id, sp.Name, ha.Name, spct.Price\n" +
                        "    ORDER BY so_luong_ban DESC",
                ((rs, rowNum) -> new Statistical(
                        rs.getLong("sanpham_id"),
                        rs.getString("ten_sanpham"),
                        rs.getBigDecimal("price"),
                        rs.getInt("so_luong_ban"),
                        rs.getBigDecimal("doanh_thu"),
                        rs.getString("anh_mac_dinh")
                ))
        );
    }
}
