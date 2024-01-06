package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Category;
import com.example.demo.entity.Color;
import com.example.demo.repository.onlineSales.OLCategoryRepository;
import com.example.demo.repository.onlineSales.OLColorRepository;
import com.example.demo.service.onlineSales.OlCategoryService;
import com.example.demo.service.onlineSales.OlColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class OlColorServiceImpl implements OlColorService {

    @Autowired
    private OLColorRepository repository;

    @Override
    public List<Color> findAll() {
        return repository.findAllByStatusEqualsOne();
    }
}
