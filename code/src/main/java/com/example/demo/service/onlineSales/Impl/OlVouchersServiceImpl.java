package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Product;
import com.example.demo.entity.Size;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.onlineSales.OLSizeRepository;
import com.example.demo.repository.onlineSales.OLVouchersRepository;
import com.example.demo.service.onlineSales.OlSizeService;
import com.example.demo.service.onlineSales.OlVouchersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class OlVouchersServiceImpl implements OlVouchersService {

    @Autowired
    private OLVouchersRepository repository;

    @Override
    public List<Vouchers> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Vouchers> findById(Long id) {
        Optional<Vouchers> optionalVouchers = repository.findById(id);
        if (optionalVouchers.isPresent()) {
            Vouchers vouchers = optionalVouchers.get();
            return Optional.of(vouchers);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Vouchers findByCode(String code) {
        return repository.findByCode(code);
    }

    @Override
    public List<Vouchers> findActiveVouchers() {
        return repository.findActiveVouchers();
    }
}
