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

//    @Override
//    public BigDecimal GetAllSumTotalAmountAfterDiscount() {
//        Date localDate =  "2024-01-05";
//        return statisticalRepository.tongSoTienDay(localDate);
//    }
    // tổng doanh thu
    @Override
    public BigDecimal tongTienDay(Date date) {
        return statisticalRepository.tongSoTienDay(date);
    }
    @Override
    public BigDecimal tongTienMonth(Date date) {
        return statisticalRepository.tongSoTienMonth(date);
    }
    @Override
    public BigDecimal tongTienYear(Date date) {
        return statisticalRepository.tongSoTienYear(date);
    }
    // tông hóa đơn
    @Override
    public Integer sumBillDay(Date date){
        int listBill = statisticalRepository.sumBillDay(date).size();
        return listBill;
    }
    @Override
    public Integer sumBillMonth(Date date){
        int listBill = statisticalRepository.sumBillMonth(date).size();
        return listBill;
    }
    @Override
    public Integer sumBillYear(Date date){
        int listBill = statisticalRepository.sumBillYear(date).size();
        return listBill;
    }
    @Override
    public Integer listCodeDayTiLe(Date date){
        int listBill1 = statisticalRepository.sumBillDay(date).size();
        return listBill1;
    }

    //Tổng khách hàng 1 năm
    @Override
    public Integer sanPhamBanDuocNgay(Date date){
        return statisticalRepository.sanPhamBanDuocNgay(date);
    }
    @Override
    public Integer sanPhamBanDuocThang(Date date){
        return statisticalRepository.sanPhamBanDuocMonth(date);
    }
    @Override
    public Integer sanPhamBanDuocNam(Date date){
        return statisticalRepository.sanPhamBanDuocNam(date);
    }
