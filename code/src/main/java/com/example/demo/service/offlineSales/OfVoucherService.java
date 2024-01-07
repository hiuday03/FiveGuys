package com.example.demo.service.offlineSales;

import com.example.demo.entity.Vouchers;

import java.util.List;

public interface OfVoucherService {
    List<Vouchers> getAllVoucherByStatus();

    Vouchers update(Long id, Vouchers vouchers);

    Vouchers getOne(Long id);
}
