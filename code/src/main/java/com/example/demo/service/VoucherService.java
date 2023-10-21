package com.example.demo.service;

import com.example.demo.entity.Roles;
import com.example.demo.entity.Vouchers;

import java.util.List;

public interface VoucherService {
    List<Vouchers> getAll();

    Vouchers save(Vouchers vouchers);

    void delete(Long id);

    Vouchers update(Long id, Vouchers vouchers);
}

