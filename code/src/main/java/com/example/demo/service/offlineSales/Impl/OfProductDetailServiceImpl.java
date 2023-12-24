package com.example.demo.service.offlineSales.Impl;

import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import com.example.demo.repository.offlineSales.OfProductDetailRepository;
import com.example.demo.service.offlineSales.OfProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfProductDetailServiceImpl implements OfProductDetailService {
    @Autowired
    private OfProductDetailRepository repository;
    @Override
    public List<OfModelProductDetail> getAll() {
        return repository.findAll();
    }
}
