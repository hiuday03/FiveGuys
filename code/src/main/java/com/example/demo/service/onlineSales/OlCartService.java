package com.example.demo.service.onlineSales;

import com.example.demo.entity.Cart;

import java.util.UUID;

public interface OlCartService {

    Cart findByCustomerId(Long id);

    Cart save(Cart gioHang);

}