//    @Override
//    public Integer listCustomerYearTile(){
//        LocalDate localDate = LocalDate.now();
//        int namHienTai = localDate.getYear();
//        int listBill1 = statisticalRepository.ListCustumerYear(namHienTai - 1).size();
//        return listBill1;
//    }
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

    //search status bill
    @Override
    public List<Bill> searchStatusBill(Integer hi){
        return statisticalRepository.searchStatusBill(hi);
    }

    @Override
    public List<Statistical> getTop5SanPhamBanChayDay(Date date) {
        return jdbctemplate.query(
                "  SELECT top 5\n" +
                        "        spct.Id AS sanpham_id,\n" +
                        "        sp.Name AS ten_sanpham,\n" +
                        "        spct.Price AS price,\n" +
                        "        SUM(hdct.Quantity) AS so_luong_ban,\n" +
                        "        SUM(hdct.Price) AS doanh_thu,\n" +
                        "        ha.Name AS anh_mac_dinh\n" +
                        "    FROM\n" +
                        "        ProductDetails spct\n" +
                        "    JOIN\n" +
                        "        BillDetails hdct ON spct.id = hdct.IdProductDetail\n" +
                        "    JOIN\n" +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "        Products sp ON spct.IdProduct = sp.id\n" +
                        "    JOIN\n" +
                        "        Images ha ON spct.id = ha.Id\n" +
                        "    WHERE hd.paymentDate = ? and hd.status = 3" +
                        "    GROUP BY spct.id, sp.Name, ha.Name, spct.Price\n" +
                        "    ORDER BY so_luong_ban DESC",
                new Object[]{date},
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
    @Override
    public List<Statistical> getTop5SanPhamBanChayMonth(Date date) {
        return jdbctemplate.query(
                "  SELECT top 5\n" +
                        "        spct.Id AS sanpham_id,\n" +
                        "        sp.Name AS ten_sanpham,\n" +
                        "        spct.Price AS price,\n" +
                        "        SUM(hdct.Quantity) AS so_luong_ban,\n" +
                        "        SUM(hdct.Price) AS doanh_thu,\n" +
                        "        ha.Name AS anh_mac_dinh\n" +
                        "    FROM\n" +
                        "        ProductDetails spct\n" +
                        "    JOIN\n" +
                        "        BillDetails hdct ON spct.id = hdct.IdProductDetail\n" +
                        "    JOIN\n" +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "        Products sp ON spct.IdProduct = sp.id\n" +
                        "    JOIN\n" +
                        "        Images ha ON spct.id = ha.Id\n" +
                        "    where DATEPART(MONTH, hd.PaymentDate) =  Month(?) and DATEPART(YEAR, hd.PaymentDate) = YEAR(?) and hd.status = 3" +
                        "    GROUP BY spct.id, sp.Name, ha.Name, spct.Price\n" +
                        "    ORDER BY so_luong_ban DESC",
                new Object[]{date, date},
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
    @Override
    public List<Statistical> getTop5SanPhamBanChayYear(Date date) {
        return jdbctemplate.query(
                "  SELECT top 5\n" +
                        "        spct.Id AS sanpham_id,\n" +
                        "        sp.Name AS ten_sanpham,\n" +
                        "        spct.Price AS price,\n" +
                        "        SUM(hdct.Quantity) AS so_luong_ban,\n" +
                        "        SUM(hdct.Price) AS doanh_thu,\n" +
                        "        ha.Name AS anh_mac_dinh\n" +
                        "    FROM\n" +
                        "        ProductDetails spct\n" +
                        "    JOIN\n" +
                        "        BillDetails hdct ON spct.id = hdct.IdProductDetail\n" +
                        "    JOIN\n" +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "        Products sp ON spct.IdProduct = sp.id\n" +
                        "    JOIN\n" +
                        "        Images ha ON spct.id = ha.Id\n" +
                        "    where DATEPART(YEAR, hd.PaymentDate) = YEAR(?) and hd.status = 3" +
                        "    GROUP BY spct.id, sp.Name, ha.Name, spct.Price\n" +
                        "    ORDER BY so_luong_ban DESC",
                new Object[]{date},
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
    @Override
    public List<Statistical> getThongKeSanPhamBanChayDate(Date date) {
        return jdbctemplate.query(
                "SELECT " +
                        "spct.Id AS sanpham_id, " +
                        "sp.Name AS ten_sanpham, " +
                        "spct.Price AS price, " +
                        "SUM(hdct.Quantity) AS so_luong_ban, " +
                        "SUM(hdct.Price) AS doanh_thu, " +
                        "ha.Name AS anh_mac_dinh " +
                        "FROM " +
                        "ProductDetails spct " +
                        "JOIN " +
                        "BillDetails hdct ON spct.id = hdct.IdProductDetail " +
                        "JOIN " +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "Products sp ON spct.IdProduct = sp.id " +
                        "JOIN " +
                        "Images ha ON spct.id = ha.Id " +
                        "WHERE hd.paymentDate = ? and hd.status = 3" +
                        "GROUP BY spct.id, sp.Name, ha.Name, spct.Price " +
                        "ORDER BY so_luong_ban DESC",
                new Object[]{date},
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
    @Override
    public List<Statistical> getThongKeSanPhamBanChayMonth(Date date) {
        return jdbctemplate.query(
                "SELECT " +
                        "spct.Id AS sanpham_id, " +
                        "sp.Name AS ten_sanpham, " +
                        "spct.Price AS price, " +
                        "SUM(hdct.Quantity) AS so_luong_ban, " +
                        "SUM(hdct.Price) AS doanh_thu, " +
                        "ha.Name AS anh_mac_dinh " +
                        "FROM " +
                        "ProductDetails spct " +
                        "JOIN " +
                        "BillDetails hdct ON spct.id = hdct.IdProductDetail " +
                        "JOIN " +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "Products sp ON spct.IdProduct = sp.id " +
                        "JOIN " +
                        "Images ha ON spct.id = ha.Id " +
                        "where DATEPART(MONTH, hd.PaymentDate) =  Month(?) and DATEPART(YEAR, hd.PaymentDate) = YEAR(?) and hd.status = 3" +
                        "GROUP BY spct.id, sp.Name, ha.Name, spct.Price " +
                        "ORDER BY so_luong_ban DESC",
                new Object[]{date, date},
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
    @Override
    public List<Statistical> getThongKeSanPhamBanChayYear(Date date) {
        return jdbctemplate.query(
                "SELECT " +
                        "spct.Id AS sanpham_id, " +
                        "sp.Name AS ten_sanpham, " +
                        "spct.Price AS price, " +
                        "SUM(hdct.Quantity) AS so_luong_ban, " +
                        "SUM(hdct.Price) AS doanh_thu, " +
                        "ha.Name AS anh_mac_dinh " +
                        "FROM " +
                        "ProductDetails spct " +
                        "JOIN " +
                        "BillDetails hdct ON spct.id = hdct.IdProductDetail " +
                        "JOIN " +
                        "Bills hd ON hd.id = hdct.IdBill " +
                        "JOIN " +
                        "Products sp ON spct.IdProduct = sp.id " +
                        "JOIN " +
                        "Images ha ON spct.id = ha.Id " +
                        "where DATEPART(YEAR, hd.PaymentDate) = YEAR(?) and hd.status = 3" +
                        "GROUP BY spct.id, sp.Name, ha.Name, spct.Price " +
                        "ORDER BY so_luong_ban DESC",
                new Object[]{date},
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
