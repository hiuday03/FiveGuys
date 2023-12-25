package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Category;
import com.example.demo.entity.Size;
import com.example.demo.repository.onlineSales.OLCategoryRepository;
import com.example.demo.repository.onlineSales.OLSizeRepository;
import com.example.demo.service.onlineSales.OlCategoryService;
import com.example.demo.service.onlineSales.OlSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class OlSizeServiceImpl implements OlSizeService {

    @Autowired
    private OLSizeRepository repository;

    @Override
    public List<Size> findAll() {
        return repository.findAll();
    }
}
