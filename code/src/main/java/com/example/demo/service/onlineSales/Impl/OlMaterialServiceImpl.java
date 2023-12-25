package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Category;
import com.example.demo.entity.Material;
import com.example.demo.repository.onlineSales.OLCategoryRepository;
import com.example.demo.repository.onlineSales.OLMaterialRepository;
import com.example.demo.service.onlineSales.OlCategoryService;
import com.example.demo.service.onlineSales.OlMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class OlMaterialServiceImpl implements OlMaterialService {

    @Autowired
    private OLMaterialRepository repository;

    @Override
    public List<Material> findAll() {
        return repository.findAll();
    }
}
