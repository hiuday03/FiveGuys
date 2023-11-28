package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Bill;
import com.example.demo.repository.BillRepository;
import com.example.demo.repository.StatisticalRepository;
import com.example.demo.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class StatisticalServiceIpm implements StatisticalService {

    @Autowired
    StatisticalRepository statisticalRepository;
    @Autowired
    BillRepository billRepository;

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
    @Override
    public Integer listCustomerList(){
        LocalDate localDate = LocalDate.now();
        int namHienTai = localDate.getYear();
        int listBill1 = statisticalRepository.ListCustumerYear(namHienTai).size();
        return listBill1;
    }
    @Override
    public List<Bill> getAllList(){
        return billRepository.findAll();
    }
}
