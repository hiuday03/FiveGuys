package com.example.demo.service;

import com.example.demo.entity.Roles;
import com.example.demo.entity.Vouchers;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface VoucherService {
    List<Vouchers> getAll();

    Vouchers save(Vouchers vouchers);

    void delete(Long id);

    //update voucher
    Vouchers update(Long id, Vouchers vouchers);

    //update voucher thành Đã Xóa
    Vouchers updateStatus(Long id, Vouchers vouchers);

    List<Vouchers> getDataByCurrentDate();

}

