package com.example.demo.repository;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Statistical;
import org.apache.commons.math3.stat.inference.OneWayAnova;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface StatisticalRepository extends JpaRepository<Bill, Long> {
    //Tống số tiền trong 1 tháng
    @Query("SELECT COALESCE(SUM(v.totalAmountAfterDiscount), 0) AS totalAmount FROM Bill v where v.paymentDate = :date and v.status = 3")
    BigDecimal tongSoTienDay(Date date);
    @Query("SELECT COALESCE(SUM(v.totalAmountAfterDiscount), 0) AS totalAmount FROM Bill v where DATEPART(MONTH, v.paymentDate) =  Month(:date) and DATEPART(YEAR, v.paymentDate) = YEAR(:date) and v.status=3")
    BigDecimal tongSoTienMonth(Date date);
    @Query("SELECT COALESCE(SUM(v.totalAmountAfterDiscount), 0) AS totalAmount FROM Bill v where DATEPART(YEAR, v.paymentDate) = YEAR(:date) and v.status=3")
    BigDecimal tongSoTienYear(Date date);

    //Tổng số dơn
    @Query("select b from Bill b where b.paymentDate  = :day and b.status=3")
    List<Bill> sumBillDay(Date day);
    @Query("select b from Bill b where DATEPART(MONTH, b.paymentDate) =  Month(:date) and DATEPART(YEAR, b.paymentDate) = YEAR(:date) and b.status=3")
    List<Bill> sumBillMonth(Date date);
    @Query("select b from Bill b where DATEPART(YEAR, b.paymentDate) = YEAR(:date) and b.status=3")
    List<Bill> sumBillYear(Date date);

    //Tổng số khách hàng trong 1 nam
    @Query("SELECT COALESCE(SUM(hdct.quantity), 0) from BillDetail hdct where hdct.bill.paymentDate  = :date and hdct.bill.status=3")
    Integer sanPhamBanDuocNgay(Date date);
    @Query("SELECT COALESCE(SUM(hdct.quantity), 0) from BillDetail hdct where DATEPART(MONTH, hdct.bill.paymentDate) =  Month(:date) and DATEPART(YEAR, hdct.bill.paymentDate) = YEAR(:date) and hdct.bill.status=3")
    Integer sanPhamBanDuocMonth(Date date);
    @Query("SELECT COALESCE(SUM(hdct.quantity), 0) from BillDetail hdct where DATEPART(YEAR, hdct.bill.paymentDate) = YEAR(:date) and hdct.bill.status=3")
    Integer sanPhamBanDuocNam(Date date);


    //Tổng số khách hàng trong 1 ngay
    @Query("SELECT COUNT(b.id) as hihi from CustomerEntity b where b.createdAt  = :day")
    Long ListCustumerDay(Date day);

    //Tổng số hoa don trong 1 ngày
    @Query("SELECT COUNT(b.id) as hihi from Bill b where b.paymentDate  = :day")
    Long ListBillDay(Date day);

    //Tổng số doanh thu trong 1 ngày
    @Query("SELECT COALESCE(SUM(b.totalAmountAfterDiscount), 0) as hihi from Bill b where b.paymentDate  = :day")
    BigDecimal ListDoanhThuDay(Date day);

    // search trang thai bill
    @Query("SELECT b From Bill b where b.status =:status")
    List<Bill> searchStatusBill(Integer status);

//    @Query(
//            "SELECT TOP 5 " +
//                    "    spct.Id AS sanpham_id, " +
//                    "    sp.Name AS ten_sanpham, " +
//                    "    spct.Price AS price, " +
//                    "    COUNT(hdct.id) AS so_luong_ban, " +
//                    "    SUM(hdct.Price) AS doanh_thu, " +
//                    "    ha.Name AS anh_mac_dinh " +
//                    "FROM " +
//                    "    ProductDetails spct " +
//                    "JOIN " +
//                    "    BillDetails hdct ON spct.id = hdct.IdProductDetail " +
//                    "JOIN " +
//                    "    Products sp ON spct.IdProduct = sp.id " +
//                    "JOIN " +
//                    "    Images ha ON spct.id = ha.Id " +
//                    "GROUP BY spct.id, sp.Name, ha.Name, spct.Price " +
//                    "ORDER BY so_luong_ban DESC",
//            ((rs, rowNum) -> new Statistical(
//                    rs.getLong("sanpham_id"),
//                    rs.getString("ten_sanpham"),
//                    rs.getBigDecimal("price"),
//                    rs.getInt("so_luong_ban"),
//                    rs.getBigDecimal("doanh_thu"),
//                    rs.getString("anh_mac_dinh")
//            ))
//    )
//                                )
//    List<Statistical> top5Banchay();
}
