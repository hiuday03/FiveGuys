package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Cart;
import com.example.demo.repository.onlineSales.OLCartRepository;
import com.example.demo.service.onlineSales.OlCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OlCartServiceImpl implements OlCartService {

    @Autowired
    private OLCartRepository olCartRepository;

    @Override
    public Cart findByCustomerId(Long id) {
        return olCartRepository.findByCustomerId(id);
    }

    @Override
    public Cart save(Cart gioHang) {
        return olCartRepository.save(gioHang);
    }
}
