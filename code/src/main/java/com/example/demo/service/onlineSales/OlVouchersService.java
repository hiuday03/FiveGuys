package com.example.demo.service.onlineSales;

import com.example.demo.entity.Product;
import com.example.demo.entity.Size;
import com.example.demo.entity.Vouchers;

import java.util.List;
import java.util.Optional;

public interface OlVouchersService {

  List<Vouchers>  findAll();

  Optional<Vouchers> findById(Long id);

  Vouchers findByCode(String code);

  List<Vouchers> findActiveVouchers();


}
